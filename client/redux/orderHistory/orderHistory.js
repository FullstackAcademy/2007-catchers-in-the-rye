import axios from 'axios';

const FETCH_ORDERS = 'FETCH_ORDERS';

const _fetchOrders = (orders) => ({
    type: FETCH_ORDERS,
    orders
})
export const fetchOrders = () => async (dispatch) => {
    try {
        const response = (await axios.get('/api/orders/orderHistory')).data;
        dispatch(_fetchOrders(response));
    } catch(err){
        console.log('Unable to fetch previous orders.')
    }
}

export default function orderReducer(state = [], action){
    switch (action.type){
        case FETCH_ORDERS:
            return action.orders;
        default:
            return state;
    }
}