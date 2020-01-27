import isInCheck from './isInCheck'

export default function blockAttacks(toMove, Y, X, boardMatrix, attacks) {
    console.log('---------------------BLOCK ATTACK -----------------------------------------')
    const blockerColor = toMove === 'white' ? 'black' : 'white'
    const perpendicular = attacks.perpendicular
    const diagonal = attacks.diagonal
    const knight = attacks.knight
    const pawn = attacks.pawn

    const output = { perpendicular, diagonal, knight, pawn }

    let x, y
    if (perpendicular) {
        y = perpendicular[0]
        x = perpendicular[1]
        //UP
        if (Y < y) {
            for (let i = y - 1; i > Y; i--) {
                console.log([i, x])
                if (isInCheck(blockerColor, boardMatrix, [i, x])) { delete output.perpendicular; break }
            }
        }
        //DOWN
        else if (Y > y) {
            for (let i = y + 1; i < Y; i++) {
                console.log([i, x])
                if (isInCheck(blockerColor, boardMatrix, [i, x])) { delete output.perpendicular; break }
            }
        }
        //RIGHT
        else if (X > x) {
            for (let i = x + 1; i < X; i++) {
                console.log([y, i])
                if (isInCheck(blockerColor, boardMatrix, [y, i])) { delete output.perpendicular; break }
            }
        }
        //LEFT
        else if (X < x) {
            for (let i = x - 1; i > X; i--) {
                console.log([y, i])
                if (isInCheck(blockerColor, boardMatrix, [y, i])) { delete output.perpendicular; break }
            }
        }
    }
    if (diagonal) {
        y = diagonal[0]
        x = diagonal[1]
        console.log('diagonal', [y, x])
        //UP & LEFT
        if (Y < y && X < x) {
            for (let i = y - 1, j = x - 1; i > Y; i-- , j--) {
                console.log([i, j])
                if (isInCheck(blockerColor, boardMatrix, [i, j])) { delete output.diagonal; break }
            }
        }
        //UP & RIGHT
        else if (Y < y && X > x) {
            for (let i = y - 1, j = x + 1; i > Y; i-- , j++) {
                console.log([i, j])
                if (isInCheck(blockerColor, boardMatrix, [i, j])) { delete output.diagonal; break }
            }
        }
        //DOWN & LEFT
        else if (Y > y && X < x) {
            for (let i = y + 1, j = x - 1; i < Y; i++ , j--) {
                console.log([i, j])
                if (isInCheck(blockerColor, boardMatrix, [i, j])) { delete output.diagonal; break }
            }
        }
        //DOWN & RIGHT
        else if (Y > y && X > x) {
            for (let i = y + 1, j = x + 1; i < Y; i++ , j++) {
                console.log([i, j])
                if (isInCheck(blockerColor, boardMatrix, [i, j])) { delete output.diagonal; break }
            }
        }


    }


    return output
}