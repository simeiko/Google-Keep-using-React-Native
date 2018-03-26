# Google Keep using React Native & Firebase
## Description
This application is used to store notes at the Google Firebase database.

## Features
- Authorization (Sign In & Sign Up)
- Multiple Screens with React Navigation (https://reactnavigation.org/)
- Real time firebase database listening
- Once user is signed in/up, the app will remember user with AsyncStorage
- Trash bin with deleted notes
- Ability to delete notes or restore them from Trash bin
- Note selection in the Trash bin
- Note color selection
- To delete note from Main screen, make a long press on the note

## Platforms
- Android is supported.
- iOS *may* work, but was not tested.

## How to install
Open the project folder in terminal and run the following commands:
```
npm install
npm start
```
Then use Expo and scan the QR-code.

## Video
https://youtu.be/0f9VR1AIlg4

## Known issues
- After signing in/up, the back button may return to Auth screen.
