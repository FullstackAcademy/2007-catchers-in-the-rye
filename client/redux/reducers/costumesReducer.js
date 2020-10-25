import { LOAD_COSTUMES } from "../actionStrings";

const COSTUMES = [];

export default function costumesReducer(state = COSTUMES, action) {
  switch (action.type) {
    case LOAD_COSTUMES:
      return [...state, ...action.payload];
    default:
      return state;
  }
}
