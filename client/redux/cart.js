import axios from 'axios';

const FETCH_CART = 'FETCH_CART';

const _fetchCart = (cart) => ({
  type: FETCH_CART,
  cart,
});

const fetchCart = () => async (dispatch) => {
  const response = (await axios.get('/api/orders/userCart')).data;
  response.costumes = response.costumes.map((costume) => ({
    costumeName: costume.costumeName, id: costume.id, imageUrl: costume.imageUrl, price: costume.price, quantity: costume.lineitem.quantity,
  }));
  dispatch(_fetchCart(response));
};

export default function cartReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_CART:
      return action.cart;
    default:
      return state;
  }
}

export { fetchCart };
