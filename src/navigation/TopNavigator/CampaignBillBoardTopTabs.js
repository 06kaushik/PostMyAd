import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity, } from 'react-native'
import images from "../../constant/Images";
import LinearGradient from 'react-native-linear-gradient';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import OrderOverview from "../../screens/OrderScreen/OrderOverview";
import OrderBillBoards from "../../screens/OrderScreen/OrderBillBoards";
import OrderAnalytics from "../../screens/OrderScreen/OrderAnalytics";


const Tab = createMaterialTopTabNavigator();

const CampaignBillBoardTopTabs = ({ navigation, route }) => {

    return (
        <>

            <View>
                <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ height: 60 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <View style={{ marginTop: '8%' }}>
                            <Image source={images.back} style={{ marginLeft: 8, }} />
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={{ alignSelf: 'center', bottom: 19, fontFamily: 'Oswald-Bold', color: 'white' }}>Campaign Overview</Text>
                    </View>
                </LinearGradient>
                <View>
                    <Image source={images.order} style={styles.orderimg} />
                </View>
            </View>

            <Tab.Navigator screenOptions={{
                tabBarLabelStyle: { fontFamily: 'Oswald-Bold' },
                tabBarActiveTintColor: '#6906C3',
                tabBarInactiveTintColor: '#A3A3A3',
                tabBarStyle: { elevation: 4, bottom: '1%' }

            }}>
                <Tab.Screen name="Overview" component={OrderOverview} initialParams={{ campaignName: route?.params?.campaignName, startscheduleDate: route?.params?.startscheduleDate, endscheduleDate: route?.params?.endscheduleDate, screens: route?.params?.screens, aboutCampaign: route?.params?.aboutCampaign }} />
                <Tab.Screen name="Billboards" component={OrderBillBoards} initialParams={{ screens: route?.params?.screens }} />
                <Tab.Screen name="Analytics" component={OrderAnalytics} />


            </Tab.Navigator>
        </>

    )
}



export default CampaignBillBoardTopTabs;

const styles = StyleSheet.create({
    linearStyle: {
        flexDirection: 'row',
        height: 70,

    },
    back: {
        left: 20,
        top: 40

    },
    prfile: {
        left: 33,
        top: 19,
        fontFamily: 'Oswald-Bold',
        fontSize: 14,
        color: 'white'

    },
    orderimg: {
        width: '100%'
    }
})