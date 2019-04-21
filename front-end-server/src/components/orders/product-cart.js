import React, { Component } from "react";

class ProductCart extends Component {

    remove = () => {
        const { product } = this.props;
        this.props.removeProduct(product)
    }
    render() {

        const { product } = this.props;

        return (
            <tr>
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
                <td data-th="Price">${product.price}</td>
                <td data-th="Subtotal" className="text-center">${product.price}</td>
                <td className="actions" data-th="">
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={this.remove}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </td>
            </tr>
        )
    }
}
export default ProductCart