import { GET_DIETS, FILTER_DIETS, FILTER_ORIGIN,
    CLEAR,
    LOADING,
    ADD_FAVORITES,
    DELETE_FAVORITES,
    DELETE_RECIPE,GET_RECIPES,  GET_BY_NAME, GET_BY_ID, CREATE_RECIPES, ORDER_AZ, ORDER_ZA, ORDER_HEALTHSCORE_ASC, ORDER_HEALTHSCORE_DESC } from "../actions";

let initialState = {allRecipes:[], recipesCopy:[], posts:[], recipeDetail:[], diets:[], loading: true, favorites:[]};

function rootReducer(state= initialState, action){
    switch(action.type){
        case GET_RECIPES:
            return{
                ...state,
                allRecipes:action.payload,
                recipesCopy:action.payload,
            };

        case GET_DIETS:
            
            return {
                 ...state,
                diets: action.payload,
            };
        
        case GET_BY_NAME:
            return{
                ...state,
                allRecipes: action.payload,
            };

        case GET_BY_ID:
            return{
                ...state,
                recipeDetail: action.payload,
            };


        case ORDER_AZ:
            let resultAZ = state.allRecipes.sort(function (a, b) {
                   if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                   if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                   return 0;
              });
              return {
                 ...state,
                   allRecipes: resultAZ,
             };

        case ORDER_ZA:
            let resultZA = state.allRecipes.sort(function (a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                return 0;
              });
            return {
                  ...state,
                  allRecipes: resultZA,
              };

        case ORDER_HEALTHSCORE_ASC:
            let resultAsc = state.allRecipes.sort(function (a, b) {
                if (a.healt_score > b.health_score) return 1;
                if (a.health_score < b.health_score) return -1;
                return 0;
             });
            return {
                ...state,
                allRecipes: resultAsc,
            };
        case ORDER_HEALTHSCORE_DESC:
            let resultDesc = state.allRecipes.sort(function (a, b) {
                if (a.health_score > b.health_score) return -1;
                if (a.health_score < b.health_score) return 1;
                return 0;

               });
               return {
                   ...state,
                   allRecipes: resultDesc,
               };

        
        case FILTER_DIETS:

            const filter = state.recipesCopy;
            console.log(filter)
            if (action.payload === "all") {
                return {
                    ...state,
                    allRecipes: filter,
                }
            } else {
                //console.log(filter,"filter");
                const ff = filter.filter(r => r.diets?.some((d) => d?.toLowerCase() === action.payload.toLowerCase()) || r.vegetarian)
                return {
                   ...state,
                   allRecipes: ff,
                }
            };

        case FILTER_ORIGIN:
            const origin = state.recipesCopy;
            console.log(state)
            if(action.payload === 'all') {
                return {
                    ...state,
                    allRecipes: origin,
                }
            }else if(action.payload === 'api') {
                const originApi = origin.filter(r => r.id < 10)
                return {
                    ...state,
                    allRecipes: originApi
                }
            }else if(action.payload === 'created') {
                const originDb = origin.filter(r => r.id >= 10)
                return {
                    ...state,
                    allRecipes: originDb
                }
            }
            break;
        
        case CREATE_RECIPES:
            return {
                ...state,
                allRecipes: [...state.allRecipes, action.payload]
            };


        case ADD_FAVORITES:
            return {
                ...state,
                favorites: state.favorites.concat(action.payload),
            };

        case DELETE_FAVORITES:

            const fav = state.favorites.filter(e => e.id !== action.payload)

            return {
                ...state,
                favorites: fav,
            };

        case CLEAR:
            return {
                ...state,
                recipeDetail: action.payload,
            };
        case LOADING:
            return {
                ...state,
                loading: action.payload,
            };

        case DELETE_RECIPE:
            return {
                ...state, 
            }

        default:
            return state
    }

}

export default rootReducer;