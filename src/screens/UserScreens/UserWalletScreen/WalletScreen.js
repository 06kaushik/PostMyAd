import React, { useState, useEffect } from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import images from "../../../constant/Images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {useIsFocused} from '@react-navigation/native';
import { adminRequest } from "../AxiosInstance";



const WalletScreen = ({ navigation }) => {
    const [userDetail, setDetail] = useState(null)
    const [walletAmount, setWalletAmount] = useState(null)
    const [transaction, setTransaction] = useState([])

    const isFocused = useIsFocused();

    React.useEffect(() => {
        getWalletamount()


    }, [isFocused]);

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

    const TransactionData = () => {
        let body = {
            walletId: walletAmount?._id
        }
        console.log('BODY OF TRANSACTION', body);

        const requestTransaction = async () => {
            const resp = await adminRequest.post('/api/payment/getTransactionData', body)
            console.log('RESPONSE FROM TRANSACTION API DATA', resp.data.msg);
            setTransaction(resp.data.msg)

        }
        requestTransaction()
    }



    useEffect(() => {
        TransactionData()


    }, [walletAmount?._id])

    const renderItem = ({ item }) => {
        console.log('WALLET AMOUNT', item);
        return (
            <View>
                <View style={{ marginTop: 12 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('MoneyAdded', { amount: item.creditedAmount, date: item.transactionDate.slice(0, 10), walletId: item.walletId })}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 16, marginLeft: 16 }}>
                            <View>
                                <Text style={{ color: '#525252', fontFamily: 'Oswald-Bold', fontSize: 16 }}>Advertisement Payment</Text>
                                {/* <Text style={{ color: '#525252', fontFamily: 'Oswald-Bold', fontSize: 16 }}>Pizza Promotion</Text> */}
                            </View>
                            <Text style={{ color: 'rgba(183,54,248,255)', fontSize: 20, fontFamily: 'Oswald-Bold' }}>+  ₹ {item.debitedAmount}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 16, marginRight: 16, marginTop: 12 }}>
                            <Text style={{ color: '#717171', fontFamily: 'Oswald-Regular' }}>Date : {item.transactionDate.slice(0, 10)}</Text>
                            <Text style={{ color: '#5FCA5D', fontFamily: 'Oswald-SemiBold' }}>{item.transactionStatus}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ borderWidth: 1, borderColor: '#DDDDDD', marginTop: 16, marginLeft: 16, marginRight: 16, }} />



            </View>
        )
    }




    return (
        <View style={styles.main}>
             
            <View style={{ height: 78, backgroundColor: 'rgba(183,54,248,255)' }}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => navigation.goBack('')}>
                        <Image style={styles.back} source={images.back} />
                    </TouchableOpacity>
                    <Text style={styles.headertxt}>Wallet</Text>
                </View>
            </View>
            <ScrollView>
            <View style={styles.cont}>
                <View >
                    <Image style={styles.walletimage} source={images.walletMain} />
                </View>
                <View>
                    <Text style={styles.text}>Postmyad Wallet</Text>
                    <Text style={styles.subtxt}>An easy way to pay and get refund</Text>
                </View>
                <View style={styles.btxt}>
                    <View>
                        <Image style={{width:40,height:40,alignSelf:'center'}} source={images.checkout} />
                        <Text style={styles.btxt1}>Instant</Text>
                        <Text style={styles.btxt1}>Checkout</Text>
                    </View>
                    
                    <View>
                        <Image style={{width:40,height:40,alignSelf:'center'}} source={images.refund} />
                        <Text style={styles.btxt1}>Faster</Text>
                        <Text style={styles.btxt1}>Refund</Text>
                    </View>
                    <View>
                        <Image style={{width:40,height:40,alignSelf:'center'}} source={images.rewards} />
                        <Text style={styles.btxt1}>Exciting</Text>
                        <Text style={styles.btxt1}>Reward</Text>
                    </View>
                </View>
            </View>
          
                <View style={styles.cont1}>
                    <View style={{ marginTop: 12 }}>
                        <Text style={styles.w}>Wallet Balance</Text>
                        <Text style={styles.rupee}>₹ {walletAmount?.walletBalance}</Text>

                    </View>
                    <View style={{ height: 57, width: '90%', backgroundColor: 'rgba(183,54,248,255)', alignSelf: 'center', borderRadius: 15, marginTop: 12 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            {/* <TouchableOpacity onPress={() => navigation.navigate('Deposit', { walletId: walletAmount?._id, balance: walletAmount?.walletBalance })}> */}
                                <Text style={styles.deposite}>Deposit</Text>
                            {/* </TouchableOpacity> */}
                            <View style={{ borderWidth: 1, top: 12, borderColor: 'white' }} />
                            {/* <TouchableOpacity onPress={() => navigation.navigate('Withdraw')}> */}
                                <Text style={styles.withdraw}>Withdraw</Text>
                            {/* </TouchableOpacity> */}


                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 20, backgroundColor: 'white', elevation: 4, height: 550 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 16, marginRight: 16, marginTop: 8 }}>
                        <Text style={{ color: '#525252', fontSize: 18, fontFamily: 'Oswald-Bold' }}>Transactions</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={{ top: 7, right: 8 }} source={images.analysis} />
                            <Text style={{ color: '#525252', fontSize: 18, fontFamily: 'Oswald-Bold' }} >Spend Analytics</Text>
                        </View>

                    </View>

                    <FlatList
                        data={transaction}
                        renderItem={renderItem}
                    />

                    <View style={{ marginTop: 8 }} >
                        <TouchableOpacity onPress={() => navigation.navigate('AllTransaction', { walletId: walletAmount?._id })}>
                            <Text style={{ textAlign: 'center', color: 'rgba(183,54,248,255)', fontSize: 18, fontFamily: 'Oswald-Bold', bottom: 10 }}>View more</Text>
                        </TouchableOpacity>
                    </View>
                    <View>

                    </View>

                </View>

                <View style={{ backgroundColor: 'white', elevation: 4, marginTop: 8, }}>
                    <View>
                        <Text style={{ color: 'black', fontFamily: 'Oswald-Bold', fontSize: 16, marginLeft: 16, marginTop: 8 }}>PLEASE NOTE</Text>
                        <View style={{ marginLeft: 16, marginRight: 16, marginTop: 12, }}>
                            <Text style={{ fontSize: 13, margin: 5, color: '#717171', }}>-  Postmyad wallet can be recharged using Netbanking, Credit/debit and UPI.</Text>
                            <Text style={{ fontSize: 13, margin: 5, color: '#717171' }}>-  Postmyad wallet can be recharged using Netbanking, Credit/debit and UPI.</Text>
                            <Text style={{ fontSize: 13, margin: 5, color: '#717171' }}>-  Postmyad wallet can be recharged using Netbanking, Credit/debit and UPI.</Text>
                        </View>
                    </View>

                    <View style={{ borderWidth: 1, borderColor: '#DDDDDD', marginTop: 12, marginLeft: 16, marginRight: 16, }} />

                    <View style={{ marginTop: 8 }}>
                        <Text style={{ color: 'rgba(183,54,248,255)', fontSize: 18, fontFamily: 'Oswald-Bold', textAlign: 'center' }}>Wallet T&C</Text>
                    </View>

                </View>

            </ScrollView>

        </View>
    )
}

