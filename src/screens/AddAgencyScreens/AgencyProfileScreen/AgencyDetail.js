import React, { useState, useContext, useEffect,useRef} from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import images from "../../../constant/Images";
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import RBSheet from "react-native-raw-bottom-sheet";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';


const CELL_COUNT = 6;




const AgencyDetail = () => {

    const [agencyName, setAgencyName] = useState('')
    const [agencyType, setAgencyType] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [web, setWeb] = useState('')
    const [personalInfo, setPersonalInfo] = useState(null)
    const [userDetail, setDetail] = useState(null)
    const isFocused = useIsFocused();
    const refRBSheet = useRef();
    const [value, setValue] = useState();
    console.log('valueee', value);
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });







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

    const VerifyEmail = () => {
        let body = {
            userId: userDetail?._id,
            email: personalInfo.email
        }
        console.log('RESPONSE FROM VERIFY EMAIL BODY', body);

        const requestEmail = async () => {
            const resp = await axios.post('/api/normaluser/verifyEmail', body)
            console.log('RESPONSE FROM VERIFY EMAIL API', resp.data.msg);
        }
        requestEmail()
    }


    const EmailOtpVerify = () => {
        let body = {
            userId: userDetail?._id,
            otp: Number(value)
        }
        console.log('RESPONSE FROM OTP EMAIL', body);

        const requestOTP = async () => {
            const resp = await axios.post('/api/normaluser/verifyEmailOtp', body)
            console.log('RESPONSE FROM EMAIL OTP APII', resp.data.msg);

        }
        requestOTP()
    }



    return (

        <View style={styles.mainContainer}>
            <ScrollView>

                <View style={styles.container1}>

                    <View>
                        <Text style={styles.title}>Enter Details</Text>
                    </View>
                    <View style={styles.container2}>
                        <Text style={styles.name}>Agency Name</Text>
                        <View style={{ marginTop: 8 }}>
                            <TextInput
                                placeholder="Agency name"
                                placeholderTextColor={'grey'}
                                value={personalInfo?.agencyName}
                                onChangeText={setAgencyName}

                                style={styles.an} />
                        </View>
                    </View>
                    <View style={styles.container2}>
                        <Text style={styles.name}>Agency Type</Text>
                        <View style={{ marginTop: 8 }}>
                            <TextInput
                                placeholder="Agency Type"
                                placeholderTextColor={'grey'}
                                value={personalInfo?.businessType}
                                onChangeText={setAgencyType}
                                style={styles.textInput} />
                        </View>
                    </View>
                    <View style={styles.container2}>
                        <Text style={styles.name}>Email</Text>
                        <View style={{ marginTop: 8 }}>
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor={'grey'}
                                value={personalInfo?.email}
                                onChangeText={setEmail}
                                style={styles.textInput} />
                                 {personalInfo?.emailstatus == true ?
                                <View style={{ bottom: 50 }}>
                                    <Text style={{ padding: 10, position: 'absolute', alignSelf: 'flex-end', right: 60, fontFamily: 'Oswald-Bold', color: 'rgba(183,54,248,255)', top: 3 }}>verified</Text>
                                    <Image style={{ padding: 10, position: 'absolute', alignSelf: 'flex-end', height: 30, width: 30, right: 30, top: 10 }} source={images.verified1} />
                                </View>
                                :
                                <View style={{ backgroundColor: 'rgba(183,54,248,255)', width: 70, height: 25, alignSelf: 'flex-end', position: 'absolute', right: 35, top: 13, borderRadius: 5 }}>
                                    <TouchableOpacity onPress={() => { VerifyEmail(); refRBSheet.current.open() }}>
                                        <Text style={{ color: 'white', textAlign: 'center', fontFamily: 'Oswald-Bold' }}>Verify</Text>
                                        <RBSheet
                                            ref={refRBSheet}
                                            closeOnDragDown={true}
                                            height={250}
                                            closeOnPressMask={true}
                                            animationType={'slide'}
                                            customStyles={{
                                                wrapper: {
                                                    backgroundColor: "transparent"
                                                },
                                                draggableIcon: {
                                                    backgroundColor: "#000"
                                                }
                                            }}>

                                            <View>
                                                <Text style={{ alignSelf: 'center', color: 'black', fontFamily: 'Oswald-Bold', fontSize: 20 }}>Email Verification</Text>
                                                <View style={{ bottom: 20 }}>


                                                    <CodeField
                                                        ref={ref}
                                                        {...props}
                                                        value={value}
                                                        onChangeText={setValue}
                                                        cellCount={CELL_COUNT}

                                                        rootStyle={styles.codeFieldRoot}
                                                        keyboardType="number-pad"
                                                        textContentType="oneTimeCode"
                                                        renderCell={({ index, symbol, isFocused }) => (
                                                            <Text
                                                                key={index}
                                                                style={[styles.cell, isFocused && styles.focusCell]}
                                                                onLayout={getCellOnLayoutHandler(index)}>
                                                                {symbol || (isFocused ? <Cursor /> : null)}

                                                            </Text>
                                                        )}
                                                    />
                                                </View>

                                                <View style={{ backgroundColor: 'rgba(183,54,248,255)', width: '90%', alignSelf: 'center', height: 35, borderRadius: 8, top: 30 }}>
                                                    <TouchableOpacity onPress={() => { navigation.goBack(); EmailOtpVerify() }}>
                                                        <Text style={{ color: 'white', textAlign: 'center', top: 3, fontFamily: 'Oswald-Bold', fontSize: 16 }}>Submit</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                        </RBSheet>
                                    </TouchableOpacity>
                                </View>
                            }

                        </View>
                    </View>
                    <View style={styles.container2}>
                        <Text style={styles.name}>Phone Number</Text>
                        <View style={{ marginTop: 8 }}>
                            <TextInput
                                placeholder="Phone Number"
                                placeholderTextColor={'grey'}
                                value={String(personalInfo?.mobileNumber)}
                                onChangeText={setMobile}
                                style={styles.textInput} />

                            {personalInfo?.mobileStatus == true ?
                                <View>
                                    <Text style={{ padding: 10, position: 'absolute', alignSelf: 'flex-end', right: 60, fontFamily: 'Oswald-Bold', color: 'rgba(183,54,248,255)', top: 3 }}>verified</Text>
                                    <Image style={{ padding: 10, position: 'absolute', alignSelf: 'flex-end', height: 30, width: 30, right: 30, top: 10 }} source={images.verified1} />
                                </View>
                                :
                                <View style={{ backgroundColor: 'rgba(183,54,248,255)', width: 70, height: 25, alignSelf: 'flex-end', position: 'absolute', right: 35, top: 13, borderRadius: 5 }}>
                                <TouchableOpacity >
                                    <Text style={{ color: 'white', textAlign: 'center', fontFamily: 'Oswald-Bold' }}>Verify</Text>
                                    <RBSheet
                                        ref={refRBSheet}
                                        closeOnDragDown={true}
                                        height={250}
                                        closeOnPressMask={true}
                                        animationType={'slide'}
                                        customStyles={{
                                            // wrapper: {
                                            //     backgroundColor: "transparent"
                                            // },
                                            draggableIcon: {
                                                backgroundColor: "#000"
                                            }
                                        }}>
    
                                        <View>
                                            <Text style={{ alignSelf: 'center', color: 'black', fontFamily: 'Oswald-Bold', fontSize: 20 }}>Email Verification</Text>
                                            <View style={{ bottom: 20 }}>
    
    
                                                <CodeField
                                                    ref={ref}
                                                    {...props}
                                                    value={value}
                                                    onChangeText={setValue}
                                                    cellCount={CELL_COUNT}
    
                                                    rootStyle={styles.codeFieldRoot}
                                                    keyboardType="number-pad"
                                                    textContentType="oneTimeCode"
                                                    renderCell={({ index, symbol, isFocused }) => (
                                                        <Text
                                                            key={index}
                                                            style={[styles.cell, isFocused && styles.focusCell]}
                                                            onLayout={getCellOnLayoutHandler(index)}>
                                                            {symbol || (isFocused ? <Cursor /> : null)}
    
                                                        </Text>
                                                    )}
                                                />
                                            </View>
    
                                            <View style={{ backgroundColor: 'rgba(183,54,248,255)', width: '90%', alignSelf: 'center', height: 35, borderRadius: 8, top: 30 }}>
                                                <TouchableOpacity onPress={() => { navigation.goBack(); EmailOtpVerify() }}>
                                                    <Text style={{ color: 'white', textAlign: 'center', top: 3, fontFamily: 'Oswald-Bold', fontSize: 16 }}>Submit</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
    
                                    </RBSheet>
                                </TouchableOpacity>
                            </View>
    }


                    </View>
                    </View>
                    <View style={{ marginTop: 12, marginBottom: 100 }}>
                        <Text style={styles.name}>Website</Text>
                        <View style={{ marginTop: 8 }}>
                            <TextInput
                                placeholder="website"
                                placeholderTextColor={'grey'}
                                value={personalInfo?.websiteLink}
                                onChangeText={setWeb}
                                style={styles.textInput} />
                        </View>
                    </View>
                </View>
            </ScrollView>







        </View>
    )
}

export default AgencyDetail
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
    },
    an: {
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
        color: '#A3A3A3',
        textAlign: 'center',
        top: 4,
    },
    bottombttn1: {
        fontFamily: 'Oswald-SemiBold',
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        top: 4
    },
    cont: {
        borderWidth: 1,
        width: 153,
        height: 40,
        borderRadius: 8,
        marginLeft: 16,
        borderColor: '#CCCCCC'
    },
    cont1: {
        width: 153,
        height: 40,
        borderRadius: 8,
        marginRight: 16,
        backgroundColor: 'rgba(183,54,248,255)'
    },
    cell: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        // alignItems: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        color: 'black',
        fontFamily: 'Oswald-Bold',
        fontSize: 16,
        alignSelf: 'center',

    },
    focusCell: {
        borderColor: 'white',
    },
    codeFieldRoot: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
    },

})