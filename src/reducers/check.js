import {
    MOVE_PIECE,
    CASTLE_KING_SIDE,
    CASTLE_QUEEN_SIDE
} from '../actions/movePiece'

const initialState = {
    white: {
        kingPosition: 'e1',
        attack: []
    },
    black: {
        kingPosition: 'e5',
        attack: []
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // -------------------------------------------------------------------------------
        case MOVE_PIECE:
            if (action.kingPosition !== null) {
                return {
                    ...state,
                    [action.toMove]: {
                        kingPosition: action.kingPosition
                    }
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
                kingPosition: action.to
            }
        // -------------------------------------------------------------------------------
        case CASTLE_QUEEN_SIDE:
            return {
                ...state,
                kingPosition: action.to
            }
        // -------------------------------------------------------------------------------
        default:
            return state
    }
}

export default reducer