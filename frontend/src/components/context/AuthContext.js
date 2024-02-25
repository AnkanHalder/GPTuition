import React,{createContext , useReducer , useEffect } from 'react'

export const AuthContext = createContext();

export const authReducer = (state,action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state,user: action.payload }
        case 'LOGOUT':
            return { ...state,user: null }
        case 'ADD_ADMIN_CLASSROOMS':
            return { ...state,admin_classrooms: action.payload}
        case 'ADD_JOINED_CLASSROOMS':
            return { ...state,joined_classrooms: action.payload}
        default:
            return state;
    }
}

export const AuthContextProvider = ({children}) => {
    const [state , dispatch] = useReducer(authReducer,{
        user: null,
    });
    console.log("AuthCOntext state: ", state);

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        if(user){
            dispatch({ type: 'LOGIN', payload: user })
        } 
    },[]);

    return (
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )


}