import React, { Component } from 'react'; // let's also import Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { EmpresaInt } from '../../interfaces/empresaint';
import { request } from '../../funciones';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { EMPRESA_URL } from '../../constants';
import IndexEmpresa from './page';

// the clock's state has one field: The current time, based upon the
// JavaScript class Date
type Iprops = {}

type EmpresaState = {
    empresas: EmpresaInt[],
    sinempresas: boolean
}

// Clock has no properties, but the current state is of type EmpresaState
// The generic parameters in the Component typing allow to pass props
// and state. Since we don't have props, we pass an empty object.
export class Empresa extends Component<Iprops, EmpresaState> {

    constructor(props: Iprops) {
        super(props);

        this.state = {
            empresas: [],
            sinempresas: true
        }

        this.eliminarEmpresa = this.eliminarEmpresa.bind(this)
        this.deleteEmpresa = this.deleteEmpresa.bind(this)
    }

    // The tick function sets the current state. TypeScript will let us know
    // which ones we are allowed to set.
    async load() {
        let response = await request(EMPRESA_URL, "get");
        if (response !== false) {
            this.setState({
                empresas: response.data,
                sinempresas: response.data.length === 0
            });
        } else {
            this.setState({
                empresas: [],
                sinempresas: true
            });
        }
    }

    // Before the component mounts, we initialise our state
    componentWillMount() {
        this.setState({
            empresas: [],
            sinempresas: false
        });
        this.load();
    }

    async eliminarEmpresa(id: string) {
        let response = await request(EMPRESA_URL + '/' + id, "delete");
        if (response !== false) {
            if (response.data.error) {
                Swal.fire("Error", response.data.error, "error");
            } else {
                this.setState({
                    empresas: response.data,
                    sinempresas: response.data.length === 0
                });
                Swal.fire("Operación exitosa", "Empresa eliminada correctamente", "success");
            }
        } else {
            alert("Error al eliminar");
        }
    }

    async deleteEmpresa(event: React.MouseEvent, id: string) {
        event.preventDefault();

        Swal.fire({
            title: "Está seguro?",
            text: "Esta acción es irreversible",
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            icon: 'warning',
        })
            .then((result) => {
                if (result.isConfirmed) {
                    this.eliminarEmpresa(id);
                }
            });
    }

    // render will know everything!
    render() {
        if (this.state.empresas.length > 0) {
            return (
                <IndexEmpresa
                    empresas={this.state.empresas}
                    deleteEmpresa={this.deleteEmpresa}
                />
            );
        } else {
            if (this.state.sinempresas) {
                return (
                    <div className="indexcont">
                        <div className="buttonlist">
                            <NavLink exact={true} className='button' to='/empresa/edit'>
                                <FontAwesomeIcon icon={faPlus} />
                                Crear empresa
                            </NavLink>
                        </div>
                        <p className="text-center">Sin empresas.</p>
                    </div>
                );
            } else {
                return (
                    <div className="indexcont">
                        <p className="text-center">Cargando empresas...</p>
                    </div>
                );
            }
        }
        // return <p>The current time is {this.state.time.toLocaleTimeString()}</p>
    }
}