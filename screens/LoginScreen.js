import React, {Component} from "react";
import {View, Text, Button, StyleSheet} from "react-native"
import firebase from "firebase";
import * as Google from 'expo-google-app-auth';

export default class LoginScreen extends Component{
    isUserEqual=(googleUser, firebaseUser)=> {
        if (firebaseUser) {
          var providerData = firebaseUser.providerData;
          for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.getBasicProfile().getId()) {
              // We don't need to reauth the Firebase connection.
              return true;
            }
          }
        }
        return false;
      }
       onSignIn=(googleUser)=> {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
          unsubscribe();
          // Check if we are already signed-in Firebase with the correct user.
          if (this.isUserEqual(googleUser, firebaseUser)) {
            // Build Firebase credential with the Google ID token.
            var credential = firebase.auth.GoogleAuthProvider.credential(
                googleUser.id_token,
                googleUser.accessToken);
      
            // Sign in with credential from the Google user.
            firebase.auth().signInWithCredential(credential)
            .then(function(result){
                if(result.additionalUserInfo.isNewUser){
                    firebase.database().ref("/users/"+result.user.uid)
                    .set({
                        gmail:result.user.email,
                        profile_picture:result.additionalUserInfo.profile.profile.profile_picture,
                        locale:result.additionalUserInfo.profile.locale,
                        first_name:result.additionalUserInfo.profile.given_name,
                        last_name:result.additionalUserInfo.profile.family_name,
                        current_theme:"dark"
                    })
                    .then(function(snapshot){
                        
                    })
                }
            })
            .catch((error) => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
          } else {
            console.log('User already signed-in Firebase.');
          }
        });
      }
      signInWithGoogleAsync=async()=> {
        try {
          const result = await Google.logInAsync({
            androidClientId: "826594397288-17mae5m6g3gh0d4t1cfpqsqpr4mc70gk.apps.googleusercontent.com",
            iosClientId: "826594397288-1b5j4ltokesdurtf6lmeleld7no3mn5i.apps.googleusercontent.com",
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
      }
      render(){
          return(
              <View>
                  <Button
                  title="sign in with google"
                  onPress={()=>this.signInWithGoogleAsync()}
                  />
              </View>
          )
      }
}
