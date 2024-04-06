import React from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import images from "../../constant/Images";
import LinearGradient from 'react-native-linear-gradient';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AgencyPersonal from "../../screens/AddAgencyScreens/AddMemberScreens/AgencyPersonal";


const Tab = createMaterialTopTabNavigator();

const AgencyAddMember = ({navigation}) => {

    return (

        <>
         <View style={{ backgroundColor: 'rgba(183,54,248,255)', height: 78 }}>
                <View style={{ height: 65 }}>

                    <View>

                        <TouchableOpacity onPress={() => navigation.goBack('')}>
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

                <Tab.Screen name="Personal" component={AgencyPersonal} />
                {/* <Tab.Screen name="ID Proof" component={IdProofScreen} /> */}

            </Tab.Navigator>
        </>
    )
}


export default AgencyAddMember