import React from 'react';
import { View, AsyncStorage, Alert, Text, FlatList, ToastAndroid } from 'react-native';
import styles from "../../styles";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from "../Header";
import Note from "../Note";
import * as firebase from "firebase";

/**
 * Trash Screen displays all deleted notes from firebase database.
 *
 * Possible actions:
 * 1) Select/deselect note;
 * 2) Select/deselect all notes;
 * 3) Restore selected notes;
 * 4) Delete forever selected notes.
 *
 * @todo Add label which will inform the user about amount of selected notes
 * @todo move out the <FlatList/> into the new child component
 * @version 1.0
 */
export default class TrashScreen extends React.Component {
    /**
     * Options for DrawerNavigator.
     */
    static navigationOptions = {
        drawerLabel: 'Deleted',
        drawerIcon: <Icon name="delete" style={{fontSize: 25}} />
    };

    /**
     * Set up this.state and bind `this` to functions.
     * @param props
     */
    constructor(props) {
        super(props);

        console.ignoredYellowBox = ['Setting a timer']; // Hide Annoying firebase warnings.

        this.selectNote = this.selectNote.bind(this);
        this.selectAllNotes = this.selectAllNotes.bind(this);
        this.deleteSelectedNotes = this.deleteSelectedNotes.bind(this);
        this.restoreSelectedNotes = this.restoreSelectedNotes.bind(this);

        this.state = {
            notes: null // Notes with "deleted" flag
        };
    }

    /**
     * Get firebase UID and start listening for deleted notes.
     */
    componentWillMount() {
        TrashScreen.getUID().then((uid) => {
            this.uid = uid;
            this.database = firebase.database().ref(this.uid);
            this.listenForNotes();
        });
    }

    /**
     * Disable firebase database listener.
     */
    componentWillUnmount() {
        if(typeof this.database === "object") {
            this.database.off();
        }
    }

    /**
     * Render Trash bin with deleted notes.
     * @returns {View}
     */
    render() {
        const notes = this.state.notes ? this.displayNoteList() : TrashScreen.displayNoNotes();

        return (
            <View style={styles.container}>
                <Header
                    navigation={this.props.navigation}
                    title={TrashScreen.navigationOptions.drawerLabel}
                    style={styles.headerTrash}
                    selectAllNotes={this.selectAllNotes}
                    deleteSelectedNotes={this.deleteSelectedNotes}
                    restoreSelectedNotes={this.restoreSelectedNotes}/>

                {notes}
            </View>
        );
    }

    /**
     * Display note list with notes where "deleted" flag exists.
     * @returns {FlatList} with <Note/> elements
     */
    displayNoteList() {
        return (
            <FlatList
                style={styles.noteList}
                data={this.state.notes}
                renderItem={note => <Note data={note} onPress={this.selectNote} onLongPress={this.selectNote}/>} />
        );
    }

    /**
     * Display that no notes were found.
     * @returns {View} with Icon and Text
     */
    static displayNoNotes() {
        return (
            <View style={styles.noNotes}>
                <Icon name="delete" style={{fontSize: 100, color: "#BDBDBD"}}/>
                <Text style={{color: "#757575", fontWeight: "bold"}}>No notes in Recycle Bin</Text>
            </View>
        );
    }

    /**
     * Real time firebase database listener.
     * Listens for deleted notes.
     */
    listenForNotes() {
        this.database.on('value', data => {
            let notes = [];

            data.forEach(note => {
                if(note.val().deleted !== true) return; // Select only deleted notes

                notes.push({
                    key: note.key,
                    color: note.val().color,
                    title: note.val().title,
                    content: note.val().content,
                    uid: this.uid
                });
            });

            this.setState({
                notes: notes.length ? notes : null // Only if array length is 1 or more
            });
        });
    }

    /**
     * Select/deselect one particular note by ID (key).
     * @param note {Object} Note object details (title, content, color, etc.)
     */
    selectNote(note) {
        const noteID = note.key;
        let notes = [];

        this.state.notes.forEach(note => {
            if(noteID === note.key) {
                note.selected = !note.selected; // Select/deselect note
            }

            notes.push(note);
        });

        this.setState({
            notes: notes
        });
    }

    /**
     * Changes the "selected" value of each note to the opposite.
     * This allows to select/deselect all notes at once.
     */
    selectAllNotes() {
        let notes = [];

        this.state.notes.forEach(note => {
            note.selected = !note.selected; // Select/deselect note
            notes.push(note);
        });

        this.setState({
            notes: notes
        });
    }

    /**
     * Deletes selected notes from firebase database.
     */
    deleteSelectedNotes() {
        let count = 0; // Count deleted notes

        this.state.notes.forEach(note => {
            if(note.selected) {
                this.database.child(note.key).remove(); // Delete note
                count++;
            }
        });

        if(count) {
            const wording = count === 1 ? "note was" : "notes were";
            ToastAndroid.show(`${count} ${wording} deleted successfully!`, ToastAndroid.SHORT)
        } else {
            Alert.alert("Please, select at least one note.");
        }
    }

    /**
     * Restore selected notes.
     * Removes "deleted" flag from the note object.
     */
    restoreSelectedNotes() {
        let count = 0; // Count restored notes

        this.state.notes.forEach(note => {
            if(note.selected) {
                this.database.child(note.key).child('deleted').remove(); // Restore note by deleting "deleted" flag.
                count++;
            }
        });

        if(count) {
            const wording = count === 1 ? "note was" : "notes were";
            ToastAndroid.show(`${count} ${wording} restored successfully!`, ToastAndroid.SHORT)
        } else {
            Alert.alert("Please, select at least one note.");
        }
    }

    /**
     * Read firebase UID from AsyncStorage.
     * @returns {Promise<any>} firebase UID
     */
    static async getUID() {
        try {
            return JSON.parse(await AsyncStorage.getItem('uid'));
        } catch(error) {
            Alert.alert(
                "Error! Can't read data from the storage!", // Error title
                `Error message: ${error}` // Error message
            );
        }
    }
}