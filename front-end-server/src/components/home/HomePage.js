import React from "react";
import { UserConsumer } from "../user-context";
import { Link } from "react-router-dom";
import TopProducts from "../home/Top-products";
import "../home/HomePage.css";


const HomePage = ({ username, isLoggedIn, isAdmin }) => {


    return (

        <main>
            <div className="welcome-wrapper">
                {
                    isLoggedIn
                        ?
                        <div className="welcome">
                            <div className="greeting">Welcome to our store,{username}</div>
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
                        null
                }
                <ul className="white">
                    <h2>Most recent gadgets:</h2>
                    <TopProducts/>

                </ul>

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