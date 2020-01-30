import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '2rem',
        color: 'rgba(0,0,0,0.2)',
        width: '50%'
    },
    title: {
        fontSize: '5rem',
        marginRight: '0.5rem'
    }
})

const Title = () => {
    return (
        <div className={css(styles.container)}>
            <h1 className={css(styles.title)}><i className="fas fa-chess-king"></i></h1>
            <h1> Chess <br /> Openings</h1>
        </div>
    )
}

export default Title