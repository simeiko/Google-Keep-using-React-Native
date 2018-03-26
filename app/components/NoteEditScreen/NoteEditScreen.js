import React from 'react';
import { View, ToastAndroid, Alert } from 'react-native';
import styles from "../../styles";
import Header from "../Header";
import * as firebase from "firebase";
import ColorSelector from "./ColorSelector";
import NoteEditor from "./NoteEditor";


/**
 * Note Edit Screen allows to edit existing notes or create new ones.
 *
 * Must be invoked with this.props.navigation.navigate('Edit', [ this.props.uid, { } ])
 * where first parameter is a firebase UID, and a second parameter is a note object.
 *
 * @todo add support for editing lists
 * @version 1.0
 */
export default class NoteEditScreen extends React.Component {
    /**
     * Options for DrawerNavigator.
     */
    static navigationOptions = {
        drawerLabel: () => null // Hide from drawer
    };

    /**
     * Set up this.state and bind `this` value to functions.
     * @param props
     */
    constructor(props) {
        super(props);

        this.selectColor = this.selectColor.bind(this);
        this.handleTitleInput = this.handleTitleInput.bind(this);
        this.handleContentInput = this.handleContentInput.bind(this);
        this.updateNote = this.updateNote.bind(this);

        this.note = this.props.navigation.state.params[1]; // Note data (object)

        this.state = {
            uid: this.props.navigation.state.params[0], // firebase UID
            color: this.note.color ? this.note.color : "#607D8B", // Note color
            title: this.note.title ? this.note.title : null, // Note title
            content: this.note.content ? this.note.content : null // Note content
        };
    }

    /**
     * Render Note Edit Screen with: header, ColorSelector, and NoteEditor components.
     * @returns {View}
     */
    render() {
        const backgroundColor = { backgroundColor: this.state.color };

        return (
            <View style={styles.container}>
                <Header
                    navigation={this.props.navigation}
                    title={"Edit"}
                    style={backgroundColor}
                    save={this.updateNote}/>

                <ColorSelector onPress={this.selectColor} style={backgroundColor} />

                <NoteEditor
                    title={this.state.title}
                    content={this.state.content}
                    style={backgroundColor}
                    handleTitleInput={this.handleTitleInput}
                    handleContentInput={this.handleContentInput}/>
            </View>
        );
    }

    /**
     * Update this.state.title with new text.
     * @param text {String} text input
     */
    handleTitleInput(text) {
        this.setState({
            title: text
        });
    }

    /**
     * Update this.state.content with new text.
     * @param text {String} text input
     */
    handleContentInput(text) {
        this.setState({
            content: text
        });
    }

    /**
     * Update this.state.color with new hex color.
     * @param color {String} hex color
     */
    selectColor(color) {
        this.setState({
            color: color
        });
    }

    /**
     * Updates existing notes in the firebase database.
     * Inserts new notes into the firebase database.
     */
    updateNote() {
        const database = firebase.database().ref(this.state.uid); // Database reference

        // Note details
        const note = {
            title: this.state.title,
            color: this.state.color,
            content: this.state.content
        };

        // If note.key exists, it means that user edits an existing note
        if(this.note.key) {
            database.child(this.note.key).update(note)
                .then(() => {
                    this.props.navigation.navigate('Main'); // Go back to main screen
                    ToastAndroid.show('saved!', ToastAndroid.SHORT);
                })
                .catch(error => {
                    Alert.alert('Error!', error);
                });
        } else {
            // Insert new note
            database.push(note)
                .then(() => {
                    this.props.navigation.navigate('Main'); // Go back to main screen
                    ToastAndroid.show('saved!', ToastAndroid.SHORT);
                })
                .catch(error => {
                    Alert.alert('Error!', error);
                });
        }
    }
}