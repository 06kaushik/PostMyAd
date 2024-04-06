import React, { useState, useContext, useEffect } from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import images from "../../../constant/Images";
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";



const AgencyAddress = () => {

    const[address, setAddress] = useState('')
    const[pincode, setPincode] = useState('')
    const[city, setCity] = useState('')
    const[state,setState] = useState('')
    const[country, setCountry] = useState('')
    const [personalInfo, setPersonalInfo] = useState(null)
    const isFocused = useIsFocused();
    const [userDetail, setDetail] = useState(null)




    React.useEffect(() => {
        getUserInfo()
    }, [isFocused]);


    const getUserInfo = async () => {
        try {
            const res = await axios.get(`/api/user/profile/${userDetail?._id}`)
            setPersonalInfo(res.data.msg)
            // console.log('RESPONSE FROM PoEpRSONAL INFORMATION', res.data.msg);

        } catch (error) {
            console.log('ERROR FROM PERSONAL INFO', error);

        }
    }


    useEffect(() => {
        getUserInfo()

    }, [userDetail?._id])


    const getUser = async () => {
        try {
            let userDetail = await AsyncStorage.getItem('USER');
            let data = JSON.parse(userDetail);
            setDetail(data)
        } catch (error) {
            console.log("Something went wrong", error);
        }
    }

    useEffect(() => {
        getUser();
    }, [])


    return (

        <View style={styles.mainContainer}>


            <View style={styles.container1}>
                <View>
                    <Text style={styles.title}>Enter Address</Text>
                </View>
                <View style={styles.container2}>
                    <Text style={styles.name}>Business Address</Text>
                    <View style={{ marginTop: 8 }}>
                        <TextInput
                            placeholder="Address ..."
                            placeholderTextColor={'grey'}
                            value={personalInfo?.address}
                            onChangeText={setAddress}
                            style={styles.textInput} />
                    </View>
                </View>

                <View style={{ marginTop: 12 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ color: '#A3A3A3', fontSize: 14, fontFamily: 'Oswald-Bold', marginLeft: 16 }}>Pin Code</Text>
                            <View style={{ marginTop: 8 }}>
                                <TextInput
                                    placeholder="Pin Code"
                                    placeholderTextColor={'grey'}
                                    value={personalInfo?.pincode}
                                    onChangeText={setPincode}
                                    style={{
                                        color: '#525252',
                                        fontFamily: 'Oswald-Regular',
                                        backgroundColor: '#F7F8FD',
                                        marginLeft: 20,
                                        width: 154,
                                        height: 35,
                                        borderRadius: 8,
                                        paddingLeft: 15,
                                        paddingTop: 3
                                    }} />
                            </View>
                        </View>
                        <View>
                            <Text style={{ color: '#A3A3A3', fontSize: 14, fontFamily: 'Oswald-Bold', marginRight: '30%' }}>City</Text>
                            <View style={{ marginTop: 8 }}>
                                <TextInput
                                    placeholder="City"
                                    placeholderTextColor={'grey'}
                                    value={personalInfo?.city}
                                    onChangeText={setCity}
                                    style={{
                                        color: '#525252',
                                        fontFamily: 'Oswald-Regular',
                                        backgroundColor: '#F7F8FD',
                                        marginRight: 20,
                                        width: 154,
                                        height: 35,
                                        borderRadius: 8,
                                        paddingTop: 5
                                    }} />
                            </View>

                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 12 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ color: '#A3A3A3', fontSize: 14, fontFamily: 'Oswald-Bold', marginLeft: 16 }}>State</Text>
                            <View style={{ marginTop: 8 }}>
                                <TextInput
                                    placeholder="State"
                                    placeholderTextColor={'grey'}
                                    value={personalInfo?.state}
                                    onChangeText={setState}
                                    style={{
                                        color: '#525252',
                                        fontFamily: 'Oswald-Regular',
                                        backgroundColor: '#F7F8FD',
                                        marginLeft: 20,
                                        width: 154,
                                        height: 35,
                                        borderRadius: 8,
                                        paddingLeft: 15,
                                        paddingTop: 3
                                    }} />
                            </View>
                        </View>
                        <View>
                            <Text style={{ color: '#A3A3A3', fontSize: 14, fontFamily: 'Oswald-Bold', marginRight: '30%' }}>Country</Text>
                            <View style={{ marginTop: 8 }}>
                                <TextInput
                                    placeholder="Country"
                                    placeholderTextColor={'grey'}
                                    value={personalInfo?.country}
                                    onChangeText={setCountry}
                                    style={{
                                        color: '#525252',
                                        fontFamily: 'Oswald-Regular',
                                        backgroundColor: '#F7F8FD',
                                        marginRight: 20,
                                        width: 154,
                                        height: 35,
                                        borderRadius: 8,
                                        paddingTop: 5
                                    }} />
                            </View>

                        </View>
                    </View>
                </View>
            </View>




{/* 
            <View style={{ flex: 1 }}>
                <View style={{  width: '100%', bottom: 0, position: 'absolute',marginBottom:20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <TouchableOpacity>
                            <View style={styles.cont}>
                                <Text style={styles.bottombttn}>Cancel</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                        <View  style={styles.cont1}>
                                <Text style={styles.bottombttn1}>Next</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </View> */}



        </View>
    )
}

export default AgencyAddress

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',


    },
    bttn: {
        marginLeft: 16
    },
    bttn1: {
        marginRight: 16
    },
    container1: {
        backgroundColor: 'white',
        elevation: 4,
        marginTop: 10,
        height: '100%'
    },
    title: {
        color: 'black',
        marginLeft: 16,
        fontFamily: 'Oswald-Bold',
        fontSize: 18
    },
    name: {
        color: '#A3A3A3',
        fontSize: 14,
        fontFamily: 'Oswald-Bold',
        marginLeft: 16
    },
    container2: {
        marginTop: 12
    },
    textInput: {
        color: '#525252',
        fontFamily: 'Oswald-Regular',
        backgroundColor: '#F7F8FD',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 8,
        paddingLeft: 15,
        height: 114,
        paddingBottom: 85


    },
    bottombttn: {
        fontFamily: 'Oswald-SemiBold',
        fontSize: 16,
        color:'#A3A3A3',
        textAlign:'center',
        top:4,
    },
    bottombttn1: {
        fontFamily: 'Oswald-SemiBold',
        fontSize: 16,
        color:'white',
        textAlign:'center',
        top:4
    },
    cont:{
        borderWidth:1,
        width:153,
        height:40,
        borderRadius:8,
        marginLeft:16,
        borderColor:'#CCCCCC'
    },
    cont1:{
        width:153,
        height:40,
        borderRadius:8,
        marginRight:16,
        backgroundColor:'rgba(183,54,248,255)'
    }

})