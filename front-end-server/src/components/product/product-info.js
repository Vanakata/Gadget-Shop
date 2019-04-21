import React, { Component, Fragment } from "react"
import ProductService from "./Product-service";
import { UserConsumer } from "../user-context"
import Trailer from "../product/video-trailer"
import 'bootstrap/dist/css/bootstrap.css';


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
        const { product } = this.props;
        debugger;
        ProductInfo.service.addToCart(product);
    }
    like = () => {
        const { product } = this.props;

        ProductInfo.service.like(product._id);

        this.setState({ isLike: true, likes: this.state.likes + 1 });
    }
    unLike = () => {
        const { product } = this.props;

        ProductInfo.service.unlike(product._id);

        this.setState({ isLike: false, likes: this.state.likes - 1 });
    }
    showTrailer = () => {
        this.setState({ showTrailer: true });
        this.setState({ showDescription: false });
    }
    showDescription = () => {
        this.setState({ showTrailer: false });
        this.setState({ showDescription: true });
    }
    render() {
        const { product } = this.props;
        const { isLike, likes } = this.state;

        return (
            <Fragment>
                <div className='row space-top bg-success'>
                    <div className='col-md-6'>
                        <img
                            src={product.images}
                            alt={product.title}
                        />

                        <p><span className='text-light h3'>Manufacturer:</span> <span className='text-light h3'>{product.manufacturer}</span></p>
                        <p><span className='text-light h3'>Type:</span> <span className='text-light h3'>{product.type}</span></p>
                        <p><span className='text-light h3'>Price:</span> <span className='text-light h3'>${product.price}</span></p>
                        <p><span className='text-light h3'>Likes:</span> <span className='text-light h3'>{likes}</span></p>

                        {
                            isLike
                                ?
                                <button type="button" className='btn btn-primary btn-sm m-1' onClick={this.unLike} >unLike</button>
                                :
                                <button type="button" className='btn btn-primary btn-sm m-1' onClick={this.like}>Like</button>
                        }

                        <button type="button" className='btn btn-warning btn-sm m-1' onClick={this.addToCart}>Order</button>
                        <button type="button" className='btn btn-info btn-sm m-1' onClick={this.showTrailer}>View Trailer</button>
                        <button type="button" className='btn btn-info btn-sm m-1' onClick={this.showDescription}>View Description</button>
                    </div>

                </div>
                <div className='row mt-4 mb-5'>
                    <div className='col-md-8 offset-md-2'>
                        {
                            (<Fragment>
                                {this.state.showTrailer ? <Trailer product={product} /> : null}
                                {this.state.showDescription
                                    ?
                                    <p align="center" className="h4 bg-success text-light"><span >Description</span>: {product.description}</p>
                                    : null}
                            </Fragment>)
                        }
                    </div>

                </div>
            </Fragment>
        );
    }
    componentDidMount() {
        try {
            const productLikes = this.props.product.likes;

            const { username } = this.props;
            if (productLikes.includes(username)) {
                this.setState({ isLike: true, likes: productLikes.length })
            }
            this.setState({ likes: productLikes.length })

        } catch (error) {
            console.log(error)
        }

    }
};

const ProductInfoWithContext = (props) => {

    return (
        <UserConsumer>
            {
                ({ username }) => (
                    <ProductInfo {...props} username={username} />

                )
            }
        </UserConsumer>
    )

}
export default ProductInfoWithContext;