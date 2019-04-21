import React, { Component, Fragment } from "react";
import OrdersService from "../components/services/orders-service"
import OrderCard from "../components/orders/user/order-card";
import OrderedProductCard from "../components/orders/user/ordered-product-card";
import 'bootstrap/dist/css/bootstrap.css';
class MyOrders extends Component {

    constructor(props) {
        super(props);
        this.state = {

            orders: [],
            order: {},
        }
    }
    orderDetails = (order) => {

        this.setState({
            order,
        })
    }
    static OrdersService = new OrdersService();
    render() {

        const { orders, order } = this.state;
        const products = order.products;
        if (!orders.length) {
            return (
                <div>
                    <br />
                    <h2 className="text-center text-light">No orders in your list!</h2>
                </div>
            )
        }

        return (
            <Fragment>
                <div className="container" style={{ paddingTop: "25px" }}>
                    <h1 className="text-center text-warning">My Orders</h1>
                    <div className="row" style={{ paddingTop: "25px" }}>
                        <div className="col-md-12" id="customer-orders">
                            <div className="box">
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr className="text-light">
                                                <th>Order</th>
                                                <th>Status</th>
                                                <th>View</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-warning bg-light">
                                            {
                                                orders.map(order => (
                                                    <OrderCard key={order._id} order={order} orderDetails={this.orderDetails} />
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    order.hasOwnProperty("_id")
                        ?
                        <table id="cart" className="table table-hover table-condensed text-warning h3">
                            <thead>
                                <tr>
                                    <th style={{ width: "50px" }}>Product</th>
                                    <th style={{ width: "10px" }}>Price</th>
                                    <th className="text-center" style={{ width: "22px" }}>Subtotal</th>
                                    <th style={{ width: "10px" }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map(product => (
                                        <OrderedProductCard key={product._id} product={product} removeProduct={this.removeProduct} />
                                    ))
                                }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td><a className="btn btn-warning" href="/store"><i className="fa fa-angle-left"></i> Continue Shopping</a></td>
                                    <td colSpan="2" className="hidden-xs"></td>
                                    <td className="hidden-xs text-center"><strong>Total ${(products
                                        .reduce(function (accumulator, product) {
                                            return accumulator + product.price;
                                        }, 0) || 0)}</strong></td>
                                </tr>
                                <td></td>
                            </tfoot>
                        </table>
                        :
                        null

                }
            </Fragment>

        )
    }
    async componentDidMount() {

        try {
            const orders = await MyOrders.OrdersService.getUserOrders();
            this.setState({
                orders
            })
        } catch (error) {
            console.log(error);

        }
    }
}
export default MyOrders;