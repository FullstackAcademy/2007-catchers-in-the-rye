import axios from 'axios';

const LOGIN = 'LOGIN';

// eslint-disable-next-line no-underscore-dangle
const _login = (userAndMessage) => {
    const { loginUser, message } = userAndMessage;
    return {
        type: LOGIN,
        loginUser,
        message,
    };
};

const login = (loginInfo) => {
    return async(dispatch) => {
        const { data } = await (axios.post('/api/auth/login', { loginInfo }))
        console.log(data)
        dispatch(_login(data))
    }
}

export default function userReducer (state = {}, action) {
    // switch (action.type){
    //     case LOGIN:
    //         return { action.loginUser, action.message }
        // default:
            return state;
    // }

}

export { login };
