import axios from 'axios';

const LOGIN = 'LOGIN';
const CREATE_USER = 'CREATE_USER';

// eslint-disable-next-line no-underscore-dangle
const _login = (loginUser) => ({
  type: LOGIN,
  loginUser,
});

const login = (loginInfo) => async (dispatch) => {
  const { data } = await (axios.post('/api/auth/login', loginInfo));
  dispatch(_login(data));
};

// eslint-disable-next-line no-underscore-dangle
const _createUser = (newUser) => ({
  type: CREATE_USER,
  newUser,
});

const createUser = (newUserInfo) => async (dispatch) => {
  const { data } = await (axios.post('/api/auth/createUser', newUserInfo));
  dispatch(_createUser(data));
};

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case LOGIN:
      return action.loginUser;
    case CREATE_USER:
      return action.newUser;
    default:
      return state;
  }
}

export { login, createUser };
