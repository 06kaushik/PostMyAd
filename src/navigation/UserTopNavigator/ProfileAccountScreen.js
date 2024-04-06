import React, { useState, useEffect } from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import images from "../../constant/Images";
import LinearGradient from 'react-native-linear-gradient';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import UserOrderOverview from "../../screens/UserScreens/UserOrderScreens/UserOverview";
import UserOrderBillboard from "../../screens/UserScreens/UserOrderScreens/UserBillboards";
import UserOrderAnalytics from "../../screens/UserScreens/UserOrderScreens/UserOrderAnalytics";
import PeresonalInfo from "../../screens/UserScreens/UserProfileScreen/UserPersonalInfo";
import UserKyc from "../../screens/UserScreens/UserProfileScreen/UserKyc";
import UserSocialMedia from "../../screens/UserScreens/UserProfileScreen/UserSocialMedia";


const Tab = createMaterialTopTabNavigator();

const UserProfileAccount = ({navigation}) => {
    return (
        <>

            <View>
                <View  style={{ height: 78,backgroundColor:'rgba(183,54,248,255)' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <View style={{ marginTop: '8%' }}>
                            <Image source={images.back} style={{ marginLeft: 16,top:5 }} />
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={{ alignSelf: 'center', bottom: 21, fontFamily: 'Oswald-Bold', color: 'white',fontSize:18 }}>Account</Text>
                    </View>
                </View>
            </View>

            <Tab.Navigator screenOptions={{
                tabBarLabelStyle: { fontFamily: 'Oswald-Bold',fontSize:10},
                tabBarActiveTintColor: '#6906C3',
                tabBarInactiveTintColor: 'black',
                tabBarStyle: { elevation: 4, marginTop: 10 },
                tabBarIndicatorStyle:{backgroundColor:'rgba(183,54,248,255)'}

            }}>

                <Tab.Screen name="Personal Information" component={PeresonalInfo} />
                {/* <Tab.Screen name="KYC" component={UserKyc} />
                <Tab.Screen name="Social Media" component={UserSocialMedia} /> */}
                

            </Tab.Navigator>
        </>
    )


}

export default UserProfileAccount

const styles = StyleSheet.create({

})