export default WalletScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    headertxt: {
        color: 'white',
        fontFamily: 'Oswald-Bold',
        fontSize: 18,
        marginRight: 180,
        marginTop: 30
        // bottom: 25
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    back: {
        marginLeft: 16,
        marginTop: 37,
    },
    cont: {
        backgroundColor: 'white',
        width: '100%',
        height: 315,
        elevation: 4,
        marginTop: 8
    },
    walletimage: {
        alignSelf: 'center',
        height: 130,
        width: 176
    },
    text: {
        color: 'rgba(183,54,248,255)',
        fontSize: 20,
        fontFamily: 'Oswald-Bold',
        textAlign: 'center'

    },
    subtxt: {
        color: '#525252',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Oswald-Regular'

    },
    btxt: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
        marginLeft: 16,
        marginRight: 16
    },
    btxt1: {
        color: '#525252',
        fontSize: 16,
        fontFamily: 'Oswald-Bold',
        textAlign: 'center'
    },
    cont1: {
        backgroundColor: 'white',
        width: '100%',
        height: 250,
        elevation: 4,
        marginTop: 12
    },
    w: {
        color: '#525252',
        fontSize: 20,
        fontFamily: 'Oswald-Bold',
        textAlign: 'center'

    },
    rupee: {
        fontSize: 72,
        fontFamily: 'Oswald-Bold',
        color: 'rgba(183,54,248,255)',
        textAlign: 'center'

    },
    deposite: {
        color: '#BBBBBB',
        fontSize: 18,
        fontFamily: 'Oswald-Bold',
        top: 10,
        left: 10

    },
    withdraw: {
        color: '#BBBBBB',
        fontSize: 18,
        fontFamily: 'Oswald-Bold',
        textAlign: 'center',
        top: 10,
        right: 10

    }
})