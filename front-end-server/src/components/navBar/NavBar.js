import React, { Fragment } from "react";
import { NavLink } from "react-router-dom"
import "../../css/NavBar2.css"
import { UserConsumer } from "../user-context"


const NavBar = ({ isAdmin, isLoggedIn, logout, }) => {


    return (
        <header id="header">
            <nav className="navbar-menu">
                <NavLink className="logo" to="/">Gadget Store</NavLink>
                {
                    isLoggedIn ?
                        <Fragment>
                            <NavLink to="/store">Store</NavLink>
                            {isAdmin ?
                                <Fragment>
                                    <NavLink to="/admin/create">Create New Product</NavLink>
                                    <NavLink to="/admin/orders/pending">Pending Orders</NavLink>
                                </Fragment>
                                :
                                <Fragment>
                                    <NavLink to="/orders">My Orders</NavLink>
                                    <NavLink to="/cart">Cart</NavLink>
                                </Fragment>}
                            <NavLink to="/" onClick={logout}>Logout</NavLink>
                        </Fragment>
                        :
                        <Fragment>
                            <NavLink to="/login">Login</NavLink>
                            <NavLink to="/register">Register</NavLink>
                        </Fragment>
                }

            </nav>
        </header>
    )
}
const NavBarWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({ isLoggedIn, isAdmin }) => (
                    <NavBar {...props} isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
                )
            }
        </UserConsumer>
    )
}
export default NavBarWithContext;