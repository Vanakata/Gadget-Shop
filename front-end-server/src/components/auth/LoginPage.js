import React, { Component } from "react";
import { Redirect } from "react-router-dom"
import AuthenticationService from "../services/authentication-service.js";
import { UserConsumer } from "../user-context"
import { toast } from "react-toastify"
import "../auth/LoginStyle.css"


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {

            username: "",
            password: "",
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
        const { username, password } = this.state;
        const { updateUser } = this.props;


        const credentials = {
            username,
            password
        }
        this.setState({
            error: "",
        },
            async () => {
                try {

                    const result = await Login.service.login(credentials);

                    if (!result.success) {
                        const errors = Object.values(result.errors).join(" ");
                        throw new Error(errors)
                    }
                    window.localStorage.setItem("auth_token", result.token);
                    window.localStorage.setItem("user", JSON.stringify({
                        ...result.user,
                        isLoggedIn: true,
                        isAdmin: (result.user.roles[0] === "Admin")
                    }))
                    updateUser({
                        isLoggedIn: true,
                        isAdmin: (result.user.roles[0] === "Admin"),
                        ...result.user
                    })
                    toast["success"](`Welcome back, ${this.state.username}!`);
                } catch (error) {
                    debugger;
                    toast.error("Invalid username or password")
                }
            });
    }
    render() {

        const { username, password } = this.state;
        const { isLoggedIn } = this.props;

        if (isLoggedIn) {

            return (
                <Redirect to="/" />
            )
        } else {
            return (
                <div className="testbox">
                    <h1>Login</h1>
                    <form onSubmit={this.handleSubmit}>

                        <div className="label">

                            <label >Username:</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={this.handleChange}
                                className="loginPage" />
                        </div>
                        <div className="label">
                            <label >Password:</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={this.handleChange}
                                className="loginPage"
                            />
                        </div>
                        <input
                            type="submit"
                            value="Login"
                            className="button" />
                    </form>
                </div>
            )
        }
    }
}

const LoginWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({ isLoggedIn, updateUser }) => (
                    <Login
                        {...props}
                        isLoggedIn={isLoggedIn}
                        updateUser={updateUser}
                    />
                )
            }
        </UserConsumer>
    )
}
export default LoginWithContext;
