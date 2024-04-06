import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useContext, useRef, useEffect } from 'react'
import { View, Text, StatusBar, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator, Alert, ToastAndroid } from 'react-native'
import { RadioButton } from 'react-native-paper'
import images from '../constant/Images'
import axios from 'axios'
import { ScrollView } from 'react-native-gesture-handler'
import { ContextApi } from '../component/Contextapi'
import Feather from 'react-native-vector-icons/Feather'
import Lottie from 'lottie-react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import RBSheet from "react-native-raw-bottom-sheet";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { adminRequest } from './UserScreens/AxiosInstance'

const CELL_COUNT = 4;

const LoginScreen = ({ navigation }) => {
    const [checked, setChecked] = React.useState('email');
    const [forgotOption, setForgotOption] = useState('email')
    const [email, setEmail] = useState('');
    const [passwordEmail, setPasswordEmail] = useState('');
    const { login } = useContext(ContextApi);
    const [isloading, setIsLoading] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [show, setShow] = useState(true);
    const [mobile, setMobile] = useState('')
    const [passwordMobile, setPasswordMobile] = useState('');
    const [checkValidEmail, setCheckValidEmail] = useState(false);
    const [checkValidMobile, setCheckValidMobile] = useState(false);
    const refRBSheet = useRef();
    const refRBSheet1 = useRef();
    const refRBSheet2 = useRef();
    const [upass, setUpPass] = useState('')
    const [email1, setEmail1] = useState('')
    const [mobile1, setMobile1] = useState('')
    const [value, setValue] = useState();
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const [time, setTime] = React.useState(props.initialValue || 59);
    const timerRef = React.useRef(time);
    const [mailData, setMailData] = useState(null)
    const [mobileData, setMobileData] = useState(null)



    useEffect(() => {
        console.log('MAILLLL AAAAA', mailData);
    }, [mailData])


    // React.useEffect(() => {
    //     GoogleSignin.configure({
    //         webClientId: "38837400447-fi3bmjh17bulghnp7mb5vqjr0ch7f8au.apps.googleusercontent.com",
    //         offlineAccess: true
    //     });
    // }, [])


    // const GoogleSingUp = async () => {
    //     try {
    //         await GoogleSignin.hasPlayServices();
    //         await GoogleSignin.signIn().then(result => {
    //             console.log('>>>>>>>>>>>>>>>>', result.user);
    //             googleAuth(result.user)
    //         });
    //     } catch (error) {
    //         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //             // user cancelled the login flow
    //             alert('User cancelled the login flow !');
    //         } else if (error.code === statusCodes.IN_PROGRESS) {
    //             alert('Signin in progress');
    //             // operation (f.e. sign in) is in progress already
    //         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //             alert('Google play services not available or outdated !');
    //             // play services not available or outdated
    //         } else {
    //             console.log('error from auth', error)
    //         }
    //     }
    // };



    const googleAuth = async (user) => {
        let body = {
            profile: user
        }
        console.log('RESPONSE FROM AUTH BODY', body);
        try {
            const resp = await adminRequest.post('/api/normaluser/googleAuthUser', body)
            console.log('RESPONSE FROM AUTH API>>', resp.data);
            login(resp.data.token, resp.data)

        } catch (error) {
            console.log('ERROR FROM AUTH ', error);

        }
    }

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '45762288091-urmrihu8610vktk0ncduo42b24eansgf.apps.googleusercontent.com',
        });

    }, [])

    // const signIn = async () => {
    //     try {
    //         await GoogleSignin.hasPlayServices();
    //         // await GoogleSignin.signOut()
    //         const userInfo = await GoogleSignin.signIn();
    //         console.log('USER INFOOOOOOOOOO ', userInfo);
    //         googleAuth(userInfo.user)


    //     } catch (error) {
    //         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //             // user cancelled the login flow
    //         } else if (error.code === statusCodes.IN_PROGRESS) {
    //             // operation (e.g. sign in) is in progress already
    //         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //             // play services not available or outdated
    //         } else {
    //             // some other error happened
    //         }
    //     }
    // };

    async function signIn() {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
        console.log('cynetix google auth', idToken);
        GoogleLogin(idToken)
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }

    const LoginWithEmail = () => {
        const checkPassowrd = checkPasswordValidity(passwordEmail);
        if (!checkPassowrd) {
            const body = {
                email: email,
                password: passwordEmail
            }
            console.log('LOGINNNN WITH EMAIL', body);
            const LoginRequestEmail = async () => {
                try {
                    const resp = await adminRequest.post("/api/user/signin", body);
                    setIsLoading(true);
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 3000);
                    login(resp.data.token, resp.data.user)
                } catch (err) {
                    // Handle Error Here
                    ToastAndroid.show("INVALID EMAIL OR PASSWORD", ToastAndroid.LONG, ToastAndroid.CENTER);
                }

            }
            LoginRequestEmail();
        } else {
            Alert.alert('Incorrect Password', checkPassowrd);
        }

    }

    const LoginWithMobile = () => {
        const checkPassowrd = checkPasswordValidity(passwordMobile);
        if (!checkPassowrd) {
            const body = {
                mobileNumber: `+91${mobile}`,
                password: passwordMobile
            }
            console.log('bodyy', body);


            const LoginRequest = async () => {
                try {
                    const resp = await adminRequest.post("/api/user/signin", body);
                    console.log('RESPONSE DATA IN LOGIN', resp.data.msg);
                    setIsLoading(true);
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 3000);
                    login(resp.data.token, resp.data.user)
                } catch (err) {
                    // Handle Error Here
                    ToastAndroid.show("INVALID NUMBER OR PASSWORD", ToastAndroid.LONG, ToastAndroid.CENTER);
                }
            };
            LoginRequest();
        } else {
            Alert.alert('Incorrect Mobile Number', checkPassowrd);
        }
    }

    const handleCheckEmail = text => {
        let re = /\S+@\S+\.\S+/;
        let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        setEmail(text);
        if (re.test(text) || regex.test(text)) {
            setCheckValidEmail(false);
        } else {
            setCheckValidEmail(true);
        }
    };

    const handleCheckEmail1 = text => {
        let re = /\S+@\S+\.\S+/;
        let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        setEmail1(text);
        if (re.test(text) || regex.test(text)) {
            setCheckValidEmail(false);
        } else {
            setCheckValidEmail(true);
        }
    };



    const handleCheckMobile = text => {
        let re = /^[6-9]\d{9}$/;

        setMobile(text);
        if (re.test(text)) {
            setCheckValidMobile(false);
        } else {
            setCheckValidMobile(true);
        }
    };

    const handleCheckMobile1 = text => {
        let re = /^[6-9]\d{9}$/;

        setMobile1(text);
        if (re.test(text)) {
            setCheckValidMobile(false);
        } else {
            setCheckValidMobile(true);
        }
    };

    const ResendCode = () => {
        let body = {
            mobileNumber: `91${mobile}`
        }
        console.log('RESPONSE FROM RESEND BODY', body);
        const getResend = async () => {
            const res = await adminRequest.post('/api/normaluser/resendMobileOtp', body)
            console.log('RESPONSE FROM RESEND API', res.data);
            setResendCode(res.data)
        }
        getResend()
    }

    React.useEffect(() => {
        const timerId = setInterval(() => {
            timerRef.current -= 1;
            if (timerRef.current < 0) {
                clearInterval(timerId);
            } else {
                setTime(timerRef.current);
            }
        }, 1000);
        return () => {
            clearInterval(timerId);
        };
    }, []);


    const checkPasswordValidity = value => {
        const isNonWhiteSpace = /^\S*$/;
        if (!isNonWhiteSpace.test(value)) {
            return 'Password must not contain Whitespaces.';
        }

        const isContainsUppercase = /^(?=.*[A-Z]).*$/;
        if (!isContainsUppercase.test(value)) {
            return 'Password must have at least one Uppercase Character.';
        }

        const isContainsLowercase = /^(?=.*[a-z]).*$/;
        if (!isContainsLowercase.test(value)) {
            return 'Password must have at least one Lowercase Character.';
        }

        const isContainsNumber = /^(?=.*[0-9]).*$/;
        if (!isContainsNumber.test(value)) {
            return 'Password must contain at least one Digit.';
        }

        const isValidLength = /^.{8,16}$/;
        if (!isValidLength.test(value)) {
            return 'Password must be 8-16 Characters Long.';
        }

        // const isContainsSymbol =
        //   /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
        // if (!isContainsSymbol.test(value)) {
        //   return 'Password must contain at least one Special Symbol.';
        // }

        return null;
    };

    ////////////////////// FORGOT PASSWORD OTP ///////////////////////////

    const SendOtpEmail = async () => {
        let body = {
            email: email1
        }
        console.log('RESPONSE FROM FORGOT EMAIL PASS BODY', body);

        try {
            const resp = await adminRequest.post('/api/user/sendOtpforPassword', body)
            console.log('RESPONSE FROM EMAIL OTP API', resp.data.msg);
            refRBSheet1.current.open()

        } catch (error) {
            ToastAndroid.show("User does not exist with this Email!", ToastAndroid.LONG, ToastAndroid.CENTER, error)

        }

    }

    const verifyOtpEmail = async () => {
        let body = {
            email: email1,
            otp: value
        }
        console.log('RESPONSE FROM EMAIL VERIFY OTP BODY', body);
        try {
            const resp = await adminRequest.post('/api/user/verifyOtpforgotPassword', body)
            console.log('RESPONSE FROM OTP VERIFY EMAILLL', resp.data.data);
            if (resp.data.data) {

                setMailData(resp.data.data)
            }
            refRBSheet2.current.open()

        } catch (error) {
            console.log('ERROR FROM EMAIL OTP VERIFY', error);

        }
    }

    const UpdateEmailPass = async () => {
        let body = {
            userId: mailData?._id,
            newPassword: upass
        }
        console.log('RESPONSE FROM UPDATE EMAIL BODY', body);
        try {
            const resp = await adminRequest.post('/api/user/updatePassword', body)
            console.log('RESPONSE FROM PASSWORD EMAIL', resp.data.msg);
            refRBSheet?.current?.close()
            ToastAndroid.show("Password Updated Successfully!", ToastAndroid.LONG, ToastAndroid.CENTER)


        } catch (error) {
            ToastAndroid.show("Something went Wrong !", ToastAndroid.LONG, ToastAndroid.CENTER)

        }
    }

    const SendOtpMobile = async () => {
        let body = {
            mobileNumber: `+91${mobile1}`
        }
        console.log('RESPONSE FROM FORGOT EMAIL PASS BODY', body);

        try {
            const resp = await adminRequest.post('/api/user/sendOtpforPassword', body)
            console.log('RESPONSE FROM MOBILE OTP API', resp.data.msg);
            refRBSheet1.current.open()

        } catch (error) {
            ToastAndroid.show("User does not exist with this MOBILE!", ToastAndroid.LONG, ToastAndroid.CENTER, error)

        }

    }

    const verifyOtpMobile = async () => {
        let body = {
            mobileNumber: `+91${mobile1}`,
            otp: value
        }
        console.log('RESPONSE FROM EMAIL VERIFY OTP BODY', body);
        try {
            const resp = await adminRequest.post('/api/user/verifyOtpforgotPassword', body)
            console.log('RESPONSE FROM OTP VERIFY MOBILE', resp.data.data);
            if (resp.data.data) {

                setMailData(resp.data.data)
            }
            refRBSheet2.current.open()

        } catch (error) {
            console.log('ERROR FROM MOBILE OTP VERIFY', error);

        }
    }











    return (
        <ImageBackground
            style={styles.backgroundimage}

            source={images.BackgroundImage}>
            <StatusBar hidden={true} />
            <ScrollView>
                <View style={styles.logocontainer}>
                    <Image style={styles.logo}
                        source={images.pma} />
                </View>

                <View style={{ bottom: 70 }}>
                    <Text style={styles.logintext}>Login with</Text>

                    <View style={styles.radiobutton}>
                        <View>
                            <RadioButton
                                value="first"
                                status={checked === 'first' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('first')}
                                color='white'
                                uncheckedColor='white'
                            />
                        </View>
                        <Text style={{ color: 'white', fontWeight: '700', fontSize: 16, marginLeft: 4, top: 8 }}>Mobile Number</Text>
                        <View style={{ marginLeft: 6 }}>
                            <RadioButton
                                value="email"
                                status={checked === 'email' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('email')}
                                color='white'
                                uncheckedColor='white'
                                theme={false}
                            />
                        </View>
                        <Text style={{ color: 'white', fontWeight: '700', fontSize: 16, marginLeft: 4, top: 8 }}>Email</Text>

                    </View>

                    <View style={{ margin: 5, marginTop: 12 }}>
                        {checked === 'email' ?

                            <View>
                                <TextInput
                                    style={styles.textinput}
                                    placeholder={checked === 'email' ? 'Enter your Email' : 'Enter your number'}
                                    placeholderTextColor='black'
                                    autoCapitalize='none'
                                    value={email}
                                    onChangeText={(text) => {
                                        if (text.includes(' ')) {
                                            handleCheckEmail(text.trim());
                                        } else {
                                            handleCheckEmail(text);
                                        }
                                    }
                                    }


                                // onChangeText={text => handleCheckEmail(text)}
                                />
                                {checkValidEmail && email.length > 0 ? (
                                    <Text style={styles.textFailed}>Incorrect Email</Text>
                                ) : (
                                    <Text style={styles.textFailed}> </Text>
                                )}
                            </View>

                            :
                            <View>
                                <TextInput
                                    style={styles.textinput}
                                    placeholder={checked === 'first' ? 'Enter your Number' : 'Enter your email'}
                                    placeholderTextColor='black'
                                    value={mobile}
                                    maxLength={10}
                                    keyboardType='numeric'
                                    onChangeText={text => handleCheckMobile(text)}
                                />
                                {checkValidMobile && mobile.length > 0 ? (
                                    <Text style={styles.textFailed}>Incorrect Mobile Number</Text>
                                ) : (
                                    <Text style={styles.textFailed}> </Text>
                                )}
                            </View>
                        }
                        {checked === 'first' ?
                            <Image source={images.CountryCode}
                                style={styles.code} />
                            : <Image source={images.mail}
                                style={styles.code} />}
                        {checked === 'email' ?
                            <TextInput
                                style={styles.textinput}
                                placeholder='Enter Password'
                                placeholderTextColor='black'
                                secureTextEntry={show}
                                autoCapitalize='none'
                                value={passwordEmail}
                                onChangeText={setPasswordEmail}
                            />
                            :
                            <TextInput
                                style={styles.textinput}
                                placeholder='Enter Password'
                                placeholderTextColor='black'
                                secureTextEntry={show}
                                autoCapitalize='none'
                                value={passwordMobile}
                                onChangeText={setPasswordMobile}
                            />
                        }


                        <View>
                            <TouchableOpacity style={styles.EyeButton} onPress={() => {
                                setShow(!show)
                                setPasswordVisible(!passwordVisible)
                            }}>
                                {/* <Feather name={passwordVisible === false ? 'eye' : 'eye-off'} size={25} color={'gray'} /> */}
                                {passwordVisible === false ?
                                    <Image source={images.eyeclosed} style={{ bottom: 3, }} />
                                    :
                                    <Lottie source={require('../assets/eyeani.json')} autoPlay loop style={{ height: 35, width: 35, left: 2 }} />}
                            </TouchableOpacity>
                            <Image source={images.lock}
                                style={styles.lock} />
                        </View>

                    </View>
                    <View style={{}}>
                        <TouchableOpacity onPress={() => refRBSheet?.current?.open()}>
                            <Text style={{ color: 'white', fontFamily: 'Oswald-Bold', alignSelf: 'flex-end', fontSize: 16, marginRight: 30, bottom: 10 }}>Forgot Password ?</Text>
                            <RBSheet
                                ref={refRBSheet}
                                // closeOnDragDown={true}
                                height={680}
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
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 16, marginRight: 16, top: 8 }}>
                                        <TouchableOpacity onPress={() => refRBSheet?.current?.close()} >
                                            <Image style={{ top: 2 }} source={images.cross} />
                                        </TouchableOpacity>
                                        <Text style={{ fontFamily: 'Oswald-Bold', color: 'black', fontSize: 18, bottom: 3 }}>Reset Password</Text>
                                        <Text></Text>
                                    </View>
                                    <View style={{ borderWidth: 1, borderColor: '#DDDDDD', marginTop: 8 }} />

                                    <View style={{ marginLeft: 16, marginRight: 16, marginTop: 18 }}>
                                        <Text style={{ color: '#525252', fontFamily: 'Oswald-Bold' }}>Choose email or mobile associated with your
                                            account, and we’ll send you a otp to reset
                                            your password</Text>
                                    </View>

                                    <View style={{
                                        flexDirection: 'row',
                                        marginTop: 18,
                                        marginLeft: 16

                                    }}>
                                        <View>
                                            <RadioButton
                                                value="mobile"
                                                status={forgotOption === 'mobile' ? 'checked' : 'unchecked'}
                                                onPress={() => setForgotOption('mobile')}
                                                color='black'
                                                uncheckedColor='black'
                                            />
                                        </View>
                                        <Text style={{ color: 'black', fontWeight: '700', fontSize: 16, marginLeft: 4, top: 8 }}>Mobile Number</Text>

                                        <View >
                                            <RadioButton
                                                value="email"
                                                status={forgotOption === 'email' ? 'checked' : 'unchecked'}
                                                onPress={() => setForgotOption('email')}
                                                color='black'
                                                uncheckedColor='black'
                                                theme={false}
                                            />
                                        </View>
                                        <Text style={{ color: 'black', fontWeight: '700', fontSize: 16, marginLeft: 4, top: 8 }}>Email</Text>

                                    </View>
                                    {forgotOption === 'email' ?
                                        <View>
                                            <TextInput
                                                placeholder={forgotOption === 'email' ? 'Enter your Email' : 'Enter your number'}
                                                placeholderTextColor='grey'
                                                value={email1}
                                                onChangeText={text => handleCheckEmail1(text)}
                                                style={{ borderWidth: 1, marginLeft: 16, marginRight: 16, height: 45, borderRadius: 8, borderColor: '#DDDDDD', marginTop: 20, paddingLeft: 20, color: 'black' }} />
                                            {checkValidEmail && email1.length > 0 ? (
                                                <Text style={{
                                                    alignSelf: 'flex-end',
                                                    color: 'black',
                                                    right: 16,
                                                    fontFamily: 'Oswald-Bold'
                                                }}>Incorrect Email</Text>
                                            ) : (
                                                <Text style={{
                                                    alignSelf: 'flex-end',
                                                    color: 'black',
                                                    right: 16,
                                                    fontFamily: 'Oswald-Bold'
                                                }}> </Text>
                                            )}
                                        </View>
                                        :
                                        <View>
                                            <TextInput
                                                placeholder={forgotOption === 'mobile' ? 'Enter your Number' : 'Enter your email'}
                                                placeholderTextColor='grey'
                                                autoCapitalize='none'
                                                value={mobile1}
                                                maxLength={10}
                                                keyboardType='numeric'
                                                onChangeText={text => handleCheckMobile1(text)}
                                                style={{ color: 'black', borderWidth: 1, marginLeft: 16, marginRight: 16, height: 45, borderRadius: 8, borderColor: '#DDDDDD', marginTop: 20, paddingLeft: 20 }} />
                                            {checkValidMobile && mobile1.length > 0 ? (
                                                <Text style={{
                                                    alignSelf: 'flex-end',
                                                    color: 'black',
                                                    right: 16,
                                                    fontFamily: 'Oswald-Bold'
                                                }}>Incorrect Mobile Number</Text>
                                            ) : (
                                                <Text style={{
                                                    alignSelf: 'flex-end',
                                                    color: 'black',
                                                    right: 16,
                                                    fontFamily: 'Oswald-Bold'
                                                }}> </Text>
                                            )}
                                        </View>
                                    }

                                    {forgotOption === 'email' ?
                                        <View>
                                            {(mobile1.length === 10) || (email1.length >= 10) ?
                                                <TouchableOpacity onPress={() => SendOtpEmail()}>
                                                    <View style={{ borderWidth: 1, height: 50, marginLeft: 16, marginRight: 16, borderRadius: 8, borderColor: 'rgba(183,54,248,255)', marginTop: 50, backgroundColor: 'rgba(183,54,248,255)' }}>
                                                        <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', top: 11 }}>Send Otp</Text>
                                                        <RBSheet
                                                            ref={refRBSheet1}
                                                            // closeOnDragDown={true}
                                                            height={680}
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
                                                                <Text style={{ marginLeft: 24, fontSize: 20, fontFamily: 'Oswald-Bold' }}>Enter OTP</Text>
                                                            </View>

                                                            <View>
                                                                {forgotOption === 'email' ?
                                                                    <View style={{ marginTop: 10 }}>
                                                                        <Text style={styles.text}>Enter OTP sent to {email1}</Text>
                                                                    </View>
                                                                    :
                                                                    <View style={{ marginTop: 10 }}>
                                                                        <Text style={styles.text}>Enter OTP sent to {mobile1}</Text>
                                                                    </View>
                                                                }
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

                                                            {time > 0 ?
                                                                <View style={{ flexDirection: 'row', marginLeft: 24 }}>
                                                                    <Text style={{ color: 'grey', fontFamily: 'Oswald-Bold', top: 7, left: 5 }}>Resend in {time} seconds</Text>
                                                                </View>
                                                                :
                                                                <TouchableOpacity onPress={() => ResendCode()}>
                                                                    <Text style={{ color: 'black', marginLeft: 24, color: 'grey', fontFamily: 'Oswald-Bold', top: 20, left: 5 }}>Resend</Text>
                                                                </TouchableOpacity>
                                                            }
                                                            {value?.length > 3 ?
                                                                <View style={{ backgroundColor: 'rgba(183,54,248,255)', width: '90%', height: 48, borderRadius: 8, alignSelf: 'center', marginTop: 80 }}>
                                                                    <TouchableOpacity onPress={() => verifyOtpEmail()}>
                                                                        <Text style={{ alignSelf: 'center', color: 'white', fontFamily: 'Oswald-Bold', fontSize: 18, top: 7 }} >Next</Text>
                                                                    </TouchableOpacity>
                                                                    <RBSheet
                                                                        ref={refRBSheet2}
                                                                        // closeOnDragDown={true}
                                                                        height={680}
                                                                        // closeOnPressMask={true}
                                                                        animationType={'fade'}
                                                                        customStyles={{
                                                                            wrapper: {
                                                                                backgroundColor: "transparent"
                                                                            },
                                                                            draggableIcon: {
                                                                                backgroundColor: "#000"
                                                                            }
                                                                        }}>

                                                                        <View>
                                                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 16, marginRight: 16, top: 8 }}>
                                                                                <TouchableOpacity onPress={() => refRBSheet1?.current?.close()} >
                                                                                    <Image style={{ top: 2 }} source={images.cross} />
                                                                                </TouchableOpacity>
                                                                                <Text style={{ fontFamily: 'Oswald-Bold', color: 'black', fontSize: 18, bottom: 3 }}>Update Password</Text>
                                                                                <Text></Text>
                                                                            </View>
                                                                            <View style={{ borderWidth: 1, borderColor: '#DDDDDD', marginTop: 8 }} />

                                                                            <View style={{ marginLeft: 16, marginRight: 16, marginTop: 18 }}>
                                                                                <Text style={{ color: '#525252', fontFamily: 'Oswald-Bold' }}>It needs to be at least 8 characters long and
                                                                                    contain a number or symbol</Text>
                                                                            </View>

                                                                            <View style={{ marginTop: 30 }}>
                                                                                <TextInput
                                                                                    placeholder='Enter your password'
                                                                                    maxLength={10}
                                                                                    value={upass}
                                                                                    onChangeText={setUpPass}
                                                                                    style={{ borderWidth: 1, borderRadius: 8, marginLeft: 16, marginRight: 16, borderColor: '#DDDDDD', paddingLeft: 20, color: 'black' }} />

                                                                                <TextInput
                                                                                    placeholder='Re-Enter your Password'
                                                                                    maxLength={10}
                                                                                    value={upass}
                                                                                    onChangeText={setUpPass}
                                                                                    style={{ borderWidth: 1, borderRadius: 8, marginLeft: 16, marginRight: 16, borderColor: '#DDDDDD', marginTop: 30, paddingLeft: 20, color: 'black' }} />
                                                                            </View>

                                                                            {upass.length >= 8 ?
                                                                                <TouchableOpacity onPress={() => UpdateEmailPass()}>
                                                                                    <View style={{ borderWidth: 1, height: 50, marginLeft: 16, marginRight: 16, borderRadius: 8, borderColor: 'rgba(183,54,248,255)', marginTop: 50, backgroundColor: 'rgba(183,54,248,255)' }}>
                                                                                        <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', top: 11 }}>Update</Text>
                                                                                    </View>
                                                                                </TouchableOpacity>
                                                                                :
                                                                                <View style={{ borderWidth: 1, height: 50, marginLeft: 16, marginRight: 16, borderRadius: 8, borderColor: '#DDDDDD', marginTop: 50, backgroundColor: '#DDDDDD' }}>
                                                                                    <Text style={{ color: '#717171', fontSize: 16, textAlign: 'center', top: 11 }}>Update</Text>
                                                                                </View>
                                                                            }
                                                                        </View>
                                                                    </RBSheet>
                                                                </View>

                                                                :
                                                                <View style={{ backgroundColor: '#DDDDDD', width: '90%', height: 48, borderRadius: 8, alignSelf: 'center', marginTop: 80 }}>
                                                                    <Text style={{ alignSelf: 'center', color: 'white', fontFamily: 'Oswald-Bold', fontSize: 18, top: 7 }} >Next</Text>
                                                                </View>
                                                            }

                                                        </RBSheet>
                                                    </View>
                                                </TouchableOpacity>
                                                :
                                                <View style={{ borderWidth: 1, height: 50, marginLeft: 16, marginRight: 16, borderRadius: 8, borderColor: '#DDDDDD', marginTop: 50, backgroundColor: '#DDDDDD' }}>
                                                    <Text style={{ color: '#717171', fontSize: 16, textAlign: 'center', top: 11 }}>Send Otp</Text>
                                                </View>
                                            }
                                        </View>
                                        :
                                        <View>
                                            {(mobile1.length === 10) || (email1.length >= 10) ?
                                                <TouchableOpacity onPress={() => SendOtpMobile()}>
                                                    <View style={{ borderWidth: 1, height: 50, marginLeft: 16, marginRight: 16, borderRadius: 8, borderColor: 'rgba(183,54,248,255)', marginTop: 50, backgroundColor: 'rgba(183,54,248,255)' }}>
                                                        <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', top: 11 }}>Send Otp</Text>
                                                        <RBSheet
                                                            ref={refRBSheet1}
                                                            // closeOnDragDown={true}
                                                            height={680}
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
                                                                <Text style={{ marginLeft: 24, fontSize: 20, fontFamily: 'Oswald-Bold' }}>Enter OTP</Text>
                                                            </View>

                                                            <View>
                                                                {forgotOption === 'email' ?
                                                                    <View style={{ marginTop: 10 }}>
                                                                        <Text style={styles.text}>Enter OTP sent to {email1}</Text>
                                                                    </View>
                                                                    :
                                                                    <View style={{ marginTop: 10 }}>
                                                                        <Text style={styles.text}>Enter OTP sent to {mobile1}</Text>
                                                                    </View>
                                                                }
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

                                                            {time > 0 ?
                                                                <View style={{ flexDirection: 'row', marginLeft: 24 }}>
                                                                    <Text style={{ color: 'grey', fontFamily: 'Oswald-Bold', top: 7, left: 5 }}>Resend in {time} seconds</Text>
                                                                </View>
                                                                :
                                                                <TouchableOpacity onPress={() => ResendCode()}>
                                                                    <Text style={{ color: 'black', marginLeft: 24, color: 'grey', fontFamily: 'Oswald-Bold', top: 20, left: 5 }}>Resend</Text>
                                                                </TouchableOpacity>
                                                            }
                                                            {value?.length > 3 ?
                                                                <View style={{ backgroundColor: 'rgba(183,54,248,255)', width: '90%', height: 48, borderRadius: 8, alignSelf: 'center', marginTop: 80 }}>
                                                                    <TouchableOpacity onPress={() => verifyOtpMobile()}>
                                                                        <Text style={{ alignSelf: 'center', color: 'white', fontFamily: 'Oswald-Bold', fontSize: 18, top: 7 }} >Next</Text>
                                                                    </TouchableOpacity>
                                                                    <RBSheet
                                                                        ref={refRBSheet2}
                                                                        // closeOnDragDown={true}
                                                                        height={680}
                                                                        // closeOnPressMask={true}
                                                                        animationType={'fade'}
                                                                        customStyles={{
                                                                            wrapper: {
                                                                                backgroundColor: "transparent"
                                                                            },
                                                                            draggableIcon: {
                                                                                backgroundColor: "#000"
                                                                            }
                                                                        }}>

                                                                        <View>
                                                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 16, marginRight: 16, top: 8 }}>
                                                                                <TouchableOpacity onPress={() => refRBSheet1?.current?.close()} >
                                                                                    <Image style={{ top: 2 }} source={images.cross} />
                                                                                </TouchableOpacity>
                                                                                <Text style={{ fontFamily: 'Oswald-Bold', color: 'black', fontSize: 18, bottom: 3 }}>Update Password</Text>
                                                                                <Text></Text>
                                                                            </View>
                                                                            <View style={{ borderWidth: 1, borderColor: '#DDDDDD', marginTop: 8 }} />

                                                                            <View style={{ marginLeft: 16, marginRight: 16, marginTop: 18 }}>
                                                                                <Text style={{ color: '#525252', fontFamily: 'Oswald-Bold' }}>It needs to be at least 8 characters long and
                                                                                    contain a number or symbol</Text>
                                                                            </View>

                                                                            <View style={{ marginTop: 30 }}>
                                                                                <TextInput
                                                                                    placeholder='Enter your password'
                                                                                    maxLength={10}

                                                                                    value={upass}
                                                                                    onChangeText={setUpPass}
                                                                                    style={{ borderWidth: 1, borderRadius: 8, marginLeft: 16, marginRight: 16, borderColor: '#DDDDDD', paddingLeft: 20 }} />

                                                                                <TextInput
                                                                                    placeholder='Re-Enter your Password'
                                                                                    maxLength={10}
                                                                                    value={upass}
                                                                                    onChangeText={setUpPass}
                                                                                    style={{ borderWidth: 1, borderRadius: 8, marginLeft: 16, marginRight: 16, borderColor: '#DDDDDD', marginTop: 30, paddingLeft: 20 }} />
                                                                            </View>

                                                                            {upass.length >= 8 ?
                                                                                <TouchableOpacity onPress={() => UpdateEmailPass()}>
                                                                                    <View style={{ borderWidth: 1, height: 50, marginLeft: 16, marginRight: 16, borderRadius: 8, borderColor: 'rgba(183,54,248,255)', marginTop: 50, backgroundColor: 'rgba(183,54,248,255)' }}>
                                                                                        <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', top: 11 }}>Update</Text>
                                                                                    </View>
                                                                                </TouchableOpacity>
                                                                                :
                                                                                <View style={{ borderWidth: 1, height: 50, marginLeft: 16, marginRight: 16, borderRadius: 8, borderColor: '#DDDDDD', marginTop: 50, backgroundColor: '#DDDDDD' }}>
                                                                                    <Text style={{ color: '#717171', fontSize: 16, textAlign: 'center', top: 11 }}>Update</Text>
                                                                                </View>
                                                                            }
                                                                        </View>
                                                                    </RBSheet>
                                                                </View>

                                                                :
                                                                <View style={{ backgroundColor: '#DDDDDD', width: '90%', height: 48, borderRadius: 8, alignSelf: 'center', marginTop: 80 }}>
                                                                    <Text style={{ alignSelf: 'center', color: 'white', fontFamily: 'Oswald-Bold', fontSize: 18, top: 7 }} >Next</Text>
                                                                </View>
                                                            }

                                                        </RBSheet>
                                                    </View>
                                                </TouchableOpacity>
                                                :
                                                <View style={{ borderWidth: 1, height: 50, marginLeft: 16, marginRight: 16, borderRadius: 8, borderColor: '#DDDDDD', marginTop: 50, backgroundColor: '#DDDDDD' }}>
                                                    <Text style={{ color: '#717171', fontSize: 16, textAlign: 'center', top: 11 }}>Send Otp</Text>
                                                </View>
                                            }
                                        </View>
                                    }


                                </View>
                            </RBSheet>
                        </TouchableOpacity>
                    </View>

                </View>


                {checked === 'email' ?
                    <View style={{}}>
                        {isloading ? (<ActivityIndicator

                            visible={isloading}
                            size={'large'}
                            textContent='Loading ...'
                            textStyle={styles.spinnerTextStyle}
                        />

                        ) : (

                            <TouchableOpacity onPress={() => LoginWithEmail()} style={styles.buttonSignInView}>
                                <Text style={styles.SignIntxt}>Login</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    :

                    <View>
                        {isloading ? (<ActivityIndicator
                            visible={isloading}
                            size={'large'}
                            textContent='Loading ...'
                            textStyle={styles.spinnerTextStyle}
                        />

                        ) : (

                            <TouchableOpacity onPress={() => LoginWithMobile()} style={styles.buttonSignInView}>
                                <Text style={styles.SignIntxt}>Login</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                }


                <View>
                </View>
                {/* <View
                    style={styles.connectContainer}>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#fff' }} />
                    <View>
                        <Text
                            style={styles.connect}>
                            or connect with
                        </Text>
                    </View>
                    <View style={{ flex: 1, height: 1, backgroundColor: '#fff' }} />
                </View> */}

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    // marginTop: 10,

                }}>
                    <TouchableOpacity style={{ margin: 10 }}>
                        <Image source={images.facebook} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ margin: 10 }}>
                        <Image source={images.twitter} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ margin: 10 }}>
                        <Image source={images.linkdin} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ margin: 10 }} onPress={signIn}>
                        <Image source={images.google} />
                    </TouchableOpacity>

                </View>

                <View style={{ marginTop: 3 }}>
                    <View
                        style={{
                            // position: 'absolute',
                            flexDirection: 'row',
                            marginTop: 10,
                            alignSelf: 'center',
                        }}>
                        <Text style={styles.daccount}>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={styles.signUp} > Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>



            </ScrollView>

        </ImageBackground >

    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    backgroundimage: {
        flex: 1
    },
    logocontainer: {

        alignSelf: 'center'

    },
    logo: {
        top: 80,
        height: 48,
        width: 215


    },
    logintext: {
        color: 'white',
        marginTop: 250,
        left: 24,
        fontWeight: '700',
        fontSize: 20,
        margin: 10

    },
    radiobutton: {
        flexDirection: 'row',
        left: 24,
    },
    textinput: {
        backgroundColor: 'white',
        width: '90%',
        height: 48,
        // top: 305,
        borderRadius: 8,
        left: 24,
        marginBottom: 15,
        paddingLeft: 45,
        color: 'black', fontSize: 16


    },
    SignIntxt: {
        fontSize: 17,
        color: 'white',
        fontWeight: '600',
        // fontFamily:'Oswald-SemiBold'
    },
    buttonSignInView: {
        backgroundColor: 'rgba(183,54,248,255)',
        height: 48,
        width: '90%',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        left: 24,
        bottom: 50
        // top: 300
    },
    lock: {
        // top: 258,
        left: 33,
        position: 'absolute',
        bottom: 25
    },
    code: {
        height: 15,
        // top: 263,
        left: 31,
        position: 'absolute',
        top: 16,
        tintColor: 'grey'
    },
    spinnerTextStyle: {
        color: '#FFF',
    },
    EyeButton: {

        color: 'grey',
        position: 'absolute',
        alignSelf: 'flex-end',
        bottom: 22,
        right: 30
    },
    connect: {
        width: 120,
        textAlign: 'center',
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Oswald-Bold'
    },
    line: {
        borderWidth: 1,
        borderColor: 'white'
    },
    connectContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30
    },
    daccount: {
        fontSize: 14,
        fontFamily: 'Oswald-Regular',
        color: 'white',
        fontSize: 18,
    },
    signUp: {
        fontFamily: 'Oswald-Bold',
        color: 'white',
        fontSize: 18,

    },
    textFailed: {
        alignSelf: 'flex-end',
        color: 'white',
        bottom: 13,
        right: 16,
        fontFamily: 'Oswald-Bold'
    },
    codeFieldRoot: {
        marginTop: 20,
        marginLeft: 24,
        marginRight: 24,
    },
    cell: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        color: 'black',
        top: 5
    },
    focusCell: {
        borderColor: 'white',
    },
    text: {
        marginLeft: 24,
        fontFamily: 'Oswald-Bold',
        fontSize: 14,
        color: '#717171',
    },

})