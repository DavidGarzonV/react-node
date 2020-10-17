import React, { Component } from 'react'; // let's also import Component
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { Alert } from '../components/alert';
import { request } from '../funciones';
import Swal from 'sweetalert2';

type FormElement  = React.FormEvent<HTMLFormElement>;
type StateRegistro = {
    [key: string]: any,
    error:boolean,
    message?: string
}

export class Registro extends Component<RouteComponentProps, StateRegistro> {
    state = {
        error: false,
        message:'Error al registrarse'
    }
    handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = async (e: FormElement) => {
        e.preventDefault();

        let response = await request("/user","post", this.state);

        if (response !== false && response.statusCode !== 500) {

            if (response.data.error) {
                this.setState({error: true, message: response.data.error});
            }else{
                // window.location.href = "/login";
                Swal.fire("Operación exitosa", "Registro exitoso", "success");
                this.setState({error: false});
                this.props.history.replace('/login')
            }
        }else{
            this.setState({error: true});
        }
    }

    render(){
        return (
            <div className="loginform">
                {this.state.error &&
                    <Alert type="error" message={this.state.message} />
                }
                <div>
                    <h1>Registro de usuario</h1>
                </div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor="name">Nombre</label>
                            <input type="text" name="name" required onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor="user">Usuario</label>
                            <input type="text" name="user" required onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor="pass">Contraseña</label>
                            <input type="password" name="pass" required onChange={this.handleChange} />
                        </div>
                        <div className="text-center">
                            <input className="saveButton" type="submit" value="Registrarme"/>
                        </div>
                    </form>
                </div>
                    <div className="text-right">
                        <NavLink exact={true} to='/login'>
                            Iniciar sesión
                        </NavLink>
                    </div>
            </div>
        )
    }
}