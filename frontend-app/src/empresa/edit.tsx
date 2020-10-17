import React from 'react'; // let's also import Component
import { request } from '../funciones';
import { EmpresaInt } from './empresaint';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2';
import { EMPLEADO_URL, EMPRESA_URL } from '../constants';
import { EmpleadoInt } from '../empleado/empleadoint';

type FormElement = React.FormEvent<HTMLFormElement>;

interface EmpresaState extends EmpresaInt {
    empleados?: Array<EmpleadoInt>
}

class EmpresaEdit extends React.Component<EmpresaInt, EmpresaState> {

    constructor(props: EmpresaInt) {
        super(props);

        this.state = {
            id: '',
            name: '',
            nit: '',
            tipo: '',
            contacto: null,
            empleados: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async editEmpresa(id: string) {
        let response = await request(EMPRESA_URL + "/" + id, "get");
        this.setState(response.data)
    }

    async getEmpleados() {
        let response = await request(EMPLEADO_URL, "get");
        if (response !== false) {
            let empleados = await response.data.map(function (empleado: EmpleadoInt) {
                return { value: empleado.id, label: empleado.name };
            });
            this.setState({
                empleados
            })
        }
    }

    componentDidMount() {
        let { id } = this.props.match.params;
        if (id !== undefined) {
            this.editEmpresa(id);
        }
        this.getEmpleados();
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async (e: FormElement) => {
        e.preventDefault();
        //Remove id from state
        let { id, ...data } = this.state;

        if (this.state.id === "") {
            let response = await request(EMPRESA_URL, "post", data);
            if (response !== false) {
                Swal.fire("Operación exitosa", "Empresa guardada correctamente", "success");
                this.props.history.replace("/empresa")
            }
        } else {
            let response = await request(EMPRESA_URL + "/" + this.state.id, "put", data);
            if (response !== false) {
                Swal.fire("Operación exitosa", "Empresa guardada correctamente", "success");
            }
        }
    }

    render() {
        return (
            <div className="indexcont">
                <NavLink exact={true} to="/empresa">
                    <FontAwesomeIcon icon={faReply} />
                </NavLink>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Nombre:</label>
                        <input type="text" name="name" required onChange={this.handleChange} value={this.state.name} />
                    </div>
                    <div>
                        <label>Nit:</label>
                        <input type="text" name="nit" required onChange={this.handleChange} value={this.state.nit} />
                    </div>
                    <div>
                        <label>Tipo:</label>
                        <select name="tipo" required onChange={this.handleChange} value={this.state.tipo}>
                            <option value="">-- Ninguno --</option>
                            <option value="pequenia">Pequeña</option>
                            <option value="mediana">Mediana</option>
                            <option value="grande">Grande</option>
                        </select>
                    </div>
                    <div>
                        <label>Contacto:</label>
                        <select name="company" value={this.state.contacto?.id} onChange={this.handleChange}>
                            <option value=''>-- Seleccione un empleado -- </option>
                            {this.state.empleados?.map((empleado, index) => {
                                return (
                                    <option key={empleado.value} value={empleado.value}>{empleado.label}</option>
                                )
                            })
                            }
                        </select>
                    </div>
                    <input type="hidden" name="id" onChange={this.handleChange} value={this.state.id} />
                    <input className="saveButton" type="submit" value="Guardar" />
                </form>
            </div>
        )
    }
}

export default EmpresaEdit;