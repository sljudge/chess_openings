import canKingMove from './canKingMove'
import {
    checkDiagonal,
    checkForKnight,
    checkForPawn,
    checkPerpendicular,
    checkForKing
} from './attacks'
import attackCanBeBlockedOrTaken from './attackCanBeBlockedOrTaken'


function isInCheck(toMove, boardMatrix, isKing = true, checkForCheckmate = false) {
    /**
     * If king = true then determine if the king is currently in check
     * else: determine if a certain square can be accessed by an opposing piece
     */

    let Y, X, kingPiece
    //IF KING THEN FIND INDEX OF KING
    if (isKing === true) {
        kingPiece = toMove === 'white' ? 'K' : 'k'
        for (let i = 0; i <= 7; i++) {
            if (boardMatrix[i].indexOf(kingPiece) !== -1) {
                Y = i
                X = boardMatrix[i].indexOf(kingPiece)
                i = 8
            }
        }
    } else {
        Y = isKing[0]
        X = isKing[1]
    }

    const attacks = { diagonal: null, perpendicular: null, knight: null, pawn: null, king: null }

    const diagonal = checkDiagonal(toMove, Y, X, boardMatrix)
    if (diagonal) { attacks['diagonal'] = diagonal }

    const perpendicular = checkPerpendicular(toMove, Y, X, boardMatrix)
    if (perpendicular) { attacks['perpendicular'] = perpendicular }

    const knight = checkForKnight(toMove, Y, X, boardMatrix)
    if (knight) { attacks['knight'] = knight }

    const pawn = checkForPawn(toMove, Y, X, boardMatrix)
    if (pawn) { attacks['pawn'] = pawn }

    //(KING CAN'T BLOCK FOR HIMSELF)
    if (isKing === true || checkForCheckmate === true) {
        const king = checkForKing(toMove, Y, X, boardMatrix, kingPiece)
        if (king) { attacks['king'] = king }
    }

    //CHECK MATE ?
    if (isKing === true && !Object.values(attacks).every(x => x === null)) {
        console.log('checking for mate')
        // console.log(attackCanBeBlockedOrTaken(toMove, Y, X, boardMatrix, attacks))
        // console.log('----------------------------------------------')
        console.log('ATTACKS', attacks)
        console.log('CAN KING MOVE', canKingMove(toMove, Y, X, boardMatrix))
        console.log('BLOCK ATTACK', attackCanBeBlockedOrTaken(toMove, Y, X, boardMatrix, attacks))
        if (!canKingMove(toMove, Y, X, boardMatrix) && !attackCanBeBlockedOrTaken(toMove, Y, X, boardMatrix, attacks)) {
            console.log('CHECK MATE !!!')
            alert(`CHECK MATE !!! ${toMove === 'white' ? 'black' : 'white'} wins!!!`)

        }

    }

    return Object.values(attacks).every(x => x === null) ? false : true

}

export default isInCheck