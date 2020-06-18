import { SET_VISIBILITY_FILTER, VisibilityFilters, TOGGLE_TODO, ADD_TODO } from './actions';
import { combineReducers } from 'redux';

const { SHOW_ALL } = VisibilityFilters;

const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: []
}

/*
* Using 'Reducer Composition', break down the reducers into smaller functions to handle separate slices of a state
* In this case, we have todos to handle the todo list array actions and visibilityFilter to handle view delegated by todoApp
*/

function todos(state = [], action) {
  switch (action.type) {

    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      })

    default:
      /*
      * Always return previous state for any unknown action
      */
      return state
  }
}

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {

    case SET_VISIBILITY_FILTER:
      return action.filter
    
    default:
      return state
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos
})