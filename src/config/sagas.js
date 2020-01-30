import { takeEvery, select, call, put } from 'redux-saga/effects'
import { MOVE_PIECE, movePiece, SET_DISABLED } from '../actions/movePiece'
import { UPDATE_DATA, TOGGLE_PLAYER, RESET, SET_ALERT, TOGGLE_AUTO } from '../actions/updateData'
import createMatrix from '../helpers/createMatrix'
import isInCheck from '../helpers/isInCheck'
import constructFen from '../helpers/api/constructFen'
import getRandInt from '../helpers/converters/getRandInt'


const numberOfMoves = 6
const getMoves = (fen) => (fetch(`https://explorer.lichess.ovh/master?fen=${fen}&moves=${numberOfMoves}`))

function* movePieceAsync(action) {

    //Get data from state
    const data = yield select(state => state.data.present)
    const player = data.player

    //construct boardMatrix for reference
    const board = yield select(state => state.board.present)
    const boardMatrix = createMatrix(board)

    //check for check mate
    yield isInCheck(board.toMove, boardMatrix)

    // construct fen for api call
    const castling = yield select(state => state.castling.present)
    const fen = yield constructFen(boardMatrix, board.toMove, castling)

    try {
        //attempt api call
        const response = yield call(getMoves, fen)
        const result = yield response.json()
        yield put({ type: UPDATE_DATA, result, toMove: board.toMove })

        //If it is the computer's turn (&& auto: true) then make random move from move list
        if (data.panel.auto && board.toMove !== player) {
            //If the fen is valid then move the piece
            if (result.moves.length > 0) {
                const move = result.moves[getRandInt(result.moves.length)]
                const from = move.uci.slice(0, 2)
                const to = move.uci.slice(2)
                yield put(movePiece(board.toMove, board[from], from, to))
            }
            //If the fen is not valid then show alert
            else {
                !data.alert && alert('No games in the database for this board position.')
                yield put({ type: SET_ALERT })
            }
        }


    } catch (e) {
        yield alert('API ERROR')
        console.log(e)
    }
}

export function* watcher() {
    yield takeEvery(MOVE_PIECE, movePieceAsync)
    yield takeEvery(TOGGLE_PLAYER, movePieceAsync)
    yield takeEvery(RESET, movePieceAsync)
    yield takeEvery(TOGGLE_AUTO, movePieceAsync)
}




