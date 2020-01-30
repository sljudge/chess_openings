import { StyleSheet } from 'aphrodite'

export default StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        width: '50%',
        height: '100%',
    },
    board: {
        // position: 'relative',
        // right: '3rem',
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: '33rem',
        width: '33rem',
        border: '1rem groove #99a89c',
        backgroundColor: '#e8e5da',
    },
})