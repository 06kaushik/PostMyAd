import React from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import images from "../../constant/Images";
import LinearGradient from 'react-native-linear-gradient';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import UpcomingScreen from "../../screens/CampaignScreen/UpcomingScreen";
import CampaignOngoing from "../../screens/CampaignScreen/CampaignOngoingScreen";
import CampaignCompleted from "../../screens/CampaignScreen/CampaignCompletedScreen";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const Tab = createMaterialTopTabNavigator();

const TopNavigator = ({ navigation }) => {

    return (

        <>
             <View style={{backgroundColor:'white'}}>
                <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ height: 65 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: '8%' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                            <Image source={images.back} style={{ left: 20 }} />
                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontFamily:'Oswald-Bold', left: '30%' }}>Campaign</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('AddNewCampaign')}>
                            <Image source={images.plus1} style={{ height: 30, width: 30, right: '25%', bottom: 5 }} />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>


            <View >
            <TextInput
                    style={styles.textInput}
                    placeholder="Search here..."
                    placeholderTextColor='#5A5A5A' />
                <Image source={images.search} style={{ left: 27, bottom: 22, }} />
            </View>
            <Tab.Navigator screenOptions={{
                tabBarLabelStyle:{fontFamily:'Oswald-Bold'},
                tabBarActiveTintColor:'#6906C3',
                tabBarInactiveTintColor:'black',
                tabBarStyle:{elevation:4}
            }}>

                <Tab.Screen name="Upcoming" component={UpcomingScreen} />
                <Tab.Screen name="Ongoing" component={CampaignOngoing} />
                <Tab.Screen name="Completed" component={CampaignCompleted} />
            </Tab.Navigator>
        </>

    )
}



export default TopNavigator;

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

        height: hp(7),
        left: 16,
        borderRadius: 10,
        fontFamily: 'Oswald-SemiBold',
        width: wp(90),
        borderWidth: 1,
        borderColor: '#dddddd',
        right: 16,
        top: 12,
        paddingLeft: 40,
        backgroundColor: 'white',
        color:'black'
    },
    searchBttn: {
        textAlign: 'center',
        margin: 3,
        color: 'black',
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