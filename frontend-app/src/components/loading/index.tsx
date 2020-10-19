import React from 'react'; // let's also import Component
import { BrowserRouter as Router, Redirect, RouteComponentProps  } from 'react-router-dom';
import { validateSession } from '../../funciones/index'


interface IProps {
    [key: string]: any,
}

type LoadingState = {
    logged: boolean
}
export class Loading extends React.Component<IProps | RouteComponentProps, LoadingState> {

    constructor(props: IProps | RouteComponentProps) {
        super(props);

        this.validar = this.validar.bind(this)
        this.state = {
            logged: false
        }        
    }

    async validar() {
        let response = await validateSession();
        console.log(this.props);
        if (response.status) {
            this.setState({ logged: true })
        } else {
            this.setState({ logged: false })
        }

        if (this.props.location) {
            
        }
    }

    componentDidMount() {
        this.validar();
    }

    render() {
        return (
            <>
                {!this.state.logged && 
                    <Router>
                        <Redirect to="/login" / >
                    </Router>
                }
            </>
        );
    }
}