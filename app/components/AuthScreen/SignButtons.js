import
    React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from "../../styles";

/**
 * Sign Buttons Component is used to render both "Sign In" and "Sign Up" buttons.
 * On press calls the parent changeContent() function with a string representing the pressed button.
 *
 * @version 1.0
 */
export default class SignButtons extends React.Component {
    /**
     * @returns {Object} <View> with 2 Sign In/Up buttons inside it.
     */
    render() {
        return (
            <View style={styles.signButtonsView}>
                {this.displayButton(styles.signInButton, "Sign In")}
                {this.displayButton(styles.signUpButton, "Sign Up")}
            </View>
        );
    }

    /**
     * @param {Object} style Object with css styles.
     * @param {String} content String with button & content names.
     * @returns {TouchableOpacity} Button
     */
    displayButton(style, content) {
        return (
            <TouchableOpacity
                style={[styles.signButton, style]}
                onPress={() => this.props.changeContent(content)}>
                <Text style={styles.signButtonText}>{content}</Text>
            </TouchableOpacity>
        );
    }
}