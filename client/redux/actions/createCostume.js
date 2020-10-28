import { CREATE_COSTUME } from "../actionStrings";
import axios from "axios";

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