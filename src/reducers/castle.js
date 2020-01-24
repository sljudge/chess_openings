import {
    MOVE_PIECE,
    CASTLE_KING_SIDE,
    CASTLE_QUEEN_SIDE,
} from '../actions/movePiece'

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
    let newState
    switch (action.type) {
        // -------------------------------------------------------------------------------
        case MOVE_PIECE:
            //KING 
            if (action.kingSide !== null && action.queenSide !== null) {
                newState = Object.assign({}, state[action.toMove], {
                    kingSide: action.kingSide,
                    queenSide: action.queenSide
                })
                return {
                    ...state,
                    [action.toMove]: newState
                }
            }
            //KING SIDE ROOK
            else if (action.kingSide !== null) {
                newState = Object.assign({}, state[action.toMove], {
                    kingSide: action.kingSide
                })
                return {
                    ...state,
                    [action.toMove]: newState
                }
            }
            // QUEEN SIDE ROOK
            else if (action.queenSide !== null) {
                newState = Object.assign({}, state[action.toMove], {
                    queenSide: action.queenSide
                })
                return {
                    ...state,
                    [action.toMove]: newState
                }
            } else {
                return {
                    ...state
                }
            }
        // -------------------------------------------------------------------------------
        case CASTLE_KING_SIDE:
            newState = Object.assign({}, state[action.toMove], {
                kingSide: true,
                queenSide: false
            })
            return {
                ...state,
                [action.toMove]: newState
            }
        // -------------------------------------------------------------------------------
        case CASTLE_QUEEN_SIDE:
            newState = Object.assign({}, state[action.toMove], {
                kingSide: false,
                queenSide: true
            })
            return {
                ...state,
                [action.toMove]: newState
            }
        // -------------------------------------------------------------------------------
        default:
            return state
    }

}

export default reducer
