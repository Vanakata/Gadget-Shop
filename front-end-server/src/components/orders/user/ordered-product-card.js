import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';

class OrderedProductCard extends Component {

    render() {

        const { product } = this.props;
        const productDetailUrl = `/details/${product._id}`;

        return (
            <tr className="text-warning bg-light">
                <td data-th="Product">
                    <div className="row">
                        <div className="col-sm-4 hidden-xs">
                            <img
                                src={product.images}
                                alt={product.title}
                                className="cart-image" />
                        </div>
                        <div className="col-sm-8">
                            <h4 className="nomargin">{product.title}</h4>
                        </div>
                    </div>
                </td>
                <td className="text-warning bg-light" data-th="Price">${product.price.toFixed(2)}</td>
                <td data-th="Subtotal" className="text-center">${product.price.toFixed(2)}</td>
                <td className="actions" data-th="">
                    <a className="btn btn-warning" href={productDetailUrl}>Details</a>
                </td>
            </tr>
        )

    }
}
export default OrderedProductCard;