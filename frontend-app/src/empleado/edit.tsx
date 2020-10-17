import React from 'react'; // let's also import Component
import { request } from '../funciones';
import { EmpleadoInt } from './empleadoint';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { EMPLEADO_URL, EMPRESA_URL } from '../constants';
import { EmpresaInt } from '../empresa/empresaint';

// import { EmpresaInt } from '../empresa/empresaint';

type FormElement = React.FormEvent<HTMLFormElement>;

interface EmpleadoState extends EmpleadoInt {
    empresas?:Array<EmpresaInt>
}

class EmpleadoEdit extends React.Component<EmpleadoInt, EmpleadoState> {

    constructor(props: EmpleadoInt) {
        super(props);

        this.state = {
            id: '',
            name: '',
            last_name: '',
            phone: '',
            email: '',
            company: null,
            empresas: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    async editEmpleado(id: string) {
        let response = await request(EMPLEADO_URL+"/" + id, "get");
        this.setState(response.data)
    }

    componentDidMount() {
        let { id } = this.props.match.params;
        if (id !== undefined) {
            this.editEmpleado(id);
        }
        this.getCompany();
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async (e: FormElement) => {
        e.preventDefault();
        //Remove id from state
        let { id, ...data } = this.state;

        if (this.state.id === "") {
            let response = await request(EMPLEADO_URL, "post", data);
            if (response !== false) {
                Swal.fire("Operación exitosa", "Empleado guardado correctamente", "success");
                this.props.history.replace("/empleado")
            }
        } else {
            let response = await request(EMPLEADO_URL+"/" + this.state.id, "put", data);
            if (response !== false) {
                Swal.fire("Operación exitosa", "Empleado guardado correctamente", "success");
            }
        }
    }

    async getCompany() {
        let response = await request(EMPRESA_URL, "get");
        if (response !== false) {
            let empresas = await response.data.map(function(empresa: EmpresaInt) {
                return { value: empresa.id, label: empresa.name};
            });
            this.setState({
                empresas
            })
        }
    }

    render() {
        return (
            <div className="indexcont">
                <NavLink exact={true} to="/empleado">
                    <FontAwesomeIcon icon={faReply} />
                </NavLink>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Nombre:</label>
                        <input type="text" name="name" required onChange={this.handleChange} value={this.state.name} />
                    </div>
                    <div>
                        <label>Apellido:</label>
                        <input type="text" name="last_name" required onChange={this.handleChange} value={this.state.last_name} />
                    </div>
                    <div>
                        <label>Teléfono:</label>
                        <input type="number" name="phone" onChange={this.handleChange} value={this.state.phone} />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" required onChange={this.handleChange} value={this.state.email} />
                    </div>
                    <div>
                        <label>Empresa:</label>
                        <select name="company" value={this.state.company?.id} onChange={this.handleChange}>
                            <option value=''>-- Seleccione una empresa -- </option>
                            {this.state.empresas?.map((empresa, index) => {
                                return(
                                    <option key={empresa.value} value={empresa.value}>{empresa.label}</option>
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

export default EmpleadoEdit;