import { StyleSheet } from 'aphrodite'

export default StyleSheet.create({
    panelWrapper: {
        position: "absolute",
        // top: '5%',
        right: 'calc(4.5rem - 50%)',
        display: "flex",
        height: '100%',
        width: 'calc(50% - 4.5rem)',
        transition: 'right 1s',
        margin: '0 0 0 0',
    },
    panelWrapperOpen: {
        right: '0'
    },
    panel: {
        position: 'relative',
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100%',
        maxHeight: '100%',
        width: '100%',
        padding: '2rem',
        backgroundColor: 'rgba(0,0,0, 0.8)',
        color: 'whitesmoke',
    },
    btn: {
        position: "absolute",
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        height: '7rem',
        width: '4.5rem',
        margin: '0',
        backgroundColor: 'rgba(0,0,0,0.3)',
        color: '#1e1e1e',
        borderRadius: '50% 0 0 50%',
        fontSize: '3rem',
        transition: 'right 1s',
        ':hover': {
            backgroundColor: 'rgba(0,0,0, 0.6)',
            color: 'whitesmoke'
        },
        cursor: 'pointer',
    },
    config: {
        justifySelf: "flex-start",
        display: "flex",
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: '8rem',
    },
    switch: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: 'pointer',
        width: '4rem',
        height: '4rem',
        borderRadius: '100%',
        fontSize: '2rem',
    },
    switchWhite: {
        backgroundColor: '#e4e8d2',
        color: '#808080',
        ':hover': {
            backgroundColor: '#c4cf92',
            color: '#1e1e1e'
        }
    },
    switchBlack: {
        backgroundColor: '#c4cf92',
        color: '#1e1e1e',
        ':hover': {
            backgroundColor: '#e4e8d2',
            color: '#808080',
        }
    },
    switchAutoOn: {
        backgroundColor: 'rgba(0, 166, 83, 0.5)',
        ':hover': {
            backgroundColor: 'rgba(250,22,6, 0.1)',
        }
    },
    switchAutoOff: {
        backgroundColor: 'rgba(250,22,6, 0.5)',
        ':hover': {
            backgroundColor: 'rgba(0, 166, 83, 0.1)',
        }
    },
    switchTeacherOn: {
        backgroundColor: 'rgba(239, 250, 27, 0.8)',
        ':hover': {
            backgroundColor: 'rgba(239, 250, 27, 0.4)',
        }
    },
    switchTeacherOff: {
        backgroundColor: 'rgba(239, 250, 27, 0.4)',
        ':hover': {
            backgroundColor: 'rgba(239, 250, 27, 0.8)',
        }
    },
    data: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginLeft: 'auto'
    },
    moves: {
        display: 'flex',
        overflowY: 'scroll',
        maxHeight: '10rem',
        minHeight: '10rem',
        width: '100%'
    },
    moveTable: {
        width: '100%',
        borderSpacing: '1rem',
        backgroundColor: 'rgba(256,256,256, 0.1)',
        maxHeight: '10rem',
        minHeight: '10rem',
        padding: '0 1rem 0 1rem'
    },
    navigator: {
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        height: '4rem',
        width: '4rem',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: '5px',
        ':hover': {
            backgroundColor: 'rgba(256,256,256,0.5)',
            color: 'rgba(0,0,0,0.5',
        },
        cursor: 'pointer',
    },
    resetBtn: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: '3.5rem',
        width: '8rem',
        borderRadius: '5px',
        backgroundColor: 'rgba(7,13,207, 0.3)',
        ':hover': {
            backgroundColor: '#f93145',
            fontWeight: '500',
            fontSize: '1.15rem'
        },
        cursor: 'pointer',
    },

})