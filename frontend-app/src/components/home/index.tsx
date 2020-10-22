import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Empleado from '../../pages/Empleado';
import Empresa from '../../pages/Empresa';
import EmpleadoEdit from '../../pages/EmpleadoEdit';
import EmpresaEdit from '../../pages/EmpresaEdit';
import Header from '../Header';
import Principal from '../../pages/Principal';
import NotFound from '../../pages/404';

const Home = () => {
    return (
        <div>
            <Header />
            <Switch>
                <Route exact path="/" component={Principal} />
                <Route exact path="/empleado" component={Empleado} />
                <Route exact path="/empleado/edit" component={EmpleadoEdit} />
                <Route exact path="/empleado/edit/:id" component={EmpleadoEdit} />
                <Route exact path="/empresa" component={Empresa} />
                <Route exact path="/empresa/edit" component={EmpresaEdit} />
                <Route exact path="/empresa/edit/:id" component={EmpresaEdit} />
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </div>
    )
}

export default Home;