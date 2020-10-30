import axios from 'axios'

const CREATE_GUEST_SESSION = 'CREATE_GUEST_SESSION'
const REFRESH_SESSION = 'REFRESH_SESSION'

const _createGuestSession = (session) => {
    return {
        type: CREATE_GUEST_SESSION,
        session
    }
}

const _refreshSession = (session) => {
    return {
        type: REFRESH_SESSION,
        session
    }
}

export const createGuestSession = () => {
    return async(dispatch) => {
        try{
            const {data} = await axios.post('/api/auth/guest');
            dispatch(_createGuestSession(data));
        } catch(err){
            console.log(err)
        }
    }
}

export const refreshSession = (sessionId) => {
    return async(dispatch) => {
        try{
            const {data} = await axios.put(`/api/auth/${sessionId}`);
            dispatch(_refreshSession(data));
        } catch(err){
            console.log(err)
        }
    }
}

export default function sessionReducer (state = {}, action) {
    if (action.type === CREATE_GUEST_SESSION) {
        state = action.session
    }
    return state
}
