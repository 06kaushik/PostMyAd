import React, { useState, useEffect } from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import images from "../../constant/Images";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AgencyOverVieww from "../../screens/AddAgencyScreens/AddMemberScreens/AgencyOvervieww";


const Tab = createMaterialTopTabNavigator();


const AgencyMemberProfile = ({ navigation, route }) => {


    const [userDetail, setUserDetail] = useState(null)
    const [walletAmount, setWalletAmount] = useState(null)

    const getUser = async () => {
        try {
            let userDetail = await AsyncStorage.getItem('USER');
            let data = JSON.parse(userDetail);
            setUserDetail(data)
        } catch (error) {
            console.log("Something went wrong", error);
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    const getWalletamount = async () => {
        let body = {
            userId: userDetail?._id
        }
        console.log('BODY OF WALLET AMOUNT', body);
        try {
            const resp = await axios.post('/api/payment/getWalletData', body)
            console.log('RESPONSE FROM WALLET AMOUNT APII', resp.data.msg);
            setWalletAmount(resp?.data?.msg)

        } catch (error) {
            console.log('ERROR FROM WALLET AMOUNT', error);
        }
    }

    // getWalletamount()
    useEffect(() => {
        getWalletamount()

    }, [userDetail?._id])

    return (
        <>
            <View style={{}}>
                <View>
                    <View style={{ height: 65, backgroundColor: 'rgba(183,54,248,255)' }}>

                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                <View style={{ marginTop: '8%', marginLeft: 16 }}>
                                    <Image source={images.back} style={{ marginTop: 5 }} />
                                    <View style={{ alignSelf: 'center', bottom: 20 }}>
                                        <Text style={{ color: 'white', fontFamily: 'Oswald-Bold', }}>Profile</Text>
                                    </View>
                                </View>

                            </TouchableOpacity>

                        </View>
                    </View>
                </View>

                <View>
                    <View style={styles.container1}>
                        <Image style={styles.profile} source={images.profilepic} />
                        <Text style={styles.txt}>{route?.params?.name}</Text>
                    </View>
                </View>


                <View style={styles.container2}>
                    <View>
                        <Text style={styles.cont2txt}>Orders</Text>
                        <Text style={styles.value}>0</Text>
                    </View>
                    <View>
                        <Text style={styles.cont2txt}>Views</Text>
                        <Text style={styles.value}>0</Text>
                    </View>
                    <View>
                        <Text style={styles.cont2txt}>Wallet</Text>
                        <Text style={styles.value}>₹ {walletAmount?.walletBalance}</Text>
                    </View>
                </View>



            </View>


            <Tab.Navigator screenOptions={{
                tabBarLabelStyle: { fontFamily: 'Oswald-Bold' },
                tabBarActiveTintColor: '#B937FA',
                tabBarInactiveTintColor: 'black',
                tabBarStyle: { elevation: 4, marginTop: 15 },
                tabBarIndicatorStyle: { backgroundColor: 'rgba(183,54,248,255)' }
            }} >

                <Tab.Screen name="OverView" component={AgencyOverVieww} initialParams={{ memberData: route?.params, }} />
                {/* <Tab.Screen name="Orders" component={OrderAgency} /> */}
                {/* <Tab.Screen name="Orders" component={AgencyOrder} />
                <Tab.Screen name="Wallet" component={AgencyWallet} />
                <Tab.Screen name="Analytics" component={AgencyAnalytics} /> */}

            </Tab.Navigator>

        </>
    )
}

export default AgencyMemberProfile

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
    container1: {
        backgroundColor: 'white',
        elevation: 4,
        height: 160,
        justifyContent: 'center'

    },
    profile: {
        alignSelf: 'center'
    },
    txt: {
        color: '#525252',
        fontSize: 16,
        alignSelf: 'center',
        fontFamily: 'Oswald-Bold'
    },
    container2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        borderWidth: 0.5,
        borderColor: '#C4C4C4',
        backgroundColor: 'white'

    },
    cont2txt: {
        color: '#5A5A5A',
        fontFamily: 'Oswald-Bold',
        fontSize: 16,
        marginLeft: 16,
        marginRight: 16
    },
    value: {
        color: '#5A5A5A',
        fontFamily: 'Oswald-Bold',
        fontSize: 16,
        alignSelf: 'center',
        marginRight: 16
    }

})