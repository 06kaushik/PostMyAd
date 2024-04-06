// import React, { useEffect } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from '@react-navigation/stack';
// import { FETCH_URL } from "../../api/FetchApi";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from "axios";
// import HomeStack from "../HomeStackNavigation/HomeStack";
// import AuthStack from "../AuthStackNavigator/AuthStack";

// const Stack = createStackNavigator();

// const RootStack = ({navigation}) => {

//   const [token, setToken] = React.useState(null);

//   console.log('TOKENNNNN', token);
//   axios.defaults.baseURL = FETCH_URL;
//   axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

//   const getToken = async () => {
//     try {
//       let userData = await AsyncStorage.getItem('TOKEN');
//       let data = JSON.parse(userData);
//       console.log('DATA FROM TKOEN', data);
//       setToken(data)
//     } catch (error) {
//       console.log("Something went wrong", error);
//     }
//   }

//   useEffect(() => {
//     getToken();
//   }, [])



//   return (
//     <NavigationContainer>

//       {
//         token ?
//           <HomeStack />
//           :
//           <AuthStack />
//       }

//     </NavigationContainer>


//   )
// }

// export default RootStack;