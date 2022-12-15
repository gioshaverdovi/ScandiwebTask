import React, {Component} from "react";
import ProductItem from "../ProductItem";
import "./ProductList.css"

class ProductList extends Component {

    render() {
        const products = this.props.productList
        return (
            <div className="ProductList">
                {
                    products.map((product) => 
                        <ProductItem
                            incrementCount = {this.props.incrementCount} 
                            decreaseCount = {this.props.decreaseCount}
                            key={product.id}
                            id = {product.id}
                            currency = {product.currency}
                            quantity={product.quantity}
                            availableColors={product.availableColors}
                            defaultColor={product.defaultColor}
                            name={product.name} 
                            price={product.price}
                            sizes={product.sizes}
                            image={product.image}
                        />
                    )
                }             
            </div>
        )
    }
    
}


export default ProductList