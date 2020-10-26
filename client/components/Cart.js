import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchCart } from '../redux/cart'
//all buttons need functionality: Checkout / keep shopping, remove from cart, + / - buttons 
class Cart extends Component{
    constructor(){
        super()
    }
    componentDidMount(){
        this.props.fetchCart()
    }
    calcTotal(costumes){
        let cartTotal = 0
        for(let costume of costumes){
            cartTotal += costume.price
        }
        return cartTotal
    }
    render(){
        const cart = this.props.cart
        console.log(cart)
        const costumes = cart.costumes ? cart.costumes : []
        const cartTotal = costumes.length ? this.calcTotal(costumes) : 0
        return(
            <div>
                <h1>Your cart</h1>
                {costumes.map(costume => {
                    return(
                        <div key={costume.id}>
                            <p><strong>Costume:</strong>{costume.costumeName}</p>
                            <p><strong>Price per unit:</strong>{costume.price}</p>
                            <p><strong>Quantity:</strong>{costume.quantity}</p>
                            <button>+</button>
                            <button>-</button>
                            <p><strong>Sub Total:</strong>{ costume.price * costume.quantity }</p>
                            <button>Remove from Cart</button>
                            <img src={costume.imageUrl}></img>
                        </div>
                    )
                })}
                <h2><strong>Cart Total: </strong>{cartTotal}</h2>
                <button>Check Out Now</button>
                <button>Keep Shopping</button>
            </div>
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