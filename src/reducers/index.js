import { addUser, getUser, ADD_USER } from '../actions'
import { combineReducers } from 'redux'

function actors(state = ['mj'], action){
  switch(action.type){
    case ADD_USER:
      return [...state, action.payload]
    default:
      return state
  }
}

function articles(state = {}, action){
  switch(action.type){
    case 'ADD_ARTICLE':
      const newState = {
        ...state,
      }
      newState[action.payload.id] = action.payload.value
      return newState
    default:
      return state
  }
}

const app = combineReducers({
  actors,
  articles
})

export default app

