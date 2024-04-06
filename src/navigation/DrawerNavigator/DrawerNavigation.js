import React from "react";
import {View, Image,TouchableOpacity} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTab from "../BottomTabNavigation/BottomTab";
import DrawerContent from "./DrawerContent";
import BillBoardMainScreen from "../../screens/BillBoardScreen/BillBoardMainScreen";
import OrderScreen1 from "../../screens/OrderScreen/OrderScreen1";
import GalleryScreen from "../../screens/GalleryScreen";
import CampaignScreen from "../../screens/CampaignScreen";
import ProfileScreen from "../../screens/ProfileScreens/ProfileScreen";
import UploadFromPhone from "../../screens/PostAddScreens/UploadFromPhoneScreen";
import Setting from "../../screens/Setting";
import TermsandCondition from "../../screens/TermsandCondition";
import PrivacyandPolicy from "../../screens/ProfileScreens/PrivacyandPolicy";
import TopNavigator from "../TopNavigator/TopNavigator";
import WalletTopNavigator from "../TopNavigator/WalletTopNavigator";
import ContentPolicy from "../../screens/ProfileScreens/ContentPolicy";


const Drawer = createDrawerNavigator();



const DrawerNavigation = () => {

    return(
        <Drawer.Navigator screenOptions={{ headerShown: false , drawerPosition: "right",drawerType: 'slide',drawerStyle:{width:190,elevation:4,borderWidth:1,borderColor:'#dddddd',}, 
       }}  drawerContent={props => <DrawerContent {...props} /> }>
            <Drawer.Screen name="Home" component={BottomTab}/>
            <Drawer.Screen name="My BillBoards" component={BillBoardMainScreen}/>
            <Drawer.Screen name="My Orders" component={OrderScreen1}/>
            <Drawer.Screen name="My Gallery" component={UploadFromPhone}/>
            <Drawer.Screen name="My Campaign" component={TopNavigator}/>
            <Drawer.Screen name="My Profile" component={ProfileScreen}/>
            <Drawer.Screen name="Wallet" component={WalletTopNavigator}/>
            <Drawer.Screen name="Settings" component={Setting}  />
            <Drawer.Screen name="Terms & Condition" component={TermsandCondition}/>
            <Drawer.Screen name="My Privacy" component={PrivacyandPolicy}/>
            <Drawer.Screen name="My Content" component={ContentPolicy}/>


            {/* <Drawer.Screen name="My BillBoards" component={BillBoardMainScreen}/> */}
        </Drawer.Navigator>
    )
}

export default DrawerNavigation;