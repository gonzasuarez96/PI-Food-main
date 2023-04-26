import axios from 'axios';

export const GET_RECIPES = 'GET_RECIPES';
export const GET_DIETS = "GET_DIETS";
export const GET_BY_NAME = 'GET_BY_NAME';
export const GET_BY_ID = 'GET_BY_ID';
export const CREATE_RECIPES = 'CREATE_RECIPES';
export const ORDER_AZ = "ORDER_AZ";
export const ORDER_ZA = "ORDER_ZA"
export const ORDER_HEALTHSCORE_ASC = "ORDER_HEALTHSCORE_ASC";
export const ORDER_HEALTHSCORE_DESC = "ORDER_HEALTHSCORE_DESC";
export const FILTER_DIETS = "FILTER_DIETS";
export const FILTER_ORIGIN = 'FILTER_ORIGIN';
export const CLEAR = "CLEAR";
export const LOADING = "LOADING";
export const ADD_FAVORITES = "ADD_FAVORITES";
export const DELETE_FAVORITES = "DELETE_FAVORITES";
export const DELETE_RECIPE= "DELETE_RECIPE"
//export const FILTER_CREATED= "FILTER_CREATED


export function getRecipes() {
    return async function (dispatch) {
        const response = await axios('http://localhost:3001/recipes')
        return dispatch({
            type: 'GET_RECIPES',
            payload: response.data
        }) 
    }
}

export function getDiets() {
    return async function(dispatch){
        const response = await axios("http://localhost:3001/diets")
        return dispatch({
            type: 'GET_DIETS',
            payload: response.data
        })
    };
}

export function getByName(name) {
    return async function(dispatch){
        const response = await axios(`http://localhost:3001/recipes/?name=${name}`);
        return dispatch({
            type: 'GET_BY_NAME',
            payload: response.data,
        })
    }
}

export function getById(id) {
    return async function(dispatch){
        const response = await axios(`http://localhost:3001/recipes/${id}`);
        return dispatch({
            type: 'GET_BY_ID',
            payload: response.data,     
        })
    }
}

export function createRecipe(value) {
    console.log(value)
    return async (dispatch) => {
        await axios
            .post("/recipes", value)
            .then((response) => {
                dispatch({
                    type: CREATE_RECIPES,
                    payload: response.data  
                });
            })
            .catch((error) => {
                throw new Error(error);
            });
    };

}

export function filterOrigin(payload) {
    return {
        type: FILTER_ORIGIN,
        payload
    }
}


export function addFavorites(payload) {
    return {
        type: ADD_FAVORITES,
        payload
    };
}

export function deleteFav(id) {       //este filtra
    return {
        type: DELETE_FAVORITES,
        payload: id,
    };

}

export function orderByAZ() {
    return {
        type: ORDER_AZ
    };
}

export function orderByZA() {
    return {
        type: ORDER_ZA
    };
}

export function orderHealthScoreAsc() {
    return {
        type: ORDER_HEALTHSCORE_ASC
    };
}

export function orderHealthScoreDesc() {
    return {
        type: ORDER_HEALTHSCORE_DESC
    };
}

export function filterDiets(payload) {
    //console.log(payload,"payload");
    return {
        type: FILTER_DIETS,
        payload
    };
}

export function clearDetail(payload) {
    return {
        type: CLEAR,
        payload
    };
}
export function loadingAction(payload) {
    return (dispatch) => {
        dispatch({
            type: LOADING,
            payload
        })
    }
}

export function deleteRecipeById(id) {
    return async function (dispatch) {
        const recipeID = await axios.delete(`/recipes/${id}`);
        return dispatch({
            type: DELETE_RECIPE,
            payload:recipeID.data,
        });
    };
}