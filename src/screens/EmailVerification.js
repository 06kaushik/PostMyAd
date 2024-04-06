import React, { useState, useContext } from 'react'
import { View, Text, StatusBar, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import images from '../constant/Images'
import { RadioButton } from 'react-native-paper'
import axios from 'axios'


const EmailVerification = ({ navigation, route }) => {

    const [checked, setChecked] = React.useState('');
    const [email, setEmail] = useState('')

    const { mobile } = route.params
    const { password } = route.params
    const {userId} = route.params
    // console.log('USER ID', userId);

    const SendEmail = () => {
        let body = {
            email: email,
            userId:userId



        }
        console.log('EMAIL BODY',body);

        const getEmail = async() => {
            try {
                navigation.navigate('SelectOption',{mobile:mobile,password:password})
                const response = await axios.post('/api/normaluser/sendmail', body)
                console.log('RESPONSE FROM EMAIL VERIFICATION', response?.data?.msg);

            } catch (err) {
                console.log('ERROR FROM EMAIL VERIFICATION', err);

            }

        }
        getEmail()
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
                <TouchableOpacity onPress={() => navigation.goBack('PersonalDetail')}>
                    <Image style={styles.back} source={images.back} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <Image style={styles.back1} source={images.whiteCross} />
                </TouchableOpacity>
            </View>

            <View style={styles.fieldContainer}>
                <Text style={styles.nametEXT}>What's your Email?</Text>
                <TextInput
                    style={styles.textinput}
                    placeholder='Enter Email'
                    placeholderTextColor='#4D4D4D'
                    autoCapitalize='none'
                    value={email}
                    onChangeText={setEmail}
                />
                {/* <View style={styles.radio}>
                         <RadioButton
                                value="first"
                                status={checked === 'first' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('first')}
                                color='white'
                                uncheckedColor='white'
                            />
                            <Text style={styles.veriText}>I do not wish to receive any communication or {'\n'} promotional offers from ASAP.</Text>
                            </View> */}
            </View>
            {/* <View>
                            <TouchableOpacity onPress={() =>  navigation.navigate('AccountConnect',{mobile:mobile,password:password})}>
                            <Text style={styles.thnkstext}>No Thanks</Text>
                            </TouchableOpacity>
                        </View> */}

            <View>
                <TouchableOpacity onPress={() => SendEmail()}>
                    <Image style={styles.logobutton} source={images.logButton} />
                </TouchableOpacity>
            </View>

        </ImageBackground>
    )
}

export default EmailVerification
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
    nametEXT: {
        color: 'white',
        marginLeft: 20,
        fontSize: 16,
        fontFamily: 'Oswald-Bold'
    },
    fieldContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    textinput: {
        backgroundColor: 'white',
        width: '90%',
        height: 40,
        // top: 305,
        borderRadius: 8,
        left: 24,
        marginBottom: 13,
        paddingLeft: 20,
        color: 'black',
        top: 5,
        fontFamily: 'Oswald-Regular',
        fontSize:16
    },
    logobutton: {
        alignSelf: 'flex-end',
        marginRight: 15,
        marginBottom: '30%'
    },
    radio: {
        marginLeft: 20,
        marginTop: 10,
        flexDirection: 'row'
    },
    veriText: {
        color: '#DFDFDF',
        fontFamily: 'Oswald-Bold',
        fontSize: 12
    },
    thnkstext: {
        color: '#FFFFFF',
        alignSelf: 'center',
        marginBottom: '20%',
        fontFamily: 'Oswald-Bold',
        fontSize: 16

    }
})