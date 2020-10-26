import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchCart } from '../../redux/cart'

class Cart extends Component{
    constructor(){
        super()
    }
    componentDidMount(){
        this.props.fetchCart()
    }
    render(){
        console.log(this.state.cart)
        return(

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
        fetchCart: (userId) => dispatch(fetchCart(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)