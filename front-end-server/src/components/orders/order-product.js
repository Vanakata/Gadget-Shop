import React ,{Component} from "react";


class OrderProduct extends Component{
    render(){
        const {product} = this.props;
        const productDetailUrl = `/details/${product._id}`;

        return(
            <tr>
                <td data-th="Product">
                <div className="row">
                    <div className="col-sm-4 hidden-xs">
                        <img 
                            src={product.images} 
                            alt={product.title} 
                            className="cart-image"/>
                    </div>
                    <div className="col-sm-8">
                        <h4 className="nomargin">{product.title}</h4>
                    </div>
                </div>
                </td>
                <td data-th="Price">${product.price}</td>
                    <td data-th="Subtotal" className="text-center">${product.price}</td>
                    <td className="actions" data-th="">
                    <a className="btn btn-warning" href={productDetailUrl}>Details</a>
                </td>
            </tr>
        )
    }
}
export default OrderProduct;