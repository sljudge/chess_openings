import {
    MOVE_PIECE,
    SELECT,
    CASTLE_KING_SIDE,
    CASTLE_QUEEN_SIDE,
    EN_PASSANT
} from '../actions/movePiece'

const initialState = {
    a8: 'r', b8: null, c8: null, d8: null, e8: 'k', f8: 'b', g8: 'n', h8: 'r',
    a7: null, b7: null, c7: 'p', d7: 'p', e7: 'p', f7: 'p', g7: 'p', h7: 'p',
    a6: null, b6: null, c6: null, d6: null, e6: null, f6: null, g6: null, h6: null,
    a5: 'p', b5: 'p', c5: null, d5: null, e5: null, f5: null, g5: null, h5: 'P',
    a4: null, b4: null, c4: null, d4: null, e4: null, f4: null, g4: null, h4: null,
    a3: null, b3: null, c3: null, d3: null, e3: null, f3: null, g3: null, h3: null,
    a2: 'P', b2: 'P', c2: 'P', d2: 'P', e2: 'P', f2: 'P', g2: 'P', h2: null,
    a1: 'R', b1: null, c1: null, d1: null, e1: 'K', f1: 'B', g1: 'N', h1: 'R',
    selected: null,
    toMove: 'white',
    check: {
        white: {
            kingPosition: 'e1',
            attack: []
        },
        black: {
            kingPosition: 'e8',
            attack: []
        }
    },
    castle: {     //null for still possible / true for castled / false for no longer possible
        white: {
            kingSide: null,
            queenSide: null
        },
        black: {
            kingSide: null,
            queenSide: null
        }
    },
    enPassant: null
}

const reducer = (state = initialState, action) => {

    const color = state.toMove

    switch (action.type) {
        // -------------------------------------------------------------------------------
        case MOVE_PIECE:
            //MOVE PIECE TO NEW POSITION
            state[action.from] = null
            state[action.to] = action.piece
            //IF PAWN REACHES END RANK THEN PROMOTE
            if (action.piece.toLowerCase() === 'p') {
                if (color === 'white' && action.to[1] == 8) {
                    state[action.to] = 'Q'
                } else if (color === 'black' && action.to[1] == 1) {
                    state[action.to] = 'q'
                }
            }
            //IF KING UPDATE POSITION FOR CHECK AND NULLIFY CASTLING
            if (action.piece.toLowerCase() === 'k') {
                state.check[color].kingPosition = action.to
                state.castle[color].kingSide = false
                state.castle[color].queenSide = false
            }
            //IF ROOK NULLIFY CASTLING FOR SIDE IN QUESTION
            if (action.piece.toLowerCase() === 'r') {
                if (color === 'white') {
                    if (action.from === 'a1') {
                        state.castle[color].queenSide = false
                    } else if (action.from === 'h1') {
                        state.castle[color].kingSide = false
                    }
                } else if (color === 'black') {
                    if (action.from === 'a8') {
                        state.castle[color].queenSide = false
                    } else if (action.from === 'h8') {
                        state.castle[color].kingSide = false
                    }
                }
            }
            //ACTIVATE / DEACTIVATE EN PASSANT IF NECESSARY
            if (state.enPassant !== null) { state.enPassant = null }
            if (action.piece.toLowerCase() === 'p' && Math.abs(action.from[1] - action.to[1]) === 2) {
                state.enPassant = color === 'white' ? `${action.from[0]}${action.to[1] - 1}` : `${action.from[0]}${parseInt(action.to[1]) + 1}`
            }
            return {
                ...state,
                toMove: color === 'white' ? 'black' : 'white',
            }
        // -------------------------------------------------------------------------------
        case SELECT:
            const pieceId = action.id
            return {
                ...state,
                selected: pieceId
            }
        // -------------------------------------------------------------------------------
        case CASTLE_KING_SIDE:
            //WHITE
            if (action.to === 'g1') {
                state['e1'] = null
                state['h1'] = null
                state['g1'] = 'K'
                state['f1'] = 'R'
            }
            //BLACK
            else if (action.to === 'g8') {
                state['f8'] = null
                state['h8'] = null
                state['g8'] = 'k'
                state['f8'] = 'r'
            }
            //UPDATE KING POSITION FOR CHECK AND SET CASTLING TO FIXED VALUES
            state.check[color].kingPosition = action.to
            state.castle[color].kingSide = true
            state.castle[color].queenSide = false
            return {
                ...state,
                toMove: action.to === 'g1' ? 'black' : 'white',
            }
        // -------------------------------------------------------------------------------
        case CASTLE_QUEEN_SIDE:
            //WHITE
            if (action.to === 'c1') {
                state['e1'] = null
                state['a1'] = null
                state['c1'] = 'K'
                state['d1'] = 'R'
            }
            //BLACK
            else if (action.to === 'c8') {
                state['e8'] = null
                state['a8'] = null
                state['c8'] = 'k'
                state['d8'] = 'r'
            }
            //UPDATE KING POSITION FOR CHECK AND SET CASTLING TO FIXED VALUES
            state.check[color].kingPosition = action.to
            state.castle[color].kingSide = false
            state.castle[color].queenSide = true
            return {
                ...state,
                toMove: action.to === 'c1' ? 'black' : 'white',
            }
        // -------------------------------------------------------------------------------
        case EN_PASSANT:
            state[action.from] = null
            state[action.to] = color === 'white' ? 'P' : 'p'
            state[`${action.to[0]}${action.from[1]}`] = null
            return {
                ...state,
                toMove: color === 'white' ? 'black' : 'white',
                enPassant: null
            }
        // -------------------------------------------------------------------------------
        default:
            return state
    }
}

export default reducer