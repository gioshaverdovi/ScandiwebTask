import React, { useEffect} from "react";
import { useBetween } from "use-between";
import { Link } from "react-router-dom";
import styles from "./CartOverlay.module.css"
import emptyCart from '../../../images/empty-cart.png'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import MergeCartState from "../../../../Containers/Cart/MergeCartState";


const useSharedCartState = () => useBetween(MergeCartState);

const images = require.context('../../../images', true);

const CartOverlay = (props) => {
    const { state, setState, increase, decrease, changeColor, removeFromBag, getImage, getTotal} = useSharedCartState();

    useEffect(() => {
        let allProducts =  JSON.parse(localStorage.getItem("products") || "[]")
        setState(state => ({ ...state, allProducts: allProducts }));
    }, []);

    useEffect(() => {
        let allProducts =  JSON.parse(localStorage.getItem("products") || "[]")
        setState(state => ({ ...state, allProducts: allProducts }));
    }, [props.currency]);
    
    return (
        <div className={styles.CartOverlay}>
            <div className={styles.Title}>
                <h3>My Bag {state.allProducts.length} item</h3>
            </div>
            {
                state.allProducts.length === 0 ?
                <div className={styles.empty}>
                    <h2>Cart is empty</h2>
                    <img src={emptyCart}></img>
                </div> :
                state.allProducts.map((item, index) => 
                    <div key={index} className={styles.container}>
                        <div className={styles.CartOverlayInfo}>
                            <p className={styles.CartOverlayInfoName}>{item.name}</p>
                            <p className={styles.CartOverlayInfoPrice}>{props.currencySymbol} {item.price}</p>
                            <p className={styles.CartOverlayInfoSize}>Size: </p>
                            {item.sizes.split(',').map((size,index) => 
                                 <div  key={index} className={styles.size}>{size}</div>
                            )}
                            <p className={styles.CartOverlayInfoColor}>Color:</p>
                            {item.availableColors.split(',').map((color,index) => 
                                 <div  key={index} onClick={()=> changeColor(item.id, color)} className={ styles[color]}></div>
                            )}                  
                        </div>
                        <div className={styles.quantityDiv}>
                            <button 
                                className={state.allProducts[index].count >= state.allProducts[index].quantity || state.allProducts[index].count >= 4 ? styles.buttonDisabled : styles.quantityDivbutton} 
                                disabled={state.allProducts[index].count >= state.allProducts[index].quantity || state.allProducts[index].count >= 4 ? true : false}
                                onClick={() =>increase(index)}>+
                            </button>
                            <p>{state.allProducts[index].count}</p>
                            <button
                                className={state.allProducts[index].count === 1 ? 
                                    styles.buttonDisabled : 
                                    styles.quantityDivbutton
                                }
                                disabled={state.allProducts[index].count === 1 ? true : false}
                                onClick={() =>decrease(index)}
                            >-</button>
                        </div>
                        <div className={styles.CartOverlayImage}>
                            <img src={getImage(item, item.defaultColor, images)}/>
                        </div>
                        {
                            state.allProducts[index].count >=  state.allProducts[index].quantity ? 
                            <p className={styles.aviableItems}>Aviable Only {state.allProducts[index].quantity}</p> : ''
                        }
                        {
                            state.allProducts[index].count >=  4 ? 
                            <p className={styles.aviableItems}>You can only buy 4 items at a time!</p> : ''
                        }
                        <div className={styles.X}>
                            <div onClick={() => removeFromBag(props, index)}>
                                <DeleteForeverRoundedIcon/>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className={styles.Total}>
                <h3>Total:</h3>
                <h3>{props.currencySymbol} {getTotal(state.allProducts).toFixed(2)}</h3>
            </div>
            <div className={styles.CartOverlayButtons}>
                <Link to='/cart'>
                    <button 
                        onClick={(e) => state.allProducts.length > 0 ? props.onClick() : e.preventDefault()}
                        className={state.allProducts.length === 0 ? 
                            styles.ViewButtonDisabled : 
                            styles.ViewButton
                        }
                    >View Bag</button>
                </Link>
                <button 
                    className={state.allProducts.length === 0 ? 
                        styles.ChekButtonDisabled : 
                        styles.ChekButton}
                >Chek Out</button>
            </div>   
        </div>
    )
}



export default CartOverlay