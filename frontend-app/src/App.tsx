import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useLocation, withRouter } from 'react-router-dom';
import Home from './components/Home';
import Login from './Pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';
import NotAutorized from './Pages/401';
//For login validating
import { validating } from './store/actions/validateLogin';
import Registro from './Pages/Registro';

const App = (props: any) => {

    //For dispatch actions store
    const dispatch = useDispatch();

    //For get store state
    const { isLogin, isLoading } = useSelector((state: any) => {
        return {
            isLogin: state.validateLogin.status, isLoading: state.validateLogin.isLoading
        }
    });

    // De forma similar a componentDidMount y componentDidUpdate
    // useEffect
    useEffect(() => {
        dispatch(validating())
        //On [element] state change, useEffect
    }, [dispatch])

    return (
        <Fragment>
            <div className="container">
                {isLoading &&
                    <div>Cargando...</div>
                }
                <BrowserRouter>
                    <Switch>
                        {isLogin ? (
                            <Route path="/" component={Home} />
                        ) : (
                                <Route exact path="/" component={Login} />
                            )}
                        <Route exact path="/register" component={Registro} />
                        {!isLoading &&
                            <Route>
                                <NotAutorized />
                            </Route>
                        }
                    </Switch>
                </BrowserRouter>
            </div>
        </Fragment>
    );
}

export default App;
