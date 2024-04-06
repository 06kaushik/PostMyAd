import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native'
import { color } from "react-native-reanimated";
import images from "../../../constant/Images";
import axios from "axios";


const AgencyAllTransaction = ({ navigation, route }) => {
    const [transaction, setTransaction] = useState([])
    const { walletId } = route.params



    const TransactionData = () => {
        let body = {
            walletId: walletId
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

    }, [])


    const renderItem = ({ item }) => {
        return (
            <View>
                <View style={{ marginTop: 12 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('MoneyAdded',{ amount: item.creditedAmount, date: item.transactionDate.slice(0, 10), walletId: item.walletId })}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 16, marginLeft: 16 }}>
                            <View>
                                <Text style={{ color: '#525252', fontFamily: 'Oswald-Bold', fontSize: 16 }}>Money Deposit to wallet</Text>
                                {/* <Text style={{ color: '#525252', fontFamily: 'Oswald-Bold', fontSize: 16 }}>Pizza Promotion</Text> */}
                            </View>
                            <Text style={{ color: 'rgba(183,54,248,255)', fontSize: 20, fontFamily: 'Oswald-Bold' }}>+  ₹ {item.creditedAmount}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 16, marginRight: 16, marginTop: 12 }}>
                            <Text style={{ color: '#717171', fontFamily: 'Oswald-Regular' }}>Date : {item.transactionDate.slice(0,10)}</Text>
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
                    <Text style={styles.headertxt}>Transactions</Text>
                </View>
            </View>


            <View style={{ marginTop: 8 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 16, marginRight: 16, marginTop: 8 }}>
                    <Text style={{ color: '#525252', fontSize: 18, fontFamily: 'Oswald-Bold' }}>Transactions</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ top: 7, right: 8 }} source={images.analysis} />
                        <Text style={{ color: '#525252', fontSize: 18, fontFamily: 'Oswald-Bold' }} >Spend Analytics</Text>
                    </View>
                </View>

                <View>
                    <TextInput
                        placeholder="Search payments"
                        placeholderTextColor={'grey'}
                        style={styles.textInpt}

                    />
                </View>
            </View>


            <FlatList
                data={transaction}
                renderItem={renderItem}
                ListFooterComponent={<View style={{marginBottom:150}}/>}
            />

            <View style={{ flex: 1 }}>
                <View style={styles.bbtn}>
                    <Text style={styles.bttntxt}>Need help?</Text>
                </View>
            </View>

        </View>
    )
}

export default AgencyAllTransaction

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    headertxt: {
        color: 'white',
        fontFamily: 'Oswald-Bold',
        fontSize: 18,
        marginRight:170,
        marginTop:28
        // textAlign: 'center',
        // bottom: 25
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    back: {
        marginLeft: 16,
        marginTop: 37
    },
    bbtn: {
        width: '100%',
        height: 56,
        backgroundColor: 'rgba(183,54,248,255)',
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
    },
    bttntxt: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Oswald-Bold',
        alignSelf: 'center',
        top: 10
    },
    textInpt: {
        color: 'black',
        borderWidth: 1,
        height: 40,
        width: '90%',
        alignSelf: 'center',
        marginTop: 12,
        borderRadius: 8,
        borderColor: '#DDDDDD',
        paddingLeft: 15,
        fontFamily: 'Oswald-Regular'
    }

})