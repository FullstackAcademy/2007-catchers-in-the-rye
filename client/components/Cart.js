import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchCart } from '../redux/cart'

class Cart extends Component{
    constructor(){
        super()
    }
    componentDidMount(){
        this.props.fetchCart()
    }
    render(){
        // console.log('state',this.props.cart[0])
        const cart = this.props.cart
        console.log(cart)
        return(
            <>
                <h1>Hello</h1>
                <h1>{cart.user.firstName}'s Cart</h1>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCart: () => dispatch(fetchCart())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)