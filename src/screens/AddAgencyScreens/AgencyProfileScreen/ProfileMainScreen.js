import React, { useState, useContext, useEffect } from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import images from "../../../constant/Images";
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ContextApi } from '../../../component/Contextapi';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import axios from "axios";
import UserAvatar from 'react-native-user-avatar';
import DeviceInfo from 'react-native-device-info';




const ProfileMainScreen = ({ navigation }) => {

    const [userDetail, setDetail] = useState(null)
    const { logout } = useContext(ContextApi)
    const [walletAmount, setWalletAmount] = useState(null)
    const [personalInfo, setPersonalInfo] = useState(null)
    const appVersion = DeviceInfo.getVersion();



    const handleLogout = () => {
        logout();

    }

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


    const getWalletamount = async () => {
        let body = {
            userId: userDetail?._id
        }
        console.log('BODY OF WALLET AMOUNT', body);
        try {
            const resp = await axios.post('/api/payment/getWalletData', body)
            console.log('RESPONSE FROM WALLET AMOUNT APIII', resp.data.msg);
            setWalletAmount(resp?.data?.msg)

        } catch (error) {
            console.log('ERROR FROM WALLET AMOUNTT', error);
        }
    }

    // getWalletamount()
    useEffect(() => {
        getWalletamount()

    }, [userDetail?._id])


    const getUserInfo = async () => {
        try {
            const res = await axios.get(`/api/user/profile/${userDetail?._id}`)
            setPersonalInfo(res.data.msg)
            // console.log('RESPONSE FROM PoEpRSONAL INFORMATION>>>>>>>', res.data.msg);

        } catch (error) {
            console.log('ERROR FROM PERSONAL INFO', error);

        }
    }


    useEffect(() => {
        getUserInfo()

    }, [userDetail?._id])


    return (
        <View style={{ flex: 1 }}>

            <View>
                <View style={{ height: 78, backgroundColor: 'rgba(183,54,248,255)' }}>

                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                            <View style={{ marginTop: '8%', }}>
                                <Image source={images.back} style={{ marginTop: 5, marginLeft: 16 }} />
                                <View style={{ alignSelf: 'center', bottom: 20 }}>
                                    <Text style={{ color: 'white', fontFamily: 'Oswald-Bold', fontSize: 18 }}>Profile</Text>
                                </View>
                            </View>

                        </TouchableOpacity>

                    </View>
                </View>
            </View>
            <ScrollView>

                <View>
                    <View style={styles.container1}>
                        <UserAvatar size={100} name={personalInfo?.agencyName} style={styles.ProfileImage} bgColor="rgba(183,54,248,255)" />

                        <Text style={styles.txt}>{userDetail?.firstName} {userDetail?.lastName}</Text>
                    </View>
                </View>


                <View style={styles.container2}>
                    <View style={{ marginTop: 8 }}>
                        <Text style={styles.cont2txt}>Members</Text>
                        <Text style={styles.value}>0</Text>
                    </View>
                    <View style={{ marginTop: 8 }}>
                        <Text style={styles.cont2txt}>Orders</Text>
                        <Text style={styles.value}>0</Text>
                    </View>
                    <View style={{ marginTop: 8 }}>
                        <Text style={styles.cont2txt}>Wallet</Text>
                        <Text style={styles.value}>₹ {walletAmount?.walletBalance}</Text>
                    </View>
                </View>

                <View style={{ backgroundColor: 'white', elevation: 4, marginTop: 8 }}>

                    <TouchableOpacity onPress={() => navigation.navigate('AgencyAccount')}>
                        <View style={{ marginTop: 8 }}>
                            <Text style={styles.account}>Account</Text>
                        </View>
                        <View>
                            <Text style={styles.subtxt}>Edit Name,address,KYC</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.line} />


                    <TouchableOpacity onPress={() => navigation.navigate('AgencyOrder')}>
                        <View style={{ marginTop: 8 }}>
                            <Text style={styles.account}>My Orders</Text>
                        </View>
                        <View>
                            <Text style={styles.subtxt}>View & manage orders</Text>
                        </View>
                    </TouchableOpacity>


                    <View style={styles.line} />

                    <TouchableOpacity onPress={() => navigation.navigate('AllmemberScreen')}>
                        <View style={{ marginTop: 8 }}>
                            <Text style={styles.account}>Agency</Text>
                        </View>
                        <View>
                            <Text style={styles.subtxt}>View & manage agency members</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.line} />

                    <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
                        <View style={{ marginTop: 8 }}>
                            <Text style={styles.account}>Saved Billboards</Text>
                        </View>
                        <View>
                            <Text style={styles.subtxt}>View & manage Saved Billboards</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.line} />

                    <TouchableOpacity onPress={() => navigation.navigate('AgencyWallet')}>
                        <View style={{ marginTop: 8 }}>
                            <Text style={styles.account}>Wallet ( ₹ {walletAmount?.walletBalance} )</Text>
                        </View>
                        <View>
                            <Text style={styles.subtxt}>View & manage Wallet transactions</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.line} />

                    
                    <TouchableOpacity onPress={() => navigation.navigate('AgencyAnalytics')}>
                        <View style={{ marginTop: 8 }}>
                            <Text style={styles.account}>Analytics</Text>
                        </View>
                        <View>
                            <Text style={styles.subtxt}>View & manage Analytics</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.line} />


                    <TouchableOpacity onPress={() => navigation.navigate('AgencySecurity')}>
                        <View style={{ marginTop: 8 }}>
                            <Text style={styles.account}>Security</Text>
                        </View>
                        <View>
                            <Text style={styles.subtxt}>Change Password</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.line} />

                    <TouchableOpacity onPress={() => navigation.navigate('AgencyNotifiction')}>
                        <View style={{ marginTop: 8 }}>
                            <Text style={styles.account}>Notification</Text>
                        </View>
                        <View>
                            <Text style={styles.subtxt}>Manage Notifications</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.line} />

                </View>

                <View style={{ backgroundColor: 'white', elevation: 4, marginTop: 12 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 8 }}>
                        <Text style={styles.cancellation}>Cancellation Policy</Text>
                        <Image source={images.reverseback} style={styles.back} />
                    </View>
                    <View style={styles.line} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 8 }}>
                        <Text style={styles.cancellation}>Privacy Policy</Text>
                        <Image source={images.reverseback} style={styles.back} />
                    </View>
                    <View style={styles.line} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 8 }}>
                        <Text style={styles.cancellation}>Content Policy</Text>
                        <Image source={images.reverseback} style={styles.back} />
                    </View>
                    <View style={styles.line} />
                </View>

                <View style={{ backgroundColor: 'white', elevation: 4, marginTop: 8, marginBottom: 100, height: '100%' }}>
                    <TouchableOpacity onPress={handleLogout}>
                        <View style={styles.cont}>
                            <Text style={styles.submit}>Sign Out</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{ top: 8 }}>
                        <Text style={{ color: 'black', textAlign: 'center' }}>version {appVersion}</Text>
                        <Text style={{ color: 'black', textAlign: 'center' }}>©postmyad</Text>
                    </View>

                </View>

            </ScrollView>



        </View>
    )
}

