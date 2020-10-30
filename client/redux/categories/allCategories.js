import axios from 'axios'

const FETCH_CATEGORIES = 'FETCH_CATEGORIES'

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
    }
}

export default function allCategoriesReducer (state = [], action) {
    if (action.type === FETCH_CATEGORIES) {
        state = action.categories
    }
    return state
}