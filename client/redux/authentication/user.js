import axios from 'axios';

const LOGIN = 'LOGIN';

// eslint-disable-next-line no-underscore-dangle
const _login = (response) => ({
  type: LOGIN,
  response,
});

const login = (loginInfo) => async (dispatch) => {
  const { data } = await (axios.post('/api/auth/login', loginInfo));
  dispatch(_login(data));
};

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case LOGIN:
      return action.response;
    default:
      return state;
  }
}

export { login };
