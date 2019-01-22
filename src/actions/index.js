
export const GET_USER = 'GET_USER'
export const ADD_USER = 'ADD_USER'

export function getUser(user) {
  return {
    type: GET_USER,
    payload: user,
  }
}

export function addUser(user){
  return {
    type: ADD_USER,
    payload: user,
  }
}
