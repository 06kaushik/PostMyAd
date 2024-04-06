import React from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import images from "../../constant/Images";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AgencyDetail from "../../screens/AddAgencyScreens/AgencyProfileScreen/AgencyDetail";
import AgencyAddress from "../../screens/AddAgencyScreens/AgencyProfileScreen/AgencyAddress";
import AgencyPoc from "../../screens/AddAgencyScreens/AgencyProfileScreen/AgencyPoc";
import AgencyKyc from "../../screens/AddAgencyScreens/AgencyProfileScreen/AgencyKyc";


const Tab = createMaterialTopTabNavigator();

const AgencyAccount = ({navigation}) => {

    return (

        <>
            <View style={{}}>
                <View>
                    <View  style={{ height: 60,backgroundColor:'rgba(183,54,248,255)' }}>
                        <TouchableOpacity onPress={() => navigation.goBack('')}>
                            <View style={styles.header} >
                                <Image style={styles.back} source={images.back} />
                                <Text style={styles.sec}>Account</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>

            <Tab.Navigator screenOptions={{
                tabBarLabelStyle: { fontFamily: 'Oswald-Bold',fontSize:10 },
                tabBarActiveTintColor: '#B937FA',
                tabBarInactiveTintColor: 'black',
                tabBarStyle: { elevation: 4, marginTop: 15 },
                tabBarIndicatorStyle:{backgroundColor:'rgba(183,54,248,255)'}

            }} >

                <Tab.Screen name="Agency Detail" component={AgencyDetail} />
                <Tab.Screen name="Address" component={AgencyAddress} />
                <Tab.Screen name="POC" component={AgencyPoc} />
                <Tab.Screen name="KYC" component={AgencyKyc} />

            </Tab.Navigator>
        </>

    )
}

export default AgencyAccount; 


const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        marginTop: 18
    },
    back: {
        marginLeft: 16,
        marginTop: 8
    },
    sec: {
        marginLeft: 8,
        color: '#FFFFFF',
        fontFamily: 'Oswald-SemiBold',
        fontSize: 14,
        top:3
    },
})