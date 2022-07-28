//action creators
import { ADD_USER, UPDATE_USER, DELETE_USER, SET_SELECTED_USER } from "../types/user";


const addUserAction = (values) =>{
    return {
        type: ADD_USER,
        payload: values,
    }
}
;
const updateUserAction = (values) =>{
    return {
        type: UPDATE_USER,
        payload: values,
    }
}

const deleteUserAction = (values) =>{
    return {
        type: DELETE_USER,
        payload: values,
    }
}

const SetUserAction = (values) =>{
    return {
        type: SET_SELECTED_USER,
        payload: values,
    }
}

export {addUserAction, updateUserAction, deleteUserAction, SetUserAction } ;