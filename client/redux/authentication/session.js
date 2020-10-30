import axios from 'axios'

const CREATE_GUEST_SESSION = 'CREATE_GUEST_SESSION'

const _createGuestSession = (session) => {
    return {
        type: CREATE_GUEST_SESSION,
        session
    }
}

export const createGuestSession = () => {
    return async(dispatch) => {
        try{
            const {data} = await axios.post('/api/auth/guest');
            console.log('step 3 action is dispatched is working:', data)
            dispatch(_createGuestSession(data));
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
