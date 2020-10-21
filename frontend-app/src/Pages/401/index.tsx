import React from 'react';
import { withRouter } from 'react-router';

const NotAutorized = ({ history }: any) => {
    return (
        <div className="container">
            <div className="loginform">
                <h1>401</h1>
                <h2>No tiene acceso a esta página</h2>
                <p>Ir al <a href="/#" onClick={() => history.push('/')}>login</a></p>
            </div>
        </div>
    )

}

export default withRouter(NotAutorized);