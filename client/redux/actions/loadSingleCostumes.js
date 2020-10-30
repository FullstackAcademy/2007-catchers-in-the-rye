import axios from 'axios';
import { LOAD_SCOSTUME } from '../actionStrings';

function loadSCostume(costume) {
  return {
    type: LOAD_SCOSTUME,
    payload: costume,
  };
}

export default function loadSCostumeDispatch(id) {
  console.log(id);
  return async (dispatch) => await axios
    .get(`/api/costumes/${id}`)
    .then((res) => {
      dispatch(loadSCostume(res.data));
    })
    .catch((e) => console.log(e));
}
