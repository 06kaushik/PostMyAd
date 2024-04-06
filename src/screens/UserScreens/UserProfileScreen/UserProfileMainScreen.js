import React, { useState, useContext, useEffect } from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import images from "../../../constant/Images";
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ContextApi } from '../../../component/Contextapi';
import axios from "axios";
import DeviceInfo from 'react-native-device-info';
import UserAvatar from 'react-native-user-avatar';
import { adminRequest } from "../AxiosInstance";


const UserProfileMainScreen = ({ navigation }) => {
    const [userDetail, setDetail] = useState(null)
    const [allOrder, setAllOrderDetail] = useState([])
    const { logout } = useContext(ContextApi)
    const [walletAmount, setWalletAmount] = useState(null)
    const appVersion = DeviceInfo.getVersion();
    console.log("App Version", appVersion);
    const [pieData, setPieData] = useState()
    const [personalInfo, setPersonalInfo] = useState(null)
    const [showData, setShowData] = useState(null)



    const handleLogout = () => {
        logout()

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

    const GetAllOrders = async () => {
        try {
            let res = await adminRequest.get('/api/order/orderListforBusinessOwner?&status=All')
            setAllOrderDetail(res.data.msg)
        } catch (error) {
            console.log('GET ORDER ERROR', error);
        }
    }

    useEffect(() => {
        GetAllOrders()

    }, [])

    const getWalletamount = async () => {
        let body = {
            userId: userDetail?._id
        }
        console.log('BODY OF WALLET AMOUNT', body);
        try {
            const resp = await adminRequest.post('/api/payment/getWalletData', body)
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

    const PiecharData = async () => {
        const resp = await adminRequest.get(`/api/order/userOrderStatus/${userDetail?._id}`)
        console.log('RESPONSE FROM PIE DATAddd>>>>>', (resp.data.msg));
        setPieData(resp.data.msg)

    }

    useEffect(() => {
        PiecharData()

    }, [userDetail?._id])

    const sum = pieData?.approved + pieData?.rejected + pieData?.pending

    const getUserInfo = async () => {
        try {
            const res = await adminRequest.get(`/api/user/profile/${userDetail?._id}`)
            setPersonalInfo(res.data.msg)
            setShowData(res.data)
            // console.log('RESPONSE FROM PoEpRSONAL INFORMATION>>>>>>>', res.data);

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


            <View>
                <View style={styles.container1}>
                    <UserAvatar size={100} name={personalInfo?.firstName} style={styles.profile} bgColor="rgba(183,54,248,255)" />
                    <Text style={styles.txt}>{personalInfo?.firstName} {personalInfo?.lastName}</Text>
                </View>
            </View>
            <ScrollView>


                <View style={styles.container2}>
                    <View>
                        <Text style={styles.cont2txt}>Orders</Text>
                        <Text style={styles.value}>{showData?.order}</Text>
                    </View>
                    <View>
                        <Text style={{
                            color: '#5A5A5A',
                            fontFamily: 'Oswald-Bold',
                            fontSize: 16,
                            // marginLeft: 1,
                            marginRight: 16
                        }}>Views</Text>
                        <Text style={styles.value}>{showData?.views}</Text>
                    </View>
                    <View>
                        <Text style={styles.cont2txt}>Wallet</Text>
                        <Text style={styles.value}>₹ {walletAmount?.walletBalance}</Text>
                    </View>
                </View>

                <View style={{ backgroundColor: 'white', elevation: 4, marginTop: 8 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('UserProfileAccount')}>
                        <View style={{ marginTop: 8 }}>

                            <Text style={styles.account}>Account</Text>

                        </View>
                        <View>
                            <Text style={styles.subtxt}>Edit Name,address,KYC</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.line} />
                    <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
                        <View style={{ marginTop: 8 }}>
                            <Text style={styles.account}>My Orders</Text>
                        </View>
                        <View>
                            <Text style={styles.subtxt}>View & manage orders</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.line} />
                    <TouchableOpacity onPress={() => navigation.navigate('Billboards')}>
                        <View style={{ marginTop: 8 }}>
                            <Text style={styles.account}>Saved Billboards</Text>
                        </View>
                        <View>
                            <Text style={styles.subtxt}>View & manage Saved Billboards</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.line} />
                    <TouchableOpacity onPress={() => navigation.navigate('WalletScreen')}>
                        <View style={{ marginTop: 8 }}>
                            <Text style={styles.account}>Wallet (₹ {walletAmount?.walletBalance} )</Text>
                        </View>
                        <View>
                            <Text style={styles.subtxt}>View & manage Wallet transactions</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.line} />
                    <TouchableOpacity onPress={() => navigation.navigate('UserAnalytics')}>
                        <View style={{ marginTop: 8 }}>
                            <Text style={styles.account}>Analytics</Text>
                        </View>
                        <View>
                            <Text style={styles.subtxt}>View & manage Analytics</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.line} />
                    <TouchableOpacity onPress={() => navigation.navigate('UserSecurity')}>
                        <View style={{ marginTop: 8 }}>
                            <Text style={styles.account}>Security</Text>
                        </View>
                        <View>
                            <Text style={styles.subtxt}>Change Password</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.line} />
                    <TouchableOpacity onPress={() => navigation.navigate('UserCustomerSupport')}>
                        <View style={{ marginTop: 8 }}>
                            <Text style={styles.account}>Customer Support</Text>
                        </View>
                        <View>
                            <Text style={styles.subtxt}>Write to us at support@postmyad.ai</Text>
                        </View>
                    </TouchableOpacity>

                    {/* <View style={styles.line} />
                    <TouchableOpacity onPress={() => navigation.navigate('UserNotification')}>
                        <View style={{ marginTop: 8 }}>
                            <Text style={styles.account}>Notification</Text>
                        </View>
                        <View>
                            <Text style={styles.subtxt}>Manage Notifications</Text>
                        </View>
                    </TouchableOpacity> */}


                    <View style={styles.line} />
                </View>

                <View style={{ backgroundColor: 'white', elevation: 4, marginTop: 8, }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 8 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('UserTerms')}>
                            <Text style={styles.cancellation}>Cancellation Policy</Text>
                        </TouchableOpacity>
                        <Image source={images.reverseback} style={styles.back} />
                    </View>
                    <View style={styles.line} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 8 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('UserPolicy')}>
                            <Text style={styles.cancellation}>Privacy Policy</Text>
                        </TouchableOpacity>
                        <Image source={images.reverseback} style={styles.back} />
                    </View>
                    <View style={styles.line} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 8 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('UserProfileContent')}>
                            <Text style={styles.cancellation}>Content Policy</Text>
                        </TouchableOpacity>
                        <Image source={images.reverseback} style={styles.back} />
                    </View>
                    <View style={styles.line} />
                </View>


                <View style={{ backgroundColor: 'white', elevation: 4, marginTop: 8, marginBottom: 130, height: '100%' }}>
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

export default UserProfileMainScreen

const styles = StyleSheet.create({
    container1: {
        backgroundColor: 'white',
        elevation: 4,
        height: 160,
        justifyContent: 'center'
    },
    profile: {
        alignSelf: 'center',
        height: 100,
        width: 100,
        borderRadius: 90
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
        marginTop: 8,
        borderWidth: 0.5,
        borderColor: '#C4C4C4',
        backgroundColor: 'white'

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
        marginLeft: 16
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
    }


})