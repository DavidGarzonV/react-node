import React from 'react';
import { withRouter } from 'react-router';

const NotFound = ({ history }: any) => {
    return (
        <div className="container">
            <div className="loginform">
                <h1>404</h1>
                <h2>Página no encontrada</h2>
                <p>Ir al <a href="/#" onClick={() => history.push('/')}>inicio</a></p>
            </div>
        </div>
    )

}

export default withRouter(NotFound);