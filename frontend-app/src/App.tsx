import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './Pages/Login';
import { connect } from 'react-redux';
import './styles.scss';
import NoMatch from './Pages/404';
import loginAction from './store/actions/loginAction';
import Registro from './Pages/Registro';

interface IProps {
    [key: string]: any,
}

const App = ({ isLogin,loginAction }: IProps) => {
    let token = localStorage.getItem("token");

    if (isLogin === false && token !== undefined && token !== null) {
        loginAction(true);
    }

    return (
        <Fragment>
            <div className="container">
                <BrowserRouter>
                    <Switch>
                        {isLogin ? (
                            <Route path="/" component={Home} />
                        ) : (
                            <Route exact path="/" component={Login} />
                        )}
                        <Route exact path="/register" component={Registro} />
                        <Route>
                            <NoMatch />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        </Fragment>
    );
}


const mapStateToProps = ({ login: isLogin }: any) => {
    return isLogin
}

const mapDispatchToProps = {
    loginAction,
}


// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App);
