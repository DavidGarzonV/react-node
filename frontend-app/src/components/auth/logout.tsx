import { connect } from 'react-redux';
import React from 'react'; // let's also import Component
import logoutAction from '../../store/main/action';

const Logout = () => {

    const cerrarSesion = () => {
        logoutAction(true);
        window.location.href = "/login";
    }

    return (
        <div className="cerrarSesion">
            <a onClick={cerrarSesion}>
                Cerrar sesion
            </a>
        </div>
    )
}

export default connect(null, { logoutAction })(Logout);