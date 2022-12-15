import React, { Component} from 'react'
import './Header.css'
import { Link, NavLink } from 'react-router-dom'
import StoreLogo from '../../logo/StoreLogo.png'
import { Badge } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartOverlay from './CartOverlay/CartOverlay'


const links = [
    {to: '/woman', label: 'Woman', exact: 1},
    {to: '/man', label: 'Man', exact: 0},
    {to: '/kids', label: 'Kids', exact: 0},
]

class Header extends Component {

    renderLinks() {
        let activeStyle = {
            color:  '#5ECE7B',
            borderBottom: '3px solid #5ECE7B'
        }
        
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        onClick={this.state.show === true ? this.useShow : false}
                        to = {link.to}
                        exact = {link.exact}
                        style={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }

    state = {
        show: false,
    }

    useShow = () => {
        this.setState((currentState) => ({show: !currentState.show}))
    }

    handleChangeCurrency = (event) => {
        this.props.updateCurrency(event.target.value)
    }

    render() {
        return (
            <div className='Header'>
                {
                    this.state.show &&
                    <span onClick={this.useShow} className='Blur'></span>
                }
                <div className='Navigation'>
                    {this.renderLinks()}
                </div>    
                <div className='logoDiv'>
                    <Link to='/woman'>
                        <img 
                            className='logo'
                            src={StoreLogo}
                            alt="logo"
                        /> 
                    </Link>
                </div>
                <div className='cart'>
                    <select onChange = {this.handleChangeCurrency}  value= {this.props.currency}>
                        <option value="usd">$ USD</option>
                        <option value="eur">€ EUR</option>
                        <option value="jpy">¥ JPY</option>
                    </select>
                    <Badge 
                        onClick={this.useShow}
                        badgeContent={this.props.count}
                        color="error" 
                        className='Badge'
                    >
                        <ShoppingCartIcon color="action"/>
                    </Badge>              
                </div>
                {
                    this.state.show &&
                    <CartOverlay 
                        decreaseCount = {this.props.decreaseCount}
                        currencySymbol = {this.props.currencySymbol}
                        currency = {this.props.currency}
                        onClick={this.useShow} 
                        className='CartOverlay'
                    />
                }
            </div>
        )
    }
}

export default Header