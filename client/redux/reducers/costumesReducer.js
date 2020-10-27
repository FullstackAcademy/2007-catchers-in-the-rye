import { LOAD_COSTUMES, CREATE_COSTUME } from "../actionStrings";

const COSTUMES = [];

export default function costumesReducer(state = COSTUMES, action) {
  switch (action.type) {
    case LOAD_COSTUMES:
      return [...state, ...action.payload];
    case CREATE_COSTUME:
      return [...state, action.costume]
    default:
      return state;
  }
}
