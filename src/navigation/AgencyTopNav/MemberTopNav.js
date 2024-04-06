import React from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import images from "../../constant/Images";
import LinearGradient from 'react-native-linear-gradient';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PersonalDetailScreen from "../../screens/AddAgencyScreens/AddMemberScreens/PersonalDetail";
import IdProofScreen from "../../screens/AddAgencyScreens/AddMemberScreens/IdProofScreen";


const Tab = createMaterialTopTabNavigator();

const MemberAddScreen = ({ navigation }) => {

    return (

        <>
            <View style={{ backgroundColor: 'rgba(183,54,248,255)', height: 78 }}>
                <View style={{ height: 65 }}>

                    <View>

                        <TouchableOpacity onPress={() => navigation.goBack('Home')}>
                            <View style={{ flexDirection: 'row', marginTop: '8%', marginLeft: 16 }}>
                                <Image source={images.back} style={{ marginTop: 5, top: 5 }} />
                                <Text style={{ color: 'white', fontFamily: 'Oswald-Bold', marginLeft: 8, fontSize: 18 }}>Add Member</Text>
                            </View>

                        </TouchableOpacity>

                    </View>
                </View>
            </View>


            <Tab.Navigator screenOptions={{
                tabBarLabelStyle: { fontFamily: 'Oswald-Bold' },
                tabBarActiveTintColor: '#6906C3',
                tabBarInactiveTintColor: 'black',
                tabBarStyle: { elevation: 4, }
            }}>

                <Tab.Screen name="Personal Details" component={PersonalDetailScreen} />
                {/* <Tab.Screen name="ID Proof" component={IdProofScreen} /> */}

            </Tab.Navigator>
        </>

    )
}



export default MemberAddScreen;

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
        color: 'black'
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