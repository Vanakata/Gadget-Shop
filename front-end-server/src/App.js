import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import { defaultUserState, UserProvider } from "../src/components/user-context";
import NavBar from "../src/components/navBar/NavBar";
import Login from "./view/LoginPage";
import Register from "./view/RegisterPage";
import AuthorizeRoute from "../src/components/authorized-route";
import AdminRoute from "../src/components/admin-route";
import CreateProduct from "./view/CreateProductPage";
import HomePage from "./view/HomePage";
import DeleteProduct from "./components/product/admin/delete-product";
import PendingOrders from "../src/view/PendingOrders";
import ProductDetails from "./view/ProductDetailsPage";
import 'react-toastify/dist/ReactToastify.css';
import "../src/css/App.css";
import 'bootstrap/dist/css/bootstrap.css';
import EditProduct from './view/EditProductPage';
import Store from './view/StorePage';
import Cart from "./view/CartPage";
import MyOrders from "./view/MyOrdersPage";


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
                <Route exact path="/" component={HomePage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <AdminRoute exact path="/admin/create" component={CreateProduct} />
                <AdminRoute exact path="/admin/product/delete/:id" component={DeleteProduct} />
                <AdminRoute exact path="/admin/product/edit/:id" component={EditProduct} />
                <AdminRoute exact path="/admin/orders/pending" component={PendingOrders}/>
                <AuthorizeRoute exact path="/details/:id" component={ProductDetails} />
                <AuthorizeRoute exact path="/store" component={Store} />
                <AuthorizeRoute exact path="/cart" component={Cart} />
                <AuthorizeRoute exact path="/orders" component={MyOrders} />
              </Switch>
            </UserProvider>
          </Fragment>
        </Router>

      </div>
    );
  }
}

export default App;
