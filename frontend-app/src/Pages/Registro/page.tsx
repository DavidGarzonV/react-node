import React from 'react'; // let's also import Component
import { NavLink } from 'react-router-dom';
import { Alert } from '../../components/Alert';

type IProps = {
    error: boolean,
    message: string,
    handleSubmit: any,
    handleChange: any,
}

const FormRegistro = (props: IProps) => {

    return (
        <div className="loginform">
            {props.error &&
                <Alert type="error" message={props.message} />
            }
            <div>
                <h1>Registro de usuario</h1>
            </div>
            <div>
                <form onSubmit={props.handleSubmit}>
                    <div>
                        <label htmlFor="name">Nombre</label>
                        <input type="text" name="name" required onChange={props.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="user">Usuario</label>
                        <input type="text" name="user" required onChange={props.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="pass">Contraseña</label>
                        <input type="password" name="pass" required onChange={props.handleChange} />
                    </div>
                    <div className="text-center">
                        <input className="saveButton" type="submit" value="Registrarme" />
                    </div>
                </form>
            </div>
            <div className="text-right">
                <NavLink exact={true} to='/'>
                    Iniciar sesión
                </NavLink>
            </div>
        </div>
    )
}

export default FormRegistro;