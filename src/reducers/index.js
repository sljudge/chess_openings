import { combineReducers } from 'redux'
import board from './board'
import castling from './castling'


export default combineReducers({
    board,
    castling
})