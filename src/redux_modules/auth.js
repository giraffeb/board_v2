export const SET_LOGIN = 'auth/SET_LOGIN';
export const SET_LOGOUT = 'auth/SET_LOGOUT';

export const setLogin = ()=>({type: SET_LOGIN});
export const setLogout = ()=>({type: SET_LOGOUT});

const initialState = false;

const author = (state = initialState, action) => {
    
    switch(action.type){
        case SET_LOGIN:
            state = true;
            return state;
        case SET_LOGOUT:
            state = false;
            return state;
        default:
            return state
    }

}

export default author;