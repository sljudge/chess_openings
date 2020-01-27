import canKingMove from './canKingMove'
import {
    checkDiagonal,
    checkForKnight,
    checkForPawn,
    checkPerpendicular
} from './attacks'
import blockAttacks from './blockAttacks'


function isInCheck(toMove, boardMatrix, isKing = true) {
    /**
     * If king = true then determine if the king is currently in check
     * else: determine if a certain square can be accessed by an opposing piece
     */
    let Y, X, king
    //IF KING THEN FIND INDEX OF KING
    if (isKing === true) {
        king = toMove === 'white' ? 'K' : 'k'
        for (let i = 0; i <= 7; i++) {
            if (boardMatrix[i].indexOf(king) !== -1) {
                Y = i
                X = boardMatrix[i].indexOf(king)
                i = 8
            }
        }
    } else {
        Y = isKing[0]
        X = isKing[1]
    }

    const attacks = { diagonal: null, perpendicular: null, knight: null, pawn: null }

    const diagonal = checkDiagonal(toMove, Y, X, boardMatrix)
    if (diagonal) { attacks['diagonal'] = diagonal }

    const perpendicular = checkPerpendicular(toMove, Y, X, boardMatrix)
    if (perpendicular) { attacks['perpendicular'] = perpendicular }

    const knight = checkForKnight(toMove, Y, X, boardMatrix)
    if (knight) { attacks['knight'] = knight }

    const pawn = checkForPawn(toMove, Y, X, boardMatrix)
    if (pawn) { attacks['pawn'] = pawn }

    //CHECK MATE ?
    if (isKing === true && !Object.values(attacks).every(x => x === null)) {
        //Can king move?
        const kingCanMove = canKingMove(toMove, Y, X, boardMatrix)
        // Can attack be blocked?
        console.log(blockAttacks(toMove, Y, X, boardMatrix, attacks))
        console.log('----------------------------------------------')

    }

    return Object.values(attacks).every(x => x === null) ? false : true

}

export default isInCheck