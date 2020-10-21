import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import loginAction from "../../store/actions/loginAction";


const logout = (event: React.MouseEvent, dispatch: any) => {
    localStorage.removeItem("token");
    dispatch(loginAction(true));
}

const Header = () => {
    const dispatch = useDispatch();
    // const isLogin = useSelector((state: any) => state.login.isLogin);

    return (
        <ul className="horizontal">
            <NavLink exact={true} activeClassName='active' to='/'>Inicio</NavLink>
            <NavLink exact={true} activeClassName='active' to='/empresa'>Empresas</NavLink>
            <NavLink exact={true} activeClassName='active' to='/empleado'>Empleados</NavLink>

            <div className="cerrarSesion">
                <a href="/#" onClick={event => logout(event, dispatch)}>
                    Cerrar sesion
                    </a>
            </div>
        </ul>
    )
}

export default Header;