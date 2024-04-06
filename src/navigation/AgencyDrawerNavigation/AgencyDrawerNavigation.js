import React from "react";
import {View, Image,TouchableOpacity} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import AgencyDrawerContent from "./AgencyDrawerContent";
import AgencyBottomTab from "../AddAgencyBottom/AddAgencyBottom";
import UserBillBoard from "../../screens/UserScreens/UserBillBoard";
import AgencyOrderTopNavigator from "../AgencyTopNav/AgencyOrderTopNav";
import AgencyGallery from "../AgencyTopNav/AgencyGallery";
import ProfileMainScreen from "../../screens/AddAgencyScreens/AgencyProfileScreen/ProfileMainScreen";
import AgencyTermsandCondition from "../../screens/AddAgencyScreens/AgencyProfileScreen/AgencyTerm";
import AgencyPrivacyandPolicy from "../../screens/AddAgencyScreens/AgencyProfileScreen/AgencyPrivacy";
import AgencyContentPolicy from "../../screens/AddAgencyScreens/AgencyProfileScreen/AgencyContent";


const Drawer = createDrawerNavigator();



const AgencyDrawerNavigation = () => {

    return(
        <Drawer.Navigator screenOptions={{ headerShown: false , drawerPosition: "right",drawerType: 'slide',drawerStyle:{width:190,elevation:4,borderWidth:1,borderColor:'#dddddd',}, 
       }}  drawerContent={props => <AgencyDrawerContent {...props} /> }>
            <Drawer.Screen name="Home" component={AgencyBottomTab}/>
            <Drawer.Screen name="My BillBoards" component={UserBillBoard}/>
            <Drawer.Screen name="My Orders" component={AgencyOrderTopNavigator}/>
            <Drawer.Screen name="My Gallery" component={AgencyGallery}/>
            <Drawer.Screen name="My Profile" component={ProfileMainScreen}/>
            {/* <Drawer.Screen name="Wallet" component={WalletTopNavigator}/> */}
            {/* <Drawer.Screen name="Settings" component={Setting}  /> */}
            <Drawer.Screen name="Terms & Condition" component={AgencyTermsandCondition}/>
            <Drawer.Screen name="My Privacy" component={AgencyPrivacyandPolicy}/>
            <Drawer.Screen name="My Content" component={AgencyContentPolicy}/>


            {/* <Drawer.Screen name="My BillBoards" component={BillBoardMainScreen}/> */}
        </Drawer.Navigator>
    )
}

export default AgencyDrawerNavigation;