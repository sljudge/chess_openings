import { combineReducers } from 'redux'
import board from './board'
import castling from './castling'
import data from './data'


export default combineReducers({
    board,
    castling,
    data
})