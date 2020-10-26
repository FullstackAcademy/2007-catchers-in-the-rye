import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchCart } from '../redux/cart'
//Checkout / keep shopping buttons need functionality
class Cart extends Component{
    constructor(){
        super()
    }
    componentDidMount(){
        this.props.fetchCart()
    }
    calcQuantityAndTotal(costumes){
        let cartQuantities = {}
        let cartTotal = 0
        for(let costume of costumes){
            if(cartQuantities[costume.costumeName]) cartQuantities[costume.costumeName]++
            else cartQuantities[costume.costumeName] = 1
            cartTotal += costume.price
        }
        return [cartQuantities, cartTotal]
    }
    render(){
        const cart = this.props.cart
        const costumes = cart.costumes ? cart.costumes : []
        const cartQuantities = costumes.length? this.calcQuantityAndTotal(costumes)[0] : {}
        const cartTotal = costumes.length ? this.calcQuantityAndTotal(costumes)[1] : 0
        return(
            <div>
                <h1>Your cart</h1>
                {costumes.map(costume => {
                    return(
                        <div key={costume.id}>
                            <p><strong>Costume:</strong>{costume.costumeName}</p>
                            <p><strong>Price:</strong>{costume.price}</p>
                            <p><strong>Quantity:</strong>{cartQuantities[costume.costumeName]}</p>
                            <img src={costume.imageUrl}></img>
                        </div>
                    )
                })}
                <h2>Cart Total: {cartTotal}</h2>
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