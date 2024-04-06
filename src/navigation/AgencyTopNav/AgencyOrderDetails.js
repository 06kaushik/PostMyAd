import React, { useState, useEffect } from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import images from "../../constant/Images";
import LinearGradient from 'react-native-linear-gradient';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AgencyOrderOverview from "../../screens/AddAgencyScreens/AgencyOrderScreens/AgencyOverview";
import AgencyOrderBillboard from "../../screens/AddAgencyScreens/AgencyOrderScreens/AgencyBillboards";
import AgencyOrderAnalytics from "../../screens/AddAgencyScreens/AgencyOrderScreens/AgencyOrderAnalytics";




const Tab = createMaterialTopTabNavigator();

const AgencyOrderDetails = ({ navigation, route }) => {
    return (
        <>

            <View>
                <View style={{ height: 78, backgroundColor: 'rgba(183,54,248,255)' }}>
                    <TouchableOpacity onPress={() => navigation.goBack('')}>
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
                tabBarStyle: { elevation: 4, marginTop: 10 },
                tabBarIndicatorStyle: {backgroundColor:'rgba(183,54,248,255)'}
                


            }}>

                <Tab.Screen name="Overview" component={AgencyOrderOverview} initialParams={{ OrderDetail: route.params }}/>
                <Tab.Screen name="Billboards" component={AgencyOrderBillboard} initialParams={{ OrderDetail: route.params }} />
                <Tab.Screen name="Analytics" component={AgencyOrderAnalytics} initialParams={{ OrderDetail: route.params }} />


            </Tab.Navigator>
        </>
    )


}

export default AgencyOrderDetails

const styles = StyleSheet.create({

})