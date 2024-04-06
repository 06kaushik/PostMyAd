import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useContext, useRef, useEffect, useSyncExternalStore } from 'react'
import { View, Text, StatusBar, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator, Alert, ToastAndroid, Keyboard } from 'react-native'
import { RadioButton } from 'react-native-paper'
import images from '../constant/Images'
import axios from 'axios'
import { ScrollView } from 'react-native-gesture-handler'
import { ContextApi } from '../component/Contextapi'
import Feather from 'react-native-vector-icons/Feather'
import RBSheet from "react-native-raw-bottom-sheet";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import CountDown from 'react-native-countdown-component';
import {
    getHash,
    startOtpListener,
    useOtpVerify,
    removeListener
} from 'react-native-otp-verify';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import Lottie from 'lottie-react-native';





const CELL_COUNT = 4;

const SignUpscreen = ({ navigation }) => {

    const [mobile, setMobile] = React.useState('');
    console.log('mobileeeeeeee>>>>>>>>>>', mobile);
    const [isloading, setIsLoading] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [show, setShow] = useState(true);
    const [passwordVisible1, setPasswordVisible1] = useState(false);
    const [show1, setShow1] = useState(true);
    const [userId, setUserId] = useState([])
    console.log('USER ID >>>>>>>>>>>>', userId);
    const inputRef = useRef();
    const [checkValidMobile, setCheckValidMobile] = useState(false);
    const refRBSheet = useRef();
    const refRBSheet1 = useRef();
    const [value, setValue] = useState();

    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const [time, setTime] = React.useState(props.initialValue || 59);
    const timerRef = React.useRef(time);
    const [mobileAuth, setMobileAuth] = useState(null)
    const [emailAuth, setEmailAuth] = useState(null)
    const [error, setError] = useState('')
    console.log('hhvnlkvn;nv;v;;vvn;e');
    const [checked, setChecked] = React.useState('first');
    const [signupemail, setSignUpEmail] = useState('');
    const [checkValidEmail, setCheckValidEmail] = useState(false);







    // useEffect(() => {
    //     getHash().then(hash => {
    //         // use this hash in the message.
    //     }).catch(console.log);

    //     startOtpListener(message => {
    //         console.log('MESSSSAAAGEESS', message);
    //         // extract the otp using regex e.g. the below regex extracts 4 digit otp from message
    //         const otp = /(\d{4})/g.exec(message)[1];
    //         setValue(otp);
    //     });
    //     return () => removeListener();
    // }, []);




    //////////////////// TIMER FUNCTION ///////////////////////
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


    ////////////////////// PERSONAL INFORMATION ///////////////////////////
    const [fname, setFName] = useState('')
    const [lname, setLName] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmErrorMessage, setConfirmErrorMessage] = useState('')
    const [email, setEmail] = useState('')


    const Validation = value => {
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

        const isContainsSymbol =
            /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
        if (!isContainsSymbol.test(value)) {
            return 'Password must contain at least one Special Symbol.';
        }

        return null;
    };



    const checkPasswordValidity = () => {
        let errorFlag = false

        if (newPassword.length == 0) {
            errorFlag = true;
            setPasswordErrorMessage({ passwordErrorMessage: "Password is required feild" });
        } else if (newPassword.length < 8 || newPassword.length > 20) {
            errorFlag = true;
            setPasswordErrorMessage({ passwordErrorMessage: "Password should be min 8 char and max 20 char" });
        } else if (newPassword !== confirmPassword) {
            errorFlag = true;
            setPasswordErrorMessage({ passwordErrorMessage: "Passwoad and confirm password should be same." });
        }

        if (confirmPassword.length == 0) {
            errorFlag = true;
            setConfirmErrorMessage({ confirmPasswordErrorMessage: "Confirm Password is required feild" });
        } else if (confirmPassword.length < 8 || confirmPassword.length > 20) {
            errorFlag = true;
            setConfirmErrorMessage({ confirmErrorMessage: "Password should be min 8 char and max 20 char" });
        }
        if (errorFlag) {
            Alert.alert('Check your Password')


        } else {
            const passwordCheck = Validation(newPassword)
            if (!passwordCheck) {

                let body = {
                    userId: userId,
                    newPassword: newPassword,
                    firstName: fname,
                    lastName: lname,

                }
                console.log('PASSWORD>>>>>>>>>>>', body);

                const ChangeRequest = async () => {
                    try {

                        const resp = await axios.post("/api/normaluser/updateNormalUserPassword", body);
                        console.log("Change Password response ==> ", resp.data.msg);
                        navigation.navigate('PublishAdd', { mobile: mobile, password: newPassword, email: signupemail })
                        // login(resp.data.token, resp.data.user)

                    } catch (err) {
                        // Handle Error Here
                        console.error("error from Change Password Screen ==> ", err);
                    }


                }
                ChangeRequest()
            } else {
                Alert.alert('Incorrect Mobile Number', passwordCheck);
            }
        }
    }




    const emailAuthentication = async () => {
        try {
            const resp = await axios.get(`/api/user/checkEmailandMobileNumber?mobileNumber=${email}`)
            console.log('RESPONSE FROM EMAIL VERIFICATION', resp.status, resp.data.msg);
            setEmailAuth(resp.status)
        } catch (error) {
            console.log('error from email authentication', resp.status, resp.data.msg);

        }
    }


    //////////////////// EMAIL VERIFICATION ///////////////////////////

    const SendEmail = () => {


        let body = {
            email: email,
            userId: userId
        }
        console.log('EMAIL BODY', body);

        const getEmail = async () => {
            try {
                const response = await axios.post('/api/normaluser/sendmail', body)
                console.log('RESPONSE FROM EMAIL VERIFICATION', response?.data?.msg);

            } catch (err) {
                console.log('ERROR FROM EMAIL VERIFICATION', err);

            }
        }

        getEmail()

    }

    /////////////// RESESND CODE /////////////////

    const ResendCode = () => {
        let body = {
            mobileNumber: `91${mobile}`
        }
        console.log('RESPONSE FROM RESEND BODY', body);
        const getResend = async () => {
            const res = await axios.post('/api/normaluser/resendMobileOtp', body)
            console.log('RESPONSE FROM RESEND API', res.data);
            setResendCode(res.data)
        }
        getResend()
    }


    const mobileAuthentication = async () => {
        try {
            const resp = await axios.get(`/api/user/checkEmailandMobileNumber?mobileNumber= +91${mobile}`)
            console.log('RESPONSE FROM MOBILE VERIFICATION', resp.status, resp.data.msg);
            setMobileAuth(resp.status)


        } catch (error) {
            console.log('errror from mobile authentication', resp.status, resp.data.msg);
        }

    }




    const MobileVerification = () => {
        if (mobile.length >= 10) {
            let body = {
                mobileNumber: `+91${mobile}`
            }

            console.log('Mobile', body);

            const getOtpRequest = async () => {

                try {
                    const resp = await axios.post('/api/normaluser/signup', body)
                    console.log('Mobile Verified', resp.data.msg);
                    // setUserId(resp?.data?.msg?._id)
                    refRBSheet?.current?.open()
                    // navigation.navigate('Verification', { mobileOtp: resp?.data?.msg?.mobileOtp, mobile: mobile, userId: resp?.data?.msg?._id })
                } catch (error) {
                    // ToastAndroid.show("User already exist with this mobileNumber!", ToastAndroid.LONG, ToastAndroid.CENTER, error)
                    // console.log('>>>>>>>>>>>>.', error);
                    Alert.alert(
                        "ALERT !",
                        "User Already Exist with this Mobile Number !! Try using different Number.",

                        [

                            { text: "OK", onPress: () => console.log("OK Pressed"), }
                        ]
                    );
                }

            }
            getOtpRequest()
        } else {
            // refRBSheet?.current?.open()
            ToastAndroid.show("enter 10 digit number!", ToastAndroid.LONG, ToastAndroid.CENTER)

        }
    }


    /////////// EMAIL VERIFICATION FOR SIGN UP //////////////////

    const EmileVerification = () => {

        let body = {
            email: signupemail
        }

        console.log('Mobile', body);

        const getOtpRequest = async () => {

            try {
                const resp = await axios.post('/api/normaluser/signup', body)
                console.log('Mobile Verified', resp.data.msg);
                // setUserId(resp?.data?.msg?._id)
                refRBSheet?.current?.open()
                // navigation.navigate('Verification', { mobileOtp: resp?.data?.msg?.mobileOtp, mobile: mobile, userId: resp?.data?.msg?._id })
            } catch (error) {
                // ToastAndroid.show("User already exist with this mobileNumber!", ToastAndroid.LONG, ToastAndroid.CENTER, error)
                // console.log('>>>>>>>>>>>>.', error);
                Alert.alert(
                    "ALERT !",
                    "User Already Exist with this Email ID !! Try using different Email.",

                    [

                        { text: "OK", onPress: () => console.log("OK Pressed"), }
                    ]
                );
            }

        }
        getOtpRequest()

    }

    const getUser = async () => {
        try {
            let userDetail = await AsyncStorage.getItem('USER');
            let data = JSON.parse(userDetail);
            setUserId(data)
        } catch (error) {
            console.log("Something went wrong", error);
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    const handleCheckMobile = text => {
        let re = /^[6-9]\d{9}$/;
        setMobile(text);
        if (re.test(text)) {
            setCheckValidMobile(false);
        } else {
            setCheckValidMobile(true);
        }
    };


    const OtpVerification = () => {
        let body = {
            mobileNumber: `+91${mobile}`,
            otp: Number(value)
        }

        console.log('Mobile', body);

        const getOtpRequest = async () => {

            try {
                const resp = await axios.post('/api/normaluser/verifyphoneotpandchageuserstatus', body)
                console.log('OTP Verified>>>////', resp.data?.user?._id);
                setUserId(resp?.data?.user?._id)
                refRBSheet?.current?.open()
            } catch (error) {
                ToastAndroid.show("WRONG OTP INSERTED!", ToastAndroid.LONG, ToastAndroid.CENTER);

            }

        }
        getOtpRequest()

    }

    /////////  email otp verification ///////


    const EmailOtpVerification = () => {
        let body = {
            email: signupemail,
            otp: Number(value)
        }

        console.log('Mobile', body);

        const getOtpRequest = async () => {

            try {
                const resp = await axios.post('/api/normaluser/verifyphoneotpandchageuserstatus', body)
                console.log('OTP Verified>>>////', resp.data?.user?._id);
                setUserId(resp?.data?.user?._id)
                refRBSheet?.current?.open()
            } catch (error) {
                ToastAndroid.show("WRONG OTP INSERTED!", ToastAndroid.LONG, ToastAndroid.CENTER);

            }

        }
        getOtpRequest()

    }

    const handleCheckEmail = text => {
        let re = /\S+@\S+\.\S+/;
        let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        setSignUpEmail(text);
        if (re.test(text) || regex.test(text)) {
            setCheckValidEmail(false);
        } else {
            setCheckValidEmail(true);
        }
    };



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

                <View style={{ bottom: 80 }}>
                    <Text style={styles.signText}>Sign Up</Text>

                </View>
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

                <View style={{ bottom: 55 }}>
                    <Text style={styles.logintext}></Text>
                    <View style={{}}>
                        {checked === 'email' ?
                            <View>
                                <TextInput
                                    style={styles.textinput1}
                                    placeholder={checked === 'email' ? 'Enter your Email' : 'Enter your number'}
                                    placeholderTextColor='black'
                                    autoCapitalize='none'
                                    value={signupemail}
                                    onChangeText={text => handleCheckEmail(text)}
                                />
                                {checkValidEmail && signupemail.length > 0 ? (
                                    <Text style={styles.textFailed1}>Incorrect Email</Text>
                                ) : (
                                    <Text style={styles.textFailed1}> </Text>
                                )}
                            </View>
                            :

                            <View>
                                <TextInput
                                    style={styles.textinput1}
                                    placeholder={checked === 'first' ? 'Enter your Number' : 'Enter your email'}
                                    placeholderTextColor='black'
                                    autoCapitalize='none'
                                    keyboardType='numeric'
                                    value={mobile}
                                    onChangeText={text => handleCheckMobile(text)}
                                    maxLength={10}
                                    ref={inputRef}
                                    onLayout={() => inputRef.current.focus()}

                                />
                                <Text style={{ color: 'white' }}>{error}</Text>
                            </View>
                        }


                        {checkValidMobile && mobile.length > 0 ? (
                            <Text style={styles.textFailed}>Incorrect Mobile Number</Text>
                        ) : (
                            <Text style={styles.textFailed}> </Text>
                        )}
                        <Image source={images.CountryCode}
                            style={styles.code} />


                        {/* <View >
                            <TouchableOpacity style={styles.EyeButton} onPress={() => MobileVerification()}>
                                <Image style={{ bottom: 23 }} source={images.logButton} />
                            </TouchableOpacity>
                        </View> */}

                    </View>
                </View>
                <View style={{ bottom: 90 }}>
                    <Text style={{ color: '#FFFFFF', marginLeft: 24 }}>We will send One Time Password (OTP) to
                        above mobile number for verifcation.</Text>

                </View>
                <View>
                </View>
                {checked === 'first' ?
                    <View>

                        <TouchableOpacity onPress={() => MobileVerification() || mobileAuthentication()}>
                            <View style={{ backgroundColor: 'rgba(183,54,248,255)', width: '90%', height: 48, alignSelf: 'center', borderRadius: 8, bottom: 5 }}>
                                <Text style={{ color: 'white', alignSelf: 'center', fontFamily: 'Oswald-Bold', fontSize: 16, top: 8 }}>Sign Up</Text>
                                <RBSheet
                                    ref={refRBSheet}
                                    closeOnDragDown={true}
                                    height={630}
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
                                        <Text style={{ marginLeft: 24, fontSize: 20, fontFamily: 'Oswald-Bold' }}>Enter OTP</Text>
                                    </View>

                                    <View>
                                        <View style={{ marginTop: 10 }}>
                                            <Text style={styles.text}>Enter OTP sent to {mobile}</Text>
                                        </View>

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
                                            <TouchableOpacity onPress={() => OtpVerification()}>
                                                <Text style={{ alignSelf: 'center', color: 'white', fontFamily: 'Oswald-Bold', fontSize: 18, top: 7 }} >Next</Text>
                                            </TouchableOpacity>
                                            <RBSheet
                                                ref={refRBSheet}
                                                // closeOnDragDown={true}
                                                height={750}
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


                                                <View style={{ marginTop: 35 }}>
                                                    <Text style={{ color: 'black', fontSize: 22, fontFamily: 'Oswald-Bold', marginLeft: 24, bottom: 25, textAlign: 'center' }}>Personal Information</Text>
                                                </View>
                                                {/* <View>
                                            <Text style={{ color: '#717171', marginLeft: 24, fontFamily: 'Oswald-Bold', }}>Enter few details about yourself </Text>
                                        </View> */}

                                                <ScrollView>
                                                    <TouchableOpacity activeOpacity={1}>


                                                        <View style={styles.fieldContainer}>
                                                            <Text style={styles.nametEXT}>Enter First Name</Text>
                                                            <TextInput
                                                                style={styles.textinput}
                                                                placeholder=''
                                                                placeholderTextColor='black'
                                                                autoCapitalize='none'
                                                                value={fname}
                                                                onChangeText={setFName}
                                                            />
                                                            <Text style={styles.nametEXT}>Enter Last Name</Text>
                                                            <TextInput
                                                                style={styles.textinput}
                                                                placeholder=''
                                                                placeholderTextColor='black'
                                                                autoCapitalize='none'
                                                                value={lname}
                                                                onChangeText={setLName}
                                                            />
                                                            <Text style={styles.nametEXT}>Email</Text>
                                                            <TextInput
                                                                style={styles.textinput}
                                                                placeholder=''
                                                                placeholderTextColor='black'
                                                                autoCapitalize='none'
                                                                value={email}
                                                                onChangeText={setEmail}
                                                            />
                                                            <View style={{}}>
                                                                <TouchableOpacity style={styles.EyeButton1} onPress={() => {
                                                                    setShow1(!show1)
                                                                    setPasswordVisible1(!passwordVisible1)
                                                                }}>
                                                                    {passwordVisible1 === false ?
                                                                        <Image source={images.eyeclosed} />
                                                                        :
                                                                        <Lottie source={require('../assets/eyeani.json')} autoPlay loop style={{ height: 35, width: 35, top: 2, left: 2 }} />}
                                                                </TouchableOpacity>
                                                            </View>
                                                            <Text style={styles.nametEXT}>Create Password</Text>
                                                            <TextInput
                                                                style={styles.textinput}
                                                                placeholder=''
                                                                placeholderTextColor='black'
                                                                autoCapitalize='none'
                                                                value={newPassword}
                                                                secureTextEntry={show}
                                                                onChangeText={setNewPassword}

                                                            />
                                                            <View>
                                                                <TouchableOpacity style={styles.EyeButton} onPress={() => {
                                                                    setShow(!show)
                                                                    setPasswordVisible(!passwordVisible)
                                                                }}>
                                                                    {passwordVisible === false ?
                                                                        <Image source={images.eyeclosed} />
                                                                        :
                                                                        <Lottie source={require('../assets/eyeani.json')} autoPlay loop style={{ height: 35, width: 35, top: 2, left: 2 }} />}
                                                                </TouchableOpacity>
                                                            </View>
                                                            <Text style={styles.nametEXT}>Confirm Password</Text>
                                                            <TextInput
                                                                style={styles.textinput}
                                                                placeholder=''
                                                                placeholderTextColor='black'
                                                                autoCapitalize='none'
                                                                value={confirmPassword}
                                                                secureTextEntry={show1}
                                                                onChangeText={setConfirmPassword}
                                                            />

                                                        </View>
                                                        {confirmPassword.length > 0 ?
                                                            <View style={{ backgroundColor: 'rgba(183,54,248,255)', width: '90%', height: 48, alignSelf: 'center', borderRadius: 8, left: 3 }}>
                                                                <TouchableOpacity onPress={() => checkPasswordValidity() || SendEmail() || emailAuthentication()}>
                                                                    <Text style={{ textAlign: 'center', color: 'white', fontFamily: 'Oswald-Bold', fontSize: 18, top: 7 }}>Next</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                            :
                                                            <View style={{ backgroundColor: '#DDDDDD', width: '90%', height: 48, alignSelf: 'center', borderRadius: 8, left: 3 }}>

                                                                <Text style={{ textAlign: 'center', color: 'white', fontFamily: 'Oswald-Bold', fontSize: 18, top: 7 }}>Next</Text>

                                                            </View>
                                                        }
                                                    </TouchableOpacity>
                                                </ScrollView>




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
                    </View>

                    :
                    <View>

                        <TouchableOpacity onPress={() => EmileVerification() || mobileAuthentication()}>
                            <View style={{ backgroundColor: 'rgba(183,54,248,255)', width: '90%', height: 48, alignSelf: 'center', borderRadius: 8, bottom: 5 }}>
                                <Text style={{ color: 'white', alignSelf: 'center', fontFamily: 'Oswald-Bold', fontSize: 16, top: 8 }}>Sign Up</Text>
                                <RBSheet
                                    ref={refRBSheet}
                                    closeOnDragDown={true}
                                    height={630}
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
                                        <Text style={{ marginLeft: 24, fontSize: 20, fontFamily: 'Oswald-Bold' }}>Enter OTP</Text>
                                    </View>

                                    <View>
                                        <View style={{ marginTop: 10 }}>
                                            <Text style={styles.text}>Enter OTP sent to {signupemail}</Text>
                                        </View>

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
                                            <TouchableOpacity onPress={() => EmailOtpVerification()}>
                                                <Text style={{ alignSelf: 'center', color: 'white', fontFamily: 'Oswald-Bold', fontSize: 18, top: 7 }} >Next</Text>
                                            </TouchableOpacity>
                                            <RBSheet
                                                ref={refRBSheet}
                                                // closeOnDragDown={true}
                                                height={750}
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


                                                <View style={{ marginTop: 35 }}>
                                                    <Text style={{ color: 'black', fontSize: 22, fontFamily: 'Oswald-Bold', marginLeft: 24, bottom: 25, textAlign: 'center' }}>Personal Information</Text>
                                                </View>
                                                {/* <View>
                                        <Text style={{ color: '#717171', marginLeft: 24, fontFamily: 'Oswald-Bold', }}>Enter few details about yourself </Text>
                                    </View> */}

                                                <ScrollView>
                                                    <TouchableOpacity activeOpacity={1}>


                                                        <View style={styles.fieldContainer}>
                                                            <Text style={styles.nametEXT}>Enter First Name</Text>
                                                            <TextInput
                                                                style={styles.textinput}
                                                                placeholder=''
                                                                placeholderTextColor='black'
                                                                autoCapitalize='none'
                                                                value={fname}
                                                                onChangeText={setFName}
                                                            />
                                                            <Text style={styles.nametEXT}>Enter Last Name</Text>
                                                            <TextInput
                                                                style={styles.textinput}
                                                                placeholder=''
                                                                placeholderTextColor='black'
                                                                autoCapitalize='none'
                                                                value={lname}
                                                                onChangeText={setLName}
                                                            />
                                                            <Text style={styles.nametEXT}>Email</Text>
                                                            <TextInput
                                                                style={styles.textinput}
                                                                placeholder=''
                                                                placeholderTextColor='black'
                                                                autoCapitalize='none'
                                                                value={email}
                                                                onChangeText={setEmail}
                                                            />
                                                            <View style={{}}>
                                                                <TouchableOpacity style={styles.EyeButton1} onPress={() => {
                                                                    setShow1(!show1)
                                                                    setPasswordVisible1(!passwordVisible1)
                                                                }}>
                                                                    {passwordVisible1 === false ?
                                                                        <Image source={images.eyeclosed} />
                                                                        :
                                                                        <Lottie source={require('../assets/eyeani.json')} autoPlay loop style={{ height: 35, width: 35, top: 2, left: 2 }} />}
                                                                </TouchableOpacity>
                                                            </View>
                                                            <Text style={styles.nametEXT}>Create Password</Text>
                                                            <TextInput
                                                                style={styles.textinput}
                                                                placeholder=''
                                                                placeholderTextColor='black'
                                                                autoCapitalize='none'
                                                                value={newPassword}
                                                                secureTextEntry={show}
                                                                onChangeText={setNewPassword}

                                                            />
                                                            <View>
                                                                <TouchableOpacity style={styles.EyeButton} onPress={() => {
                                                                    setShow(!show)
                                                                    setPasswordVisible(!passwordVisible)
                                                                }}>
                                                                    {passwordVisible === false ?
                                                                        <Image source={images.eyeclosed} />
                                                                        :
                                                                        <Lottie source={require('../assets/eyeani.json')} autoPlay loop style={{ height: 35, width: 35, top: 2, left: 2 }} />}
                                                                </TouchableOpacity>
                                                            </View>
                                                            <Text style={styles.nametEXT}>Confirm Password</Text>
                                                            <TextInput
                                                                style={styles.textinput}
                                                                placeholder=''
                                                                placeholderTextColor='black'
                                                                autoCapitalize='none'
                                                                value={confirmPassword}
                                                                secureTextEntry={show1}
                                                                onChangeText={setConfirmPassword}
                                                            />

                                                        </View>
                                                        {confirmPassword.length > 0 ?
                                                            <View style={{ backgroundColor: 'rgba(183,54,248,255)', width: '90%', height: 48, alignSelf: 'center', borderRadius: 8, left: 3 }}>
                                                                <TouchableOpacity onPress={() => checkPasswordValidity()}>
                                                                    <Text style={{ textAlign: 'center', color: 'white', fontFamily: 'Oswald-Bold', fontSize: 18, top: 7 }}>Next</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                            :
                                                            <View style={{ backgroundColor: '#DDDDDD', width: '90%', height: 48, alignSelf: 'center', borderRadius: 8, left: 3 }}>

                                                                <Text style={{ textAlign: 'center', color: 'white', fontFamily: 'Oswald-Bold', fontSize: 18, top: 7 }}>Next</Text>

                                                            </View>
                                                        }
                                                    </TouchableOpacity>
                                                </ScrollView>




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
                    </View>
                }






                <View>
                    <View
                        style={{
                            // position: 'absolute',
                            flexDirection: 'row',
                            marginTop: 85,
                            alignSelf: 'center',
                        }}>
                        <Text style={styles.daccount}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                            <Text style={styles.signUp} > Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>



            </ScrollView>

        </ImageBackground>

    )
}

