export default function createMatrix(board, typed = false) {
    let boardMatrix = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ]
    const keys = Object.keys(board)
    for (let i = 0, j = 0; i < 64; i++) {
        if (i > 0 && i % 8 === 0) {
            j++
        }
        const key = keys[i]
        if (!typed) { boardMatrix[j][i % 8] = board[key] === null ? 0 : 1 }
        else { boardMatrix[j][i % 8] = board[key] === null ? 0 : board[key] }
    }
    return boardMatrix
}