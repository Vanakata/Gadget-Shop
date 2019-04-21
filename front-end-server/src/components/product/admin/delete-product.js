import React, { Component } from "react";
import ProductService from "../../services/product-service";
import { toast } from "react-toastify"
import { Redirect, Link } from "react-router-dom";

class DeleteProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            type: "",
            manufacturer: "",
            trailer: "",
            description: "",
            price: "",
            images: "",
            error: "",

        }
    }
    static service = new ProductService();
    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value,
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const {
            title,
            type,
            manufacturer,
            trailer,
            description,
            price,
            images,

        } = this.state
        const credentials = {
            title,
            type,
            manufacturer,
            trailer,
            description,
            price,
            images,
        }
        const id = this.props.match.params.id;
        this.setState({
            error: ""
        }, async () => {
            try {
                const result = await DeleteProduct.service.delete(id, credentials);
                if (!result.success) {
                    const errors = Object.values(result.errors).join(' ');

                    throw new Error(errors);
                }
                toast.success("Gadget was deleted successfully");
                this.setState({
                    isCreated: true
                });
            } catch (error) {
                toast.error(error.toString());
            }
        })

    }
    render() {
        const { title, isCreated } = this.state;

        if (isCreated) {
            return (
                <Redirect to='/' />
            )
        }
        return (
            <div className="form-wrapper">
                <h1>Are you sure you want to delete gadget <strong>{title}</strong>?</h1>
                <form onSubmit={this.handleSubmit}>
                    
                    <input type="submit" className="btn btn-danger" value="Delete" />
                    <Link to='/' className="btn btn-primary" >Back </Link>
                </form>
            </div>
        )
    }
    async componentDidMount() {
        try {
            const productId = this.props.match.params.id;
            const products = await DeleteProduct.service.getTopRatedProducts();
            const product = products.find(product => product._id === productId);

            this.setState({
                title: product.title,
                manufacturer: product.manufacturer,
                trailer: product.trailer,
                description: product.description,
                price: product.pice,
                images: product.images,
                error: ""
            })
        } catch (error) {
            console.log(error)
        }
    }

}
export default DeleteProduct;
