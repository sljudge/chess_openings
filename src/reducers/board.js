import {
    MOVE_PIECE,
    SELECT,
    CASTLE_KING_SIDE
} from '../actions/movePiece'

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
    const toMove = state.toMove
    switch (action.type) {
        case MOVE_PIECE:
            const piece = action.piece
            const from = action.from
            const to = action.to
            state[from] = null
            state[to] = piece
            return {
                ...state,
                toMove: toMove === 'white' ? 'black' : 'white'
            }
        case SELECT:
            const pieceId = action.id
            return {
                ...state,
                selected: pieceId
            }
        case CASTLE_KING_SIDE:
            let rook = toMove === 'white' ? 'h1' : 'h8'
            let king = toMove === 'white' ? 'e1' : 'e8'
            state[rook] = null
            state[king] = null
            if (toMove === 'white') {
                state['g1'] = 'K'
                state['f1'] = 'R'
            } else {
                state['g8'] = 'k'
                state['f8'] = 'r'
            }
            return {
                ...state,
                toMove: toMove === 'white' ? 'black' : 'white'
            }
        default:
            return state
    }
}

export default reducer