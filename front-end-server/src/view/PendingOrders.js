import React, { Component, Fragment } from "react";
import OrdersService from "../components/services/orders-service";
import { toast } from "react-toastify";
import PendingOrderCard from "../components/orders/admin/pending-order-card";
import RecievedOrder from "../components/orders/admin/RecievedOrder";

class PendingOrders extends Component {
    constructor(props) {
        console.log(props)
        super(props);
        this.state = {
            orders: [],
            order: {},
        }
    }
    orderDetails = (order) => {
        this.setState({
            order
        })
    }
    approveOrder = async (order) => {

        await PendingOrders.OrdersService.approveOrder(order._id);
        toast.success(`Order ${order._id} was approved`);
        this.setState({
            order: {}
        })
        this.componentDidMount();
    }
    static OrdersService = new OrdersService();
    render() {

        const { orders, order } = this.state;
        const products = order.products;
        if (!orders.length) {
            return (
                <div>
                    <br />
                    <h2>You have no orders!</h2>
                </div>
            )
        }
        return (
            <Fragment>
                <div className="container" style={{ paddingTop: "25px;" }}>
                    <h1 className="text-center m-3">Pending Orders</h1>
                    <div className="row m-3" style={{ paddingTop: "25px;" }}>
                        <div className="col-md-12" id="customer-orders">
                            <div className="box">
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Order</th>
                                                <th>Total</th>
                                                <th>Status</th>
                                                <th>View</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map(order => (
                                                <PendingOrderCard key={order._id} order={order} orderDetails={this.orderDetails} approveOrder={this.approveOrder} />
                                            ))}
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
                        <table id="cart" className="table table-hover table-condensed">
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
                                        <RecievedOrder key={product._id} product={product} removeProduct={this.removeProduct} />
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
            const orders = await PendingOrders.OrdersService.getPendingOrders();
            
            this.setState({ orders });
        } catch (error) {
            console.log(error)
        }
    }
}
export default PendingOrders;