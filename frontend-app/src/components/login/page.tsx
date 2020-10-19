import React, { Component, FormEvent } from 'react'; // let's also import Component
import { NavLink } from 'react-router-dom';
import { Alert } from '../alert';

type FormProps = {
    message: string,
    loginError: boolean,
    error: boolean,
    handleSubmit: any,
    handleChange: any
}

const FormLogin = (props: FormProps) => {

    return (
        <div className="loginform">
            {props.error &&
                <Alert type="error" message={props.message} />
            }

            {props.loginError &&
                <Alert type="error" message="Las credenciales no coinciden" />
            }
            <div>
                <h1>Iniciar sesión</h1>
            </div>
            <div>
                <form onSubmit={props.handleSubmit}>
                    <div>
                        <label htmlFor="user">Usuario</label>
                        <input type="text" name="user" required onChange={props.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="pass">Contraseña</label>
                        <input type="password" name="pass" required onChange={props.handleChange} />
                    </div>
                    <div className="text-center">
                        <input className="saveButton" type="submit" value="Ingresar" />
                    </div>
                </form>
            </div>
            <div className="text-right">
                <NavLink exact={true} to='/register'>
                    Registrarme
                </NavLink>
            </div>
        </div>
    )
}

export default FormLogin;