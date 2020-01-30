import { combineReducers } from 'redux'
import { MOVE_PIECE } from '../actions/movePiece'
import { TOGGLE_PANEL, TOGGLE_AUTO_HOVER, TOGGLE_PLAYER, RESET } from '../actions/updateData'
import undoable, { excludeAction } from 'redux-undo'
import board from './board'
import castling from './castling'
import data from './data'


export default combineReducers({
    board: undoable(board, {
        filter: function filterActions(action, currentState, previousHistory) {
            return action.type === MOVE_PIECE;
        }
    }),
    castling: undoable(castling),
    data: undoable(data, {
        filter: excludeAction(TOGGLE_PANEL, TOGGLE_AUTO_HOVER, TOGGLE_PLAYER.RESET)
    }),

})