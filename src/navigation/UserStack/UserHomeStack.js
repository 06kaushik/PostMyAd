import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import UserBottomTab from "../UserBottomStack/UserBottom";
import UserMainBillBoard from "../../screens/UserScreens/UserBillBoard/BillBoardBoard";
import TimeSlotScreen from "../../screens/UserScreens/UserBillBoard/UserTimeSlot";
import UserContentScreen from "../../screens/UserScreens/UserBillBoard/UserAddContent";
import UserOrderSummary from "../../screens/UserScreens/UserBillBoard/UserOrderSummary";
import PaymentScreen from "../../screens/UserScreens/UserBillBoard/PaymentScreen";
import UserPostAddScreen from "../../screens/UserScreens/UserBillBoard/UserPostAddScreen";
import UserOrderDetails from "../UserTopNavigator/UserOrderDetails";
import UserSecurityScreen from "../../screens/UserScreens/UserProfileScreen/UserSecurity";
import UserNotification from "../../screens/UserScreens/UserProfileScreen/UserNotification";
import UserProfileAccount from "../UserTopNavigator/ProfileAccountScreen";
import UserGallery from "../UserTopNavigator/UserGallery";
import UserUploadContent from "../../screens/UserScreens/UserGallery/UserUploadContentfromGallery";
import UserAddIt from "../../screens/UserScreens/UserAdIt";
import UserBillBoard from "../../screens/UserScreens/UserBillBoard";
import UserTermsandCondition from "../../screens/UserScreens/UserProfileScreen/UserTermCondition";
import UserPrivacyandPolicy from "../../screens/UserScreens/UserProfileScreen/UserPrivacy";
import UserContentPolicy from "../../screens/UserScreens/UserProfileScreen/UserContent";
import UserDrawerNavigation from "../UserDrawerNavigator/UserDrawerNavigation";
import { Easing } from "react-native-reanimated";
import UserMap from "../../screens/UserScreens/UserBillBoard/UserMap";
import AddBillboards from "../../screens/UserScreens/UserBillBoard/UserAddBillboards";
import GalleryPaymentScreen from "../../screens/UserScreens/UserBillBoard/GalleryPaymentScreen";
import UserDashGallery from "../UserTopNavigator/UserDashGallery";
import WalletScreen from "../../screens/UserScreens/UserWalletScreen/WalletScreen";
import MoneyAddedScreen from "../../screens/UserScreens/UserWalletScreen/MoneyAdded";
import MoneyPaidScreen from "../../screens/UserScreens/UserWalletScreen/MoneyPaid";
import TransferFailed from "../../screens/UserScreens/UserWalletScreen/TransferFailed";
import Deposite from "../../screens/UserScreens/UserWalletScreen/Deposite";
import Withdraw from "../../screens/UserScreens/UserWalletScreen/Withdraw";
import WithdrawDetail from "../../screens/UserScreens/UserWalletScreen/WithdrawDetail";
import AllTransaction from "../../screens/UserScreens/UserWalletScreen/AllTransaction";
import UserCoupons from "../../screens/UserScreens/UserCoupons/UseCoupons";
import WishlistBill from "../../screens/UserScreens/WishlistBillboard";
import BrowseBillBoard from "../../screens/UserScreens/BrowseBillBoard";
import CityBillBoard from "../../screens/UserScreens/CityBillBoard";
import UserProfileMainScreen from "../../screens/UserScreens/UserProfileScreen/UserProfileMainScreen";
import CustomerSupport from "../../screens/UserScreens/UserProfileScreen/CustomerSupport";
import Analytics from "../../screens/UserScreens/UserProfileScreen/Analytics";


const Stack = createStackNavigator();

// const config = {
//   animation: 'spring',
//   config: {
//     stiffness:1000,
//     damping:50,
//     mass:3,
//     overshootClamping:false,
//     restDisplacementThreshold:0.01,
//     restSpeedThreshold:0.01
//   }
// }

// const closeConfig = {
//   animation: 'timing',
//   config:{
//     duration:200,
//     easing: Easing.linear,
//   }

// }

const UserHomeStack = ({ route, navigation }) => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      //   gestureEnabled:true,transitionSpec:{
      //   open:config,
      //   close:closeConfig
      // },
      // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS

    }}>
      {/* <Stack.Screen name="LoginScreen" component={LoginScreen}/> */}
      <Stack.Screen name="Home" component={UserDrawerNavigation} />
      <Stack.Screen name="AddIt" component={UserAddIt} options={{ animationEnabled: true }} />
      <Stack.Screen name="UserBillBoard" component={UserMainBillBoard} />
      <Stack.Screen name="TimeSlot" component={TimeSlotScreen} />
      <Stack.Screen name="UserContent" component={UserContentScreen} />
      <Stack.Screen name="UserOrderSummary" component={UserOrderSummary} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="UserAddPost" component={UserPostAddScreen} />
      <Stack.Screen name="UserDetailScreen" component={UserOrderDetails} />
      <Stack.Screen name="UserSecurity" component={UserSecurityScreen} />
      <Stack.Screen name="UserNotification" component={UserNotification} />
      <Stack.Screen name="UserProfileAccount" component={UserProfileAccount} />
      <Stack.Screen name="UserGallery" component={UserGallery} />
      <Stack.Screen name="UserGalleryContent" component={UserUploadContent} />
      <Stack.Screen name="UserTerms" component={UserTermsandCondition} />
      <Stack.Screen name="UserPolicy" component={UserPrivacyandPolicy} />
      <Stack.Screen name="UserProfileContent" component={UserContentPolicy} />
      <Stack.Screen name="UserMap" component={UserMap} />
      <Stack.Screen name="AddBillboards" component={AddBillboards} />
      <Stack.Screen name="GalleryPayment" component={GalleryPaymentScreen} />
      <Stack.Screen name="DashBoardGallery" component={UserDashGallery} />
      <Stack.Screen name="WalletScreen" component={WalletScreen} />
      <Stack.Screen name="MoneyAdded" component={MoneyAddedScreen} />
      <Stack.Screen name="MoneyPaid" component={MoneyPaidScreen} />
      <Stack.Screen name="TransferFailed" component={TransferFailed} />
      <Stack.Screen name="Deposit" component={Deposite} />
      <Stack.Screen name="Withdraw" component={Withdraw} />
      <Stack.Screen name="WithdrawDetail" component={WithdrawDetail} />
      <Stack.Screen name="AllTransaction" component={AllTransaction} />
      <Stack.Screen name="UseCoupons" component={UserCoupons} />
      <Stack.Screen name="Wishlist" component={WishlistBill} />
      <Stack.Screen name="BrowseBill" component={BrowseBillBoard} />
      <Stack.Screen name="CityBillBoard" component={CityBillBoard} />
      <Stack.Screen name="UserProfileMain" component={UserProfileMainScreen} />
      <Stack.Screen name="UserCustomerSupport" component={CustomerSupport} />
      <Stack.Screen name="UserAnalytics" component={Analytics} />






      {/* <Stack.Screen name="UserbillFilter" component={UserBillBoard} initialParams={{VenueName: route?.params}} /> */}


    </Stack.Navigator>

  )

}

export default UserHomeStack;