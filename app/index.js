import React from 'react';
import { AsyncStorage, Alert } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import AuthScreen from "./components/AuthScreen/AuthScreen";
import MainScreen from "./components/MainScreen/MainScreen";
import TrashScreen from "./components/TrashScreen/TrashScreen";
import NoteEditScreen from "./components/NoteEditScreen/NoteEditScreen";

/**
 * This is a start point of the app.
 *
 * Primary objectives of this component are:
 * 1) Initialize firebase;
 * 2) Check if user was signed in previously, or not;
 * 3) If user is signed in, it will validate his/her authorization with firebase;
 * 4) Display Auth Screen or Main Screen for the user.
 *
 * @version 1.0
 */
export default class App extends React.Component {
    /**
     * Firebase configuration parameters.
     */
    static firebaseConfig = {
        apiKey: "AIzaSyDgDxD9wZJcUXPqB5cVk8nfxZvdFeQ353s",
        authDomain: "react-native-notes-d3f40.firebaseapp.com",
        databaseURL: "https://react-native-notes-d3f40.firebaseio.com",
        projectId: "react-native-notes-d3f40",
        storageBucket: "react-native-notes-d3f40.appspot.com",
        messagingSenderId: "972352806941"
    };

    /**
     * Navigation screens for DrawerNavigator.
     */
    static navigation = {
        Main:  { screen: MainScreen     }, // Main Screen
        Trash: { screen: TrashScreen    }, // Trash (deleted) Screen
        Edit:  { screen: NoteEditScreen }, // Note edit screen
        Auth:  { screen: AuthScreen     } // Authorization Screen
    };

    /**
     * Initialize firebase and set up this.state.
     * @param props
     */
    constructor(props) {
        super(props);

        firebase.initializeApp(App.firebaseConfig); // Initialize firebase

        this.state = {
            signedIn: undefined, // True if user is signed in (AsyncStorage & firebase)
            screen: undefined // By default user will see Auth Screen (if state signedIn is false)
        };
    }

    /**
     * Reads data from AsyncStorage, and then calls this.updateInitialScreen() function.
     * If user fails firebase authentication, it will return him/her to the Auth Screen.
     */
    componentWillMount() {
        // Check AsyncStorage signedIn value
        AsyncStorage.getItem("signedIn")
            .then(signedIn => {
                this.updateInitialScreen(signedIn);
            })
            .catch(error => {
                Alert.alert(
                    "Error! Can't read data from the storage!", // Error title
                    `Error message: ${error}` // Error message
                );
            });

        // Check firebase authentication
        firebase.auth().onAuthStateChanged((user) => {
            if (!user && this.state.signedIn) {
                this.updateInitialScreen(false);
            }
        });
    }

    /**
     * Update signedIn and screen states.
     * @param signedIn {String} in JSON format
     */
    updateInitialScreen(signedIn) {
        signedIn = JSON.parse(signedIn);

        this.setState({
            signedIn: signedIn,
            screen: {
                initialRouteName: signedIn ? 'Main' : 'Auth' // Initial screen
            }
        });
    }

    /**
     * Render app.
     * @returns {DrawerNavigator} with initialRouteName 'Auth' or 'Main' (based on signedIn state)
     */
    render() {
        // Wait for AsyncStorage response
        if(typeof this.state.screen === 'undefined') return null;

        const Navigation = DrawerNavigator(App.navigation, this.state.screen);

        return <Navigation />; // Render app
    }
}