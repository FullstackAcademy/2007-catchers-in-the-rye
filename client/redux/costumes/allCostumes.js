import axios from 'axios';

const LOAD_COSTUMES = 'LOAD_COSTUMES';
const CREATE_COSTUME = 'CREATE_COSTUME';
const UPDATE_COSTUME = 'UPDATE_COSTUME';

function loadCostumes(costumes) {
  return {
    type: LOAD_COSTUMES,
    payload: costumes,
  };
}

export function loadCostumesDispatch() {
  return async (dispatch) => {
    await axios
      .get('/api/costumes')
      .then((res) => {
        dispatch(loadCostumes(res.data));
      })
      .catch((e) => console.log(e));
  };
}

const _createCostume = (costume) => ({
  type: CREATE_COSTUME,
  costume,
});

export const createCostume = (costume) => async (dispatch) => {
  const newCostume = await axios.post('/api/costumes', costume);
  dispatch(_createCostume(newCostume.data));
};

function updateCostume(costume) {
  return {
    type: UPDATE_COSTUME,
    payload: costume,
  };
}

export function updateCostumeDispatch(costumeId, changeObject) {
  console.log('update costume thunk being called');
  return async (dispatch) => await axios
    .put(`/api/costumes/${costumeId}`, changeObject)
    .then((res) => {
      console.log('axios update response: ', res.data[1][0]);
      dispatch(updateCostume(res.data[1][0]));
    })
    .catch((e) => console.log(e));
}

export default function allCostumesReducer(state = [], action) {
  switch (action.type) {
    case LOAD_COSTUMES:
      return [...action.payload];
    case CREATE_COSTUME:
      return [...state, action.costume];
    default:
      return state;
  }
}
