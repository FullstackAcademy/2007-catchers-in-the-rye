import axios from 'axios';

const LOGIN = 'LOGIN';
const CREATE_USER = 'CREATE_USER'

// eslint-disable-next-line no-underscore-dangle
const _login = (response) => ({
  type: LOGIN,
  response,
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
  console.log(data)
  dispatch(_createUser(data));
};

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case LOGIN:
      return action.response;
    default:
      return state;
  }
}

export { login, createUser };
