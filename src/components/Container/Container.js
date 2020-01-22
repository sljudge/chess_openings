import React from 'react'
import styles from './styles'
import { css } from 'aphrodite'

const Container = props => {
    return (
        <div className={css(styles.container)}>
            {props.children}
        </div>
    )
}

export default Container