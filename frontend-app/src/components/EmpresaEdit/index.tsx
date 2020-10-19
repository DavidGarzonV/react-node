import React from 'react'; // let's also import Component
import { request } from '../../funciones';
import { EmpresaInt } from '../../interfaces/empresaint';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2';
import { EMPLEADO_URL, EMPRESA_URL } from '../../constants';
import { EmpleadoInt } from '../../interfaces/empleadoint';
import ComboBox from '../form/autocomplete';
import FormEdit from '../EmpresaEdit/page';

type AutocompleteOption = {
    label: string,
    value: string
}
type FormElement = React.FormEvent<HTMLFormElement>;

interface EmpresaState extends EmpresaInt {
    empleados: AutocompleteOption[]
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
            empleados: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeBoxEmpresa = this.changeBoxEmpresa.bind(this);
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
        let { id, empleados, ...data } = this.state;
        console.log(data);

        data.contacto = this.state.empleado;
        if (data.contacto?.value != undefined) {
            data.contacto = data.contacto.value;
        }

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

    //Select autocomplete
    changeBoxEmpresa(name: string, value: any) {
        this.setState({ [name]: value })
    }

    render() {
        return (
            <FormEdit
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                combo={<ComboBox options={this.state.empleados} name="contacto" value={this.state.contacto} label="Contacto" setInput={this.changeBoxEmpresa} />}
                name={this.state.name}
                nit={this.state.nit}
                tipo={this.state.tipo}
                id={this.state.id}
            />
        )
    }
}

export default EmpresaEdit;