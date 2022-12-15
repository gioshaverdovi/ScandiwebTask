import React from "react";
import Layout from "./Components/Layout/Layout";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Woman from "./Containers/Woman/Woman";
import Man from "./Containers/Man/Man";
import Kids from "./Containers/Kids/Kids";
import Cart from "./Containers/Cart/Cart";
import ProductItemPage from "./Containers/ProductItemPage/ProductItemPage";
import axios from "axios";

class App extends React.Component {
     state = {
        itemsCount: 0,
        products: [],
        currencyFrom: 'usd',
        currencySymbol:'$',
        rates: '',
        PurchasedProducts: [],
    }
   
    componentDidMount = async() => {
        this.fetchAllProductsWithCurrencies();
    }
    fetchAllProductsWithCurrencies = () => {
        const query = `
        query {
            getAllProducts {
                id
                name
                image
                price
                sizes
                currency
                quantity
                availableColors
                defaultColor
            }
          }
        `
         axios.post('http://localhost:6969/graphql', {
            query:query
        }).then((resp) => {
              let products = resp.data.data.getAllProducts
            this.setState({
                products: products,
            })
            this.getDefaultCurrency(products)
        })
       
        let allProducts =  JSON.parse(localStorage.getItem("products") || "[]");
        this.setState({
            itemsCount: allProducts.length,
        })
    }

    getDefaultCurrency = async(products) => {
        let currencyTo =  localStorage.getItem("currency") || "";
        if(currencyTo) {
            this.updateCurrencyState(products, currencyTo);
        }
    }

    updateCurrencyState = async(products, currencyTo, currencyFrom='usd') => {
        let currencySymbol  = '';
        if(currencyTo === 'eur') {
            currencySymbol = '€';
        }
        else if(currencyTo === 'jpy') {
            currencySymbol = '¥';
        }
        else if(currencyTo === 'usd') {
            currencySymbol = '$';
        }
        let getCurrencyRatesFrom = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currencyFrom}.json`)
        getCurrencyRatesFrom = getCurrencyRatesFrom.data[currencyFrom];
        let convertFormula = getCurrencyRatesFrom[currencyTo];
        let convertedProducts =  products.map((product) => {
            product.price = Number(product.price * convertFormula).toFixed(2)
            product.currency = currencySymbol
            return product;
        })
        this.setState({currencyFrom: currencyTo, currencySymbol:currencySymbol,  products: convertedProducts})
        return{
            'convertedFormula' : convertFormula,
            'currencySymbol' : currencySymbol,
        }
    }

     updateCurrency = async(currencyTo) => {
        let allProducts = this.state.products;
        let updateCurrenncyState =  await this.updateCurrencyState(allProducts, currencyTo, this.state.currencyFrom)
        let convertFormula = updateCurrenncyState['convertedFormula']
         localStorage.setItem('currency',  currencyTo)
         this.updatePurchasedProductsCurrency(convertFormula, updateCurrenncyState['currencySymbol']);
    }

    updatePurchasedProductsCurrency =  (convertFormula, currencySymbol) => {
        let allPurchasedProducts =  JSON.parse(localStorage.getItem("products") || "[]")
        if(allPurchasedProducts.length <= 0) return;
        let convertedProducts = allPurchasedProducts.map(product => {
            product.currency = currencySymbol
            product.price = Number(product.price * convertFormula).toFixed(2)
            return product;
        });
        localStorage.setItem('products', JSON.stringify(convertedProducts));
    }

    incrementCount = () => {
        this.setState({
            itemsCount: this.state.itemsCount + 1,
        })
    }
    decreaseCount =() => {
        if(this.state.itemsCount ===0) {
            return;
        }
        this.setState({
            itemsCount: this.state.itemsCount - 1,
        })
    }
    render() {
        return (
            <Layout 
                count={this.state.itemsCount} 
                quantity={this.state.quantity}
                currency={this.state.currencyFrom} 
                currencySymbol={this.state.currencySymbol}  
                decreaseCount = {this.decreaseCount} 
                updateCurrency = {this.updateCurrency}>
                    <Routes>
                        <Route path="/man" element={<Man/>}/>
                        <Route path="/kids" element={<Kids/>}/>
                        <Route path="/woman" element={<Woman 
                                products = {this.state.products} 
                                incrementCount = {this.incrementCount} />}
                        />
                        <Route path="/" element={<Woman 
                            products = {this.state.products}  
                            incrementCount = {this.incrementCount} />}
                        />
                        <Route path="/cart" element={<Cart 
                            currency={this.state.currencyFrom} 
                            currencySymbol={this.state.currencySymbol} 
                            decreaseCount = {this.decreaseCount}/>}
                        />
                        <Route path="/Product-Item-Page/:id"  element={<ProductItemPage 
                            incrementCount = {this.incrementCount}  
                            products={this.state.products} />} 
                        />
                    </Routes>
            </Layout>
        )
    }
}

export default App;
