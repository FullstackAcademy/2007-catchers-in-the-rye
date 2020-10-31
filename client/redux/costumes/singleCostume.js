import axios from "axios"

const LOAD_SCOSTUME = "LOAD_SCOSTUME"

function loadSCostume(costume) {
    return {
      type: LOAD_SCOSTUME,
      payload: costume,
    }
  }
  
export function loadSCostumeDispatch(id) {
    return async (dispatch) => {
      return await axios
        .get(`/api/costumes/${id}`)
        .then((res) => {
          dispatch(loadSCostume(res.data));
        })
        .catch((e) => console.log(e));
    }
}

export default function singleCostumeReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_SCOSTUME:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}