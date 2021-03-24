import axios from 'axios';

const FETCH_CART = 'FETCH_CART';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
const REMOVE_ITEM = 'REMOVE_ITEM';
const ADD_COSTUME_TO_CART = 'ADD_COSTUME_TO_CART';

const _fetchCart = (cart) => ({
  type: FETCH_CART,
  cart,
});

const fetchCart = () => async (dispatch) => {
  const response = (await axios.get('/api/orders/userCart')).data;
  dispatch(_fetchCart(response));
};

const _updateCartQuantity = (lineitem, costumeId) => ({
  type: UPDATE_QUANTITY,
  lineitem,
  costumeId,
});

const updateCartQuantity = (costumeId, sign) => async (dispatch) => {
  const { data } = await (axios.put(`/api/orders/userCart/${costumeId}`, { sign }));
  dispatch(_updateCartQuantity(data, costumeId));
};

const _removeItem = (costumeId) => ({
  type: REMOVE_ITEM,
  costumeId,
});

const removeItem = (costumeId) => async (dispatch) => {
  await axios.delete(`/api/orders/userCart/${costumeId}`);
  dispatch(_removeItem(costumeId));
};

const addCostumeToCart = (costumeId, quantity) => async (dispatch) => {
  const { data } = await axios.post(`/api/orders/userCart/${costumeId}`, { quantity });
};

export default function cartReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_CART:
      return action.cart;
    case UPDATE_QUANTITY:
      const costumes = state.costumes.filter((costume) => {
        if (costume.id === action.costumeId) costume.lineitem = action.lineitem;
        if (costume.lineitem.quantity) return costume; // if quantity is 0 as result of '-', costume should disappear from page
      });
      return { ...state.cart, costumes };
    case REMOVE_ITEM:
      const costumesAfterRemove = state.costumes.filter((costume) => costume.id !== action.costumeId);
      return { ...state.cart, costumes: costumesAfterRemove };
    default:
      return state;
  }
}

export {
  fetchCart, updateCartQuantity, removeItem, addCostumeToCart,
};
