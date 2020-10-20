import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles.scss';
import { Home } from './components/Home';
import { Empleado } from './components/Empleado';
import { Empresa } from './components/Empresa';
import Login from './components/Login';
import { Registro } from './components/Registro';
import EmpleadoEdit from './components/EmpleadoEdit';
import EmpresaEdit from './components/EmpresaEdit';
import { Header } from './components/Header';
import { connect } from 'react-redux';
// import PrivateRoute from './components/PrivateRoute';
import loginAction from './store/actions/loginAction';

interface IProps {
    [key: string]: any,
}

type IState = {
    logged?: boolean;
}

const NoMatch = () => <div>Página no encontrada</div>

class App extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        const { login } = this.props;
        return (
            <Fragment>
                <div className="container">
                    <Router>
                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/register" component={Registro} />
                            <Route exact path="/" component={Home} />
                            <Route exact path="/empleado" component={Empleado} />
                            <Route exact path="/empleado/edit" component={EmpleadoEdit} />
                            <Route exact path="/empleado/edit/:id" component={EmpleadoEdit} />
                            <Route exact path="/empresa" component={Empresa} />
                            <Route exact path="/empresa/edit" component={EmpresaEdit} />
                            <Route exact path="/empresa/edit/:id" component={EmpresaEdit} />
                            <Route>
                                <NoMatch />
                            </Route>
                        </Switch>
                        <Header isLogged={login} loginAction={this.props.loginAction} />
                    </Router>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        login: state.login
    }
}

const mapDispatchToProps = {
    loginAction,
}

// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App);
