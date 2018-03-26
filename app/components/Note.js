import React from 'react';
import {View, Text, TouchableOpacity } from 'react-native';
import styles from "../styles";
import Icon from 'react-native-vector-icons/MaterialIcons';

/**
 * Atomic component of this app.
 * Represents one particular note inside parent FlatList component.
 *
 * Required props:
 * - data.item - data passed from FlatList. Includes: { color, title, selected, content }
 * - onPress() - callback for handling onPress.
 * - onLongPress() - callback for handling onLongPress.
 *
 * @version 1.0
 */
export default class Note extends React.Component {
    /**
     * Render note.
     * @returns {TouchableOpacity}
     */
    render() {
        const data = this.props.data.item; // Data passed from FlatList.
        const color = data.color ? data.color : "#fff"; // Note background color. Default color is white. (optional)
        const title = data.title ? <Text style={styles.noteTitle}>{data.title}</Text> : null;// Note title (optional)
        const selected = data.selected ? styles.selectedNote : null; // Selected note
        let content = null; // Note content (string|list|null). (optional)

        if(typeof data.content === "string") {
            content = <Text style={styles.noteDetails}>{data.content}</Text>;
        } else if(typeof data.content === "object") {
            content = this.createList(data.content);
        }

        return (
            <TouchableOpacity
                style={[styles.note, {backgroundColor: color}, selected]}
                onPress={() => this.props.onPress(data)}
                onLongPress={() => this.props.onLongPress(data)}>
                {title}
                {content}
            </TouchableOpacity>
        );
    }

    /**
     * Creates a list from items array.
     * Usually will accept this.props.content as a parameter.
     *
     * @param {Array<String>} items array with values to be placed in the each row of list.
     * @returns {View} list with note details wrapped in <View/>.
     */
    createList(items) {
        const list = items.map((line, key) => {
            return (
                <View key={key} style={styles.noteListItem}>
                    <Icon name="check-box-outline-blank" style={styles.noteListItemIcon} />
                    <Text style={styles.noteListItemFont}>{line}</Text>
                </View>
            );
        });

        return (
            <View style={styles.noteDetails}>
                {list}
            </View>
        );
    }
}