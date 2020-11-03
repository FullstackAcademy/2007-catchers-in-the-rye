import axios from 'axios';

const LOGIN = 'LOGIN';
const CREATE_USER = 'CREATE_USER';

// eslint-disable-next-line no-underscore-dangle
const _login = (loginUser) => ({
  type: LOGIN,
  loginUser,
});

const login = (loginInfo) => async (dispatch) => {
  try {
    const { data } = await (axios.post('/api/auth/login', loginInfo));
    console.log(data)
    dispatch(_login(data));
  } catch (err) { console.error(err); }
};

// eslint-disable-next-line no-underscore-dangle
const _createUser = (newUser) => ({
  type: CREATE_USER,
  newUser,
});

const createUser = (newUserInfo) => async (dispatch) => {
  try {
    const { data } = await (axios.post('/api/auth/createUser', newUserInfo));
    dispatch(_createUser(data));
  } catch (err) { console.error(err); }
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
