export const MOVE_PIECE = 'MOVE_PIECE'
export const SELECT = 'SELECT'
export const CASTLE_KING_SIDE = 'CASTLE_KING_SIDE'

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

export const castleKingSide = () => ({
    type: CASTLE_KING_SIDE
})