import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import auth from './auth'
import journals from './journal'
import images from './image'
import publicJournals from './publicJournal'

const reducer = combineReducers({ auth, journals, images, publicJournals })
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './auth'
export * from './journal'
export * from './image'
export * from './publicJournal'