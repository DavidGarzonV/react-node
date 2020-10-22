import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { validating } from '../../store/actions/validateLogin';

const logout = (event:  React.MouseEvent,dispatch: any, history: any) => {
    event.preventDefault()
    localStorage.removeItem("token");
    dispatch(validating());
    history.replace("/");
}

const Header = () => {

    const history  = useHistory();

    //For dispatch actions store
    const dispatch = useDispatch();

    return (
        <ul className="horizontal">
            <NavLink exact={true} activeClassName='active' to='/'>Inicio</NavLink>
            <NavLink exact={true} activeClassName='active' to='/empresa'>Empresas</NavLink>
            <NavLink exact={true} activeClassName='active' to='/empleado'>Empleados</NavLink>

            <div className="cerrarSesion">
                <a href="/" onClick={event => logout(event, dispatch, history)}>
                    Cerrar sesion
                </a>
            </div>
        </ul>
    )
}

export default Header;