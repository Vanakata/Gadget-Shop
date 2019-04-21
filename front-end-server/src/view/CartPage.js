import React, { Component, Fragment } from "react";
import ProductService from "../components/services/product-service";
import { toast } from "react-toastify";
import OrdersService from "../components/services/orders-service";
import ProductCart from "../components/orders/user/product-cart";
import { UserConsumer } from "../components/user-context";
import 'bootstrap/dist/css/bootstrap.css';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            isRemoved: false,
        }
    }
    removeProduct = async (product) => {
        const isRemoved = await Cart.ProductService.removeFromCart(product);
        this.setState({
            isRemoved
        })
        toast.success("Gadget succesfully removed from your cart");
        this.componentDidMount();
    }
    createOrder = async () => {
        try {
            const body = this.state.products;
            const result = await Cart.OrdersService.createOrder(body);

            if (!result.success) {
                const errors = Object.values(result.errors).join(" ");
                throw new Error(errors);
            }
            toast.success("Order was created!")
            this.setState({
                products: []
            })
            Cart.ProductService.emptyCart()
        } catch (error) {
            toast.error(error.toString())

        }
    }
    static OrdersService = new OrdersService();
    static ProductService = new ProductService();
    render() {
        const { products } = this.state;
        const totalAmount = products.reduce(function (total, product) {
            return total + product.price
        }, 0) || 0;
        return (
            <Fragment>
                <main>
                    {!products.length
                        ?
                        <div className="white">
                            <br />
                            <h2 className="text-center">No gadgets in your cart!</h2>
                        </div>
                        :
                        <div className="container">
                            <table id="cart" className="table table-condensed table-borderless">
                                <thead className="white">
                                    <tr>
                                        <th style={{ width: "50px" }}>Products:</th>
                                        <th style={{ width: "10px" }}>Price:</th>
                                        <th className="text-center" style={{ width: "22px" }}>Subtotal:</th>
                                        <th style={{ width: "10px" }}></th>
                                    </tr>
                                </thead>
                                <tbody className="white">
                                    {
                                        products.map(product => (
                                            <ProductCart key={product._id} product={product} removeProduct={this.removeProduct} />
                                        ))
                                    }
                                </tbody>
                                <tfoot className="white">
                                    <tr>
                                        <td><a className="btn btn-warning text-light" href="/store"><i className="fa fa-angle-left"></i> Continue Shopping</a></td>
                                        <td colSpan="2" className="hidden-xs"></td>
                                        <td className="hidden-xs text-center"><strong>Total ${totalAmount}</strong></td>
                                        <td>
                                            <button
                                                className="btn btn-success btn-block"
                                                onClick={this.createOrder}>Checkout
                                    <i className="fa fa-angle-right"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    }
                </main>
            </Fragment>
        )
    }
    componentDidMount() {
        try {
            const products = JSON.parse(window.localStorage.getItem("products")) || [];
            if (products !== "null") {
                this.setState({
                    products
                })
            }
        } catch (error) {
            console.log(error);

        }
    }
}
const CartWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({ username, id }) => (
                    <Cart {...props} username={username} user={{ id }} />
                )

            }
        </UserConsumer>
    )
}
export default CartWithContext;