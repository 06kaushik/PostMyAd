import React from "react";
import {View, Image,TouchableOpacity} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import UserBottomTab from "../UserBottomStack/UserBottom";
import UserBillBoard from "../../screens/UserScreens/UserBillBoard";
import UserOrderTopNavigator from "../UserTopNavigator/UserOrderTopNav";
import UserGallery from "../UserTopNavigator/UserGallery";
import UserProfileMainScreen from "../../screens/UserScreens/UserProfileScreen/UserProfileMainScreen";
import UserTermsandCondition from "../../screens/UserScreens/UserProfileScreen/UserTermCondition";
import UserPrivacyandPolicy from "../../screens/UserScreens/UserProfileScreen/UserPrivacy";
import UserContentPolicy from "../../screens/UserScreens/UserProfileScreen/UserContent";
import UserDrawerContent from "./UserDrawerContent";


const Drawer = createDrawerNavigator();



const UserDrawerNavigation = () => {

    return(
        <Drawer.Navigator screenOptions={{ headerShown: false , drawerPosition: "right",drawerType: 'slide',drawerStyle:{width:190,elevation:4,borderWidth:1,borderColor:'#dddddd',}, 
       }}  drawerContent={props => <UserDrawerContent {...props} /> }>
            <Drawer.Screen name="Home" component={UserBottomTab}/>
            <Drawer.Screen name="My BillBoards" component={UserBillBoard}/>
            <Drawer.Screen name="My Orders" component={UserOrderTopNavigator}/>
            <Drawer.Screen name="My Gallery" component={UserGallery}/>
            <Drawer.Screen name="My Profile" component={UserProfileMainScreen}/>
            {/* <Drawer.Screen name="Wallet" component={WalletTopNavigator}/> */}
            {/* <Drawer.Screen name="Settings" component={Setting}  /> */}
            <Drawer.Screen name="Terms & Condition" component={UserTermsandCondition}/>
            <Drawer.Screen name="My Privacy" component={UserPrivacyandPolicy}/>
            <Drawer.Screen name="My Content" component={UserContentPolicy}/>


            {/* <Drawer.Screen name="My BillBoards" component={BillBoardMainScreen}/> */}
        </Drawer.Navigator>
    )
}

export default UserDrawerNavigation;