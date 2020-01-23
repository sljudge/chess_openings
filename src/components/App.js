import React from 'react'
import { connect } from 'react-redux'

import { Container } from './Container'
import { Board } from './Board'


const App = props => {
    const { board } = { ...props }

    return (
        <Container>
            <Board board={board} />
        </Container>

    )
}

const mapStateToProps = (state) => {
    const board = state.board
    return {
        board
    }
}

export default connect(mapStateToProps)(App)