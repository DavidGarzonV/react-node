import React, { Component } from 'react'; // let's also import Component
import { RouteComponentProps } from 'react-router-dom';
import { request } from '../../functions';
import Swal from 'sweetalert2';
import FormRegistro from './page';

type FormElement = React.FormEvent<HTMLFormElement>;
type StateRegistro = {
    [key: string]: any,
    error: boolean,
    message: string
}

class Registro extends Component<RouteComponentProps, StateRegistro> {

    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            error: false,
            message: 'Error al registrarse'
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async (e: FormElement) => {
        e.preventDefault();

        let response = await request("/user", "post", this.state);

        if (response !== false && response.statusCode !== 500) {

            if (response.data.error) {
                this.setState({ error: true, message: response.data.error });
            } else {
                // window.location.href = "/login";
                Swal.fire("Operación exitosa", "Registro exitoso", "success");
                this.setState({ error: false });
                this.props.history.replace('/')
            }
        } else {
            this.setState({ error: true });
        }
    }

    render() {
        return (
            <FormRegistro
                error={this.state.error}
                message={this.state.message}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
            />
        )
    }
}

export default Registro;