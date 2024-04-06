import React, { useState, useContext } from 'react'
import { View, Text, StatusBar, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native'
import images from '../constant/Images'
import LinearGradient from 'react-native-linear-gradient';
import UserHomeStack from '../navigation/UserStack/UserHomeStack';
import { ContextApi } from '../component/Contextapi'
import axios from 'axios';







const PublishAdScreen = ({ navigation, route }) => {

    const { mobile } = route.params
    const { password } = route.params
    const { login } = useContext(ContextApi);
    const { email } = route.params



    const loginData = () => {
        const body = {
            mobileNumber: `+91${mobile}`,
            password: password
        }

        console.log('bodyy', body);


        const LoginRequest = async () => {
            try {
                const resp = await axios.post("/api/user/signin", body);
                console.log('RESPONSE IN PUBLISH PAGE', resp.data);

                login(resp.data.token, resp.data.user)
            } catch (err) {
                // Handle Error Here
                console.error("error from Login ==> ", err);
            }
        };
        LoginRequest();
    }

    const EmailloginData = () => {
        const body = {
            email: email,
            password: password
        }

        console.log('bodyy', body);


        const LoginRequest = async () => {
            try {
                const resp = await axios.post("/api/user/signin", body);
                console.log('RESPONSE IN PUBLISH PAGE', resp.data);

                login(resp.data.token, resp.data.user)
            } catch (err) {
                // Handle Error Here
                console.error("error from Login ==> ", err);
            }
        };
        LoginRequest();
    }




    return (
        <View style={styles.mainContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={images.publishAd} />
                <View>
                    <Text style={styles.publish}>Publish your Ad quickly, easily and flexibly</Text>
                </View>
                <View>

                    <Text style={styles.subtitle}>Upload your ad, select a billboard, schedule time and {'\n'}you're done. It’s that easy.</Text>
                </View>
            </View>

            <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={styles.Linearstyle}>
                <TouchableOpacity onPress={() => navigation.navigate('Brand', { mobile: mobile, password: password,email:email })}>
                    <Text style={styles.continue}>Continue</Text>
                </TouchableOpacity>

            </LinearGradient>
            {email === null ?
            <View>
                <TouchableOpacity onPress={() => loginData()}>
                    <Text style={styles.skip}>Skip</Text>
                </TouchableOpacity>
            </View>

            :

            <View>
            <TouchableOpacity onPress={() => EmailloginData()}>
                <Text style={styles.skip}>Skip</Text>
            </TouchableOpacity>
        </View>

            }



        </View>
    )
}

export default PublishAdScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',


    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        marginTop: '20%'

    },
    image: {
        alignSelf: 'center'
    },
    publish: {
        color: '#5A5A5A',
        alignSelf: 'center',
        fontSize: 20,
        fontFamily: 'Oswald-Bold',
        margin: 20


    },
    subtitle: {
        color: '#5A5A5A',
        alignSelf: 'center',
        fontSize: 16,
        fontFamily: 'Oswald-SemiBold',
        textAlign: 'center'

    },
    Linearstyle: {
        height: 40,
        width: 328,
        alignSelf: 'center',
        borderRadius: 8,
        marginBottom: '10%'


    },
    continue: {
        alignSelf: 'center',
        color: 'white',
        fontFamily: 'Oswald-Bold',
        fontSize: 18,
        paddingTop: 2
    },
    skip: {
        color: '#5A5A5A',
        fontSize: 18,
        fontFamily: 'Oswald-Bold',
        alignSelf: 'center',
        marginBottom: '20%'
    },


})
