import React, { useState, useContext,useEffect } from 'react'
import { View, Text, StatusBar, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator,Alert } from 'react-native'
import images from '../constant/Images'
import axios from 'axios'


const PersonalDetail = ({ navigation,route }) => {

    const [fname,setFName] = useState('')
    const [lname,setLName] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmErrorMessage, setConfirmErrorMessage] = useState('')

    const {userId} = route.params
    const {mobile} = route.params


    

    const resetPassword = () => {
        let errorFlag = false

        if (newPassword.length == 0) {
            errorFlag = true;
            setPasswordErrorMessage({ passwordErrorMessage : "Password is required feild"});
        } else if (newPassword.length < 8 || newPassword.length > 20) {
            errorFlag = true;
            setPasswordErrorMessage({ passwordErrorMessage: "Password should be min 8 char and max 20 char" });
        } else if (newPassword !== confirmPassword) {
            errorFlag = true;
            setPasswordErrorMessage({ passwordErrorMessage: "Passwoad and confirm password should be same." });
        } else if (newPassword !== /^\S*$/){
            errorFlag = true;
            setPasswordErrorMessage({passwordErrorMessage: "Password must not contain WhiteSpaces"})
        } else if (newPassword !== /^(?=.*[A-Z]).*$/) {
            errorFlag = true;
            setPasswordErrorMessage({passwordErrorMessage: "Password must have at least one Uppercase Character."})
        }else if(newPassword !== /^(?=.*[a-z]).*$/ ) {
            errorFlag = true;
            setPasswordErrorMessage({passwordErrorMessage: "Password must have at least one Lowercase Character."})
        } else if(newPassword !== /^(?=.*[0-9]).*$/){
            errorFlag = true;
            setPasswordErrorMessage({passwordErrorMessage: "Password must contain at least one Digit."})
        } else if (newPassword !== /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/) {
            errorFlag = true;
            setPasswordErrorMessage({passwordErrorMessage: "Password must contain at least one Special Symbol."})
        }

        if (confirmPassword.length == 0) {
            errorFlag = true;
            setConfirmErrorMessage({ confirmPasswordErrorMessage: "Confirm Password is required feild" });
        } else if (confirmPassword.length < 8 || confirmPassword.length > 20) {
            errorFlag = true;
            setConfirmErrorMessage({ confirmErrorMessage: "Password should be min 8 char and max 20 char" });
        } else if (confirmPassword !== /^\S*$/) {
            errorFlag = true;
            setConfirmErrorMessage({ confirmErrorMessage: "Password must not contain Whitespaces" });
        }else if (confirmPassword !== /^(?=.*[A-Z]).*$/) {
            errorFlag = true;
            setPasswordErrorMessage({confirmErrorMessage: "Password must have at least one Uppercase Character."})
        }else if(confirmPassword !== /^(?=.*[a-z]).*$/ ) {
            errorFlag = true;
            setPasswordErrorMessage({confirmErrorMessage: "Password must have at least one Lowercase Character."})
        } else if(confirmPassword !== /^(?=.*[0-9]).*$/){
            errorFlag = true;
            setPasswordErrorMessage({confirmErrorMessage: "Password must contain at least one Digit."})
        } else if (confirmPassword !== /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/) {
            errorFlag = true;
            setPasswordErrorMessage({confirmErrorMessage: "Password must contain at least one Special Symbol."})
        }

        if (errorFlag) {
            Alert.alert('Check your Password')


        }else{

            const body = {
                userId:  userId,
                newPassword: newPassword,
                firstName: fname,
                lastName:lname
                // confirmPassword:confirmPassword
            }
            console.log('PASSWORD', body);
    
            const ChangeRequest = async () => {
                try {
                    const resp = await axios.post("/api/normaluser/updateNormalUserPassword", body);
                    console.log("Change Password response ==> ", resp.data.msg);
                    navigation.navigate('EmailVerification',{password:newPassword,mobile:mobile,userId:userId})
    
                    // login(resp.data.token, resp.data.user)
                    
    
    
                } catch (err) {
                    // Handle Error Here
                    console.error("error from Change Password Screen ==> ", err);
                }
    
    
            }
            ChangeRequest()
        }
    
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
            <View style={styles.icon} >
                <TouchableOpacity onPress={() => navigation.goBack('Verification')}>
                    <Image style={styles.back} source={images.back} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <Image style={styles.back1} source={images.whiteCross} />
                </TouchableOpacity>
            </View>
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
                        <Text style={styles.nametEXT}>Create Password</Text>
                <TextInput
                            style={styles.textinput}
                            placeholder=''
                            placeholderTextColor='black'
                            autoCapitalize='none'
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />
                        <Text style={styles.nametEXT}>Confirm Password</Text>
                <TextInput
                            style={styles.textinput}
                            placeholder=''
                            placeholderTextColor='black'
                            autoCapitalize='none'
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
            </View>
            <View>
                <TouchableOpacity onPress={() => resetPassword()}>
                <Image style={styles.logobutton} source={images.logButton} />
                </TouchableOpacity>
            </View>

        </ImageBackground>

    )
}

export default PersonalDetail;

const styles = StyleSheet.create({
    backgroundimage: {
        flex: 1
    },
    logocontainer: {
        alignItems: 'center',
    },
    logo: {
        top: 80,
        height:48,
        width:215
        
    },
    icon: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    back: {
        marginLeft: 20,
        marginTop: 45
    },
    back1: {
        marginRight: 20,
        marginTop: 40

    },
    nametEXT:{
        color:'white',
        marginLeft:20,
        fontSize:16,
        fontFamily:'Oswald-Bold'
    },
    fieldContainer:{
        flex:1,
        justifyContent:'center',
        marginTop:50
    },
    textinput: {
        backgroundColor: 'white',
        width: '90%',
        height: 40,
        // top: 305,
        borderRadius: 8,
        left: 24,
        marginBottom: 25,
      
        color: 'black',
        top:5,
        
    },
    logobutton: {
        alignSelf: 'flex-end',
        marginRight: 15,
        marginBottom:15
       
    },
})