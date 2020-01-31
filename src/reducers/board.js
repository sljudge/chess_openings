import {
    MOVE_PIECE,
    SELECT_PIECE,
    CASTLE_KING_SIDE,
    CASTLE_QUEEN_SIDE,
    EN_PASSANT,
    SET_DISABLED,
} from '../actions/movePiece'
import { RESET } from '../actions/updateData'

const initialState = {
    a8: 'r', b8: 'n', c8: 'b', d8: 'q', e8: 'k', f8: 'b', g8: 'n', h8: 'r',
    a7: 'p', b7: 'p', c7: 'p', d7: 'p', e7: 'p', f7: 'p', g7: 'p', h7: 'p',
    a6: null, b6: null, c6: null, d6: null, e6: null, f6: null, g6: null, h6: null,
    a5: null, b5: null, c5: null, d5: null, e5: null, f5: null, g5: null, h5: null,
    a4: null, b4: null, c4: null, d4: null, e4: null, f4: null, g4: null, h4: null,
    a3: null, b3: null, c3: null, d3: null, e3: null, f3: null, g3: null, h3: null,
    a2: 'P', b2: 'P', c2: 'P', d2: 'P', e2: 'P', f2: 'P', g2: 'P', h2: 'P',
    a1: 'R', b1: 'N', c1: 'B', d1: 'Q', e1: 'K', f1: 'B', g1: 'N', h1: 'R',
    selected: null,
    toMove: 'white',
    enPassant: null,
    disabled: false,
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        // -------------------------------------------------------------------------------
        case MOVE_PIECE:
            if (!state.disabled) {
                return {
                    ...state,
                    [action.from]: null,
                    [action.to]: action.piece,
                    toMove: action.toMove === 'white' ? 'black' : 'white',
                    enPassant: action.enPassant
                }
            } else {
                return { ...state, disabled: true }
            }
        // -------------------------------------------------------------------------------
        case SELECT_PIECE:
            if (!state.disabled) {
                return {
                    ...state,
                    selected: action.id
                }
            } else {
                return { ...state, disabled: true }
            }
        // -------------------------------------------------------------------------------
        case CASTLE_KING_SIDE:
            if (!state.disabled) {
                //WHITE
                if (action.to === 'g1') {
                    return {
                        ...state,
                        e1: null,
                        h1: null,
                        g1: 'K',
                        f1: 'R',
                        toMove: 'black'
                    }
                }
                //BLACK
                else if (action.to === 'g8') {
                    return {
                        ...state,
                        e8: null,
                        h8: null,
                        g8: 'k',
                        f8: 'r',
                        toMove: 'white'

                    }
                }
            } else {
                return { ...state, disabled: true }
            }
        // -------------------------------------------------------------------------------
        case CASTLE_QUEEN_SIDE:
            if (!state.disabled) {
                //WHITE
                if (action.to === 'c1') {
                    return {
                        ...state,
                        e1: null,
                        a1: null,
                        c1: 'K',
                        d1: 'R',
                        toMove: 'black'
                    }
                }
                //BLACK
                else if (action.to === 'c8') {
                    return {
                        ...state,
                        e8: null,
                        a8: null,
                        c8: 'k',
                        d8: 'r',
                        toMove: 'white'
                    }
                }
            } else {
                return { ...state, disabled: true }
            }
        // -------------------------------------------------------------------------------
        case EN_PASSANT:
            if (!state.disabled) {
                return {
                    ...state,
                    toMove: action.toMove === 'white' ? 'black' : 'white',
                    enPassant: null,
                    [action.from]: null,
                    [action.to]: action.toMove === 'white' ? 'P' : 'p',
                    [`${action.to[0]}${action.from[1]}`]: null
                }
            } else {
                return { ...state, disabled: true }
            }
        // -------------------------------------------------------------------------------
        case SET_DISABLED:
            return {
                ...state,
                disabled: action.disabled
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
            return { ...state }
    }
}

export default reducer