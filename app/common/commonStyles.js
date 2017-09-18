var HEADER_HEIGHT = 64;

module.exports = {
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent : 'space-between',
    },

    logocont : {
        flex : 1,
    },

    formcont : {
        flex : 1,
    },

    content: {
        flex: 1,
        padding: 20
    },
    footer: {
        position: 'absolute',
        height: 100,
        bottom: 0,
        left: 0,
        right: 0
    },
    input: {
        height: 40,
        padding: 10,
        width : 250,
        marginBottom: 10,
        borderColor: 'orange',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    label: {
        color: 'orange',
        padding: 5,
        fontWeight: "700",
        fontStyle: 'italic'
    },
    errorText: {
        backgroundColor: 'red',
        color: 'white',
        padding: 5,
        fontWeight: "700",
        fontStyle: 'italic'
    },
    logo : {
        width :100,
        height : 100,
        marginTop : 60,
    }
};