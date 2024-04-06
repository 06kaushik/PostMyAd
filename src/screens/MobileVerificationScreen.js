import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StatusBar, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import images from '../constant/Images'
import axios from 'axios';

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import CountDown from 'react-native-countdown-component';

const CELL_COUNT = 4;

const VerificationScreen = ({ navigation, route }) => {

    const [value, setValue] = useState();
    console.log('valueee', value);
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const { mobileOtp } = route.params
    console.log('dataaaaa', mobileOtp);
    const { mobile } = route.params
    console.log('mobileeee', mobile);
    const { userId } = route.params
    console.log('USER ID', userId);
    const [resendd, setResend] = useState('Resend in')
    const [counter, setCounter] = useState(true)
    const [resendCode, setResendCode] = useState([])


    const OtpVerification = () => {
        let body = {
            mobileNumber: `+91${mobile}`,
            otp: Number(value)
        }

        console.log('Mobile', body);

        const getOtpRequest = async () => {

            try {
                const resp = await axios.post('/api/normaluser/verifyphoneotpandchageuserstatus', body)
                console.log('OTP Verified', resp.data.msg);
                navigation.navigate('PersonalDetail', { userId: userId, mobile: mobile })

            } catch (error) {
                console.log('Error from OTP VERIFICATION', error);

            }

        }
        getOtpRequest()

    }

    const ResendText = () => {
        setResend('Didnt get the code?')
    }

    const ResendCode = () => {
        let body = {
            mobileNumber : `91${mobile}`
        }
        console.log('RESPONSE FROM RESEND BODY', body);
        const getResend = async() => {
            const res = await axios.post('/api/normaluser/resendMobileOtp',body)
            console.log('RESPONSE FROM RESEND API', res.data);
            setResendCode(res.data)
        }
        getResend()
    }

  






    return (
        <ImageBackground
            style={styles.backgroundimage}

            source={images.BackgroundImage}>
            <StatusBar hidden={true} />
            <View style={styles.logocontainer}>
                <Image style={styles.logo}
                    source={images.pma} />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Image style={styles.back} source={images.back} />
            </TouchableOpacity>


            <View style={{ justifyContent: 'center', flex: 1, marginTop: '5%' }}>
                <Text style={styles.text}>Enter your verification code</Text>

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

                <View style={{ marginTop: 20 }}>
                    <TouchableOpacity onPress={() => OtpVerification()}>
                        <View style={styles.logobutton}>
                            <Text style={{ color: 'white', alignSelf: 'center', top: 3, fontSize: 16, fontFamily: 'Oswald-Bold' }}>Submit</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ alignSelf: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'white', fontFamily: 'Oswald-Bold', fontSize: 16, top: 5 }}>{resendd}</Text>

                        <View style={{ flexDirection: 'row' }}>

                            <CountDown
                                until={30}
                                size={15}
                                onFinish={() => ResendText() || ResendCode()}
                                digitStyle={{}}
                                digitTxtStyle={{ color: 'white' }}
                                timeToShow={['S']}
                                timeLabels={{}}
                            />
                            <Text style={{ color: 'grey', fontFamily: 'Oswald-Bold', top: 7, right: 7 }}>sec</Text>
                        </View>


                    </View>
                </View>


                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
                    <View style={{flexDirection:'row'}}>
                    <CountDown
                        until={30}
                        size={15}
                        onFinish={() => alert('Finished')}
                        digitStyle={{  }}
                        digitTxtStyle={{ color: 'white' }}
                        timeToShow={[ 'S']}
                        timeLabels={{  }}
                    />
                    <Text style={{color:'grey',fontFamily:'Oswald-Bold',top:7}}>seconds remaining</Text>
                    </View>

                    <Text style={styles.text1}>Didn’t get a code?<Text onPress={() => ResendText()} style={{ color: 'rgba(183,54,248,255)', fontFamily: 'Oswald-Bold', fontSize: 16, }} > {resendd}</Text></Text>
                </View> */}

            </View>


        </ImageBackground>
    )
}

export default VerificationScreen;

const styles = StyleSheet.create({
    backgroundimage: {
        flex: 1
    },
    logocontainer: {
        alignSelf: 'center',

    },
    logo: {
        top: 40,
        height: 48,
        width: 215

    },
    text: {
        marginLeft: 20,
        fontFamily: 'Oswald-Bold',
        fontSize: 16,
        color: 'white',


    },

    cell: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    focusCell: {
        borderColor: 'white',
    },
    codeFieldRoot: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    text1: {
        color: 'white',
        marginRight: 8,
        fontFamily: 'Oswald-Bold',
        marginRight: 16,
        fontSize: 16,
        paddingTop: 5
    },
    logobutton: {
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: '10%',
        width: '90%',
        backgroundColor: 'rgba(183,54,248,255)',
        height: 35,
        borderRadius: 8

    },
    back: {
        marginLeft: 20,
        marginTop: 8
    }

})
