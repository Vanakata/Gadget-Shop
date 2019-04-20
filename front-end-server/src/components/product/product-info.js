import React, { Component,Fragment } from "react"
import ProductService from "./Product-service";


class ProductInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showTrailer: false,
            showDescription: false,
            isLike: false,
            likes: 0
        };
    }
    static service = new ProductService();
    addToCart = () => {
        const { game } = this.props;

        ProductInfo.service.addToCart(product);
    }
    like = () => {
        const { product } = this.props;
        ProductInfo.service.like(product._id);
        this.setState({
            isLike: true,
            likes: this.state.likes + 1
        })
    }
    unlike = () => {
        const { product } = this.props;
        ProductInfo.service.unlike(product._id);
        this.setState({
            isLike: false,
            likes: this.state.likes - 1,
        })
    }
    showTrailer = () => {
        this.setState({ showTrailer: true })
        this.setState({ showDescription: false })
    }
    showDescription = () => {
        this.setState({ showTrailer: false })
        this.setState({ showDescription: true })
    }
    render() {

        const {product} = this.props;
        const{isLike,likes}= this.state;

        return(
            <Fragment>

            </Fragment>
        )
    }
}