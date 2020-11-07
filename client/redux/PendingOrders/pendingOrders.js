/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import ShippedEmail from '../../components/Payment/ShippedEmail';

const PENDING_ORDERS = 'PENDING_ORDERS';
const UPDATE_SHIPPING = 'UPDATE_SHIPPING';

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

const _updateShipping = (shippedOrder) => ({
  type: UPDATE_SHIPPING,
  shippedOrder,
});

const updateShipping = (orderId) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/orders/admin/pending/${orderId}`);
    const emailText = ShippedEmail(data);
    await axios.post('/api/stripe/email', { email: data.email, emailText, subject: 'Your Grace Shockers order has been shipped!' });
    dispatch(_updateShipping(data));
  } catch (err) { console.error(err); }
};

export default function pendingOrderReducer(state = [], action) {
  switch (action.type) {
    case PENDING_ORDERS:
      return action.orders;
    case UPDATE_SHIPPING:
      return state.filter(order => order.id !== action.shippedOrder.id);
    default:
      return state;
  }
}

export { fetchPendingOrders, updateShipping };
