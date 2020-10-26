import axios from 'axios'
import categoryReducer from './categories'

const FETCH_CART = 'FETCH_CART'

const _fetchCart = (cart) => {
    return {
        type: FETCH_CART,
        cart
    }
}

const fetchCart = (userId) => {
    return async(dispatch) => {
        const data = axios.get(`/api/${userId}/cart`)
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
