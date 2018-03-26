import React from 'react';
import { View, Text, TouchableHighlight, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "../styles";

/**
 * Displays header with specific options for each screen.
 *
 * !!! Warning !!! This component is badly written and heavily messed. To be rewritten in next versions!
 *
 * @todo refactor this component
 * @todo write detailed documentation and a list with required props
 * @version 0.1
 */
export default class Header extends React.Component {
    /**
     * Render header
     * @returns {View}
     */
    render() {
        const style = this.props.style;
        const options = this.getOptions();
        const menu = this.getMenu();

        return (
            <View style={[styles.header, style]}>
                {menu}
                {options}
            </View>
        );
    }

    /**
     * @returns {View} with menu
     */
    getMenu() {
        switch(this.props.title) {
            case "Notes":
            case "Deleted":
                return this.getHamburgerMenu();
            case "Edit":
                return this.getBackMenu();
        }
    }

    /**
     * @returns {View} with options specific for screen (based on this.props.title)
     */
    getOptions() {
        switch(this.props.title) {
            case "Notes":
                return this.getMainScreenOptions();
            case "Deleted":
                return this.getTrashOptions();
            case "Edit":
                return this.getEditOptions();
        }
    }

    /**
     * Display hamburger menu and screen label.
     * @returns {View} with back button
     */
    getHamburgerMenu() {
        return (
            <View style={styles.headerMenu}>
                <TouchableHighlight
                    style={styles.headerOption}
                    onPress={() => this.props.navigation.navigate("DrawerOpen")}
                    underlayColor="#FFB300">
                    <Icon name="menu" style={styles.headerFont}/>
                </TouchableHighlight>

                <Text style={[styles.headerFont, styles.headerTitle]}>{this.props.title}</Text>
            </View>
        );
    }

    /**
     * Display back button and screen label.
     * @returns {View} with back button
     */
    getBackMenu() {
        return (
            <View style={styles.headerMenu}>
                <TouchableHighlight
                    style={styles.headerOption}
                    onPress={() => this.props.navigation.goBack()}
                    underlayColor="#FFB300">
                    <Icon name="keyboard-backspace" style={[styles.headerFont]}/>
                </TouchableHighlight>

                <Text style={[styles.headerFont, styles.headerTitle]}>{this.props.title}</Text>
            </View>
        );
    }

    /**
     * Get Options for Main Screen.
     * @returns {View} with buttons
     */
    getMainScreenOptions() {
        return (
            <View style={styles.headerOptions}>
                <TouchableHighlight
                    style={styles.headerOption}
                    onPress={() => Alert.alert("To be done soon!")}
                    underlayColor="#FFB300">
                    <Icon name="search" style={styles.headerFont}/>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.headerOption}
                    onPress={() => Alert.alert("To be done soon!")}
                    underlayColor="#FFB300">
                    <Icon name="view-quilt" style={styles.headerFont}/>
                </TouchableHighlight>
            </View>
        );
    }

    /**
     * Get Options for Trash Screen.
     * @returns {View} with buttons
     */
    getTrashOptions() {
        return (
            <View style={styles.headerOptions}>
                <TouchableHighlight
                    style={styles.headerOption}
                    onPress={() => this.props.restoreSelectedNotes()}
                    underlayColor="#424242">
                    <Icon name="restore" style={styles.headerFont}/>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.headerOption}
                    onPress={() => this.props.selectAllNotes()}
                    underlayColor="#424242">
                    <Icon name="select-all" style={styles.headerFont}/>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.headerOption}
                    onPress={() => this.props.deleteSelectedNotes()}
                    underlayColor="#424242">
                    <Icon name="delete-forever" style={styles.headerFont}/>
                </TouchableHighlight>
            </View>
        );
    }

    /**
     * Get Options for Edit Screen.
     * @returns {View} with buttons
     */
    getEditOptions() {
        return (
            <View style={styles.headerOptions}>
                <TouchableHighlight
                    style={styles.headerOption}
                    onPress={this.props.save}
                    underlayColor="#FFB300">
                    <Icon name="save" style={styles.headerFont}/>
                </TouchableHighlight>
            </View>
        );
    }
}