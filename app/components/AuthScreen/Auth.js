import React from 'react';
import {
    Text, AsyncStorage,
    TextInput, TouchableOpacity,
    KeyboardAvoidingView, Platform,
    BackHandler, ToastAndroid, Alert
} from 'react-native';
import styles from "../../styles";
import * as firebase from "firebase";
import {NavigationActions} from "react-navigation";

/**
 * Displays Sign In/Up form,
 * Allows to sign in/up with the firebase.
 *
 * @version 1.0
 */
export default class AuthForm extends React.Component {
    /**
     * Set up this.state and bind `this` to functions.
     * @param props
     */
    constructor(props) {
        super(props);

        this.goBack = this.goBack.bind(this);
        this.signUp = this.signUp.bind(this);
        this.signIn = this.signIn.bind(this);

        this.state = {
            loading: false, // "Loading..." text on buttons
            email: '', // Email input
            password: '' // Password input
        };
    }

    /**
     * Allow the user to go back by pressing the "back" button.
     */
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.goBack);
    }

    /**
     * Disallow the user to go back.
     */
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.goBack);
    }

    /**
     * Calls the provided callback function this.props.changeContent()
     * @returns {boolean} always true
     */
    goBack() {
        this.props.changeContent(null); // Reset the "content" parent state
        return true;
    }

    /**
     * Display Sign In/Up form to the user with two inputs (email & password).
     * @returns {KeyboardAvoidingView}
     */
    render() {
        const offset = (Platform.OS === 'android') ? 75 : 0; // Prevent the keyboard from overlapping the form
        const buttonColor = this.props.method === "Sign Up" ? styles.signUpButton : styles.signInButton;
        const onPress = this.props.method === "Sign Up" ? this.signUp : this.signIn; // On press function
        const buttonText = this.state.loading ? "Loading..." : this.props.method;

        return (
            <KeyboardAvoidingView style={styles.authForm} behavior="padding" keyboardVerticalOffset={offset}>
                <TextInput
                    style={styles.authFormInput}
                    keyboardType="email-address"
                    placeholderTextColor="#fff"
                    underlineColorAndroid="#E64A19"
                    onChangeText={(email) => this.setState({email})}
                    placeholder="Enter your email"/>

                <TextInput
                    style={styles.authFormInput}
                    secureTextEntry={true}
                    placeholderTextColor="#fff"
                    underlineColorAndroid="#E64A19"
                    onChangeText={(password) => this.setState({password})}
                    placeholder="Enter your password"/>

                <TouchableOpacity style={[styles.signButton, buttonColor]} onPress={onPress}>
                    <Text style={styles.signButtonText}>{buttonText}</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        );
    }

    /**
     * Sign Up the user with firebase.
     */
    signUp() {
        this.setState({
            loading: true
        });

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((user) => {
                this.changeScreen(); // Open "Main" Screen

                AuthForm.saveSignedInState(user.uid); // Save state to the AsyncStorage

                if(Platform.OS === 'android') {
                    ToastAndroid.show("Your account was created successfully.", ToastAndroid.SHORT);
                }
            })
            .catch((error) => {
                Alert.alert(error.message); // Display error message
                this.setState({ loading: false }); // Reset text button
            });
    }

    /**
     * Sign In user with firebase.
     */
    signIn() {
        this.setState({
            loading: true
        });

        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((user) => {
                this.changeScreen(); // Open "Main" Screen

                AuthForm.saveSignedInState(user.uid); // Save state to the AsyncStorage

                if(Platform.OS === 'android') {
                    ToastAndroid.show("Welcome back!", ToastAndroid.SHORT);
                }
            })
            .catch((error) => {
                Alert.alert(error.message); // Display error message
                this.setState({ loading: false }); // Reset text button
            });
    }

    /**
     * Change screen.
     * Reset back button actions.
     * @todo find other solution for resetting "back" button. This is not working correctly (sometimes).
     */
    changeScreen() {
        this.props.navigation.dispatch(
            NavigationActions.reset({
                index: 0,
                key: null,
                actions: [
                    NavigationActions.navigate({routeName: 'Main'})
                ]
            })
        );

        this.props.navigation.navigate('Main');
    }

    /**
     * Save "signedIn" item to the AsyncStorage.
     * @param {String} uid Firebase User UID
     */
    static async saveSignedInState(uid) {
        try {
            await AsyncStorage.setItem("signedIn", JSON.stringify(true));
            await AsyncStorage.setItem("uid", JSON.stringify(uid));
        } catch (error) {
            Alert.alert(
                "Error! Can't save data to the storage!", // Error title
                `Error message: ${error}` // Error message
            );
        }
    }
}