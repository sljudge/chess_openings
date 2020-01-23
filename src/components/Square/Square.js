import React from 'react'
import styles from './styles'
import { css } from 'aphrodite'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { select, movePiece } from '../../actions/movePiece'
import validateMove from '../../helpers/validate_move'

const Square = props => {
    const { id, squareColorStr, pieceStr, select, movePiece, board } = { ...props }
    const squareColor = squareColorStr === 'white' ? '#e4e8d2' : '#c4cf92'

    const tryMovePiece = () => {
        const from = board.selected
        const to = id
        const piece = board[from]
        const toMove = board.toMove
        const targetPiece = board[id]
        if (piece !== null && piece !== undefined) {
            const pieceColor = piece.toUpperCase() === piece ? 'white' : 'black'
            //check if it's the correct player to go
            if (toMove === pieceColor) {
                //you can't take your own color
                if (targetPiece === null || pieceColor === 'white' && targetPiece.toLowerCase() === targetPiece || pieceColor === 'black' && targetPiece.toUpperCase() === board[id]) {
                    // ensure pieces move as they should
                    if (validateMove(board, piece, from, to)) {
                        movePiece(piece, from, to)
                    }
                }
            }
        }
    }

    let piece, pieceColor
    if (pieceStr !== null) {
        pieceColor = pieceStr === pieceStr.toUpperCase() ? '#808080' : '#1e1e1e'
        switch (pieceStr.toLowerCase()) {
            case 'r': piece = (
                <div className={css(styles.piece)}>
                    <i className="fas fa-chess-rook" style={{ color: pieceColor }} onClick={() => select(id)} />
                </div>
            ); break;
            case 'n': piece = (
                <div className={css(styles.piece)}>
                    <i className="fas fa-chess-knight" style={{ color: pieceColor }} onClick={() => select(id)} />
                </div>
            ); break;
            case 'b': piece = (
                <div className={css(styles.piece)}>
                    <i className="fas fa-chess-bishop" style={{ color: pieceColor }} onClick={() => select(id)} />
                </div>
            ); break;
            case 'q': piece = (
                <div className={css(styles.piece)}>
                    <i className="fas fa-chess-queen" style={{ color: pieceColor }} onClick={() => select(id)} />
                </div>
            ); break;
            case 'k': piece = (
                <div className={css(styles.piece)}>
                    <i className="fas fa-chess-king" style={{ color: pieceColor }} onClick={() => select(id)} />
                </div>
            ); break;
            case 'p': piece = (
                <div className={css(styles.piece)}>
                    <i className="fas fa-chess-pawn" style={{ color: pieceColor }} onClick={() => select(id)} />
                </div>
            ); break;
            default: null
        }
    }

    return (
        <div id={id} className={css(styles.square)} style={{ backgroundColor: squareColor }} onClick={() => tryMovePiece()}>
            {piece}
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        board: state.board
    }
}
const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
        select: select,
        movePiece: movePiece
    }, dispatch)
}
const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
    return { ...propsFromState, ...propsFromDispatch, ...ownProps }
}

export default connect(mapStateToProps, mapActionsToProps, mergeProps)(Square)