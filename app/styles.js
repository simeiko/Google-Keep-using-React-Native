import {StyleSheet, StatusBar} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e0e0e0",
        paddingTop:  StatusBar.currentHeight
    },

    /***** Auth Screen *****/

    authScreen: {
        marginTop:  StatusBar.currentHeight,
        backgroundColor: "#FFC107",
        flex: 1,
        paddingTop: 50,
    },

    authScreenIconView: {
        width: 150,
        height: 150,
        borderRadius: 100,
        backgroundColor: "#FFA000",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        elevation: 5,
        flexGrow: 0
    },

    authScreenIcon: {
        fontSize: 100,
        color: "#fff"
    },

    /** Sign In/Up Buttons **/

    signButtonsView: {
        flexGrow: 1,
        justifyContent: "flex-end",
        paddingBottom: 50,
    },

    signButton: {
        paddingVertical: 15,
        marginHorizontal: 50,
        marginVertical: 10,
        elevation: 1,
        borderRadius: 2,
    },

    signInButton: {
        backgroundColor: "#FF9800",
    },

    signUpButton: {
        backgroundColor: "#E64A19",
    },

    signButtonText: {
        fontSize: 25,
        color: "#fff",
        textAlign: "center",
    },

    /** Auth Form Controls **/

    authForm: {
        flexGrow: 1,
        justifyContent: "flex-end",
        marginBottom: 50
    },

    authFormInput: {
        paddingVertical: 15,
        marginHorizontal: 50,
        marginVertical: 10,
        fontSize: 18
    },

    /***** Header *****/

    header: {
        flexDirection: "row",
        height: 55,
        elevation: 5
    },

    headerFont: {
        fontSize: 25,
        color: "#fff"
    },

    headerTitle: {
        alignSelf: "center"
    },

    headerMenu: {
        flexDirection: "row",
        flexGrow: 1
    },

    headerOptions: {
        flexDirection: "row",
    },

    headerOption: {
        paddingHorizontal: 18,
        justifyContent: "center",
        borderRadius: 100
    },

    headerDefault: {
        backgroundColor: "#FFC107",
    },

    headerTrash: {
        backgroundColor: "#616161"
    },

    /***** Main Screen *****/

    /** Footer **/

    footer: {
        backgroundColor: "#fff",
        elevation: 5,
        height: 50,
        flexDirection: "row",
    },

    addNote: {
        flexGrow: 1,
        justifyContent: "center"
    },

    addNoteText: {
        fontSize: 15,
        paddingLeft: 20,
        color: "#757575"
    },

    footerOption: {
        paddingHorizontal: 15,
        justifyContent: "center",
    },

    footerOptionFont: {
        fontSize: 25,
        color: "#212121"
    },

    /** Note List **/

    noteList: {
        paddingHorizontal: 5,
    },

    noNotes: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    /***** Note *****/

    note: {
        elevation: 1,
        borderRadius: 2,
        marginVertical: 5,
        paddingVertical: 15,
        paddingHorizontal: 10,
    },

    noteTitle: {
        fontWeight: "bold",
        fontSize: 18
    },

    noteDetails: {
        marginTop: 5
    },

    noteListItem: {
        flexDirection: "row",
        alignItems: "center"
    },

    noteListItemIcon: {
        marginRight: 5,
        fontSize: 15,
        color: "#424242"
    },

    noteListItemFont: {
        fontSize: 15
    },

    selectedNote: {
        borderWidth: 5,
        borderColor: "#9E9E9E",
        borderRadius: 4,
        backgroundColor: "#EEEEEE"
    },

    /***** Color Selector *****/

    colorSelector: {
        height: 50,
        elevation: 2
    },

    colorSelectorItem: {
        height: 40,
        width: 40,
        borderRadius: 100,
        marginHorizontal: 10,
        alignSelf: "center",
        borderColor: "#000",
        borderWidth: 2
    },

    /***** Note Editor *****/

    noteEditor: {
        flexGrow: 1,
        padding: 15
    },

    noteEditorTitleInput: {
        fontWeight: "bold",
        fontSize: 25,
        marginBottom: 20
    },

    noteEditorInput: {
        fontSize: 20,
    }
});