import React, { useContext, useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { ContextApi } from '../../component/Contextapi';
import images from '../../constant/Images';
import arrowRight from '../../assets/arrow1.png';
import SwipeButton from 'rn-swipe-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import UserAvatar from 'react-native-user-avatar';






const UserDrawerContent = ({ props, navigation }) => {

    const { logout } = useContext(ContextApi)
    const [showBox, setShowBox] = useState(true);
    const [userDetail, setDetail] = useState(null)
    // console.log('USER DETAILSSSS', userDetail);
    const [walletAmount, setWalletAmount] = useState(null)
    const [personalInfo, setPersonalInfo] = useState(null)

    const isFocused = useIsFocused();

    const onSlideRight = () => {
        logout()
    }

    const showConfirmDialog = () => {
        return Alert.alert(
            "Are you sure?",
            "Are you sure you want to LOGOUT ?",
            [
                // The "Yes" button
                {
                    text: "Yes",
                    onPress: () => {
                        onSlideRight()
                        setShowBox(false);
                    },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "No",
                },
            ]
        );
    };

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


    React.useEffect(() => {
        getUserInfo()
    }, [isFocused]);


    const getUserInfo = async () => {
        try {
            const res = await axios.get(`/api/user/profile/${userDetail?._id}`)
            setPersonalInfo(res.data.msg)
            // console.log('RESPONSE FROM PoEpRSONAL INFORMATION', res.data.msg);

        } catch (error) {
            console.log('ERROR FROM PERSONAL INFO', error);

        }
    }


    useEffect(() => {
        getUserInfo()

    }, [userDetail?._id])





    const getWalletamount = async () => {
        let body = {
            userId: userDetail?._id
        }
        console.log('BODY OF WALLET AMOUNT', body);
        try {
            const resp = await axios.post('/api/payment/getWalletData', body)
            console.log('RESPONSE FROM WALLET AMOUNT APII', resp.data.msg);
            setWalletAmount(resp?.data?.msg)

        } catch (error) {
            console.log('ERROR FROM WALLET AMOUNT', error);
        }
    }

    // getWalletamount()
    useEffect(() => {

        getWalletamount()

    }, [userDetail?._id])



    return (
        <View style={{ flex: 1, backgroundColor: 'white', height: '100%', width: '100%' }}>
            <DrawerContentScrollView {...props} style={{}}>

                <View style={styles.imagecontainer}>
                    <UserAvatar size={100} name={personalInfo?.firstName} style={styles.ProfileImage} bgColor="rgba(183,54,248,255)" />
                    <Text style={{ color: '#484848', textAlign: 'center', fontSize: 16, fontFamily: 'Oswald-Bold', marginTop: 15 }}>{personalInfo?.firstName} {personalInfo?.lastName}</Text>
                    {personalInfo?.email === null || personalInfo?.mobileNumber === null ?
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={images.verify} style={{ width: 15, height: 15, top: 5, left: 50 }} />
                            <Text style={{ left: 55, fontSize: 12, top: 3, color: '#484848', fontFamily: 'Oswald-Regular' }}>Not Verified</Text>
                        </View>
                        :

                        <View style={{ flexDirection: 'row' }}>
                            <Image source={images.verify} style={{ width: 15, height: 15, top: 5, left: 50, tintColor: 'green' }} />
                            <Text style={{ left: 55, fontSize: 12, top: 3, color: 'green', fontFamily: 'Oswald-Regular' }}>Verified</Text>
                        </View>
                    }
                    {personalInfo?.email === null || personalInfo?.mobileNumber === null ?
                        <View style={{ alignSelf: 'center' }}>
                            <TouchableOpacity onPress={() => navigation.navigate('UserProfileMain')}>
                                <Text style={{ fontSize: 12, textAlign: 'center', color: '#B937FA', fontFamily: 'Oswald-Regular' }}>Complete your profile</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        null
                    }

                </View>

                <View style={{ borderWidth: 0.5, marginTop: 45, borderColor: '#B5B5C3', right: 10 }} />
                <View style={{ right: 10 }}>
                    <View style={{ left: 20, }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Billboards')}>
                            <Image source={images.bill1} style={{ height: 20, width: 20, marginTop: 20 }} />
                            <Text style={{ color: '#484848', fontFamily: 'Oswald-Regular', fontSize: 16, left: 28, bottom: 27 }}> My Billboards</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ left: 20, }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
                            <Image source={images.orders1} style={{ height: 18, width: 18, }} />
                            <Text style={{ color: '#484848', fontFamily: 'Oswald-Regular', fontSize: 16, left: 28, bottom: 25 }}> My Orders</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ left: 20, }}>
                        <TouchableOpacity onPress={() => navigation.navigate('UserProfileMain')}>
                            <Image source={require('../../assets/profile.png')} style={{ height: 18, width: 18, tintColor: 'grey' }} />
                            <Text style={{ color: '#484848', fontFamily: 'Oswald-Regular', fontSize: 16, left: 28, bottom: 25 }}> My Profile</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ left: 20, bottom: 2 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('WalletScreen')}>
                            <Image source={images.wallet} style={{ height: 20, width: 20, }} />
                            <Text style={{ color: '#484848', fontFamily: 'Oswald-Regular', fontSize: 16, left: 28, bottom: 25 }}> Wallet (₹ {walletAmount?.walletBalance})</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ left: 20, bottom: 2 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Wishlist')}>
                            <Image source={images.hh} style={{ height: 25, width: 25, tintColor: 'grey', right: 3, top: 2 }} />
                            <Text style={{ color: '#484848', fontFamily: 'Oswald-Regular', fontSize: 16, left: 28, bottom: 25 }}> My Wishlist</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderWidth: 0.5, borderColor: '#B5B5C3', bottom: 10 }} />

                    <View style={{ left: 20, bottom: 2 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Terms & Condition')}>
                            <Image source={images.terms} style={{ height: 20, width: 20, }} />
                            <Text style={{ color: '#484848', fontFamily: 'Oswald-Regular', fontSize: 16, left: 28, bottom: 25 }}> Cancellation Policy</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ left: 20, bottom: 2 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('My Privacy')}>
                            <Image source={images.privacy} style={{ height: 20, width: 20, }} />
                            <Text style={{ color: '#484848', fontFamily: 'Oswald-Regular', fontSize: 16, left: 28, bottom: 25 }}> Privacy Policy</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderWidth: 0.5, marginTop: 26, borderColor: '#B5B5C3' }} />


                    <View style={{ left: 20, bottom: 32 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('My Content')}>
                            <Image source={images.privacy} style={{ height: 20, width: 20, }} />
                            <Text style={{ color: '#484848', fontFamily: 'Oswald-Regular', fontSize: 16, left: 28, bottom: 25 }}> Content Policy</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '90%', left: 12, }}>
                        <SwipeButton
                            height={43}
                            width={165}
                            railBackgroundColor="white"
                            railStyles={{
                                borderColor: '#B937FA',
                                backgroundColor: '#B937FA'
                            }}
                            thumbIconBackgroundColor={'#B937FA'}
                            title="      Log Out"
                            titleStyles={{ fontSize: 14, fontFamily: 'Oswald-Bold' }}
                            onSwipeSuccess={showConfirmDialog}
                            thumbIconWidth={50}
                            thumbIconBorderColor='#B937FA'
                            thumbIconImageSource={arrowRight}
                            railFillBorderColor='grey'
                            thumbIconStyles={{ borderRadius: 35 }}
                            sli

                        />
                    </View>
                </View>

            </DrawerContentScrollView>
        </View>
    )
}

export default UserDrawerContent

const styles = StyleSheet.create({
    ProfileImage: {
        height: 93,
        width: 93,
        left: 49,
    },
    imagecontainer: {
        top: 19
    },
    titleText: {
        fontSize: 12,
        fontWeight: 'normal',
        textAlign: 'center',
        color: '#ffffff',
    }
})