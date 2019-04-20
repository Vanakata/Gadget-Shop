import React, { Component, Fragment } from "react";
import ProductService from "./Product-service";

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
                    <div className='container white'>
                        <div className='row space-top mb-3'>
                            <div className='col-md-12'>
                                <h1 className="text-center mt-3">{game.title}</h1>
                            </div>
                        </div>
                        <ProductInfo
                        product={product}
                        username={username}/>
                    </div>
                </main>
            </Fragment>
        )
    }
}