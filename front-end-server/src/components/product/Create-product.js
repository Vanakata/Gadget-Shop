import React, { Component } from "react";
import ProductService from "./Product-service"
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom"
import "../product/Create-product.css"

class CreateProduct extends Component {

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
            isCreated: false,

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
        this.setState({
            error: ""
        }, async () => {
            try {
                const result = await CreateProduct.service.create(credentials);
                if (!result.success) {
                   
                    const errors = Object.values(result.errors).join(" ");
                    throw new Error(errors);
                }
                toast.success("Product was created successfully");
                this.setState({
                    isCreated: true
                });
            } catch (error) {
                toast.error(error.toString());

            }
        })
    }

    render() {

        const { title, type, manufacturer, trailer, description, price, images, isCreated } = this.state;

        if (isCreated) {

            return (
                <Redirect to="/" />
            )
        } else {

            return (
                <div className="form-wrapper">
                    <h1>Create New Gadget</h1>
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
                        <div>
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
                        <div>
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
                        <div>
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
                        <div>
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
                        <div>
                            <label>Price</label>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                placeholder="Enter price of the product"
                                value={price}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
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
                            value="Create" />
                    </form>
                </div>
            )
        }
    }
}
export default CreateProduct;
