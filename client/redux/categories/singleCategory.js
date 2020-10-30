import axios from 'axios'

const SELECT_CATEGORY = 'SELECT_CATEGORY'

const _selectCategory = (category) => {
    return {
        type: SELECT_CATEGORY,
        category
    }
}

export const selectCategory = (id) => {
    return async(dispatch) => {
        try{
            const {data} = await axios.get(`/api/categories/${id}`);
            dispatch(_selectCategory(data));
        } catch(err){
            console.log(err)
        }
    }
}

export default function singleCategoryReducer (state = {}, action) {
    if (action.type === SELECT_CATEGORY) {
        state = action.category
    }
    return state
}
