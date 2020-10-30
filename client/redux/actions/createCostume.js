import axios from 'axios';
import { CREATE_COSTUME } from '../actionStrings';

const _createCostume = (costume) => ({
  type: CREATE_COSTUME,
  costume,
});

export const createCostume = (costume) => async (dispatch) => {
  const newCostume = await axios.post('/api/costumes', costume);
  dispatch(_createCostume(newCostume.data));
};
