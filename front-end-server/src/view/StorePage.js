import React, { Component, Fragment } from "react";
import ProductService from "../components/services/product-service"
import ProductCard from "../components/store/Product-card"

class Store extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            query: "",
        }
        this.input = React.createRef();
    }
    static service = new ProductService();

    submitQuery = (event) => {
        event.preventDefault();
        const query = this.input.current.value;
        this.setState({ query })
    }
    render() {
        const { products, query } = this.state;
        const filterProducts = products.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()));

        return (
            <Fragment>
                <main>
                    <div className='container'>
                        <div className='row space-top'>
                            <div className='col-md-12'>
                                <h1 className='jumbotron-heading text-center white'>Store</h1>
                                <form onSubmit={this.submitQuery} className='form-inline md-form form-sm active-cyan active-cyan-2'>
                                    <input
                                        className='form-control form-control-sm ml-3 w-75'
                                        type='text'
                                        placeholder='Search for the game you are looking for...'
                                        aria-label='Search'
                                        id='query'
                                        name='query'
                                        ref={this.input} />
                                </form>
                            </div>
                        </div>
                        <br />
                        <div className="row-12">
                            <div className="card-deck space-top">
                                {
                                    filterProducts.map(product => (
                                        <ProductCard key={product._id} product={product} />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </main>
            </Fragment>
        )
    }
    async componentDidMount() {
        try {
            const products = await Store.service.getTopRatedProducts();
            this.setState({ products });
        } catch (error) {
            console.log(error);
        }
    }
}
export default Store;