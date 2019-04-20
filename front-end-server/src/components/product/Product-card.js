import React, { Component } from "react";
import ProductService from "./Product-service";
import { Link } from "react-router-dom"
import { UserConsumer } from "../user-context";
import "../product/Product.css"

class ProductCard extends Component {
    addToCart = () => {
        const { product } = this.props;

        ProductCard.service.addToCart(product);
    }
    static service = new ProductService();
    render() {
        const { product } = this.props;
        const { isLoggedIn, isAdmin } = this.props;

        return (
            <div className="col-md-3 mt-3 mb-3 d-flex">
                <div className="card colorCard card-body flex-fill">
                    <img className="card-img-top card-image"
                        src={product.images}
                        alt={product.title}
                    />
                    <div className="card-body">
                        <h5 className="card-title">
                            {product.title}
                        </h5>
                        <p className="card-text">
                            {product.description.slice(0, 50)}...
                        </p>
                    </div>
                    {
                        isLoggedIn
                            ?
                            (isAdmin
                                ?
                                <div className="card-footer">
                                    <small className="text-muted"></small>
                                    <Link
                                        type="button"
                                        className="btn btn-primary float-right btn-sm m-1"
                                        to={`/admin/product/edit/${product._id}`}
                                    >
                                        Edit
                                </Link>
                                    <Link
                                        type="button"
                                        className="btn btn-danger float-right btn-sm m-1"
                                        to={`/admin/product/delete/${product._id}`}
                                    >
                                        Delete
                                </Link>
                                </div>
                                :
                                <div className="card-footer">
                                    <small className="text-muted"></small>
                                    <Link
                                        type="button"
                                        className="btn btn-primary float-right btn-sm m-1"
                                        to={`/details/${product._id}`}
                                    >
                                        Details
                                </Link>
                                    <button
                                        type="button"
                                        className="btn btn-warning float-right btn-sm m-1"
                                        onClick={this.addToCart}
                                    >
                                        Order
                                </button>
                                </div>)
                            :
                            null
                    }
                </div>
            </div>
        )

    }

}
const ProductCardWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({ isLoggedIn, isAdmin }) => (
                    <ProductCard {...props} isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
                )
            }
        </UserConsumer>
    )
}
export default ProductCardWithContext;