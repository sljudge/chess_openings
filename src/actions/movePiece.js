export const MOVE_PIECE = 'MOVE_PIECE'
export const SELECT = 'SELECT'
export const CASTLE_KING_SIDE = 'CASTLE_KING_SIDE'
export const CASTLE_QUEEN_SIDE = 'CASTLE_QUEEN_SIDE'
export const EN_PASSANT = 'EN_PASSANT'

export const movePiece = (piece, from, to) => ({
    type: MOVE_PIECE,
    piece: piece,
    from: from,
    to: to
})

export const select = (piece) => {
    return ({
        type: SELECT,
        id: piece,
    })
}

export const castleKingSide = (to) => ({
    type: CASTLE_KING_SIDE,
    to: to
})

export const castleQueenSide = (to) => ({
    type: CASTLE_QUEEN_SIDE,
    to: to
})

export const enPassant = (from, to) => ({
    type: EN_PASSANT,
    from: from,
    to: to
})