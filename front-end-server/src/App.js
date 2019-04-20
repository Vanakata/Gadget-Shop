import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../src/App.css"
import { defaultUserState, UserProvider } from "../src/components/user-context";
import NavBar from "../src/components/navBar/NavBar"
import Login from "../src/components/auth/LoginPage";
import Register from "../src/components/auth/RegisterPage";
import CreateProduct from "../src/components/product/Create-product";
import HomePage from "../src/components/home/HomePage";
import DeleteProduct from "../src/components/product/delete-product";
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  constructor(props) {
    super(props);

    const localUser = window.localStorage.getItem("user");
    let parsedUser = localUser ? JSON.parse(localUser) : {};

    this.state = {
      user: {
        ...defaultUserState,
        ...parsedUser,
        updateUser: this.updateUser
      }
    };

  }
  updateUser = (user) => {
    this.setState({ user });
  }
  logout = () => {
    window.localStorage.clear();
    this.setState({
      user: {
        ...defaultUserState,
        updateUser: this.updateUser
      }
    })
  }
  render() {
    const { user } = this.state;
    return (
      <div className="App">

        <Router>
          <Fragment>
            <UserProvider value={user}>
              <NavBar logout={this.logout} />
              <ToastContainer />
              <Switch>
                <Route exact path ="/" component ={HomePage}/>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path ="/admin/create" component={CreateProduct}/>
                <Route exact path ='/admin/product/delete/:id' component={DeleteProduct}/>
              </Switch>
            </UserProvider>
          </Fragment>
        </Router>
        
      </div>
    );
  }
}

export default App;
