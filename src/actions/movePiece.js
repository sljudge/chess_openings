export const MOVE_PIECE = 'MOVE_PIECE'
export const SELECT = 'SELECT'

export const movePiece = (piece, from, to) => ({
    type: MOVE_PIECE,
    piece: piece,
    from: from,
    to: to
})

export const select = (piece) => {
    console.log('SELECT', piece)
    return ({
        type: SELECT,
        id: piece
    })
}