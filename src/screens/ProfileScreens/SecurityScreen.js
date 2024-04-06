import React, { useState,useEffect,useContext } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput,Alert } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import images from "../../constant/Images";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ContextApi } from '../../component/Contextapi';
import axios from "axios";




const SecurityScreen = ({ navigation }) => {

    const [newPassword, setNewPassword] = useState('')
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmErrorMessage, setConfirmErrorMessage] = useState('')
    const [isloading, setIsLoading] = useState(false)
    const [userDetail, setDetail] = useState(null)
 
    const { logout } = useContext(ContextApi)






    const resetPassword = () => {
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


        }else{

        const body = {
            userId:  userDetail._id,
            newPassword: newPassword
            // confirmPassword:confirmPassword
        }
        console.log('PASSWORD', body);

        const ChangeRequest = async () => {
            try {
                const resp = await axios.post("/api/user/updatePassword", body);
                console.log("Change Password response ==> ", resp);

                // login(resp.data.token, resp.data.user)
                logout();


            } catch (err) {
                // Handle Error Here
                console.error("error from Change Password Screen ==> ", err);
            }


        }
        ChangeRequest()
    }

    }


    const getUser = async () => {
        try {
          let userDetail = await AsyncStorage.getItem('USER');
          let data = JSON.parse(userDetail);
          console.log('DATA FROM USER', data);
          setDetail(data)
        } catch (error) {
          console.log("Something went wrong", error);
        }
      }
    
      useEffect(() => {
        getUser();
      }, [])





    return (
        <View>
            <View >
                <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={styles.linearStyle}>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <Image source={images.back} style={styles.back} />
                    </TouchableOpacity>
                    <Text style={styles.prfile}>Account</Text>
                </LinearGradient>
            </View>

            <View style={styles.container1}>
                <Text style={styles.acctxt}>New Password</Text>
                <TextInput
                    style={styles.textInput}
                    placeholderTextColor='#6F6F6F'
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
                {passwordErrorMessage.length > 0 && <Text style={styles.textDanger}>{passwordErrorMessage}</Text>}

                <View>
                    <Text style={styles.acctxt}>Confirm Password</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor='#6F6F6F'
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    {confirmErrorMessage.length > 0 && <Text style={styles.textDanger}>{confirmErrorMessage}</Text>}
                </View>

                {/* <View>
                    <Text style={styles.acctxt}>Email</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor='#6F6F6F'
                        value={email}
                        onChangeText={setEmail}

                    />
                </View> */}


                <View style={{ top: '15%' }}>
                    <TouchableOpacity onPress={() => resetPassword()}>
                        <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={styles.lgoutbttn}>
                            <Text style={styles.logouttxt}>Reset Password</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

            </View>





        </View>
    )
}

export default SecurityScreen;

const styles = StyleSheet.create({
    linearStyle: {
        flexDirection: 'row',
        height: 80,

    },
    back: {
        left: 20,
        top: 40

    },
    prfile: {
        left: 33,
        top: 38,
        fontFamily: 'Oswald',
        fontWeight: 'bold',
        fontSize: 14,
        color: 'white'

    },
    container1: {
        backgroundColor: 'white',
        elevation: 4,
        width: '95%',
        left: 10,
        borderRadius: 15,
        marginBottom: 200,
        height: 230,
        top: 40
    },
    acctxt: {
        fontFamily: 'Calibri',
        fontWeight: '700',
        fontSize: 16,
        left: 20,
        color: '#525252',
        margin: 5, top: 10
    },
    textInput: {
        height: 35,
        left: 25,
        borderRadius: 10,
        backgroundColor: '#F8F9FD',
        width: '90%',
        top: 15,
        paddingLeft: 10

    },
    lgoutbttn: {
        // top:-230,
        width: 150,
        // left:135,
        height: 38,
        borderRadius: 20,
        alignSelf: 'center',


    },
    logouttxt: {
        textAlign: 'center',
        top: 7,
        color: 'white',
        fontFamily: 'Calibri',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 16


    },
    textDanger: {
        color: "red"
    }
})