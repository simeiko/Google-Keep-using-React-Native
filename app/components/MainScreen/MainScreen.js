import React from 'react';
import {View, FlatList, AsyncStorage, Alert, ToastAndroid, Vibration, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as firebase from 'firebase';

import Header from "../Header";
import Footer from "./Footer";
import styles from "../../styles";
import Note from "../Note";

/**
 * Displays fetched from database notes.
 * @version 1.0
 */
export default class MainScreen extends React.Component {
    /**
     * Options for DrawerNavigator.
     */
    static navigationOptions = {
        drawerLabel: 'Notes',
        drawerIcon: <Icon name="lightbulb-outline" style={{fontSize: 25}} />
    };

    /**
     * Set up this.state and bind `this` to functions.
     * @param props
     */
    constructor(props) {
        super(props);

        console.ignoredYellowBox = ['Setting a timer'];

        this.deleteNote = this.deleteNote.bind(this);
        this.editNote = this.editNote.bind(this);

        this.state = {
            notes: null
        };
    }

    /**
     * Get firebase UID and start listening for notes.
     */
    componentWillMount() {
        MainScreen.getUID().then((uid) => {
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
     * Render Main Screen with: header, FlatList/View, and footer.
     * @returns {View}
     */
    render() {
        const notes = this.getNotes();

        return (
            <View style={styles.container}>
                <Header
                    navigation={this.props.navigation}
                    title={MainScreen.navigationOptions.drawerLabel}
                    style={styles.headerDefault}/>

                {notes}

                <Footer navigation={this.props.navigation} uid={this.uid} />
            </View>
        );
    }

    /**
     * Real time firebase database listener.
     * Listens for notes.
     */
    listenForNotes() {
        this.database.on('value', data => {
            let notes = [];

            data.forEach(note => {
                if(note.val().deleted === true) return; // Skip deleted notes

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
     * Returns FlatList with notes or View with no notes.
     * Based on amount of notes fetched from database.
     * @returns {FlatList|View}
     */
    getNotes() {
        const notes = this.state.notes;

        if(notes) {
            return <FlatList
                style={styles.noteList}
                data={notes}
                renderItem={note => <Note data={note} onPress={this.editNote} onLongPress={this.deleteNote}/>} />
        } else {
            return MainScreen.displayNoNotes();
        }
    }

    /**
     * onLongPress event handler.
     * Marks note as deleted.
     * @param note {Object}
     */
    deleteNote(note) {
        const noteID = note.key;

        this.database.child(noteID).update({deleted: true})
            .then(() => {
                if(Platform.OS === 'android') ToastAndroid.show('Deleted!', ToastAndroid.SHORT);

                Vibration.vibrate(100) // 100 ms vibration (timing works only on android)
            });
    }

    /**
     * onPress event handler.
     * Opens EditNoteScreen for editing selected note.
     * @param note {Object}
     */
    editNote(note) {
        this.props.navigation.navigate("Edit", [this.uid, note]);
    }

    /**
     * Display that no notes were found.
     * @returns {View} with Icon and Text
     */
    static displayNoNotes() {
        return (
            <View style={styles.noNotes}>
                <Icon name="note-add" style={{fontSize: 100, color: "#212121"}}/>
            </View>
        );
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