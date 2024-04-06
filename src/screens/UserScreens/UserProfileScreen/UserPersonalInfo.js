import React, { useState, useContext, useEffect, useRef } from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import images from "../../../constant/Images";
import LinearGradient from 'react-native-linear-gradient';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import RBSheet from "react-native-raw-bottom-sheet";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { adminRequest } from "../AxiosInstance";


const CELL_COUNT = 6;
const CELL_COUNT1 = 4;


const PeresonalInfo = ({ navigation }) => {
    const [userDetail, setDetail] = useState(null)
    const isFocused = useIsFocused();
    const refRBSheet = useRef();
    const refRBSheet1 = useRef();


    const [value, setValue] = useState();
    console.log('valueee', value);
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const [mob, setMob] = useState()


    const [personalInfo, setPersonalInfo] = useState(null)

    const [fname, setFname] = useState('')
    console.log('FIRST NAME IN PROFILE', fname);
    const [lname, setLname] = useState('')
    const [address, setAddress] = useState('')
    const [pincode, setPinCode] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')




    React.useEffect(() => {
        getUserInfo()
    }, [isFocused]);


    const getUserInfo = async () => {
        try {
            const res = await adminRequest.get(`/api/user/profile/${userDetail?._id}`)
            setPersonalInfo(res.data.msg)
            console.log('RESPONSE FROM PoEpRSONAL INFORMATION>>>', res.data.msg);

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
            const resp = await adminRequest.post('/api/normaluser/verifyEmail', body)
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
            const resp = await adminRequest.post('/api/normaluser/verifyEmailOtp', body)
            console.log('RESPONSE FROM EMAIL OTP APII', resp.data.msg);

        }
        requestOTP()
    }


    const SaveData = async () => {
        let body = {
            userId: userDetail?._id,
            userRole: 4,
            firstName: fname,
            lastName: lname,
            pincode: pincode,
            city: "Noida",
            address: address,
            landmark: "School",
            country: country,
            state: state,
            mobileNumber: `+91${mob}`
        }
        console.log('RESPONSE FROM SAVE DATA BODY', body);
        try {
            const resp = await adminRequest.post('/api/user/profileupdate', body)
            console.log('RESPONSE FROM SAVE DATA API', resp.data.msg);

        } catch (error) {
            console.log('error from save data', error.response.data.msg);

        }
    }



    const mobileVerify = async () => {
        let body = {
            userId: userDetail?._id,
            mobileNumber: `+91${mob}`,
        }
        console.log('BODY OF MOBILE VERIFY', body);
        try {
            const resp = await adminRequest.post('/api/user/sendOtpforPassword', body)
            console.log('RESPONSE FROM MOBILE VERIFY API', resp.data.msg);

        } catch (error) {
            console.log('ERRROR FROM MOBILE VERIFY', error);

        }

    }

    const verifyMobileOtp = async () => {
        let body = {
            userId: userDetail?._id,
            mobileNumber: `+91${mob}`,
            otp: Number(value)
        }
        console.log('body of mobile otp verify', body);
        try {
            const resp = await adminRequest.post('/api/normaluser/verifyMobileOtp', body)
            console.log('BODY FROM MOBILE OTP VERIFY', resp.data.msg);

        } catch (error) {
            console.log('ERROR FROM MOBILE VERIFY OTP API', error?.response);

        }
    }




    return (
        <View style={styles.mainContainer}>
            <ScrollView>

                <View style={styles.container1}>
                    <View style={styles.container2}>
                        <Text style={styles.name}>First Name</Text>
                        <View style={{ marginTop: 8 }}>
                            <TextInput
                                placeholder="Name"
                                placeholderTextColor={'grey'}
                                value={fname || personalInfo?.firstName}
                                onChangeText={setFname}
                                style={styles.textInput} />
                        </View>
                    </View>
                    <View style={styles.container2}>
                        <Text style={styles.name}>Last Name</Text>
                        <View style={{ marginTop: 8 }}>
                            <TextInput
                                placeholder="Name"
                                placeholderTextColor={'grey'}
                                value={lname || personalInfo?.lastName}
                                onChangeText={setLname}
                                style={styles.textInput} />
                        </View>
                    </View>
                    <View style={styles.container2}>
                        <Text style={styles.name}>Phone Number</Text>
                        <View style={{ marginTop: 8, flex: 1, }}>
                            <TextInput
                                placeholder="Mobile Number"
                                placeholderTextColor={'grey'}
                                style={styles.textInput}
                                value={personalInfo?.mobileStatus === true ? String(personalInfo?.mobileNumber) : mob}
                                onChangeText={setMob}
                                keyboardType='numeric'
                                maxLength={personalInfo?.mobileStatus === true ? 14 : 10}

                            />
                            {personalInfo?.mobileStatus == true ?
                                <View style={{}}>
                                    <Text style={{ padding: 10, position: 'absolute', alignSelf: 'flex-end', right: 60, fontFamily: 'Oswald-Bold', color: 'rgba(183,54,248,255)', bottom: 5 }}>verified</Text>
                                    <Image style={{ padding: 10, position: 'absolute', alignSelf: 'flex-end', height: 30, width: 30, right: 30, bottom: 10 }} source={images.verified1} />
                                </View>
                                :

                                <View style={{ backgroundColor: 'rgba(183,54,248,255)', width: 70, height: 25, alignSelf: 'flex-end', position: 'absolute', right: 35, top: 13, borderRadius: 5 }}>

                                    <TouchableOpacity onPress={() => { mobileVerify(); refRBSheet1?.current?.open() }} >
                                        <Text style={{ color: 'white', textAlign: 'center', fontFamily: 'Oswald-Bold' }}>Verify</Text>
                                        <RBSheet
                                            ref={refRBSheet1}
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
                                                <Text style={{ alignSelf: 'center', color: 'black', fontFamily: 'Oswald-Bold', fontSize: 20 }}>Mobile Verification</Text>
                                                <View style={{ bottom: 20 }}>


                                                    <CodeField
                                                        ref={ref}
                                                        {...props}
                                                        value={value}
                                                        onChangeText={setValue}
                                                        cellCount={CELL_COUNT1}

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
                                                    <TouchableOpacity onPress={() => { navigation.goBack(); verifyMobileOtp() }}>
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
                        <Text style={styles.name}>Email</Text>
                        <View style={{ marginTop: 8 }}>
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor={'grey'}
                                value={personalInfo?.email}
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
                        <Text style={styles.name}>Full Address</Text>
                        <View style={{ marginTop: 8 }}>
                            <TextInput
                                placeholder="Full Address"
                                placeholderTextColor={'grey'}
                                value={address}
                                style={styles.an}
                                onChangeText={setAddress}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 12, }}>
                        <Text style={styles.name}>Pin Code</Text>
                        <View style={{ marginTop: 8 }}>
                            <TextInput
                                placeholder="pincode"
                                placeholderTextColor={'grey'}
                                style={styles.textInput}
                                autoCapitalize='none'
                                keyboardType='numeric'
                                maxLength={6}
                                value={pincode}
                                onChangeText={setPinCode}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 12, }}>
                        <Text style={styles.name}>State</Text>
                        <View style={{ marginTop: 8 }}>
                            <TextInput
                                placeholder="State"
                                placeholderTextColor={'grey'}
                                value={state}
                                style={styles.textInput}
                                onChangeText={setState}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 12, marginBottom: 100 }}>
                        <Text style={styles.name}>Country</Text>
                        <View style={{ marginTop: 8 }}>
                            <TextInput
                                placeholder="Country"
                                placeholderTextColor={'grey'}
                                value={country}
                                style={styles.textInput}
                                onChangeText={setCountry}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={{ flex: 1, }}>
                <View style={{ width: '100%', bottom: 0, position: 'absolute', backgroundColor: 'white', height: 50 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => navigation.goBack('')}>
                            <View style={styles.cont}>
                                <Text style={styles.bottombttn}>Cancel</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => SaveData() || navigation.goBack('')}>
                            <View style={styles.cont1}>
                                <Text style={styles.bottombttn1}>Save</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>


        </View>
    )
}

export default PeresonalInfo

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F7F8FD',


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
        color: '#525252',
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
        backgroundColor: '#F8F9FD',
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