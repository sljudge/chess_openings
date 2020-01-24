import {
    MOVE_PIECE,
    SELECT,
    CASTLE_KING_SIDE,
    CASTLE_QUEEN_SIDE,
    EN_PASSANT
} from '../actions/movePiece'

const initialState = {
    a8: 'r', b8: null, c8: 'R', d8: null, e8: null, f8: 'N', g8: 'r', h8: null,
    a7: null, b7: null, c7: null, d7: null, e7: null, f7: null, g7: null, h7: 'p',
    a6: null, b6: null, c6: null, d6: null, e6: null, f6: null, g6: null, h6: null,
    a5: null, b5: null, c5: null, d5: null, e5: 'k', f5: null, g5: 'P', h5: null,
    a4: null, b4: 'Q', c4: null, d4: null, e4: 'p', f4: null, g4: null, h4: null,
    a3: null, b3: null, c3: null, d3: null, e3: null, f3: null, g3: 'P', h3: null,
    a2: 'P', b2: null, c2: 'P', d2: 'P', e2: 'P', f2: 'P', g2: 'B', h2: 'P',
    a1: 'R', b1: 'N', c1: 'B', d1: null, e1: 'K', f1: null, g1: null, h1: 'R',
    selected: null,
    toMove: 'white',
    enPassant: null
}

const reducer = (state = initialState, action) => {

    let newState

    switch (action.type) {
        // -------------------------------------------------------------------------------
        case MOVE_PIECE:
            return {
                ...state,
                [action.from]: null,
                [action.to]: action.piece,
                toMove: action.toMove === 'white' ? 'black' : 'white',
                enPassant: action.enPassant
            }
        // -------------------------------------------------------------------------------
        case SELECT:
            return {
                ...state,
                selected: action.id
            }
        // -------------------------------------------------------------------------------
        case CASTLE_KING_SIDE:
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
        // -------------------------------------------------------------------------------
        case CASTLE_QUEEN_SIDE:
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
        // -------------------------------------------------------------------------------
        case EN_PASSANT:
            return {
                ...state,
                toMove: action.toMove === 'white' ? 'black' : 'white',
                enPassant: null,
                [action.from]: null,
                [action.to]: action.toMove === 'white' ? 'P' : 'p',
                [`${action.to[0]}${action.from[1]}`]: null
            }
        // -------------------------------------------------------------------------------
        default:
            return state
    }
}

export default reducer