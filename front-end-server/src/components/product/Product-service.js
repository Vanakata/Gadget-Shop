import { get, post, remove } from "../../data/crud";
import { toast } from "react-toastify";

class ProductService {
    constructor() {

        this.baseUrl = "http://localhost:5000/product";
        this.allProductsUrl = `${this.baseUrl}/all`;
        this.createProductUrl = `${this.baseUrl}/create`;
        this.editProductUrl = `${this.baseUrl}/edit/`;
        this.deleteProductUrl = `${this.baseUrl}/delete/`;
        this.likeProductUrl = `${this.baseUrl}/like/`;
        this.unlikeProductUrl = `${this.baseUrl}/unlike/`
    }
    getTopRatedProducts() {
        return get(this.allProductsUrl);
    }
    create(credentials) {

        return post(this.createProductUrl, credentials);
    }
    edit(id, credentials) {
        return post(`${this.editProductUrl}${id}`, credentials);
    }
    delete(id, credentials) {
        return remove(`${this.deleteProductUrl}${id}`, credentials);
    }
    like(id, credentials) {
        return post(`${this.likeProductUrl}${id}`, credentials)
    }
    unlike(id, credentials) {
        return post(`${this.unlikeProductUrl}${id}`, credentials)
    }
    addToCart = (product) => {
        let productAsJson = window.localStorage.getItem("products") || JSON.stringify([]);
        const products = JSON.parse(productAsJson);
        products.push(product);
        window.localStorage.setItem("products", JSON.stringify(products));

        toast.success(`${product.title} was added to your cart`)

    }
    removeFromCart = (product) => {
        let productAsJson = window.localStorage.getItem("products") || JSON.stringify([]);
        const products = JSON.stringify(productAsJson);
        products.push(product);
        window.localStorage.setItem("products", JSON.stringify(products));

        toast.success(`${product.title} was removed from your cart`);
        return true;
    }

    emptyCart = ()=> {
        window.localStorage.removeItem("products")
    }
}
export default ProductService