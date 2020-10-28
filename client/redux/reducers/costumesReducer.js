import { LOAD_COSTUMES, LOAD_SCOSTUME, CREATE_COSTUME  } from "../actionStrings";

const COSTUMES = [];

export function costumesReducer(state = COSTUMES, action) {
  switch (action.type) {
    case LOAD_COSTUMES:
      return [...state, ...action.payload];
    case CREATE_COSTUME:
      return [...state, action.costume]
    default:
      return state;
  }
}

const SCOSTUME = {}
export function sCostumeReducer(state = SCOSTUME, action) {
  switch (action.type) {
    case LOAD_SCOSTUME:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}