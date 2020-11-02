/* eslint-disable no-underscore-dangle */
import axios from 'axios';

const PENDING_ORDERS = 'PENDING_ORDERS';

const _fetchPendingOrders = (orders) => ({
  type: PENDING_ORDERS,
  orders,
});

const fetchPendingOrders = () => async(dispatch) => {
  const { data } = await axios.get('/api/orders/admin/pending');
  console.log(data);
  dispatch(_fetchPendingOrders(data));
};

// export default const pendingOrderReducer = (state = [], action) => {
//     switch (action.type){
//         case PENDING_ORDERS
//     } 
// }
