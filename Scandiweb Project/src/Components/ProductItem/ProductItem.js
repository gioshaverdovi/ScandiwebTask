import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProductItem.module.css"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Tooltip from '@mui/material/Tooltip';

const ProductItem = (props) => {
    
    const navigate = useNavigate();

    const addToBag = (e) => {
        e.stopPropagation();
        let allProducts =  JSON.parse(localStorage.getItem("products") || "[]")
        let product = JSON.parse(JSON.stringify(props));
        let newProductid = product.id;
        let oldProductsIds =  allProducts.map(product => product.id);
        if(oldProductsIds.includes(newProductid)){
            alert('item is already in cart')
        }
        else {
            product.count = 1
            allProducts.push(product)
            localStorage.setItem('products', JSON.stringify(allProducts))
            props.incrementCount()
        }
    }

    const redirectToProduct = (id) => {
        navigate('/Product-Item-Page/'  + id )
    }

    const images = require.context('../images', true)

    return (
        <div className={props.quantity == 0 ? styles.ProductItemOut : styles.ProductItem} 
            onClick={props.quantity == 0 ? 
                (e) => {e.preventDefault()} : 
                () => redirectToProduct(props.id)}>
            <div className={styles.ProductItemdiv}>
                <div className={styles.image}>
                    <img src={images(props.image)}/>
                </div>
                <p className={styles.ProductName}>{props.name}</p>
                <p className={styles.ProductPrice}>{props.currency} {props.price}</p>
            </div>
            <Tooltip title="Add to cart">
                <button    
                    className={props.quantity === 0 ? styles.ShoppingCartOutlinedIconOut : styles.ShoppingCartOutlinedIcon}
                    onClick={addToBag}
                    >
                        <ShoppingCartOutlinedIcon/>
                </button>
            </Tooltip>
            <span className={props.quantity == 0 ? styles.outOfStock : styles.outOfStockHidden}>Out Of Stock</span>
        </div>
    )

}
export default ProductItem