export default SignUpscreen;

const styles = StyleSheet.create({
    backgroundimage: {
        flex: 1
    },
    logocontainer: {
        alignItems: 'center',
        justifyContent: 'center'

    },
    logo: {
        top: 80,
        height: 48,
        width: 215


    },
    logintext: {
        color: 'white',
        height: 20,
        width: 70,
        marginTop: 260,
        left: 24,
        fontWeight: '700'

    },

    textinput1: {
        backgroundColor: 'white',
        width: '90%',
        height: 48,
        // top: 305,
        borderRadius: 8,
        left: 24,
        marginBottom: 25,
        paddingLeft: 45,
        color: 'black',
        fontSize: 16


    },
    SignIntxt: {
        fontSize: 17,
        color: 'white',
        fontWeight: '600',
        // fontFamily:'Oswald-SemiBold'
    },
    buttonSignInView: {
        backgroundColor: '(rgba(225, 65, 195, 1),rgba(185, 55, 250, 1),rgba(105, 6, 195, 1))',
        height: 45,
        width: '90%',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        left: 24,
        // top: 300
    },
    lock: {
        // top: 258,
        left: 33,
        position: 'absolute',
        bottom: 25
    },
    code: {
        height: 17,
        // top: 263,
        left: 31,
        position: 'absolute',
        top: 15
    },
    spinnerTextStyle: {
        color: '#FFF',
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
        fontSize: 18,
        fontFamily: 'Oswald-Regular',
        color: 'white',


    },
    signUp: {
        fontFamily: 'Oswald-Bold',
        color: 'white',
        fontSize: 18,
    },
    signText: {
        color: 'white',
        top: 250,
        marginLeft: 24,
        fontSize: 20,
        fontFamily: 'Oswald-Bold',

    },
    textFailed: {
        alignSelf: 'flex-end',
        color: 'white',
        bottom: 40,
        right: 16,
        fontFamily: 'Oswald-Bold'
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
    codeFieldRoot: {
        marginTop: 20,
        marginLeft: 24,
        marginRight: 24,
    },
    text: {
        marginLeft: 24,
        fontFamily: 'Oswald-Bold',
        fontSize: 14,
        color: '#717171',
    },
    nametEXT: {
        color: 'black',
        marginLeft: 20,
        fontSize: 16,
        fontFamily: 'Oswald-Bold'
    },
    fieldContainer: {
        flex: 1,
        justifyContent: 'center',
        bottom: 8
    },
    textinput: {
        borderWidth: 1,
        width: '90%',
        height: 48,
        // top: 305,
        borderRadius: 3,
        left: 24,
        marginBottom: 25,
        color: 'black',
        top: 5,
        paddingLeft: 8
    },
    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
    EyeButton: {
        color: 'grey',
        position: 'absolute',
        alignSelf: 'flex-end',
        bottom: 30,
        right: 30,


    },
    EyeButton1: {
        position: 'absolute',
        alignSelf: 'flex-end',
        top: 140,
        //   borderWidth:1,
        right: 30,
    },
    radiobutton: {
        flexDirection: 'row',
        left: 24,
        top: 200
    },
    textFailed1: {
        alignSelf: 'flex-end',
        color: 'white',
        bottom: 13,
        right: 16,
        fontFamily: 'Oswald-Bold'
    },

})