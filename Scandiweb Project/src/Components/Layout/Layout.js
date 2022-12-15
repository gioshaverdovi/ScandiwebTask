import React from "react";
import Header from "../Navigation/Header/Header";
import './Layout.css'


class Layout extends React.Component {
    render() {
        return(
            <div className='layout'>
                <Header 
                    currency={this.props.currency} 
                    quantity={this.props.quantity}
                    currencySymbol={this.props.currencySymbol} 
                    decreaseCount = {this.props.decreaseCount} 
                    count={this.props.count} 
                    updateCurrency = {this.props.updateCurrency}
                />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout