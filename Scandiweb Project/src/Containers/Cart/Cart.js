import React, {useEffect} from "react";
import { useBetween } from "use-between";
import styles from "./Cart.module.css"
import emptyCart from '../../Components/images/empty-cart.png'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import MergeCartState from "./MergeCartState";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';

const useSharedCartState = () => useBetween(MergeCartState);

const images = require.context('../../Components/images', true);

const CartOverlay = (props) => {
    const { state, setState,increase, decrease, changeColor, removeFromBag, getImage, getTotal} = useSharedCartState();

    useEffect(() => {
        let allProducts =  JSON.parse(localStorage.getItem("products") || "[]")
        setState(state => ({ ...state, allProducts: allProducts }));
    }, [props.currency]);

    useEffect(() => {
        let allProducts =  JSON.parse(localStorage.getItem("products") || "[]")
        setState(state => ({ ...state, allProducts: allProducts }));
    }, []);
    var Quantity = 0; 
    for (var i = 0; i < state.allProducts.length; i ++) {
        Quantity += state.allProducts[i].count
    }
    
    const nextImage = (index) => {
        let nextIndexColor = 0;
        let allProducts = state.allProducts
        let currentProduct = allProducts[index];
        let productsAviableColors = currentProduct.availableColors
        let aviableColors = productsAviableColors.split(',').map((color) => {
            return color
        })
        let currentIndexColor = aviableColors.indexOf(currentProduct.defaultColor)
        if(currentIndexColor >= 0 && currentIndexColor < aviableColors.length - 1) {
            nextIndexColor = currentIndexColor + 1
        }
        let nextColor = aviableColors[nextIndexColor]
        currentProduct.defaultColor = nextColor
        allProducts[index] = currentProduct
        setState(state => ({ ...state, allProducts: allProducts}));
    }

    const previousImage = (index) => {
        let previousIndexColor = 0;
        let allProducts = state.allProducts
        let currentProduct = allProducts[index];
        let productsAviableColors = currentProduct.availableColors
        let aviableColors = productsAviableColors.split(',').map((color) => {
            return color
        })
        let currentIndexColor = aviableColors.indexOf(currentProduct.defaultColor)
        if(currentIndexColor > 0) {
            previousIndexColor = currentIndexColor - 1
        }
        else if (currentIndexColor === 0) {
            previousIndexColor = aviableColors.length - 1
        }
        let previousColor = aviableColors[previousIndexColor]
        currentProduct.defaultColor = previousColor
        allProducts[index] = currentProduct
        setState(state => ({ ...state, allProducts: allProducts}));
    }
    return (
        <div className={styles.Cart}>
            <div className={styles.Title}>
                <h3>Cart</h3>
            </div>
            {
                state.allProducts.length === 0 ?
                <div className={styles.empty}>
                    <h2>Cart is empty</h2>
                    <img src={emptyCart}></img>
                </div> :
                state.allProducts.map((item, index) => 
                    <div key={index} className={styles.container}>
                        <div className={styles.CartInfo}>
                            <p className={styles.CartInfoName}>{item.name}</p>
                            <p className={styles.CartInfoPrice}>{props.currencySymbol}{item.price}</p>
                            <p className={styles.CartInfoSize}>Size:</p>
                            {item.sizes.split(',').map((size,index) => 
                                 <div  key={index} className={styles.size}>{size}</div>
                            )}
                            <p className={styles.CartInfoColor}>Color:</p>
                            {item.availableColors.split(',').map((color,index) => 
                                 <div  key={index} onClick={()=> changeColor(item.id, color)} className={ styles[color]}></div>
                            )}    
                            {
                                state.allProducts[index].count >=  state.allProducts[index].quantity ? 
                                <p className={styles.aviableItems}>Aviable Only {state.allProducts[index].quantity}</p> : ''
                            }
                             {
                                state.allProducts[index].count >=  4 ? 
                                <p className={styles.aviableItems}>You can only buy 4 items at a time!</p> : ''
                            }
                        </div>
                        <div className={styles.quantityDiv}>
                            <button 
                                className={state.allProducts[index].count >= state.allProducts[index].quantity || state.allProducts[index].count >= 4 ? styles.cartbuttonDisabled : styles.cartquantityDivbutton} 
                                disabled={state.allProducts[index].count >= state.allProducts[index].quantity || state.allProducts[index].count >= 4 ? true : false}
                                onClick={() =>increase(index)}>+
                            </button>
                            <p>{state.allProducts[index].count}</p>
                            <button
                                className={
                                    state.allProducts[index].count === 1 ? 
                                    styles.cartbuttonDisabled : 
                                    styles.cartquantityDivbutton
                                }
                                disabled={state.allProducts[index].count === 1 ? true : false}
                                onClick={() =>decrease(index)}
                            >-</button>
                        </div>
                        <div className={styles.CartImage}>
                             <img src={getImage(item, item.defaultColor, images)}/>
                            <button className={styles.LeftArrow}>
                                <ArrowBackIosNewOutlinedIcon className={styles.ArrowIcon} onClick={() => previousImage(index)}/>
                            </button>
                            <button className={styles.RightArrow}>
                                <ArrowForwardIosOutlinedIcon className={styles.ArrowIcon} onClick={() => nextImage(index)}/>
                            </button>
                        </div>
                        <div className={styles.X}>
                            <div onClick={() => removeFromBag(props, index)}>
                                <DeleteForeverRoundedIcon/>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className={styles.Total}>
                <h3 className={styles.TotalInfo}>
                    Tax 21%:
                    <p> {props.currencySymbol}{Number(getTotal(state.allProducts)*21/100).toFixed(2)}</p>
                </h3>
                <h3 className={styles.TotalInfo}>
                    Quantity: 
                    <p> {Quantity}</p>
                </h3>
                <h3 className={styles.TotalInfo}>
                    Total: 
                    <p> {props.currencySymbol} {Number(getTotal(state.allProducts)+getTotal(state.allProducts)*21/100).toFixed(2)}</p>
                </h3>
            </div>
            <div className={styles.CartOverlayButtons}>
                <button className={state.allProducts.length > 0 ? styles.orderButton : styles.orderButtonDisabled}>Order</button>
            </div>   
        </div>
    )
}
export default CartOverlay