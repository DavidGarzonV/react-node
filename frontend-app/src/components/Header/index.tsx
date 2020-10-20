import React from "react";
import { NavLink } from "react-router-dom";

type Props = {
    isLogged: boolean,
    loginAction: any
}

const cerrarSesion = (props: Props) => {
    localStorage.removeItem("token");
    props.loginAction(false);
}

export const Header = (props: Props) => {
    const { isLogged } = props;

    return (
        <>
            {isLogged &&
                <ul className="horizontal">
                    <NavLink exact={true} activeClassName='active' to='/'>Inicio</NavLink>
                    <NavLink exact={true} activeClassName='active' to='/empresa'>Empresas</NavLink>
                    <NavLink exact={true} activeClassName='active' to='/empleado'>Empleados</NavLink>
                    <div className="cerrarSesion">
                        <a  href="/#" onClick={() => cerrarSesion(props)}>
                            Cerrar sesion
                        </a>
                    </div>
                </ul>
            }
        </>
    )
}