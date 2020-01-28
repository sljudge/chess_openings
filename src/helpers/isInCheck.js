import canKingMove from './canKingMove'
import attackCanBeBlockedOrTaken from './attackCanBeBlockedOrTaken'
import {
    checkDiagonal,
    checkForKnight,
    checkForPawn,
    checkPerpendicular,
    checkForKing
} from './attacks'


function isInCheck(toMove, boardMatrix, isKing = true, checkCanKingMove = false) {
    /**
     * If isKing = true then determine if the king is currently in check
     * else: isKing = [X,Y] to determine if a square can be reached by an opposing piece
     * checkCanKingMove necessary to stop the kings coming into contact
     * checkPawnBlock necessary to see if pawn can move forwards into line of check and block
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

    //(KINGS CAN'T COME INTO CONTACT)
    if (isKing === true || checkCanKingMove === true) {
        const king = checkForKing(toMove, Y, X, boardMatrix, kingPiece)
        if (king) { attacks['king'] = king }
    }

    //CHECK MATE ?
    if (isKing === true && !Object.values(attacks).every(x => x === null)) {
        console.log('can king move ', canKingMove(toMove, Y, X, boardMatrix))
        console.log('can attack be blocked', attackCanBeBlockedOrTaken(toMove, Y, X, boardMatrix, attacks))
        if (!canKingMove(toMove, Y, X, boardMatrix) && !attackCanBeBlockedOrTaken(toMove, Y, X, boardMatrix, attacks)) {
            alert(`CHECK MATE !!! ${toMove === 'white' ? 'black' : 'white'} wins!!!`)
        }
    }
    return Object.values(attacks).every(x => x === null) ? false : true

}

export default isInCheck