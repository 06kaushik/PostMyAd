import React, { useState, useContext } from 'react'
import { View, Text, StatusBar, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import images from '../constant/Images'



const ConnectYourAccount = ({navigation,route}) => {
    const {mobile} = route.params
    const {password} = route.params


    return (
        <ImageBackground
            style={styles.backgroundimage}

            source={images.BackgroundImage}>
            <StatusBar hidden={true} />
            <View style={styles.logocontainer}>
                <Image style={styles.logo}
                    source={images.sapslogo} />
            </View>
            <View style={styles.icon} >
                <TouchableOpacity>
                    <Image style={styles.back} source={images.back} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <Image style={styles.back1} source={images.whiteCross} />
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <Text style={styles.connect}>Connect your Account</Text>
                <View style={{ flex: 1, justifyContent: 'center', marginBottom: '10%' }}>
                    <TouchableOpacity>
                        <Image style={styles.fb} source={images.connectFb} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image style={styles.tt} source={images.connecttwitter} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image style={styles.ld} source={images.connectlink} />
                    </TouchableOpacity>
                </View>

            </View>

            <View>
                            <TouchableOpacity onPress={() => navigation.navigate('SelectOption',{mobile:mobile,password:password})}>
                            <Text style={styles.thnkstext}>No thanks</Text>
                            </TouchableOpacity>
                        </View>






        </ImageBackground>
    )
}

export default ConnectYourAccount;
const styles = StyleSheet.create({
    backgroundimage: {
        flex: 1
    },
    logocontainer: {
        alignItems: 'center',
    },
    logo: {
        top: 80,
        
    },
    icon: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    back: {
        marginLeft: 20,
        marginTop: 60
    },
    back1: {
        marginRight: 20,
        marginTop: 55

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
        fontFamily: 'Oswald-Regular'
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
        marginTop: '30%',
        fontFamily: 'Oswald-Bold',
        fontSize: 16

    },
    container: {
        alignSelf: 'center',
        backgroundColor: 'white',
        height: 301,
        borderRadius: 15,
        width: 306,
        marginTop: '30%',
        
    },
    connect: {
        color: '#3D3D3D',
        alignSelf: 'center',
        fontFamily: 'Oswald-Bold',
        fontSize: 24

    },
    fb: {
        alignSelf: 'center',
        margin: 10
    },
    tt: {
        alignSelf: 'center',
        margin: 10
    },
    ld: {
        alignSelf: 'center',
        margin: 10
    }
})