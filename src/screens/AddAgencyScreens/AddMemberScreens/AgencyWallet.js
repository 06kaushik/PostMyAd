import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StatusBar, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import images from '../../../constant/Images'
import LinearGradient from 'react-native-linear-gradient';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";



const AgencyWallet = () => {

    const [userDetail, setUserDetail] = useState(null)
    const [walletAmount, setWalletAmount] = useState(null)
    console.log('wallet balance in agency', walletAmount);
    const [transaction, setTransaction] = useState([])



    const getUser = async () => {
        try {
            let userDetail = await AsyncStorage.getItem('USER');
            let data = JSON.parse(userDetail);
            setUserDetail(data)
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

    const TransactionData = () => {
        let body = {
            walletId: walletAmount?._id
        }
        console.log('BODY OF TRANSACTION', body);

        const requestTransaction = async () => {
            const resp = await axios.post('/api/payment/getTransactionData', body)
            console.log('RESPONSE FROM TRANSACTION API DATA', resp.data.msg);
            setTransaction(resp.data.msg)

        }
        requestTransaction()
    }



    useEffect(() => {
        TransactionData()


    }, [walletAmount?._id])

    const renderItem = ({ item }) => {
        return (
            <View>
                <View style={{ marginTop: 12 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 16, marginLeft: 16 }}>
                            <View>
                                <Text style={{ color: '#525252', fontFamily: 'Oswald-Bold', fontSize: 16 }}>Money Deposit to wallet</Text>
                                {/* <Text style={{ color: '#525252', fontFamily: 'Oswald-Bold', fontSize: 16 }}>Pizza Promotion</Text> */}
                            </View>
                            <Text style={{ color: 'rgba(183,54,248,255)', fontSize: 20, fontFamily: 'Oswald-Bold' }}>+  ₹ {item.creditedAmount}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 16, marginRight: 16, marginTop: 12 }}>
                            <Text style={{ color: '#717171', fontFamily: 'Oswald-Regular' }}>Date : {item.transactionDate.slice(0, 10)}</Text>
                            <Text style={{ color: '#5FCA5D', fontFamily: 'Oswald-SemiBold' }}>{item.transactionStatus}</Text>
                        </View>
                </View>
                <View style={{ borderWidth: 1, borderColor: '#DDDDDD', marginTop: 16, marginLeft: 16, marginRight: 16, }} />



            </View>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                        <Text style={styles.w}>Wallet Balance </Text>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={images.spend} style={styles.si} />
                                <Text style={styles.a}>Spend Analysis</Text>
                            </View>
                        </View>

                    </View>
                    <View style={{ marginLeft: 16 }}>
                        <Text style={styles.rupee}>₹ {walletAmount?.walletBalance}</Text>
                    </View>
                </View>

                <View>
                    <View>
                        <Text style={styles.t}>Transactions</Text>
                    </View>
                    <View style={styles.sc}>
                        <Image source={images.search} style={{
                            padding: 10,
                            margin: 5,
                            height: 16,
                            width: 16,
                            resizeMode: 'stretch',
                            alignItems: 'center',
                        }} />
                        <TextInput
                            placeholder='Search Payments'
                            placeholderTextColor={'#BABABA'}
                            style={styles.input}
                        />

                    </View>
                </View>
                <FlatList
                    data={transaction}
                    renderItem={renderItem}
                />
            </ScrollView>

        </View>
    )
}
export default AgencyWallet

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    w: {
        color: '#525252',
        fontFamily: 'Oswald-Bold',
        marginLeft: 16,
        fontSize: 16
    },
    container: {
        marginTop: 8,
        backgroundColor: 'white',
        elevation: 4,

    },
    a: {
        color: '#525252',
        fontFamily: 'Oswald-Bold',
        marginRight: 16,
        fontSize: 16
    },
    si: {
        marginRight: 5,
        marginTop: 5

    },
    rupee: {
        fontSize: 72,
        color: '#B937FA'
    },
    t: {
        color: '#525252',
        fontSize: 18,
        fontFamily: 'Oswald-Bold',
        marginLeft: 16,
        marginTop: 8
    },
    input: {
        flex: 1,
        color: 'black'
    },
    sc: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F8FD',
        borderWidth: 1,
        borderColor: '#DDDDDD',
        height: 40,
        borderRadius: 8,
        margin: 10,
    },
    container1: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    p: {
        color: '#525252',
        fontSize: 16,
        fontFamily: 'Oswald-Bold',
        marginLeft: 16,
        marginTop: 3
    },
    amount: {
        color: '#B937FA',
        fontSize: 20,
        fontFamily: 'Oswald-Bold',
        marginRight: 16

    },
    date: {
        color: '#717171',
        fontSize: 14,
        fontFamily: 'Oswald-Regular',
        marginLeft: 16,
    },
    success: {
        color: '#5FCA5D',
        fontSize: 14,
        fontFamily: 'Oswald-SemiBold',
        marginRight: 16

    }

})