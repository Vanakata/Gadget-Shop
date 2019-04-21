import React, { Component } from "react";
import AuthenticationService from "../components/services/authentication-service";
import { Redirect } from "react-router-dom"
import { UserConsumer } from "../components/user-context";
import { toast } from "react-toastify"
import "../css/RegisterStyle.css"

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            error: "",
            isRegister: false,
        }
    }
    static service = new AuthenticationService();

    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value,
        })
    }
    handleSubmit = (event) => {
        
        event.preventDefault();
        const { email, username, password, confirmPassword } = this.state;

        const credentials = {
            email,
            username,
            password,
            confirmPassword,
        }

        this.setState({
            error: ""
        }, async () => {
            try {

                if (credentials.password !== credentials.confirmPassword) {
                    throw new Error("Password and Confirm-Password doesn't match")
                }
                const result = await Register.service.register(credentials);
                if (!result.success) {
                    const errors = Object.values(result.errors).join(" ");
                    throw new Error(errors);
                }
                toast.success(`Welcome to our store ${credentials.username}`)
                this.setState({
                    isRegister: true,
                })
            } catch (error) {
                toast.error(error.toString())
            }
        })
    }

    render() {
        const { email, username, password, confirmPassword, error, isRegister } = this.state;
        const { isLoggedIn } = this.props;


        if (isLoggedIn) {
            return (
                <Redirect to="/" />
            );
        }
        if (isRegister) {
            return (
                <Redirect to="/login" />
            )
        }
        return (
            <div className="testboxRegister">
                {
                    error.length ?
                        <div>Something went wrong: {error}</div>
                        :
                        null
                }
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <div className="labelRegister">
                            <label>E-mail:</label>
                        </div>
                        <div className="inputText">
                            <input
                                type="text"
                                name="email"
                                id="email"
                                placeholder="Enter your e-mail"
                                value={email}
                                onChange={this.handleChange}
                                className="registerPage"

                            />
                        </div>
                    </div>
                    <div >
                        <div className="labelRegister">
                            <label>Username:</label>
                        </div>
                        <div className="inputText">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={this.handleChange}
                                className="registerPage"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="labelRegister">
                            <label>Password:</label>
                        </div>
                        <div className="inputText">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={this.handleChange}
                                className="registerPage"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="labelRegister">
                            <label>Confirm-Password:</label>
                        </div>
                        <div className="inputText">
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Enter password again"
                                value={confirmPassword}
                                onChange={this.handleChange}
                                className="registerPage"
                            />
                        </div>
                    </div>
                    <input
                        type="submit"
                        value="Register"
                        className="button" />
                </form>
            </div>
        )
    }
}
const RegisterWithContext = (props) => {

    return (
        <UserConsumer>
            {
                ({ isLoggedIn }) => (
                    <Register
                        {...props}
                        isLoggedIn={isLoggedIn}
                    />
                )
            }
        </UserConsumer>
    )
}
export default RegisterWithContext;

