import React, { useState, useContext, useRef, useEffect } from 'react'
import { View, Text, StatusBar, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator, Alert, ToastAndroid } from 'react-native'
import axios from 'axios'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { ContextApi } from '../component/Contextapi'


// React.useEffect(() => {
//     GoogleSignin.configure({
//         webClientId: "38837400447-7daiik93cl0a9431q1a8qq17qbub83of.apps.googleusercontent.com",
//         offlineAccess: true
//     });
// }, [])

const { login } = useContext(ContextApi);


export const googleAuth = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        await GoogleSignin.signIn().then(result => {
            console.log(result.user);
            googleAuthApi(result.user)
        });
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            alert('User cancelled the login flow !');
        } else if (error.code === statusCodes.IN_PROGRESS) {
            alert('Signin in progress');
            // operation (f.e. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            alert('Google play services not available or outdated !');
            // play services not available or outdated
        } else {
            console.log(error)
        }
    }

}

export const googleAuthApi = async (user) => {
    let body = {
        profile: user
    }
    console.log('RESPONSE FROM AUTH BODY', body);
    try {
        const resp = await axios.post('/api/normaluser/googleAuthUser', body)
        console.log('RESPONSE FROM AUTH API>><<', resp.data.user);
        login(resp.data.token, resp.data.user)

    } catch (error) {
        console.log('ERROR FROM AUTH ', error);

    }
}