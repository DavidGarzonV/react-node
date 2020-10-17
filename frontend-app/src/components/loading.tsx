import React from 'react'; // let's also import Component
import { RouteComponentProps } from 'react-router-dom';
import { validateSession } from '../funciones/index'

export class Loading extends React.Component<RouteComponentProps> {

    async validar(){
        let response = await validateSession();
        if (!response.status) {
            this.props.history.replace('/login')
            localStorage.setItem("isLogged", "0");
        } else {            
            localStorage.setItem("isLogged", "1");
            this.props.history.replace('/home')
        }
    }
    
    componentDidMount() {
       this.validar();
    }

    render() {
        return (
            <div className="loading" >
                Cargando..
            </div>
        );
    }
}