import { API_URL } from "../config";
import shortid from "shortid";

//selectors
export const getAllTables = ({tables}) => tables;
export const getTableById = ({tables}, tableId) => tables.find(table => table.id === tableId);
export const getByTableNumber = ({tables}, tableNumber, tableId) => tables.find(table => table.number === tableNumber && table.id !== tableId);

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName("UPDATE_TABLES");
const EDIT_TABLE = createActionName("EDIT_TABLE");
const ADD_TABLE = createActionName("ADD_TABLE");
const REMOVE_TABLE = createActionName("REMOVE_TABLE");

// action creators
export const addTable = payload => ({ type: ADD_TABLE, payload });
export const editTable = payload => ({ type: EDIT_TABLE, payload });
export const removeTable = payload => ({ type: REMOVE_TABLE, payload });
export const updateTables = payload => ({ type: UPDATE_TABLES, payload });
export const fetchTables = () => {
  return (dispatch) => {
    fetch(`${API_URL}/tables`)
      .then(res => res.json())
      .then(tables => dispatch(updateTables(tables)));
  }
};
export const editTableRequest = ( editedTable ) => {
  return (dispatch) => {
    const options = {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json", 
      },
      body: JSON.stringify( editedTable )
    };
    fetch(`${API_URL}/tables/${editedTable.id}`, options)
      .then(() => dispatch(editTable( editedTable )));
  }
};
export const addTableRequest = ( newTable ) => {
  return(dispatch) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify( newTable )
    };
    fetch(`${API_URL}/tables`, options)
      .then(res => res.json())
      .then(() => dispatch(addTable( newTable )));
  }
};
export const removeTableRequest = ( tableId ) => {
  return(dispatch) => {
    const options = {
      method: "DELETE"
    };
    fetch(`${API_URL}/tables/${tableId}`, options)
      .then(() => dispatch(removeTable( tableId )))
  }
};

const tablesReducer = (statePart = [], action) => {
  switch (action.type) {   
    case UPDATE_TABLES:
      return [...action.payload];
    case EDIT_TABLE:
      return statePart.map(table => table.id === action.payload.id ? { ...table, ...action.payload } : table);
    case ADD_TABLE:
      return [ ...statePart, {id: shortid(), ...action.payload}];
    case REMOVE_TABLE:
      return statePart.filter(table => table.id !== action.payload);
    default:
      return statePart;
  };
};

export default tablesReducer;