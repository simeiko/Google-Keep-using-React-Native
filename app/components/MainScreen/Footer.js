import React from 'react';
import {View, Text, Alert, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "../../styles";

/**
 * Render footer for Main Screen.
 *
 * Required props:
 * - navigation - parent navigation property.
 *
 * @todo implement "add list" functionality
 * @version 1.0
 */
export default class Footer extends React.Component {
    /**
     * Render footer for Main Screen.
     * @returns {View} with 2 buttons
     */
    render() {
        return (
            <View style={styles.footer}>
                <TouchableHighlight
                    style={styles.addNote}
                    onPress={() => this.props.navigation.navigate('Edit', [this.props.uid, {}])}
                    underlayColor="#EEEEEE">
                    <Text style={styles.addNoteText}>Take a note...</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.footerOption}
                    onPress={() => Alert.alert("To be done soon!")}
                    underlayColor="#EEEEEE">
                    <Icon name="list" style={styles.footerOptionFont} />
                </TouchableHighlight>
            </View>
        );
    }
}