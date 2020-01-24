import React from 'react'
import styles from './styles'
import { css } from 'aphrodite'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { movePiece, selectPiece, castleKingSide, castleQueenSide, enPassant } from '../../actions/movePiece'
import { setCheck } from '../../actions/setCheck'
import validateMove from '../../helpers/validateMove'
import isInCheck from '../../helpers/isInCheck'

const Square = props => {
    /////////////// PROPS   ////////////////////////////
    const { id, squareColorStr, pieceStr, selectPiece, movePiece, castleKingSide, castleQueenSide, enPassant, board, castle, check, setCheck } = { ...props }
    /////////////// BOARD   ////////////////////////////
    const squareColor = squareColorStr === 'white' ? '#e4e8d2' : '#c4cf92'
    const from = board.selected //Moving from (...) to (...)
    const to = id
    const toMove = board.toMove //White or black to move
    /////////////// PIECES   ////////////////////////////
    const piece = board[from] //Current piece selected
    const targetPiece = board[id]// Piece being targeted on move
    const kingPosition = check[toMove].kingPosition

    const onSelect = () => {

        const inCheck = isInCheck(toMove, kingPosition, board, to)
        console.log(Object.keys(inCheck).length, 'LENGTH')
        console.log(Object.keys(inCheck))
        if (Object.keys(inCheck).length > 0) {
            console.log('PLAYER IS IN CHECK: ', inCheck)
            setCheck(toMove, inCheck, kingPosition, id)
        } else {
            selectPiece(id)
        }
    }

    const tryMovePiece = () => {

        if (piece !== null && piece !== undefined) {
            const pieceColor = piece.toUpperCase() === piece ? 'white' : 'black'
            //check if it's the correct player to go
            if (toMove === pieceColor) {
                //you can't take your own color
                if (targetPiece === null || pieceColor === 'white' && targetPiece.toLowerCase() === targetPiece || pieceColor === 'black' && targetPiece.toUpperCase() === targetPiece) {
                    // ensure pieces move as they should and get response -> true/false/object with special cases
                    let response = validateMove(board, castle, piece, from, to)
                    console.log('RESPONSE: ', response)
                    console.log('--------------------------------------------------')
                    //SUCCESS
                    if (response === true) { movePiece(toMove, piece, from, to) }
                    // FAILED
                    else if (response === false) { console.log('THIS PIECE CANNOT BE MOVED THERE') }
                    // CASTLE KING SIDE
                    else if (response.castledKingSide) { castleKingSide(to, toMove) }
                    // CASTLE QUEEN SIDE
                    else if (response.castledQueenSide) { castleQueenSide(to, toMove) }
                    //EN PASSANT
                    else if (response.enPassant) { enPassant(from, to, toMove) }
                }
            }
        }
    }

    let type, typeColor
    if (pieceStr !== null) {
        typeColor = pieceStr === pieceStr.toUpperCase() ? '#808080' : '#1e1e1e'
        switch (pieceStr.toLowerCase()) {
            case 'r': type = (
                <div className={css(styles.piece)}>
                    <i className="fas fa-chess-rook" style={{ color: typeColor }} onClick={() => onSelect()} />
                </div>
            ); break;
            case 'n': type = (
                <div className={css(styles.piece)}>
                    <i className="fas fa-chess-knight" style={{ color: typeColor }} onClick={() => onSelect()} />
                </div>
            ); break;
            case 'b': type = (
                <div className={css(styles.piece)}>
                    <i className="fas fa-chess-bishop" style={{ color: typeColor }} onClick={() => onSelect()} />
                </div>
            ); break;
            case 'q': type = (
                <div className={css(styles.piece)}>
                    <i className="fas fa-chess-queen" style={{ color: typeColor }} onClick={() => onSelect()} />
                </div>
            ); break;
            case 'k': type = (
                <div className={css(styles.piece)}>
                    <i className="fas fa-chess-king" style={{ color: typeColor }} onClick={() => onSelect()} />
                </div>
            ); break;
            case 'p': type = (
                <div className={css(styles.piece)}>
                    <i className="fas fa-chess-pawn" style={{ color: typeColor }} onClick={() => onSelect()} />
                </div>
            ); break;
            default: null
        }
    }

    return (
        <div id={id} className={css(styles.square)} style={{ backgroundColor: squareColor }} onClick={() => tryMovePiece()}>
            {type}
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        board: state.board,
        castle: state.castle,
        check: state.check
    }
}
const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
        selectPiece,
        movePiece,
        castleKingSide,
        castleQueenSide,
        enPassant,
        setCheck
    }, dispatch)
}
const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
    return { ...propsFromState, ...propsFromDispatch, ...ownProps }
}

export default connect(mapStateToProps, mapActionsToProps, mergeProps)(Square)