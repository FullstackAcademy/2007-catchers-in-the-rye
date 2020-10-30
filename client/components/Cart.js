import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchCart, updateCartQuantity, removeItem } from '../redux/cart'
// buttons that still need functionality: Checkout / keep shopping 
class Cart extends Component{
    componentDidMount(){
        this.props.fetchCart()
    }
    calcTotal(costumes){
        console.log(costumes)
        let cartTotal = 0
        for(let costume of costumes){
            cartTotal += costume.price * costume.lineitem.quantity
        }
        return cartTotal.toFixed(2)
    }
    render(){
        const { cart } = this.props
        const costumes = cart.costumes ? cart.costumes : []
        const cartTotal = costumes.length ? this.calcTotal(costumes) : 0
        return(
            <div>
                <h1>Your cart</h1>
                {costumes.map(costume => {
                    return( 
                        <div key={costume.id}>
                            <p><strong>Costume:</strong>{costume.costumeName}</p>
                            <p><strong>Price per unit:</strong>${costume.price.toFixed(2)}</p>
                            <p><strong>Quantity:</strong>{costume.lineitem.quantity}</p>
                            <button onClick={() => this.props.updateCartQuantity(costume.id, '+')}>+</button>
                            <button onClick={() => this.props.updateCartQuantity(costume.id, '-')}>-</button>
                            <p><strong>Sub Total:</strong>${ (costume.price * costume.lineitem.quantity).toFixed(2) }</p>
                            <button onClick={() => this.props.removeItem(costume.id)}>Remove from Cart</button>
                            <img src={costume.imageUrl}></img>
                        </div>
                    )
                })}
                <h2><strong>Cart Total: </strong>${cartTotal}</h2>
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
        fetchCart: () => dispatch(fetchCart()),
        updateCartQuantity: (costumeId, sign) => {
            dispatch(updateCartQuantity(costumeId, sign))
        },
        removeItem: (costumeId) => dispatch(removeItem(costumeId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)