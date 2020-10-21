import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { validating } from '../../store/actions/validateLogin';

const logout = (dispatch: any) => {
    localStorage.removeItem("token");
    dispatch(validating());
}

const Header = () => {

    //For dispatch actions store
    const dispatch = useDispatch();

    return (
        <ul className="horizontal">
            <NavLink exact={true} activeClassName='active' to='/'>Inicio</NavLink>
            <NavLink exact={true} activeClassName='active' to='/empresa'>Empresas</NavLink>
            <NavLink exact={true} activeClassName='active' to='/empleado'>Empleados</NavLink>

            <div className="cerrarSesion">
                <a href="/#" onClick={event => logout(dispatch)}>
                    Cerrar sesion
                </a>
            </div>
        </ul>
    )
}

export default Header;