import React, { Component } from 'react'; // let's also import Component
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { Alert } from '../components/alert';
import { request, validateSession } from '../funciones';

type FormElement  = React.FormEvent<HTMLFormElement>;
type StateLogin = {
    [key: string]: any,
    message?:string
}

export class Login extends Component<RouteComponentProps, StateLogin> {
    state = {
        error: false,
        loginError: false,
        message:'Error al iniciar sesión'
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = async (e: FormElement) => {
        e.preventDefault();

        let response = await request("/auth/login","post", this.state);

        if (response !== false && response.statusCode !== 500 ) {

            if (response.data.error) {
                this.setState({error: true, message: response.data.error});
            }else{
                if (response.data.access_token === false) {
                    this.setState({loginError: true});
                    localStorage.removeItem("token");
                    localStorage.removeItem("isLogged");
                }else{
                    this.setState({loginError: false});
                    //DO LOGIN
                    localStorage.setItem("token", response.data.access_token);
                    localStorage.setItem("isLogged", "1");
                    this.props.history.replace('/home');
                }
            }
        }else{
            this.setState({error: false});
        }
    }

    render() {
        return (
            <div className="loginform">
                {this.state.error &&
                    <Alert type="error" message={this.state.message} />
                }

                {this.state.loginError &&
                    <Alert type="error" message="Las credenciales no coinciden" />
                }
                <div>
                    <h1>Iniciar sesión</h1>
                </div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor="user">Usuario</label>
                            <input type="text" name="user" required onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor="pass">Contraseña</label>
                            <input type="password" name="pass" required onChange={this.handleChange} />
                        </div>
                        <div className="text-center">
                            <input className="saveButton" type="submit" value="Ingresar"/>
                        </div>
                    </form>
                </div>
                <div className="text-right">
                    <NavLink exact={true} to=   '/register'>
                        Registrarme
                    </NavLink>
                </div>
            </div>
        )
    }
}