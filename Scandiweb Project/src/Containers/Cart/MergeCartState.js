
import React from "react";

const MergeCartState = () => {

    const [state,  setState] = React.useState({
        count:1,
        allProducts: [],
        currency: '$',
    })

    const increase = (index) => {
        let allProducts = state.allProducts
        let currentCount = state.allProducts[index].count;
        allProducts[index].count =  currentCount + 1
        setState(({  allProducts: allProducts }));
        localStorage.setItem('products', JSON.stringify(allProducts));
    }

    const decrease = (index) => {
        let allProducts = state.allProducts
        let currentCount = state.allProducts[index].count;
        if (currentCount === 1){
            return;
        }
        allProducts[index].count =  currentCount - 1
        setState(({  allProducts: allProducts }));
        localStorage.setItem('products', JSON.stringify(allProducts));
    }

    const removeFromBag = (props, index) => {
        let allProducts =  JSON.parse(localStorage.getItem("products") || "[]")
        allProducts.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(allProducts));
        setState(({  allProducts: allProducts }));
        props.decreaseCount();
    }

    const changeColor = ( itemId, color) => {
        let allProducts = state.allProducts
        let updatedColorProducts = allProducts.map((item) => {
            if(item.id === itemId) {
                item.defaultColor = color
            }
            return item;
        })
        setState(state => ({ ...state, allProducts: updatedColorProducts }));
    }

    const getTotal = (allProducts) => {
        var Total = 0; 
        for (var i = 0; i < allProducts.length; i ++) {
            var totalPriceOf = allProducts[i].price;    
            Total += totalPriceOf * allProducts[i].count
        }
        return Total
}

const getImage = (item, activeColor, images) => {
    let imageName = item.image.split(".jpg")[0];
    let newImageName = imageName + activeColor + ".jpg"
   return images(newImageName)
}

    return {state,  setState, increase, decrease, changeColor, removeFromBag, getTotal, getImage};
}
export default MergeCartState