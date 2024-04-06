import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native'
import images from '../../../constant/Images'
import Modal from 'react-native-modal'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { adminRequest } from '../AxiosInstance'




const UserCoupons = ({ navigation, route }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [coupons, setCoupons] = useState([])

    const { billBoardName } = route.params
    const { scheduleDate } = route.params
    const { duration } = route.params
    const { address } = route.params
    const { basePrice } = route.params
    const { selectTime } = route.params
    const { amount } = route.params
    const [userDetail, setDetail] = useState(null)

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


    const getCoupons = () => {
        let body = {
            "type": "active",
            "limit": 3,
            "page": 1,
            "recent": true
        }
        console.log('RESPONSE FROM BODY', body)
        const requestCoupons = async () => {
            const resp = await adminRequest.post('/coupon/getAllCoupon', body)
            console.log('RESPONSE FROM COUPANS API', resp.data.msg);
            setCoupons(resp.data.msg)

        }
        requestCoupons()

    }

    useEffect(() => {
        getCoupons()

    }, [])




    const onSuccess = (item) => {
        // console.log('ahcalskhcahcal', item);
        // Alert.alert('coupon applied!!')
        // navigation.navigate('PaymentScreen', {item,billBoardName:billBoardName,scheduleDate:scheduleDate,duration:duration,address:address,basePrice:basePrice,selectTime:selectTime,amount:amount})
        let body = {
            userId: userDetail?._id,
            couponName: coupons[0]?.couponName,
            amount: amount
        }
        console.log('RESPONSE FROM BODY COUPON USER', body);

        const requestCouponUser = async () => {
            const resp = await adminRequest.post('/coupon/applyCouponToUser', body)
            console.log('RESPONSE FROM COUPON USER API', resp.data.msg);
            navigation.navigate('PaymentScreen', { item, billBoardName: billBoardName, scheduleDate: scheduleDate, duration: duration, address: address, basePrice: basePrice, selectTime: selectTime, amount: amount })

        }
        requestCouponUser()
    }

    const renderItem = ({ item }) => {
        return (
            <View>

                <TouchableOpacity onPress={() => onSuccess(item)}>
                    <View style={styles.conatainer1}>
                        <Image style={styles.cimage} source={images.coupons} />
                        <View style={{ bottom: 200 }}>
                            <Text style={{ color: 'maroon', fontSize: 25, fontWeight: 'bold', marginLeft: 40 }}>Get {item.discount}% Off {'\n'}upto ₹ {item.couponAmount} </Text>
                            <Text style={{ marginLeft: 40, marginTop: 10 }}>Minimum Spend {'\n'} ₹{item.minSpend}</Text>
                        </View>
                        <View style={{ bottom: 140 }} >
                            <Text style={{ marginLeft: 40, color: 'grey', bottom: 40 }}>Valid till  {item.endDate.slice(0, 10)}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

            </View>
        )
    }

    return (

        <View style={styles.main}>
            <View style={styles.container}>
                <Text style={styles.txt}>Apply Coupon</Text>
                <TouchableOpacity onPress={() => navigation.goBack('')}>
                    <Image source={images.cross} />
                </TouchableOpacity>
            </View>
            <View style={{ borderWidth: 1, borderColor: '#DDDDDD', marginTop: 12, marginLeft: 16, marginRight: 16 }} />
            <View>
                <FlatList
                    data={coupons}
                    renderItem={renderItem}
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    hasBackdrop={true}
                    backdropOpacity={0.8}
                    isVisible={modalVisible}
                >
                    <View >

                    </View>
                </Modal>
            </View>

        </View>
    )
}

export default UserCoupons;

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    container: {
        marginLeft: 16,
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 16

    },
    txt: {
        color: 'black',
        fontFamily: 'Oswald-Bold',
        fontSize: 16,

    },
    cimage: {
        width: '90%',
        height: 210,
        alignSelf: 'center',
        borderRadius: 8
    },
    conatainer1: {
        marginTop: 16,

    }
})