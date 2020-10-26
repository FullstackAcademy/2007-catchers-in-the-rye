import axios from 'axios'

const FETCH_CART = 'FETCH_CART'

const _fetchCart = (cart) => {
    return {
        type: FETCH_CART,
        cart
    }
}

const fetchCart = () => {
    return async(dispatch) => {
        const { data } = await axios.get(`/api/orders/userCart`)
        console.log(data)
        dispatch(_fetchCart(data))
    }
}

export default function cartReducer(state = [], action) {
    switch(action.type) {
        case FETCH_CART:
            return action.cart
    default:
        return state
    }
}

export { fetchCart }
