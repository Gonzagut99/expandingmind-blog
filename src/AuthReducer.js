import React, { useReducer } from "react";

const initialState = {
    //role:"visitor",
    read:true,
    selfWrite:false,
    selfDelete:false,
    elseWrite:false,
    elseDelete:false,
};

//Action Types
const actionTypes = {
    admin: 'admin',
    editor: 'editor',
    customer: 'customer',
    visitor: 'visitor',
}

const reducerObject = (state, action) => {
  const actions = {
    
    [actionTypes.admin]: {
        ...state,
        userName:action.payload,
        role:actionTypes.admin,
        selfWrite:true,
        selfDelete:true,
        elseWrite:true,
        elseDelete:true,
    },
    [actionTypes.editor]: {
        ...state,
        userName:action.payload,
        role:actionTypes.editor,
        selfWrite:true,
        selfDelete:true,
        elseWrite:false,
        elseDelete:false,
    }, 
    [actionTypes.customer]: {
        ...state,
        userName:action.payload,
        role:actionTypes.customer,
        selfWrite:true,
        selfDelete:true,
        elseWrite:false,
        elseDelete:false,
    }, 
  };
  return actions[action.type] || initialState;
};

export function useAuthReducer() {

  const [state, dispatch] = useReducer(reducerObject, initialState);
	
	//Action creators
  const onAdmin = (userName) => {dispatch({type: actionTypes.admin, payload:userName});}
  const onEditor = (userName) => {dispatch({type: actionTypes.editor, payload:userName});}
  const onCustomer = (userName) => {dispatch({type: actionTypes.customer, payload:userName});}
  const onvisitor = () => {dispatch(initialState);}
    //   const onWrite = (eventValue) => {
    //       dispatch({type: actionTypes.write, payload:eventValue});
    //   }
    //create a switch expression executing the 3 above functions according to the userRole parameter
    const dispatchUser = (user)=>{
      if(!!user){
        switch (user.userRole) {
        case 'admin':
            onAdmin(user.userName);
            break;
        case 'editor':
            onEditor(user.userName);
            break;
        case 'customer':
            onCustomer(user.userName);
            break;
        default:
            break;
      }}else{
        onvisitor();
      }
    }
    return [state, dispatchUser]     //   const onDelete = (eventValue) => {
}
