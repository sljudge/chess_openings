export default function checkPerpendicular(toMove, Y, X, boardMatrix) {
    let enemy = toMove === 'white' ? ['q', 'r'] : ['Q', 'R']

    let square

    //check left
    for (let i = X - 1; i >= 0; i--) {
        square = boardMatrix[Y][i]
        if (enemy.includes(square)) { return [Y, i] }
        else if (square !== 0) { break }
    }
    //check right
    for (let i = X + 1; i <= 7; i++) {
        square = boardMatrix[Y][i]
        if (enemy.includes(square)) { return [Y, i] }
        else if (square !== 0) { break }
    }
    //check up
    for (let i = Y - 1; i >= 0; i--) {
        square = boardMatrix[i][X]
        if (enemy.includes(square)) { return [i, X] }
        else if (square !== 0) { break }
    }
    //check down
    for (let i = Y + 1; i <= 7; i++) {
        square = boardMatrix[i][X]
        if (enemy.includes(square)) { return [i, X] }
        else if (square !== 0) { break }
    }
}