import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles.scss';
import { Home } from './components/home';
import { Empleado } from './components/empleado';
import { Empresa } from './components/empresa';
import { Login } from './components/login';
import { Registro } from './components/registro';
import EmpleadoEdit from './components/EmpleadoEdit';
import EmpresaEdit from './components/EmpresaEdit';
import { Header } from './components/page/header';


interface IProps {
    [key: string]: any,
}

type IState = {
    logged?: boolean;
}

class App extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            logged: false
        };
        this.startSession = this.startSession.bind(this)
        this.logout = this.logout.bind(this)
    }

    startSession() {
        this.setState({
            logged: true
        })
    }

    logout() {
        this.setState({
            logged: false
        })
    }

    render() {
        return (
            <Fragment>
                <div className="container">
                    <Router>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/register" component={Registro} />
                            <Route exact path="/empleado" component={Empleado} />
                            <Route exact path="/empleado/edit" component={EmpleadoEdit} />
                            <Route exact path="/empleado/edit/:id" component={EmpleadoEdit} />
                            <Route exact path="/empresa" component={Empresa} />
                            <Route exact path="/empresa/edit" component={EmpresaEdit} />
                            <Route exact path="/empresa/edit/:id" component={EmpresaEdit} />
                        </Switch>
                        <Header logged={this.state.logged} close={this.logout} />
                    </Router>
                </div>
            </Fragment>
        );
    }
}

export default App;
