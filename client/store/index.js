import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import auth from './auth'
import journals from './journal'
import images from './image'
import users from './users'
import messages from './message'

const reducer = combineReducers({ auth, journals, images, users, messages })
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './auth'
export * from './journal'
export * from './image'
export * from './users'
export * from './message'