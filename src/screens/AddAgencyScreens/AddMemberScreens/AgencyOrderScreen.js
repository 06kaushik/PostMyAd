import React from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import images from "../../../constant/Images";
import LinearGradient from 'react-native-linear-gradient';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AllOrderScreen from "./AllOrderScreen";
import LiveOrder from "./LiveOrderScreen";
import ApprovedScreen from "./ApprovedScreen";
import RejectedOrder from "./RejectedScreen";
import PublishedOrder from "./PublishedOrder";


const Tab = createMaterialTopTabNavigator();

const AgencyOrder = () => {
    return (
        <View style={styles.mainContainer}>
             <>
            
            <Tab.Navigator screenOptions={{
                tabBarLabelStyle: { fontFamily: 'Oswald-Bold',fontSize:9.5 },
                tabBarActiveTintColor: '#B937FA',
                tabBarInactiveTintColor: 'black',
                tabBarStyle: { elevation: 4, marginTop: 20, },
                tabBarIndicatorStyle:{backgroundColor:'rgba(183,54,248,255)'}
            }} 
            
            >
                <Tab.Screen name="All" component={AllOrderScreen} />
                <Tab.Screen name="Live" component={LiveOrder} />
                <Tab.Screen name="Approved" component={ApprovedScreen} />
                <Tab.Screen name="Rejected" component={RejectedOrder} />
                <Tab.Screen name="Publisehd" component={PublishedOrder} />

            </Tab.Navigator>
        </>
            

        </View>
    )
}
export default AgencyOrder

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white'

    }
})