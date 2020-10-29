import axios from 'axios';
import { LOAD_COSTUMES } from '../actionStrings';

function loadCostumes(costumes) {
  return {
    type: LOAD_COSTUMES,
    payload: costumes,
  };
}

export default function loadCostumesDispatch() {
  return async (dispatch) => await axios
    .get('/api/costumes')
    .then((res) => {
      dispatch(loadCostumes(res.data));
    })
    .catch((e) => console.log(e));
}
