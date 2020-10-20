import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

type IProps = {
    path: string,
    component: any,
    exact: any,
    login?: boolean
}

const PrivateRoute = (props: IProps) => {
    const { login, ...rest } = props;

    return (
        <Route {...rest} render={(props) => {
            return (
                login === true
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }} />
            )
        }} />
    )
}

export default PrivateRoute;
