import { LOAD_COSTUMES } from "../actionStrings";
import axios from "axios";


function loadCostumes(costumes) {
  return {
    type: LOAD_COSTUMES,
    payload: costumes,
  };
}

export default function loadCostumesDispatch() {
  return async (dispatch) => {
    return await axios
      .get("/api/costumes")
      .then((res) => {
        dispatch(loadCostumes(res.data));
      })
      .catch((e) => console.log(e));
  };
};
