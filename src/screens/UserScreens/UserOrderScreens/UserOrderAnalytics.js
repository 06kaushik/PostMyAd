import React, { useState, useEffect } from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import { LineChart } from "react-native-gifted-charts";
import axios from "axios";



const UserOrderAnalytics = ({ navigation, route }) => {
    const { OrderDetail } = route.params
    const [orderData, setOrderData] = useState(null)



    const data = [{ value: 9, }, { value: 30 }, { value: 26 }, { value: 10, }];


    const getOrderData = async () => {
        try {
            const resp = await axios.get(`/api/order/getOrderById/${OrderDetail?.OrderDetail}`)
            // console.log('ALLLL ORDER DATA BY ID', resp.data.msg);
            setOrderData(resp.data.msg)

        } catch (error) {
            console.log('ERROR FROM ORDER BY ID', error);

        }
    }

    useEffect(() => {
        getOrderData()
    }, [OrderDetail?.OrderDetail])

    return (

        <View style={{ flex: 1, }}>

            <View style={{ backgroundColor: 'white', elevation: 4, height: 320 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 16, marginRight: 16, marginTop: 12 }}>
                    <Text style={{ color: 'black', fontFamily: 'Oswald-Bold', fontSize: 16 }}>Total Views : {orderData?.totalViews}</Text>
                    <Text style={{ color: 'black', fontFamily: 'Oswald-Bold', fontSize: 16 }}>Time Slot : {orderData?.timeSlot}</Text>
                </View>
                <View style={{ alignSelf: 'center', marginTop: 30 }} >
                    <LineChart
                        curved
                        data={data}
                        startFillColor="rgba(183,54,248,255)"
                        startOpacity={0.8}
                        endFillColor="rgba(183,54,248,255)"
                        endOpacity={0.3}
                        color1='rgba(183,54,248,255)'
                        dataPointsColor="rgba(183,54,248,255)"
                        hideDataPoints={true}
                        yAxisTextStyle={{ color: 'black' }}



                    />
                </View>
            </View>






        </View>
    )
}

export default UserOrderAnalytics