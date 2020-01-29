import { takeEvery, select, call, put } from 'redux-saga/effects'
import { MOVE_PIECE, movePiece, SET_DISABLED } from '../actions/movePiece'
import { UPDATE_DATA } from '../actions/updateData'
import createMatrix from '../helpers/createMatrix'
import isInCheck from '../helpers/isInCheck'
import constructFen from '../helpers/api/constructFen'
import getRandInt from '../helpers/converters/getRandInt'


const numberOfMoves = 6
const getMoves = (fen) => (fetch(`https://explorer.lichess.ovh/master?fen=${fen}&moves=${numberOfMoves}`))
// fen=rnbqkbnr/pppppppp/8/8/8/5N2/PPPPPPPP/RNBQKB1R b KQkq

function* movePieceAsync(action) {
    //Get data from state
    const data = yield select(state => state.data)
    const player = data.player
    //construct boardMatrix for reference
    const board = yield select(state => state.board)
    const boardMatrix = createMatrix(board)
    //check for check mate
    yield isInCheck(board.toMove, boardMatrix)
    // construct fen for api call
    const castling = yield select(state => state.castling)
    const fen = yield constructFen(boardMatrix, board.toMove, castling)
    //attempt api call
    try {
        const response = yield call(getMoves, fen)
        const result = yield response.json()
        yield put({ type: UPDATE_DATA, result, toMove: board.toMove })
        //If it is the computer's turn then make random move from move list
        if (board.toMove !== player) {
            console.log(result)
            //If the fen is valid then move the piece
            if (result.moves.length > 0) {
                const move = result.moves[getRandInt(result.moves.length)]
                console.log(board.toMove, move)
                const from = move.uci.slice(0, 2)
                const to = move.uci.slice(2)
                yield put(movePiece(board.toMove, board[from], from, to))
            }
            //If the fen is not valid then ... tbd
            else {
                alert('Not a good move!')
                yield put({ type: SET_DISABLED, disabled: true })
            }
        }


    } catch (e) {
        yield alert('API ERROR')
        console.log(e)
    }
}

export function* watchMovePiece() {
    // console.log('watching')
    yield takeEvery(MOVE_PIECE, movePieceAsync)
}



