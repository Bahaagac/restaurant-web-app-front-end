import * as ActionTypes from '../ActionTypes';

export const favorites = (state = {
        isLoading: true,
        ereMess:null,
        favorites:null
    }, action) => {
        switch(action.type) {
            case ActionTypes.ADD_FAVORITES:
                return {...state, isLoading: false, ermMess: null, favorites  : action.payload};
            case ActionTypes.FAVORITES_LOADING:
                return {...state, isLoading: true, erMess: null, favorites: null};
            case  ActionTypes.FAVORITES_FAILED:
                return {...state, isLoading: false, erMess : action.payload, favorites: null}
            
            default:
                return state;
        }
    }