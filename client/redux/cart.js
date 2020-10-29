import axios from 'axios'

const FETCH_CART = 'FETCH_CART'
const ADD_QUANTITY = 'ADD_QUANTITY'
const MINUS_QUANTITY = 'MINUS_QUANTITY'

const _fetchCart = (cart) => {
    return {
        type: FETCH_CART,
        cart
    }
}

const fetchCart = () => {
    return async(dispatch) => {
        let response = (await axios.get('/api/orders/userCart')).data
        response.costumes = response.costumes.map(costume => {
            return { costumeName: costume.costumeName, id: costume.id, imageUrl: costume.imageUrl, price: costume.price, quantity: costume.lineitem.quantity}
        })
        dispatch(_fetchCart(response))
    }
}

const addQuantity = (costume) => {
    return{
        type: ADD_QUANTITY,
        costume
    }
}

const updateCartQuantity = (costumeId, sign) => {
    return async(dispatch) => {
        const { data } = await (axios.put('/api/orders/userCart', { costumeId, sign }))
        console.log(data)
        if(sign === '+') dispatch(addQuantity(data))
    }
}

export default function cartReducer(state = {}, action) {
    switch(action.type) {
        case FETCH_CART:
            return action.cart
        case ADD_QUANTITY:
            return {...state.cart, costumes: [action.costume, ...state.costumes]}
    default:
        return state
    }
}

export { fetchCart, updateCartQuantity }
