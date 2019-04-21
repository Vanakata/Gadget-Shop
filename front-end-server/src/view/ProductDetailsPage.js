import React, { Component, Fragment } from "react";
import ProductService from "../components/services/product-service";
import { UserConsumer } from "../components/user-context";
import ProductInfo from "../components/product/user/product-info";
import { toast } from "react-toastify"
import 'bootstrap/dist/css/bootstrap.css';

class ProductDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {

            product: {},
        }
    }
    static service = new ProductService();

    render() {
        const { product } = this.state;
        const { username } = this.props;

        if (product === undefined) {

            return (
                <main>
                    <div>
                        <h2 className="text-center white">Product does not exist!</h2>
                    </div>
                </main>
            )
        }
        return (
            <Fragment>
                <main>
                    <div className='container text-light'>
                        <div className='row space-top mb-3'>
                            <div className='col-md-12'>
                                <h1 className="text-center text-light">{product.title}</h1>
                            </div>
                        </div>
                        <ProductInfo
                            product={product}
                            username={username} />
                    </div>
                </main>
            </Fragment>
        )
    }
    async componentDidMount() {

        try {
            const productId = this.props.match.params.id;
            const products = await ProductDetails.service.getTopRatedProducts();
            const product = products.find(product => product._id === productId)

            this.setState({ product })
        } catch (error) {
            toast.error(error.toString());

        }
    }
}
const ProductDetailsWithContext = (props) => {
    console.log(props);
    return (
        <UserConsumer>
            {
                ({ username }) => (
                    <ProductDetails {...props} username={username} />
                )
            }
        </UserConsumer>
    )
}
export default ProductDetailsWithContext;