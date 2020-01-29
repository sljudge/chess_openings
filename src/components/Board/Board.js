import React from 'react'
import { css } from 'aphrodite'
import styles from './styles'
import { Square } from '../Square'

const Board = props => {
    const { board } = { ...props }
    const rows = [8, 7, 6, 5, 4, 3, 2, 1]
    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    return (
        <div className={css(styles.board)}>
            {rows.map(row => (
                <div key={row} style={{ display: 'flex' }}>
                    {columns.map(column => {
                        let squareColorStr
                        if (row & 1) {
                            squareColorStr = column.charCodeAt(0) & 1 ? 'black' : 'white'
                        } else {
                            squareColorStr = column.charCodeAt(0) & 1 ? 'white' : 'black'
                        }
                        let id = `${column}${row}`
                        return <Square key={id} id={id} squareColorStr={squareColorStr} pieceStr={board[id]} />
                    })}
                </div>

            ))}

        </div>
    )

}

export default Board