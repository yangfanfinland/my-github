import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const initialState = {
  count: 0,
}
const ADD = 'ADD'
function counterReducer(state = initialState, action) {
  switch (action.type) {
    case ADD:
      return { count: state.count + action.num }
    default:
      return state
  }
}

export function add(num) {
    return {
        type: ADD,
        num
    }
}

const allReducers = combineReducers({
    counter: counterReducer
})

export default function initializeStore(state) {
    const store = createStore(
        allReducers, 
        Object.assign({}, {
            counter: initialState
        }, state),  
        composeWithDevTools()
    )
    return store
}
