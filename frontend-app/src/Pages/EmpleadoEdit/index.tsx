import React from 'react'; // let's also import Component
import { request } from '../../functions';
import { EmpleadoInt } from '../../interfaces/empleadoint';
import Swal from 'sweetalert2';
import { EMPLEADO_URL, EMPRESA_URL } from '../../constants';
import { EmpresaInt } from '../../interfaces/empresaint';
import FormEdit from './page';
import ComboBox from '../../components/Form/autocomplete';

type FormElement = React.FormEvent<HTMLFormElement>;

type AutocompleteOption = {
    label: string,
    value: string
}
interface EmpleadoState extends EmpleadoInt {
    empresas: AutocompleteOption[],
    validate: boolean | string
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
            empresas: [],
            validate: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeBox = this.changeBox.bind(this);
    }

    async editEmpleado(id: string) {
        let response = await request(EMPLEADO_URL + "/" + id, "get");
        this.setState(response.data)
    }

    componentDidMount() {
        let { id } = this.props.match.params;
        if (id !== undefined) {
            this.editEmpleado(id);
        }
        this.getCompanies();
    }

    validateEmail(email: string) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async (e: FormElement) => {
        e.preventDefault();
        //Remove id from state
        let { id, empleados, ...data } = this.state;
        if (data.company?.value !== undefined) {
            data.company = data.company.value;
        }

        if (data.email !== "" && !this.validateEmail(data.email)) {
            this.setState({ validate: 'Formato de email inválido' })
            return;
        } else {
            this.setState({ validate: false })
        }

        if (this.state.id === "") {
            let response = await request(EMPLEADO_URL, "post", data);
            if (response !== false) {
                Swal.fire("Operación exitosa", "Empleado guardado correctamente", "success");
                this.props.history.replace("/empleado")
            }
        } else {
            let response = await request(EMPLEADO_URL + "/" + this.state.id, "put", data);
            if (response !== false) {
                Swal.fire("Operación exitosa", "Empleado guardado correctamente", "success");
            }
        }
    }

    async getCompanies() {
        let response = await request(EMPRESA_URL, "get");
        if (response !== false) {
            let empresas = await response.data.map(function (empresa: EmpresaInt) {
                return { value: empresa.id, label: empresa.name };
            });
            this.setState({
                empresas
            })
        }
    }

    //Select autocomplete
    changeBox(name: string, value: any) {
        this.setState({ [name]: value })
    }

    render() {
        return (
            <FormEdit
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                changeBox={this.changeBox}
                empresas={this.state.empresas}
                company={this.state.company}
                validate={this.state.validate}
                combo={<ComboBox options={this.state.empresas} name="company" value={this.state.company} label="Empresa" setInput={this.changeBox} />}
                name={this.state.name}
                last_name={this.state.last_name}
                phone={this.state.phone}
                email={this.state.email}
                id={this.state.id}
            />
        )
    }
}

export default EmpleadoEdit;