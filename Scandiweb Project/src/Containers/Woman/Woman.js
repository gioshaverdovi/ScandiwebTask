import React from "react";
import ProductList from "../../Components/ProductItem/ProductList/ProductList";
import "./Woman.css"


const Woman = (props) => {

    return (
        <div className="Woman">
            <div className="Container">
                <h1>Woman</h1>
                <ProductList 
                    productList = {props.products} 
                    incrementCount = {props.incrementCount} 
                    decreaseCount = {props.decreaseCount}
                />
            </div>
        </div>
    )
    
}


export default Woman