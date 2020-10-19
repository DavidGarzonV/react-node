import React from "react";
import { NavLink } from "react-router-dom"

type Props = {
    logged?: boolean,
    close: Function
}

export const Header = (props: Props) => {
    return (
        <>
            {/* {props.logged &&
            } */}
            <ul className="horizontal">
                <NavLink exact={true} activeClassName='active' to='/'>Inicio</NavLink>
                <NavLink exact={true} activeClassName='active' to='/empresa'>Empresas</NavLink>
                <NavLink exact={true} activeClassName='active' to='/empleado'>Empleados</NavLink>
                <div className="cerrarSesion">
                    <button onClick={() => props.close()}>
                        Cerrar sesion
                    </button>
                </div>
            </ul>
        </>
    )
}