import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import styles from "../../styles";

/**
 * Part of Note Edit Screen.
 * Provides a ScrollView with buttons for selecting the color.
 *
 * Required props:
 * 1) style - additional styles for <View/> container
 * 2) onPress(color) - callback for handling onPress button events. Returns hex color.
 *
 * @version 1.0
 */
export default class ColorSelector extends React.Component {
    /**
     * Allowed colors for notes.
     * @type {string[]}
     */
    static colors = [
        '#fff', '#607D8B', '#795548',
        '#FF9800', '#FFEB3B', '#8BC34A',
        '#009688', '#03A9F4', '#3F51B5'
    ];

    /**
     * Render the note color selector.
     * @returns {View} with horizontal ScrollView inside it.
     */
    render() {
        const style = this.props.style; // Additional styles

        const colors = ColorSelector.colors.map((color, key) => {
            return <TouchableOpacity
                key={key}
                style={[styles.colorSelectorItem, {backgroundColor: color}]}
                onPress={() => this.props.onPress(color)}/>;
        });

        return (
            <View style={[styles.colorSelector, style]}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {colors}
                </ScrollView>
            </View>
        );
    }
}