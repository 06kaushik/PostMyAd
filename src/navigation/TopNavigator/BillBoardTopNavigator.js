import React from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import images from "../../constant/Images";
import LinearGradient from 'react-native-linear-gradient';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BillBoardAdmin from "../../screens/BillBoardScreen/BillBoardAdmin";
import BillBoardOrderAdmin from "../../screens/BillBoardScreen/BillBoardOrderAdmin";
import BillBoardAnalyticalAdmi from "../../screens/BillBoardScreen/BillBoardAnalyticalAdmin";
import { roundToNearestPixel } from "react-native/Libraries/Utilities/PixelRatio";


const Tab = createMaterialTopTabNavigator();

const BillBoardTopNavigator = ({ navigation, route }) => {
    // const {route} = route.params
console.log('IDvnfgnfg', route);
    return (

        <>
            <View>
                <Image source={{uri: route?.params?.uri}} style={{ width: '100%',height:250 }} />
                <View style={{ bottom: '80%', left: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Image source={images.back} />
                    </TouchableOpacity>
                </View>
            </View>
            <Tab.Navigator screenOptions={{
                tabBarLabelStyle: { fontFamily:'Oswald-Bold' },
                tabBarActiveTintColor: '#6906C3',
                tabBarInactiveTintColor: 'black',
                tabBarStyle: { elevation: 4,bottom:'1%' }
            
            }}>
                <Tab.Screen name="Overview" component={BillBoardAdmin} initialParams={{ id: route?.params?.id,lattitude: route?.params?.lattitude,longitude: route?.params?.longitude,uri: route?.params?.uri }} />
                <Tab.Screen name="Order" component={BillBoardOrderAdmin} initialParams={{id: route?.params?.deviceId}}/>
                <Tab.Screen name="Analyticals" component={BillBoardAnalyticalAdmi} />


            </Tab.Navigator>
        </>

    )
}



export default BillBoardTopNavigator;

const styles = StyleSheet.create({
    backbttn: {
        top: 50,
        left: 20
    },
    headertxt: {
        color: 'white',
        left: 40,
        top: 32,
        fontSize: 14,
        fontWeight: 'bold'
    },



    box: {
        width: '90%',
        height: 160,
        margin: 10,
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 2,
        left: 10
        // flexDirection:'row'
    },


    textInput: {
        backgroundColor: '#F7F8FD',
        height: 40,
        paddingLeft: 20,
        margin: 15,
        borderRadius: 10,
        fontWeight: 'bold',
        width: '90%',
        // backgroundColor: 'grey',
    },
    searchBttn: {
        textAlign: 'center',
        margin: 3,
        color: 'white',
        fontWeight: 'bold',
        width: 80


    },
    searchContainer: {
        // width: '30%',
        height: 30,
        borderRadius: 5,
        right: 110,
        top: '27%'



    },

})