import React from 'react'
// import { connect } from 'react-redux'

import { Container } from './Container'
import { Board } from './Board'
import { DataPanel } from './DataPanel'
import { Title } from './Title'



const App = props => {
    const { board } = { ...props }

    return (
        <Container>
            <Board board={board} />

            <Title />
            <DataPanel />
        </Container>

    )
}

export default App