import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import BottomTab from "../BottomTabNavigation/BottomTab";
import BillBoardMainScreen from "../../screens/BillBoardScreen/BillBoardMainScreen";
import BillBoardAdmin from "../../screens/BillBoardScreen/BillBoardAdmin";
import BillBoardOrderAdmin from "../../screens/BillBoardScreen/BillBoardOrderAdmin";
import BillBoardAnalyticalAdmi from "../../screens/BillBoardScreen/BillBoardAnalyticalAdmin";
import BillBoardAnalyticalSeeMore from "../../screens/BillBoardScreen/BillBoardAnalyticalAdmin1";
import BillBoardAnalyticalSeeMore1 from "../../screens/BillBoardAnalyticalAdmin2";
import AccountScreen from "../../screens/ProfileScreens/AccountScreen";
import SecurityScreen from "../../screens/ProfileScreens/SecurityScreen";
import ProfileScreen from "../../screens/ProfileScreens/ProfileScreen";
import NotificationScreen from "../../screens/ProfileScreens/NotificationScreen";
import OrderScreen1 from "../../screens/OrderScreen/OrderScreen1";
import OrderOverview from "../../screens/OrderScreen/OrderOverview";
import OrderBillBoards from "../../screens/OrderScreen/OrderBillBoards";
import OrderAnalytics from "../../screens/OrderScreen/OrderAnalytics";
import AddTimeScreen from "../../screens/PostAddScreens/AddTimeScreen";
import AddContentScreen from "../../screens/PostAddScreens/AddContentScreen";
import UploadFromPhone from "../../screens/PostAddScreens/UploadFromPhoneScreen";
import PhotoEffectScreen from "../../screens/PostAddScreens/PhotoEffectScreen";
import OrderSummary from "../../screens/PostAddScreens/OrderSummary";
import BillBoardSelection from "../../screens/PostAddScreens/BillBoardSelection";
import BillBoardSelection1 from "../../screens/PostAddScreens/BillBoardSelection1";
import CampaignUpcoming from "../../screens/CampaignScreen/CampaignUpcoming";
import CampaignOngoing from "../../screens/CampaignScreen/CampaignOngoingScreen";
import CampaignCompleted from "../../screens/CampaignScreen/CampaignCompletedScreen";
import AddNewCampaign from "../../screens/CampaignScreen/AddCampaignScreen";
import AddNewCampaign1 from "../../screens/CampaignScreen/AddCampaignScreen1";
import GalleryUploadContent from "../../gallery/UploadContent";
import DrawerNavigation from "../DrawerNavigator/DrawerNavigation";
import GalleryScreen from "../../screens/GalleryScreen";
import CampaignScreen from "../../screens/CampaignScreen";
import BillBoardTopNavigator from "../TopNavigator/BillBoardTopNavigator";
import CampaignBillBoardTopTabs from "../TopNavigator/CampaignBillBoardTopTabs";
import PostAddScreen from "../../screens/PostAddScreens/PostAddScreen";
import Setting from "../../screens/Setting";
import TermsandCondition from "../../screens/TermsandCondition";
import AddCampaignContent from "../../screens/CampaignScreen/AddCampaignContent";
import MapScreen from "../../screens/BillBoardScreen/MapScreen";
import TopNavigator from "../TopNavigator/TopNavigator";
import PostAddGallery from "../TopNavigator/PostaddGallery";
import OrderTopNavigator from "../TopNavigator/OrderTopNavigator";
import AllBillBoardMap from "../../screens/MapScreen2";
import PrivacyandPolicy from "../../screens/ProfileScreens/PrivacyandPolicy";
import ContentPolicy from "../../screens/ProfileScreens/ContentPolicy";
import RecentOrderData from "../../Data/RecentOrderData";
import RecentOrderView from "../TopNavigator/RecentOrderView";
import CampaignGallery from "../TopNavigator/CampaignGallery";
import CampaignSummary from "../../screens/CampaignScreen/CampaignSummary";
import SignUpscreen from "../../screens/SignUpScreen";


const Stack = createStackNavigator();

const HomeStack = ({ route, navigation }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="LoginScreen" component={LoginScreen}/> */}
      <Stack.Screen name="Home" component={DrawerNavigation} />
      <Stack.Screen name="BillBoard" component={BillBoardMainScreen} />
      <Stack.Screen name="BillBoardAdmin" component={BillBoardTopNavigator} />
      <Stack.Screen name="BillOrder" component={BillBoardOrderAdmin} />
      <Stack.Screen name="BillAnalytical" component={BillBoardAnalyticalAdmi} />
      <Stack.Screen name="BillAnalyticalSeeMore" component={BillBoardAnalyticalSeeMore} />
      <Stack.Screen name="BillAnalyticalSeeMore1" component={BillBoardAnalyticalSeeMore1} />
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="Security" component={SecurityScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="OrderScreen" component={OrderTopNavigator} />
      <Stack.Screen name="CampaignOverView" component={CampaignBillBoardTopTabs} />
      <Stack.Screen name="OrderBillBoard" component={OrderBillBoards} />
      <Stack.Screen name="OrderAnalytics" component={OrderAnalytics} />
      <Stack.Screen name="AddTimeScreen" component={AddTimeScreen} />
      <Stack.Screen name="AddContentScreen" component={AddContentScreen} />
      {/* <Stack.Screen name="UploadFromPhone" component={UploadFromPhone} /> */}
      <Stack.Screen name="PhotoEffectScreen" component={PhotoEffectScreen} />
      <Stack.Screen name="OrderSummary" component={OrderSummary} />
      <Stack.Screen name="BillBoardSelection" component={BillBoardSelection} />
      <Stack.Screen name="BillBoardSelection1" component={BillBoardSelection1} />
      <Stack.Screen name="CampaignUpcoming" component={CampaignUpcoming} />
      <Stack.Screen name="CampaignOngoing" component={CampaignOngoing} />
      <Stack.Screen name="CampaignCompleted" component={CampaignCompleted} />
      <Stack.Screen name="AddNewCampaign" component={AddNewCampaign} />
      <Stack.Screen name="AddNewCampaign1" component={AddNewCampaign1} />
      <Stack.Screen name="GalleryUploadContent" component={GalleryUploadContent} />
      <Stack.Screen name="Galleryy" component={PostAddGallery} />
      {/* <Stack.Screen name="Campaign" component={CampaignScreen} /> */}
      <Stack.Screen name="PostAdd" component={PostAddScreen} />
      <Stack.Screen name="Settings" component={Setting} />
      <Stack.Screen name="TermsandCondition" component={TermsandCondition} />
      <Stack.Screen name="Privacy" component={PrivacyandPolicy} />
      <Stack.Screen name="CampaignContent" component={AddCampaignContent} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="Map2" component={AllBillBoardMap} />
      <Stack.Screen name="ContentPolicy" component={ContentPolicy} />
      <Stack.Screen name="OrderOverView" component={RecentOrderView} />
      <Stack.Screen name="CampaignGallery" component={CampaignGallery} />
      <Stack.Screen name="CampaignSummary" component={CampaignSummary} />
     


    </Stack.Navigator>

  )

}

export default HomeStack;