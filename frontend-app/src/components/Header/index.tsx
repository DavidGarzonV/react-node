import React from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import loginAction from "../../store/actions/loginAction";

const Header = ({ history, loginAction }: any) => {
    return (
        <>
            <ul className="horizontal">
                <NavLink exact={true} activeClassName='active' to='/'>Inicio</NavLink>
                <NavLink exact={true} activeClassName='active' to='/empresa'>Empresas</NavLink>
                <NavLink exact={true} activeClassName='active' to='/empleado'>Empleados</NavLink>
                <div className="cerrarSesion">
                    <a href="/#" onClick={() => { 
                            localStorage.removeItem("token");
                            loginAction(false);    
                            history.push("/");
                        }}>
                        Cerrar sesion
                    </a>
                </div>
            </ul>
        </>
    )
}

const mapDispatchToprops = (dispatch: any) => ({
    loginAction: (isLogin: boolean) => dispatch(loginAction(isLogin))
});

export default connect(null, mapDispatchToprops)(withRouter(Header));