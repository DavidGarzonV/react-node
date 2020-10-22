import React, { Component } from 'react'; // let's also import Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { EmpresaInt } from '../../interfaces/empresaint';
import { request } from '../../functions';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { EMPRESA_URL } from '../../constants';
import IndexEmpresa from './page';
import loadingAction from '../../store/actions/loadingAction';
import { connect } from 'react-redux';

// the clock's state has one field: The current time, based upon the
// JavaScript class Date
type Iprops = {
    [key: string]: any
}

type EmpresaState = {
    empresas: EmpresaInt[],
    sinempresas: boolean
}

// Clock has no properties, but the current state is of type EmpresaState
// The generic parameters in the Component typing allow to pass props
// and state. Since we don't have props, we pass an empty object.
class Empresa extends Component<Iprops, EmpresaState> {

    constructor(props: Iprops) {
        super(props);

        this.state = {
            empresas: [],
            sinempresas: true
        }

        this.eliminarEmpresa = this.eliminarEmpresa.bind(this)
        this.deleteEmpresa = this.deleteEmpresa.bind(this)
        this.load();
    }

    // The tick function sets the current state. TypeScript will let us know
    // which ones we are allowed to set.
    async load() {
        this.props.loadingAction(true);

        let response = await request(EMPRESA_URL, "get");
        if (response.status !== false) {
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
        this.props.loadingAction(false);
    }

    async eliminarEmpresa(id: string) {
        this.props.loadingAction(true);
        let response = await request(EMPRESA_URL + '/' + id, "delete");
        this.props.loadingAction(false);
        if (response.status !== false) {
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

        return (
            !this.state.sinempresas
                ?
                <IndexEmpresa
                    empresas={this.state.empresas}
                    deleteEmpresa={this.deleteEmpresa}
                />
                :
                <div className="indexcont">
                    <h1>Listado de Empresas</h1>
                    <div className="buttonlist">
                        <NavLink exact={true} className='button' to='/empresa/edit'>
                            <FontAwesomeIcon icon={faPlus} />
                            Crear empresa
                        </NavLink>
                    </div>
                    <p className="text-center">Sin empresas.</p>
                </div>
        )
    }
}

const mapDispatchToProps = {
    loadingAction,
}

export default connect(null, mapDispatchToProps)(Empresa);
// export default Empresa;