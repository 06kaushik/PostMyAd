import React, { useEffect, useReducer, useMemo, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RootStack from './src/navigation/RootStackNavigator/RootStack';
import { ContextApi } from './src/component/Contextapi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FETCH_URL } from './src/api/FetchApi';
import AuthStack from './src/navigation/AuthStackNavigator/AuthStack';
import HomeStack from './src/navigation/HomeStackNavigation/HomeStack';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import SplashScreen from './src/SplashScreen';
import messaging from '@react-native-firebase/messaging';
import UserDashBoard from './src/screens/UserScreens/DashboardScreen';
import UserHomeStack from './src/navigation/UserStack/UserHomeStack';
import AgencyHomeStack from './src/navigation/AddAgencyHomeStack/HomeStackAgency';
import { adminRequest } from './src/screens/UserScreens/AxiosInstance'


messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message is handled in the background!', remoteMessage);
});

const Stack = createNativeStackNavigator();



const App = () => {

  const [userDetail, setDetail] = useState(null)
  // console.log('user DEtail', userDetail);
  const [userRole, setUserRole] = useState(4)

  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      // console.log('TOKEN FCM', fcmToken);
    }
  }

  checkToken();


  const [splash, setSplash] = useState(true);

  adminRequest.defaults.baseURL = FETCH_URL;
  let initialState = {
    userToken: null
  }


  const authReducer = (prevState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...prevState,
          userToken: action.userToken

        };
      case 'LOGOUT':
        return {
          ...prevState,
          userToken: null

        };
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.userToken

        };

    }

  }

  const [authState, dispatch] = useReducer(authReducer, initialState);

  const authData = useMemo(() => ({
    login: async (userToken, user) => {

      try {
        await AsyncStorage.setItem('TOKEN', JSON.stringify(userToken))
        await AsyncStorage.setItem('USER', JSON.stringify(user))
        // console.log("USER DAETAIL ++> ", user)
        setDetail(user)

        dispatch({ type: 'LOGIN', userToken })

        adminRequest.defaults.headers.common = { Authorization: `Bearer ${userToken}` };

      } catch (error) {

      }
    },
    logout: async (userToken, user) => {
      try {
        await AsyncStorage.removeItem('TOKEN')
        await AsyncStorage.removeItem('USER')

        dispatch({ type: 'LOGOUT' })

      } catch (error) {

      }
    }
  }))

  const getUser = async () => {
    try {
      let userDetail = await AsyncStorage.getItem('USER');
      let data = JSON.parse(userDetail);
      console.log('USER DATA IN APP', data);
      setDetail(data)
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  useEffect(() => {
    getUser();
  }, [])


  useEffect(() => {
    const retriveToken = async () => {
      let userToken = await AsyncStorage.getItem('TOKEN')
      dispatch({ type: 'RETRIEVE_TOKEN', userToken: userToken ? JSON.parse(userToken) : null })
      adminRequest.defaults.headers.common = { Authorization: `Bearer ${JSON.parse(userToken)}` };
    }
    retriveToken()

  }, [])

  useEffect(() => {
    setTimeout(() => {
      setSplash(false)
    }, 2000)

  }, [])

  return (
    <ContextApi.Provider value={authData} >
      <NavigationContainer>
        {
          splash ? <SplashScreen /> :
            authState?.userToken === null ? (<AuthStack />) : (authState.userToken !== null && userDetail?.userRole === 1) ? (<HomeStack />) :
              (authState.userToken !== null && userDetail?.userRole === 3) ? (<AgencyHomeStack />) :
                (authState.userToken !== null && userDetail?.userRole === 4) ? (<UserHomeStack />) : (<AuthStack />)
          // authState.userToken === null ? (<AuthStack />) : (<HomeStack />)

          // authState.userToken === null ? (<AuthStack />) : authState.userToken !== null && userRole === 1 ? (<HomeStack />) 
          // : (<AgencyHomeStack />)

        }
      </NavigationContainer>
    </ContextApi.Provider>




  )

}

export default App;