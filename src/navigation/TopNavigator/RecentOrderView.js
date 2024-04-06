import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity, } from 'react-native'
import images from "../../constant/Images";
import LinearGradient from 'react-native-linear-gradient';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import RecentOverview from "../../screens/RecentOrderOverview";
import RecentBillBoard from "../../screens/RecentOrderBill";
import RecentAnalytics from "../../screens/RecentAnalystics";
import { roundToNearestPixel } from "react-native/Libraries/Utilities/PixelRatio";

const Tab = createMaterialTopTabNavigator();

const RecentOrderView = ({navigation,route}) => {

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
                        <Text style={{ alignSelf: 'center', bottom: 19, fontFamily: 'Oswald-Bold', color: 'white' }}>Ad OverView</Text>
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
                tabBarStyle: { elevation: 4,bottom:'1%' }
                
            }}>
                {/* <Tab.Screen name="Overview" component={OrderOverview} initialParams={{campaignName: route.params.campaignName, startscheduleDate: route.params.startscheduleDate,endscheduleDate: route.params.endscheduleDate,screens: route.params.screens,aboutCampaign: route.params.aboutCampaign}} />
                <Tab.Screen name="Billboards" component={OrderBillBoards} />
                <Tab.Screen name="Analytics" component={OrderAnalytics}  /> */}
                 <Tab.Screen name="OverView" component={RecentOverview} initialParams={{adTitle :route?.params,startscheduleDate :route?.params,endscheduleDate: route?.params,aboutAd: route?.params,deviceId: route?.params}} />
                 <Tab.Screen name="BillBoards" component={RecentBillBoard} initialParams={{deviceId: route?.params}} />
                 <Tab.Screen name="Analytics" component={RecentAnalytics} />



            </Tab.Navigator>

        </>
    )
}

export default RecentOrderView

const styles = StyleSheet.create({
    orderimg: {
        width: '100%'
    }
})