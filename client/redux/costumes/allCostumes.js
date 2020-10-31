import axios from "axios"

const LOAD_COSTUMES = "LOAD_COSTUMES"
const CREATE_COSTUME = 'CREATE_COSTUME'

function loadCostumes(costumes) {
    return {
      type: LOAD_COSTUMES,
      payload: costumes,
    }
  }
  
export function loadCostumesDispatch() {
    return async (dispatch) => {
      await axios
        .get("/api/costumes")
        .then((res) => {
          dispatch(loadCostumes(res.data));
        })
        .catch((e) => console.log(e));
    }
}

const _createCostume = (costume) => {
    return {
      type: CREATE_COSTUME,
      costume
    }
};

export const createCostume = (costume) => {
    return async(dispatch) => {
      const newCostume = await axios.post('/api/costumes', costume);
      dispatch(_createCostume(newCostume.data));
    };
};

export default function allCostumesReducer(state = [], action) {
  switch (action.type) {
    case LOAD_COSTUMES:
      return [...state, ...action.payload];
    case CREATE_COSTUME:
      return [...state, action.costume]
    default:
      return state;
  }
}