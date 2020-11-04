/* eslint-disable no-underscore-dangle */
import axios from 'axios';

const PENDING_ORDERS = 'PENDING_ORDERS';
// const UPDATE_SHIPPING = 'UPDATE_SHIPPING';

const _fetchPendingOrders = (orders) => ({
  type: PENDING_ORDERS,
  orders,
});

const fetchPendingOrders = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/orders/admin/pending');
    dispatch(_fetchPendingOrders(data));
  } catch (err) {
    console.error(err);
  }
};

// future functionality
// const _updateShipping = () => ({
//   type: UPDATE_SHIPPING,
// });

// const updateShipping = (orderId) => async (dispatch) => {
//   const { data }
// }

export default function pendingOrderReducer(state = [], action) {
  switch (action.type) {
    case PENDING_ORDERS:
      return action.orders;
    default:
      return state;
  }
}

export { fetchPendingOrders };
