import React, { Component } from 'react'; // let's also import Component
import { connect } from 'react-redux';
import { request } from '../../functions';
import loginAction from '../../store/actions/loginAction'
import FormLogin from './page';

type FormElement = React.FormEvent<HTMLFormElement>;

interface IProps {
    [key: string]: any,
}

type StateLogin = {
    [key: string]: any
}

class Login extends Component<IProps, StateLogin> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            error: false,
            loginError: false,
            message: 'Error al iniciar sesión',
            user: '',
            pass: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async (e: FormElement) => {
        e.preventDefault();

        const { user, pass } = this.state;

        let response = await request("/auth/login", "post", { user, pass });

        if (response !== false && response.statusCode !== 500) {
            if (response.data.error) {
                this.setState({ error: true, message: response.data.error });
            } else {
                if (response.data.access_token === false) {
                    this.setState({ loginError: true });
                } else {
                    this.setState({ loginError: false });
                    //DO LOGIN
                    localStorage.setItem("token", response.data.access_token);
                    this.props.loginAction(true);
                    // this.props.history.replace("/");
                    this.props.history.replace("/");
                }
            }
        } else {
            this.setState({ error: false });
        }
    }

    render() {
        return (
            <FormLogin
                message={this.state.message}
                loginError={this.state.loginError}
                error={this.state.error}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
            />
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        isLogged: state.login
    }
}

const mapDispatchToProps = {
    loginAction,
}

// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(Login);
