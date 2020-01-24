import { combineReducers } from 'redux'
import board from './board'
import check from './check'
import castle from './castle'


export default combineReducers({
    board,
    check,
    castle
})