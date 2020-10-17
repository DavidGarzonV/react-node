import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import './styles.scss';
import { Home } from './home';
import { Empleado } from './empleado/index';
import { Empresa } from './empresa/index';
import { Login } from './login/index';
import { Registro } from './login/registro';
import { Loading } from './components/loading';
import Logout from './components/auth/logout';
import EmpleadoEdit from './empleado/edit';
import EmpresaEdit from './empresa/edit';
// import { LoggedIn } from './store/main/types';
// import { connect } from 'react-redux';

// const mapStateToProps = ( isLogged : LoggedIn) => {
//     return { isLogged }
// }

// type ReduxType = ReturnType<typeof mapStateToProps>;

// class App extends React.Component<ReduxType, LoggedIn>{





class App extends React.Component{
  // state = {
  //     isLogged: false
  // }
  render() {
    return (
      <Fragment>
        <div className="container">
          <Router>
            <Switch>
              <Route path='/' exact component={Loading} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Registro} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/empleado" component={Empleado} />
              <Route exact path="/empleado/edit" component={EmpleadoEdit} />
              <Route exact path="/empleado/edit/:id" component={EmpleadoEdit} />
              <Route exact path="/empresa" component={Empresa} />
              <Route exact path="/empresa/edit" component={EmpresaEdit} />
              <Route exact path="/empresa/edit/:id" component={EmpresaEdit} />
            </Switch>
            <ul className="horizontal">
                <NavLink exact={true} activeClassName='active' to='/home'>Inicio</NavLink>
                <NavLink exact={true} activeClassName='active' to='/empresa'>Empresas</NavLink>
                <NavLink exact={true} activeClassName='active' to='/empleado'>Empleados</NavLink>
                <Logout />
            </ul>
          </Router>
        </div>
      </Fragment>
    );
  }
}

// export default connect(mapStateToProps)(App);

export default App;
