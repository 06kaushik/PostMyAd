import React, { useState, useContext, useEffect } from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity,ScrollView } from 'react-native'
import images from "../../../constant/Images";
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";



const AgencyPoc = () => {
    const[name, setName] = useState('')
    const[desig, setDesig] = useState('')
    const[pan, setPan] = useState('')
    const[gst, setGst] = useState('')
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



    return(

        <View style={styles.mainContainer}>
            <ScrollView>

                <View style={styles.container1}>
                    <View>
                        <Text style={styles.title}>Enter POC Details</Text>
                    </View>
                    <View style={styles.container2}>
                        <Text style={styles.name}>Name</Text>
                        <View style={{ marginTop: 8 }}>
                            <TextInput
                                placeholder="Name"
                                placeholderTextColor={'grey'}
                                value={personalInfo?.agencyName}
                                onChangeText={setName}
                                style={styles.textInput} />
                        </View>
                    </View>
                    <View style={styles.container2}>
                        <Text style={styles.name}>Designation</Text>
                        <View style={{ marginTop: 8 }}>
                            <TextInput
                                placeholder="Designation"
                                placeholderTextColor={'grey'}
                                value={personalInfo?.designation}
                                onChangeText={setDesig}
                                style={styles.textInput} />
                        </View>
                    </View>
                    <View style={styles.container2}>
                        <Text style={styles.name}>PAN Number</Text>
                        <View style={{ marginTop: 8 }}>
                            <TextInput
                                placeholder=""
                                placeholderTextColor={'grey'}
                                value={personalInfo?.panNumber}
                                onChangeText={setPan}
                                style={styles.textInput} />
                        </View>
                    </View>
                    <View style={{ marginTop: 12 }}>
                        <Text style={styles.name}>GST Number</Text>
                        <View style={{ marginTop: 8 }}>
                            <TextInput
                                placeholder=""
                                placeholderTextColor={'grey'}
                                value={personalInfo?.gstNumber}
                                onChangeText={setGst}
                                style={styles.textInput} />
                        </View>
                    </View>
                   
                    

                </View>






            </ScrollView>



{/* 
            <View style={{ flex: 1 }}>
                <View style={{ width: '100%', bottom: 0, position: 'absolute',marginBottom:20 ,backgroundColor:'white'}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, }}>
                        <TouchableOpacity>
                            <View style={styles.cont}>
                                <Text style={styles.bottombttn}>Cancel</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                        <View style={styles.cont1}>
                                <Text style={styles.bottombttn1}>Next</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </View> */}



        </View>
    )
}

export default AgencyPoc

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
        marginTop: 10
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
        paddingLeft: 15

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