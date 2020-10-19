import React, { Component } from 'react'; // let's also import Component
import { RouteComponentProps } from 'react-router-dom';
import { request } from '../../funciones';
import FormLogin from './page';

type FormElement = React.FormEvent<HTMLFormElement>;
type StateLogin = {
    [key: string]: any
}

export class Login extends Component<RouteComponentProps, StateLogin> {

    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            error: false,
            loginError: false,
            message: 'Error al iniciar sesión',
            user: '',
            pass: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async (e: FormElement) => {
        e.preventDefault();

        const { user, pass } = this.state;
        console.log(user, pass);

        let response = await request("/auth/login", "post", { user, pass });

        if (response !== false && response.statusCode !== 500) {
            if (response.data.error) {
                this.setState({ error: true, message: response.data.error });
            } else {
                if (response.data.access_token === false) {
                    this.setState({ loginError: true });
                } else {
                    this.setState({ loginError: false });
                    //DO LOGIN
                    localStorage.setItem("token", response.data.access_token);
                    this.props.history.replace('/');
                }
            }
        } else {
            this.setState({ error: false });
        }
    }

    render() {
        return (
            <FormLogin 
                message={this.state.message}
                loginError={this.state.loginError}
                error={this.state.error}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
            />
        )
    }
}