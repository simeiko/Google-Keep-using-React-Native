import React from 'react';
import {View, Alert, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import styles from "../../styles";
import SignButtons from "./SignButtons";
import AuthForm from "./Auth";
import * as firebase from "firebase";

/**
 * Auth Screen is used to log in or sign up the user.
 * When this screen is open, it will log out the user from AsyncStorage and firebase.
 *
 * @version 1.0
 */
export default class AuthScreen extends React.Component {
    /**
     * Options for DrawerNavigator.
     */
    static navigationOptions = {
        drawerLabel: "Sign Out",
        drawerIcon: <IconMaterial name="exit-to-app" style={{fontSize: 25}} />,
        drawerLockMode: 'locked-closed' // Drawer is not available when this screen is open
    };

    /**
     * Set up this.state and bind `this` to functions.
     * @param props
     */
    constructor(props){
        super(props);

        this.state = {
            content: null // null is default. Will display SignButtons Component.
        };

        this.changeContent = this.changeContent.bind(this);
    }

    /**
     * When this screen is about to be open, it will sign out the user.
     */
    componentWillMount() {
        // Clear AsyncStorage value
        AsyncStorage.setItem("signedIn", JSON.stringify(false))
            .catch(error => {
                Alert.alert(
                    "Error! Can't save data to the storage!", // Error title
                    `Error message: ${error}` // Error message
                );
            });

        // Sign out from firebase
        firebase.auth().signOut();
    }

    /**
     * Render the Auth Screen.
     * @returns {View}
     */
    render() {
        const content = this.getContent();

        return (
            <View style={styles.authScreen}>
                <View style={styles.authScreenIconView}>
                    <Icon name="sticky-note" style={styles.authScreenIcon}/>
                </View>

                {content}
            </View>
        );
    }

    /**
     * Change the content.
     * @param {String} content representing the content.
     */
    changeContent(content) {
        this.setState({
            content: content
        });
    }

    /**
     * Get content element.
     * Based on this.state.content value.
     * Possible values: "Sign In" for Sign In page, and "Sign Up" for Sign Up page.
     * All other values will be displayed as default content - SignButtons.
     *
     * @returns {AuthForm|SignButtons}
     */
    getContent() {
        switch(this.state.content) {
            case "Sign In":
                return <AuthForm
                    method="Sign In"
                    changeContent={this.changeContent}
                    navigation={this.props.navigation} />;
            case "Sign Up":
                return <AuthForm
                    method="Sign Up"
                    changeContent={this.changeContent}
                    navigation={this.props.navigation}/>;
            default:
                return <SignButtons changeContent={this.changeContent}/>;
        }
    }
}