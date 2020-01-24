export const MOVE_PIECE = 'MOVE_PIECE'
export const SELECT = 'SELECT'
export const CASTLE_KING_SIDE = 'CASTLE_KING_SIDE'
export const CASTLE_QUEEN_SIDE = 'CASTLE_QUEEN_SIDE'
export const EN_PASSANT = 'EN_PASSANT'

export const movePiece = (toMove, piece, from, to) => {
    let kingPosition = null
    let kingSide = null
    let queenSide = null
    let enPassant = null
    switch (piece.toLowerCase()) {
        case 'p':
            //IF PAWN REACHES END RANK THEN PROMOTE     ******GIVE OPTION ??
            if (toMove === 'white' && to[1] == 8) {
                piece = 'Q'
            } else if (toMove === 'black' && to[1] == 1) {
                piece = 'q'
            }
            //ACTIVATE EN PASSANT FOR TWO SQUARE START
            if (Math.abs(from[1] - to[1]) === 2) {
                enPassant = toMove === 'white' ? `${from[0]}${to[1] - 1}` : `${from[0]}${parseInt(to[1]) + 1}`
            }
            ; break
        case 'k':
            //IF KING MOVES UPDATE POSITION FOR CHECK AND NULLIFY CASTLING
            kingPosition = to
            kingSide = false
            queenSide = false
                ; break
        case 'r':
            //IF ROOK MOVES NULLIFY CASTLING FOR SIDE IN QUESTION
            if (toMove === 'white') {
                from === 'a1' ? queenSide = false : from === 'h1' ? kingSide = false : null
            } else {
                from === 'a8' ? queenSide = false : from === 'h8' ? kingSide = false : null
            }
    }
    return ({
        type: MOVE_PIECE,
        toMove: toMove,
        piece: piece,
        from: from,
        to: to,
        enPassant,
        kingPosition: kingPosition,
        kingSide: kingSide,
        queenSide: queenSide

    })
}


export const select = (piece) => {
    return ({
        type: SELECT,
        id: piece,
    })
}

export const castleKingSide = (to, toMove) => ({
    type: CASTLE_KING_SIDE,
    to: to,
    toMove: toMove
})

export const castleQueenSide = (to, toMove) => ({
    type: CASTLE_QUEEN_SIDE,
    to: to,
    toMove: toMove
})

export const enPassant = (from, to) => ({
    type: EN_PASSANT,
    from: from,
    to: to
})