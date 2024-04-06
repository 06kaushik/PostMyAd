import {Alert} from 'react-native'
import { FETCH_URL } from "../../api/FetchApi";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import RNRestart from 'react-native-restart';



export const adminRequest = axios.create({
    baseURL: FETCH_URL,
})

//we intercept every requests 
adminRequest.interceptors.request.use(async function (config) {
    // console.log("request from request Interceptor>>>", config);
    const accessToken = await AsyncStorage.getItem('TOKEN')
    if (accessToken) {
        config.headers.common = { Authorization: `Bearer ${accessToken}` };
    }
    //anything you want to attach to the requests such as token 
    return config;
}, error => {
    return Promise.reject(error)
})

//we intercept every response
adminRequest.interceptors.response.use(async function (config) {
    return config;
},
    async (error) => {
        if (error?.response?.status === 401) {
            return Alert.alert(
                "Session Expired?",
                "Login Again?",
                [
                    // The "Yes" button
                    {
                        text: "Logout",
                        onPress: () => {
                            // ToastAndroid.show("SESSION EXPIRED LOGIN AGAIN", ToastAndroid.LONG, ToastAndroid.CENTER);
                            AsyncStorage.removeItem('TOKEN')
                            AsyncStorage.removeItem('USER')
                            RNRestart.Restart()
                        },
                    },
                    // The "No" button
                    // Does nothing but dismiss the dialog when tapped
                    {
                        text: "No",
                    },
                ]
            );
        }
        //check for authentication or anything like that
        return Promise.reject(error)
    })

