import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import UserBottomTab from "../UserBottomStack/UserBottom";
import AgencyBottomTab from "../AddAgencyBottom/AddAgencyBottom";
import PersonalDetailScreen from "../../screens/AddAgencyScreens/AddMemberScreens/PersonalDetail";
import IdProofScreen from "../../screens/AddAgencyScreens/AddMemberScreens/IdProofScreen";
import MemberAddScreen from "../AgencyTopNav/MemberTopNav";
import MembersProfile from "../AgencyTopNav/MembersProfile";
import SecurityScreen from "../../screens/AddAgencyScreens/AgencyProfileScreen/SecurityAgency";
import AgencyNotification from "../../screens/AddAgencyScreens/AgencyProfileScreen/NotificationAgency";
import AgencyAccount from "../AgencyTopNav/AgencyAccount";
import AgencyOrderDetails from "../AgencyTopNav/AgencyOrderDetails";
import AllMemberScreen from "../../screens/AddAgencyScreens/AddMemberScreens/AllMemberScreen";
import AgencyGallery from "../AgencyTopNav/AgencyGallery";
import AgencyTermsandCondition from "../../screens/AddAgencyScreens/AgencyProfileScreen/AgencyTerm";
import AgencyPrivacyandPolicy from "../../screens/AddAgencyScreens/AgencyProfileScreen/AgencyPrivacy";
import AgencyContentPolicy from "../../screens/AddAgencyScreens/AgencyProfileScreen/AgencyContent";
import AgencyDrawerNavigation from "../AgencyDrawerNavigation/AgencyDrawerNavigation";
import AgencyWalletScreen from "../../screens/AddAgencyScreens/AgencyWallet/AgencyWalletScreen";
import AgencyMoneyAddedScreen from "../../screens/AddAgencyScreens/AgencyWallet/AgencyMoneyAdded";
import AgencyMoneyPaidScreen from "../../screens/AddAgencyScreens/AgencyWallet/AgencyMoneyPaid";
import AgencyTransferFailed from "../../screens/AddAgencyScreens/AgencyWallet/AgencyTransferFail";
import AgencyDeposite from "../../screens/AddAgencyScreens/AgencyWallet/AgencyDeposite";
import AgencyWithdraw from "../../screens/AddAgencyScreens/AgencyWallet/AgencyWithdraw";
import AgencyWithdrawDetail from "../../screens/AddAgencyScreens/AgencyWallet/AgencyWithdrawDetailScreen";
import AgencyAllTransaction from "../../screens/AddAgencyScreens/AgencyWallet/AgencyAllTransaction";
import AgencyMainBillBoard from "../../screens/AddAgencyScreens/AgencyBillBoardScreens.js/AgencyBillBoard";
import AgencyPostAddScreen from "../../screens/AddAgencyScreens/AgencyBillBoardScreens.js/AgencyAddPost";
import AgencyTimeSlotScreen from "../../screens/AddAgencyScreens/AgencyBillBoardScreens.js/AgencyTimeSlot";
import AgencyContentScreen from "../../screens/AddAgencyScreens/AgencyBillBoardScreens.js/AgencyAdContent";
import AgencyPaymentScreen from "../../screens/AddAgencyScreens/AgencyBillBoardScreens.js/AgencyPaymentScreen";
import AgencyMap from "../../screens/AddAgencyScreens/AgencyBillBoardScreens.js/AgencyMap";
import AgencyBillGallery from "../AgencyTopNav/AgencyBillGallery";
import AgencyGalleryPaymentScreen from "../../screens/AddAgencyScreens/AgencyBillBoardScreens.js/AgencyGalleryPayment";
import AgencyMemberProfile from "../AgencyTopNav/AgencyMemberProfile";
import AgencyAddMember from "../AgencyTopNav/AgencyAddMember";
import AgencyCityBillBoard from "../../screens/AddAgencyScreens/AgencyCityBillBoard";
import AgencyBrowseBillBoard from "../../screens/AddAgencyScreens/AgencyBrowseBill";
import ProfileMainScreen from "../../screens/AddAgencyScreens/AgencyProfileScreen/ProfileMainScreen";
import AgencyAnalytics from "../../screens/AddAgencyScreens/AgencyProfileScreen/AgencyAnalytics";
import AgencyWishlistBill from "../../screens/AddAgencyScreens/AgencyWishlist";




const Stack = createStackNavigator();

const AgencyHomeStack = ({ route, navigation }) => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="LoginScreen" component={LoginScreen}/> */}
        <Stack.Screen name="Home" component={AgencyDrawerNavigation} />
        <Stack.Screen name="MemberPersonalDetail" component={MemberAddScreen} />
        <Stack.Screen name="MembersProfile" component={MembersProfile} />
        <Stack.Screen name="AgencySecurity" component={SecurityScreen} />
        <Stack.Screen name="AgencyNotifiction" component={AgencyNotification} />
        <Stack.Screen name="AgencyAccount" component={AgencyAccount} />
        <Stack.Screen name="AgencyOrderDetails" component={AgencyOrderDetails} />
        <Stack.Screen name="AllmemberScreen" component={AllMemberScreen} />
        <Stack.Screen name="AgencyGallery" component={AgencyGallery} />
        <Stack.Screen name="AgencyTerms" component={AgencyTermsandCondition} />
        <Stack.Screen name="AgencyPrivacy" component={AgencyPrivacyandPolicy} />
        <Stack.Screen name="AgencyContent" component={AgencyContentPolicy} />
        <Stack.Screen name="AgencyWallet" component={AgencyWalletScreen} />
        <Stack.Screen name="AgencyMoneyAdded" component={AgencyMoneyAddedScreen} />
        <Stack.Screen name="AgencyMoneyPaid" component={AgencyMoneyPaidScreen} />
        <Stack.Screen name="AgencyTransferFail" component={AgencyTransferFailed} />
        <Stack.Screen name="AgencyDeposite" component={AgencyDeposite} />
        <Stack.Screen name="AgencyWithdraw" component={AgencyWithdraw} />
        <Stack.Screen name="AgencyWithdrawDetail" component={AgencyWithdrawDetail} />
        <Stack.Screen name="AgencyAllTransaction" component={AgencyAllTransaction} />
        <Stack.Screen name="AgencyMainBillBoards" component={AgencyMainBillBoard} />
        <Stack.Screen name="AgencyAddPost" component={AgencyPostAddScreen} />
        <Stack.Screen name="AgencyTimeSlot" component={AgencyTimeSlotScreen} />
        <Stack.Screen name="AgencyAdContent" component={AgencyContentScreen} />
        <Stack.Screen name="AgencyPayment" component={AgencyPaymentScreen} />
        <Stack.Screen name="AgencyMap" component={AgencyMap} />
        <Stack.Screen name="AgencyBillGallery" component={AgencyBillGallery} />
        <Stack.Screen name="AgencyGalleryPayment" component={AgencyGalleryPaymentScreen} />
        <Stack.Screen name="AgencyMemberProfile" component={AgencyMemberProfile} />
        <Stack.Screen name="AgencyAddMember" component={AgencyAddMember} />
        <Stack.Screen name="AgencyCityBillboard" component={AgencyCityBillBoard} />
        <Stack.Screen name="AgencyBrowseBillboard" component={AgencyBrowseBillBoard} />
        <Stack.Screen name="AgencyProfileMain" component={ProfileMainScreen} />
        <Stack.Screen name="AgencyAnalytics" component={AgencyAnalytics} />
        <Stack.Screen name="AgencyWishlist" component={AgencyWishlistBill} />







       
        
        </Stack.Navigator>

)

}

export default AgencyHomeStack;