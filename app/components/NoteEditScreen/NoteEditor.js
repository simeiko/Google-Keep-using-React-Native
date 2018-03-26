import React from 'react';
import { KeyboardAvoidingView, TextInput } from 'react-native';
import styles from "../../styles";

/**
 * Form for editing the note.
 *
 * Required props:
 * 1) style - styles for container
 * 2) handleTitleInput(text) - callback for handling data from title input
 * 3) handleContentInput(text) - callback for handling data from note text input
 *
 * Optional props:
 * 1) title - text to be placed inside title input
 * 2) content - text to be placed inside note text input
 *
 * @todo add support for editing lists
 * @version 1.0
 */
export default class NoteEditor extends React.Component {
    /**
     * @returns {KeyboardAvoidingView} with title and note text inputs
     */
    render() {
        const style = this.props.style; // Additional styles for KeyboardAvoidingView
        const content = this.getSingleInput(); // Note content (string or list(not supported yet))
        const title = this.props.title ? this.props.title : null; // Note title

        return (
            <KeyboardAvoidingView behavior="padding" style={[styles.noteEditor, style]}>
                <TextInput
                    placeholder="Title"
                    underlineColorAndroid="rgba(0, 0, 0, 0)"
                    value={title}
                    style={styles.noteEditorTitleInput}
                    onChangeText={text => this.props.handleTitleInput(text)}/>

                {content}
            </KeyboardAvoidingView>
        );
    }

    /**
     * @returns {TextInput} single text input for writing note text
     */
    getSingleInput() {
        const value = this.props.content ? this.props.content : null; // Note value

        return (
            <TextInput
                placeholder="Note"
                underlineColorAndroid="rgba(0, 0, 0, 0)"
                multiline={true}
                value={value}
                style={styles.noteEditorInput}
                onChangeText={text => this.props.handleContentInput(text)}/>
        );
    }
}