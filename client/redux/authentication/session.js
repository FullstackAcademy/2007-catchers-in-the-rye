import axios from 'axios'

const CHECK_COOKIES_SET_SESSION = 'CHECK_COOKIES_SET_SESSION '

const _checkCookiesSetSession = (session) => {
    return {
        type: CHECK_COOKIES_SET_SESSION,
        session
    }
}

export const checkCookiesSetSession = () => {
    return async(dispatch) => {
        try {
            const {data} = await axios.post('/api/auth/mount');
            dispatch(_checkCookiesSetSession(data));
        } catch (err) {
            console.log (err)
        }
    }
}

export default function sessionReducer (state = {}, action) {
    if (action.type === CHECK_COOKIES_SET_SESSION ) {
        state = action.session
    }
    return state
}
