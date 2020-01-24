import { takeEvery, select, call, put } from 'redux-saga/effects'
import { SET_CHECK } from '../actions/setCheck'
import { selectPiece, SELECT_PIECE } from '../actions/movePiece'



function* selectPieceAsync(action) {
    let id = action.id
    yield put({ type: SELECT_PIECE, id })
}

export function* watchSetCheck() {
    console.log('watching')
    yield takeEvery(SET_CHECK, selectPieceAsync)
    // yield put({type: SELECT_PIECE, checkStatus})
}



