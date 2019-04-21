import React from "react";
import { UserConsumer } from "../components/user-context";
import { Link } from "react-router-dom";
import AvailableProducts from "../components/home/Available-products";
import "../css/HomePageStyle.css";


const HomePage = ({ username, isLoggedIn, isAdmin }) => {


    return (

        <main>
            <div className="welcome-wrapper">
                {
                    isLoggedIn
                        ?
                        <div className="welcome">
                            <div className="greeting">
                            <p>Welcome to our store,{username}!</p>
                            <p>These are our latest gadgets:</p>
                            </div>
                            <p>
                                <Link to="/store" >Go To Store</Link>
                                {isAdmin
                                    ?
                                    <Link to="/admin/orders/pending" >View all pending orders</Link>
                                    :
                                    <Link to="/orders" >View your orders</Link>
                                }
                            </p>
                        </div>
                        :
                        <ul className="white">
                            <h2>These cool gadgets are just in a few clicks away! Just log in!</h2>
                        </ul>
                }
                <AvailableProducts />

            </div>
        </main>

    )
}
const HomePageWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({ username, isLoggedIn, isAdmin }) => (
                    <HomePage {...props} username={username} isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
                )
            }
        </UserConsumer>
    )
}
export default HomePageWithContext;