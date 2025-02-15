import { nanoid } from "nanoid";

//selectors
export const getAllTables = ({tables}) => tables;
export const getTableById = ({tables}, tableId) => tables.find(table => table.id === tableId);

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName("UPDATE_TABLES");
const EDIT_TABLE = createActionName("EDIT_TABLE");
const ADD_TABLE = createActionName("ADD_TABLE");


// action creators
export const addTable = payload => ({ type: ADD_TABLE, payload });
export const editTable = payload => ({ type: EDIT_TABLE, payload });
export const updateTables = payload => ({ type: UPDATE_TABLES, payload });
export const fetchTables = () => {
  return (dispatch) => {
    fetch("http://localhost:3131/api/tables")
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
    fetch(`http://localhost:3131/api/tables/${editedTable.id}`, options)
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
    fetch("http://localhost:3131/api/tables", options)
      .then(res => res.json())
      .then(() => dispatch(addTable( newTable )));
  }
};

const tablesReducer = (statePart = [], action) => {
  switch (action.type) {   
    case UPDATE_TABLES:
      return [...action.payload];
    case EDIT_TABLE:
      return statePart.map(table => table.id === action.payload.id ? { ...table, ...action.payload } : table);
    case ADD_TABLE:
      return [ ...statePart, {id: nanoid(), ...action.payload}];
    default:
      return statePart;
  };
};
export default tablesReducer;