export default ProfileMainScreen

const styles = StyleSheet.create({
    container1: {
        backgroundColor: 'white',
        elevation: 4,
        height: 160,
        justifyContent: 'center'
    },
    profile: {
        alignSelf: 'center'
    },
    txt: {
        color: '#525252',
        fontSize: 16,
        alignSelf: 'center',
        fontFamily: 'Oswald-Bold'
    },
    container2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        borderWidth: 0.5,
        borderColor: '#C4C4C4',
        backgroundColor: 'white',
        height: 76

    },
    cont2txt: {
        color: '#5A5A5A',
        fontFamily: 'Oswald-Bold',
        fontSize: 16,
        marginLeft: 16,
        marginRight: 16
    },
    value: {
        color: '#5A5A5A',
        fontFamily: 'Oswald-Bold',
        fontSize: 16,
        alignSelf: 'center',
        marginRight: 16
    },
    account: {
        color: '#5A5A5A',
        fontFamily: 'Oswald-Bold',
        fontSize: 16,
        marginLeft: 16
    },
    subtxt: {
        color: '#9CA9C5',
        fontFamily: 'Oswald-Regular',
        fontSize: 14,
        marginLeft: 16
    },
    line: {
        borderWidth: 0.4,
        borderColor: '#DDDDDD',
        marginLeft: 16,
        marginRight: 16,
        marginTop: 8

    },
    back: {
        marginRight: 16,
        marginTop: 8
    },
    cancellation: {
        color: '#5A5A5A',
        fontFamily: 'Oswald-Bold',
        fontSize: 16,
        marginLeft: 8
    },
    submit: {
        color: '#B937FA',
        alignSelf: 'center',
        fontSize: 18,
        fontFamily: 'Oswald-Regular',
        top: 8
    },
    cont: {
        borderWidth: 1,
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 15,
        marginTop: 12,
        borderColor: '#B937FA',
        height: 53,
        width: 328,
        alignSelf: 'center'
    },
    ProfileImage: {
        alignSelf: 'center',
        height: 100,
        width: 100,
        borderRadius: 90
    },


})