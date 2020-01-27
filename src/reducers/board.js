import {
    MOVE_PIECE,
    SELECT_PIECE,
    CASTLE_KING_SIDE,
    CASTLE_QUEEN_SIDE,
    EN_PASSANT
} from '../actions/movePiece'

const initialState = {
    a8: null, b8: 'b', c8: null, d8: null, e8: null, f8: null, g8: null, h8: 'r',
    a7: 'r', b7: null, c7: null, d7: null, e7: null, f7: null, g7: null, h7: 'p',
    a6: null, b6: null, c6: 'k', d6: null, e6: 'K', f6: null, g6: null, h6: null,
    a5: 'R', b5: null, c5: null, d5: null, e5: null, f5: null, g5: 'P', h5: null,
    a4: null, b4: 'Q', c4: null, d4: null, e4: null, f4: null, g4: null, h4: null,
    a3: null, b3: null, c3: null, d3: 'b', e3: null, f3: 'P', g3: null, h3: null,
    a2: 'P', b2: 'B', c2: 'P', d2: 'P', e2: null, f2: null, g2: 'B', h2: 'P',
    a1: null, b1: 'N', c1: null, d1: null, e1: null, f1: null, g1: null, h1: null,
    selected: null,
    toMove: 'white',
    enPassant: null
}

const reducer = (state = initialState, action) => {

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
        case SELECT_PIECE:
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
            console.log('CASTLE QUEEN SIDE')
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