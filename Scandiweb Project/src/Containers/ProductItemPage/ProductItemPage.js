import React, {useState, useEffect} from "react";
import styles from "./ProductItemPage.module.css"
import { useParams } from 'react-router-dom';

const ProductItemPage = (props) => {
    let { id } = useParams();
    const [state, setState]  = useState({
        product: '',
        images:"",
    })
    useEffect(() => {
        let products = props.products;
        let product = products.find(product => product.id == id);
        let  images = require.context('../../Components/images', true)
        setState({product: product, images:images });
    },[props]);

    const changeColor = ( color) => {
        let updatedProduct = state.product;
        updatedProduct.defaultColor = color
         setState(state => ({ ...state, product: updatedProduct }));
    }

    const getImage =  (color = state.product.defaultColor ) =>{
         let imageName = state.product.image.split(".jpg")[0];
         let newImageName = imageName + color+ ".jpg"
         return state.images(newImageName)
    }

    const addToBag = (e) => {
        e.stopPropagation();
        let allProducts =  JSON.parse(localStorage.getItem("products") || "[]")
        let product = JSON.parse(JSON.stringify(state.product));
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

    return (
        <div className={styles.ProductItemPage}>
            <div className={styles.Container}>
                <div className={styles.ImageList}>
                    {
                        state.product 
                            ? state.product.availableColors.split(",").map((color, index) => 
                                    <div 
                                        key={index} 
                                        onClick={() => changeColor(color) } 
                                        className={styles.SmallImage}>
                                            <img src={ state.product ? getImage(color) : "#"}/>
                                    </div> 
                                )
                             : "#"
                    }
                </div>
                <div className={styles.BigImage}>
                    <img src={state.product ? getImage() : "#"}/>
                </div>                
                <div className={styles.Info}>
                    <h3>{ state.product ? state.product.name : ''}</h3>
                    <p className={styles.InfoSize}>size:</p>
                    <div className={styles.sizeDiv}>  
                        {   
                            state.product ?
                            state.product.sizes.split(",").map((size, index) => 
                            <div
                                key={index}
                                className={ styles.sizeDivs} 
                            >{size}</div> 
                           ) : ""
                        }
                    </div>
                    <p className={styles.InfoColor}>Color:</p>
                    <div className={styles.ColorDiv}>
                            {
                                state.product 
                                    ? state.product.availableColors.split(',').map((color,index) => 
                                        <div  key={index} onClick={()=> changeColor(color)} className={ styles[color]}></div>
                                        )
                                    : ''
                            }   
                    </div>
                    
                    <p className={styles.InfoPrice}>Price:</p>
                    <p className={styles.Price}>{ state.product ? state.product.currency : ""} { state.product ? state.product.price : ""}</p>
                    <button onClick={addToBag}>add to cart</button>
                    <p className={styles.InfoText}>Find stunning women's cocktail dresses and party dresses. 
                        Stand out in lace and metallic cocktail dresses 
                        and party dresses from all your favorite brands.
                    </p>
                </div>
            </div>
        </div>
    )
}
export default ProductItemPage