import React, { Component,Fragment } from "react";
import ProductService from "../../components/product/Product-service"
import ProductCard from "../../components/product/Product-card"
class TopProducts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: [],

        }
    }
    static service = new ProductService();
    render() {
        const { products } = this.state;

        if (!products.length) {

            return (
                <div>
                    <br />
                    <h2 className="white">No gadgets available at the moment</h2>
                </div>
            )
        }
        return (
            <Fragment>
                <div className="row space-top m-5">
                    {
                        products.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    }
                </div>
            </Fragment>
        )
    }
    async componentDidMount() {
        try {
            const products = await TopProducts.service.getTopRatedProducts();
            this.setState({products})
        } catch(error){
            console.log(error);

        }
    }
}
export default TopProducts;
