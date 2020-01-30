import React from 'react'
// import { connect } from 'react-redux'

import { Container } from './Container'
import { Board } from './Board'
import { DataPanel } from './DataPanel'


const App = props => {
    const { board } = { ...props }

    return (
        <Container>
            <Board board={board} />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2rem', color: 'rgba(0,0,0,0.2)' }}>
                <h1 style={{ fontSize: '5rem', marginRight: '0.5rem' }}><i className="fas fa-chess-king"></i></h1>
                <h1> Chess <br /> Openings</h1>
            </div>
            <DataPanel />
        </Container>

    )
}

// const mapStateToProps = (state) => {
//     const board = state.board
//     return {
//         board
//     }
// }

// export default connect(mapStateToProps)(App)
export default App