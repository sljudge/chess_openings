import {
    MOVE_PIECE,
    CASTLE_KING_SIDE,
    CASTLE_QUEEN_SIDE,
} from '../actions/movePiece'
import { RESET } from '../actions/updateData'


const initialState = {
    //null / true / false
    white: {
        kingSide: null,
        queenSide: null
    },
    black: {
        kingSide: null,
        queenSide: null
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // -------------------------------------------------------------------------------
        case MOVE_PIECE:
            //KING 
            if (action.kingSide !== null && action.queenSide !== null) {
                return {
                    ...state,
                    [action.toMove]: Object.assign({}, state[action.toMove], {
                        kingSide: action.kingSide,
                        queenSide: action.queenSide
                    })
                }
            }
            //KING SIDE ROOK
            else if (action.kingSide !== null) {
                return {
                    ...state,
                    [action.toMove]: Object.assign({}, state[action.toMove], {
                        kingSide: action.kingSide
                    })
                }
            }
            // QUEEN SIDE ROOK
            else if (action.queenSide !== null) {
                return {
                    ...state,
                    [action.toMove]: Object.assign({}, state[action.toMove], {
                        queenSide: action.queenSide
                    })
                }
            } else {
                return {
                    ...state
                }
            }
        // -------------------------------------------------------------------------------
        case CASTLE_KING_SIDE:
            return {
                ...state,
                [action.toMove]: Object.assign({}, state[action.toMove], {
                    kingSide: true,
                    queenSide: false
                })
            }
        // -------------------------------------------------------------------------------
        case CASTLE_QUEEN_SIDE:
            return {
                ...state,
                [action.toMove]: Object.assign({}, state[action.toMove], {
                    kingSide: false,
                    queenSide: true
                })
            }
        // -------------------------------------------------------------------------------
        // -------------------------------------------------------------------------------
        case RESET:
            return {
                ...state,
                ...initialState
            }
        // -------------------------------------------------------------------------------
        default:
            return state
    }
}

export default reducer
