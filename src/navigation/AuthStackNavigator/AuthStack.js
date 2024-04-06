import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "../../screens/LoginScreen";
import SignUpscreen from "../../screens/SignUpScreen";
import VerificationScreen from "../../screens/MobileVerificationScreen";
import PersonalDetail from "../../screens/PersonalDetailScreen";
import EmailVerification from "../../screens/EmailVerification";
import ConnectYourAccount from "../../screens/ConnectYourAccount";
import SelectOptionScreen from "../../screens/SelectOptionScreen";
import PublishAdScreen from "../../screens/PublishAdScreen";
import BrandScreen from "../../screens/BrandScreen";
import ExpandScreen from "../../screens/ExpandScreen";
import { roundToNearestPixel } from "react-native/Libraries/Utilities/PixelRatio";

const Stack = createStackNavigator();

const AuthStack = ({route,navigation}) => {
    return( 
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="LoginScreen" component={LoginScreen}/>
              <Stack.Screen name="SignUp" component={SignUpscreen}/>
              <Stack.Screen name="Verification" component={VerificationScreen}/>
              <Stack.Screen name="PersonalDetail" component={PersonalDetail}/>
              <Stack.Screen name="EmailVerification" component={EmailVerification} initialParams={{mobile:roundToNearestPixel.params}}/>
              <Stack.Screen name="AccountConnect" component={ConnectYourAccount}/>
              <Stack.Screen name="SelectOption" component={SelectOptionScreen}/>
              <Stack.Screen name="PublishAdd" component={PublishAdScreen}/>
              <Stack.Screen name="Brand" component={BrandScreen}/>
              <Stack.Screen name="Expand" component={ExpandScreen}/>
            </Stack.Navigator>
          
    )
}

export default AuthStack;