import React, { useState, useContext } from 'react'
import { View, Text, StatusBar, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import images from '../constant/Images'


const SelectOptionScreen = ({navigation,route}) => {

    const {mobile} = route.params
    const {password} = route.params

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
                <TouchableOpacity onPress={() => navigation.goBack('EmailVerification')}>
                    <Image style={styles.back} source={images.back} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <Image style={styles.back1} source={images.whiteCross} />
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <Text style={styles.title}>I want to</Text>
                <View style={styles.maincont}>
                    <View style={styles.container1}>
                        <TouchableOpacity>
                            <Text style={styles.option1}>Advertise my brand</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container2}>
                        <TouchableOpacity>
                            <Text style={styles.option1}>Promote my talent</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container3}>
                        <TouchableOpacity>
                            <Text style={styles.option1}>Generate extra Income</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container4}>
                        <TouchableOpacity>
                            <Text style={styles.option1}>Other</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('PublishAdd',{mobile:mobile,password:password})}>
                <Image style={styles.logobutton} source={images.logButton} />
                </TouchableOpacity>
            </View>

        </ImageBackground>
    )
}

export default SelectOptionScreen;
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
    title: {
        color: 'white',
        fontSize: 24,
        fontFamily: 'Oswald-Bold',
        alignSelf: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: '20%'
    },
    maincont: {
        marginTop: 20

    },
    option1: {
        alignSelf: 'center',
        fontSize: 16,
        fontFamily: 'Oswald-Bold',
        color: 'black',
        paddingTop: 3,
    },
    container1: {
        backgroundColor: 'white',
        height: 32,
        width: 312,
        alignSelf: 'center',
        borderRadius: 8,
        margin: 10

    },
    container2: {
        backgroundColor: 'white',
        height: 32,
        width: 312,
        alignSelf: 'center',
        borderRadius: 8,
        margin: 10

    },
    container3: {
        backgroundColor: 'white',
        height: 32,
        width: 312,
        alignSelf: 'center',
        borderRadius: 8,
        margin: 10

    },
    container4: {
        backgroundColor: 'white',
        height: 32,
        width: 312,
        alignSelf: 'center',
        borderRadius: 8,
        margin: 10

    },
    logobutton: {
        alignSelf: 'flex-end',
        marginRight: 15,
        marginBottom: '10%'
    },

})