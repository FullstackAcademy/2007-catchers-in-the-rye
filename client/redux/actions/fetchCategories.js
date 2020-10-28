import { FETCH_CATEGORIES } from "../actionStrings";
import axios from "axios";

const _fetchCategories = (categories) => {
    return {
        type: FETCH_CATEGORIES,
        categories
    }
}

export const fetchCategories = () => {
    return async(dispatch) => {
      const response = await axios.get('/api/categories');
      dispatch(_fetchCategories(response.data));
    };
};
