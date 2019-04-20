import React, { Component } from "react";
import ProductService from "./Product-service";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

class EditProduct extends Component {

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
            error: ""
        }
    }
    static service = new ProductService();

    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value
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
        } = this.state;

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
                const result = await EditProduct.service.edit(id, credentials);

                if (!result.success) {
                    const errors = Object.values(result.errors).join(" ");
                    throw new Error(errors);
                }
                toast.success("Gadget was edited successfully");
               
                this.setState({
                    isCreated: true
                })

            } catch (error) {
                toast.error(error.toString());
            }

        })

    }
    render() {
        const { title, type, manufacturer, trailer, description, price, images, isCreated, error } = this.state

        if (isCreated) {
            return (
                <Redirect to="/" />
            )
        }

        return (
            <div className="form-wrapper">
            {
                error.length
                    ? <div>Something went wrong: {error}</div>
                    : null
            }
                <h1>Edit Product</h1>
                <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Enter product title"
                                value={title}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Type</label>
                            <input
                                type="text"
                                name="type"
                                id="type"
                                placeholder="Enter product type"
                                value={type}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Manufacturer</label>
                            <input
                                type="text"
                                name="manufacturer"
                                id="manufacturer"
                                placeholder="Enter manufacturer"
                                value={manufacturer}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Video Trailer</label>
                            <input
                                type="text"
                                name="trailer"
                                id="trailer"
                                placeholder="Enter trailer URL"
                                value={trailer}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input
                                type="text"
                                name="description"
                                id="description"
                                placeholder="Enter description of the product"
                                value={description}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Price $</label>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                placeholder="Enter price of the product"
                                value={price}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Image</label>
                            <input
                                type="text"
                                name="images"
                                id="images"
                                placeholder="Enter URL image of the product"
                                value={images}
                                onChange={this.handleChange}
                            />
                        </div>
                        <input
                            type="submit"
                            value="Edit" />
                </form>
            </div>
        );
    }
    async componentDidMount() {
        try {

            const productId = this.props.match.params.id;
            const products = await EditProduct.service.getTopRatedProducts();
            const product = products.find(product => product._id === productId);

            this.setState({
                title: product.title,
                manufacturer: product.manufacturer,
                type: product.type,
                trailer: product.trailer,
                description: product.description,
                price: product.price,
                images: product.images,
                error: ""
            })
        } catch (error) {
            console.log(error);


        }
    }

}
export default EditProduct;