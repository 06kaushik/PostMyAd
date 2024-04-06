import React from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import images from "../../constant/Images";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import UserOrderOverview from "../../screens/UserScreens/UserOrderScreens/UserOverview";
import UserOrderBillboard from "../../screens/UserScreens/UserOrderScreens/UserBillboards";
import UserOrderAnalytics from "../../screens/UserScreens/UserOrderScreens/UserOrderAnalytics";
import Video from "react-native-video";




const Tab = createMaterialTopTabNavigator();

const UserOrderDetails = ({ navigation, route }) => {
    console.log('ORDER DETAIL AND ADATTATATATTA>>>>>', route);

    return (
        <>

            <View>
                <View style={{ height: 78, backgroundColor: 'rgba(183,54,248,255)' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
                        <View style={{ marginTop: '8%' }}>
                            <Image source={images.back} style={{ marginLeft: 16, top: 5 }} />
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={{ alignSelf: 'center', bottom: 19, fontFamily: 'Oswald-Bold', color: 'white', fontSize: 18 }}>Order Summary</Text>
                    </View>
                </View>
            </View>

            <Tab.Navigator screenOptions={{
                tabBarLabelStyle: { fontFamily: 'Oswald-Bold', },
                tabBarActiveTintColor: '#6906C3',
                tabBarInactiveTintColor: 'black',
                tabBarStyle: { elevation: 4,},
            }}>

                <Tab.Screen name="Overview" component={UserOrderOverview} initialParams={{ OrderDetail: route.params }} />
                <Tab.Screen name="Billboards" component={UserOrderBillboard} initialParams={{ OrderDetail: route.params }} />
                <Tab.Screen name="Analytics" component={UserOrderAnalytics} initialParams={{ OrderDetail: route.params }} />


            </Tab.Navigator>
        </>
    )


}

export default UserOrderDetails

const styles = StyleSheet.create({
    ProfileImage: {
        height: 205,
        width: '100%',
        // borderRadius: 90,
        //  paddingRight:100,
        alignSelf: 'center'

    },

})