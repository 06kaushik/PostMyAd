import React, { useState, useContext, useEffect } from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import images from "../../../constant/Images";
import axios from "axios";
import { BarChart, PieChart } from "react-native-gifted-charts";
import moment from "moment";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { adminRequest } from "../AxiosInstance";




const Analytics = ({ navigation }) => {

    const [userDetail, setDetail] = useState(null)
    const [pieData, setPieData] = useState()
    const [pieChart, setPieChart] = useState([

        { value: 0, color: '#5FCA5D', gradientCenterColor: '#3BE9DE' },
        { value: 0, color: 'red', gradientCenterColor: '#8F80F3' },
        { value: 0, color: 'orange', gradientCenterColor: '#FF7F97' },
    ])
    console.log('PIEEEE DATA ANALYTICS', pieData);
    const [orderStat, setOrderStat] = useState([])
    const [datas, setDatas] = useState()


    const sum = pieData?.approved + pieData?.rejected + pieData?.pending



    const PiecharData = async () => {
        try {
            const resp = await adminRequest.get(`/api/order/userOrderStatus/${userDetail?._id}`)
            console.log('RESPONSE FROM PIE DATAddd>>>>>', (resp.data.msg));
            setPieData(resp.data.msg)

            let arr = [{ value: resp.data.msg?.approved, color: '#5FCA5D', gradientCenterColor: '#3BE9DE' },
            { value: resp.data.msg?.rejected, color: 'red', gradientCenterColor: '#8F80F3' },
            { value: resp.data.msg?.pending, color: 'orange', gradientCenterColor: '#FF7F97' },]
            setPieChart(arr)

            console.log('ARRRAAYYYY ', arr);

        } catch (error) {
            console.log('ERROR FROM PIE', error);

        }

    }

    useEffect(() => {
        PiecharData()

    }, [userDetail?._id])

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


    const dateTo = moment().format('YYYY-MM-DD');
    const dateFrom = moment().subtract(7, 'd').format('YYYY-MM-DD');

    const OdersStats = async () => {
        let body = {
            startDate: dateFrom,
            endDate: dateTo,
            orderType: "Approved",
        }
        console.log('RESPONSE FROM ORDER STAT BODY', body);
        try {
            const resp = await adminRequest.post('/api/order/orderStats', body)
            console.log('RESPONSE FROM ORDER STAT API>???>', resp.data.msg);
            setOrderStat(resp?.data?.msg)
            let graphData = []
            resp?.data?.msg.map((data) => {
                let obj = {
                    value: data.totalCount,
                    label: moment(data._id).format('dddd').substring(0, 3),
                    frontColor: 'rgba(183,54,248,255)',
                    labelTextStyle: { color: 'black' },

                }
                graphData.push(obj);

            })
            setDatas(graphData);

        } catch (error) {
            console.log('ERROR FROM STAT ORDER', error);

        }
    }

    useEffect(() => {
        OdersStats()
    }, [dateFrom, dateFrom])



    const renderDot = color => {
        return (
            <View
                style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor: color,
                    marginRight: 10,
                }}
            />
        );
    };

    const renderLegendComponent = () => {
        return (
            <>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        bottom: 25

                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: 120,
                            marginRight: 20,
                        }}>
                        {renderDot('#5FCA5D')}
                        <Text style={{ color: 'black' }}>Approved: {pieData?.approved}%</Text>
                    </View>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
                        {renderDot('red')}
                        <Text style={{ color: 'black' }}>Rejected: {pieData?.rejected}%</Text>
                    </View>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
                        {renderDot('orange')}
                        <Text style={{ color: 'black' }}>Pending: {pieData?.pending}%</Text>
                    </View>
                </View>


            </>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <View>
                <View style={{ height: 78, backgroundColor: 'rgba(183,54,248,255)' }}>

                    <View>
                        <TouchableOpacity onPress={() => navigation.goBack('')}>
                            <View style={{ marginTop: '8%', }}>
                                <Image source={images.back} style={{ marginTop: 5, marginLeft: 16 }} />
                                <View style={{ alignSelf: 'center', bottom: 20 }}>
                                    <Text style={{ color: 'white', fontFamily: 'Oswald-Bold', fontSize: 18 }}>Analytics</Text>
                                </View>
                            </View>

                        </TouchableOpacity>

                    </View>
                </View>
            </View>
            <ScrollView>

                <View
                    style={{
                        backgroundColor: 'white',
                        elevation: 4,
                        marginTop: 12,
                        height: 370
                    }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 16, marginRight: 16, marginTop: 12 }}>
                        <Text style={{ fontFamily: 'Oswald-Bold', color: 'black', textAlign: 'center', bottom: 1, fontSize: 16 }}>Order OverView</Text>
                        <View style={{ borderWidth: 1, width: 110, borderColor: '#DDDDDD', borderRadius: 5 }}>
                            <Text style={{ fontFamily: 'Oswald-Bold', color: 'black', textAlign: 'center', bottom: 1, fontSize: 16 }}>Last 7 Days</Text>
                        </View>

                    </View>
                    <View
                        style={{
                            margin: 20,
                            padding: 16,
                            borderRadius: 20,

                        }}>

                        <View style={{ padding: 20, alignItems: 'center', bottom: 25 }}>
                            <PieChart
                                data={pieChart}
                                donut
                                showGradient
                                sectionAutoFocus
                                radius={110}
                                innerRadius={60}
                                centerLabelComponent={() => {
                                    return (
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text
                                                style={{ fontSize: 22, color: 'black', fontWeight: 'bold' }}>
                                                {sum}
                                            </Text>
                                            <Text style={{ fontSize: 14, color: 'black' }}>Total Order</Text>
                                        </View>
                                    );
                                }}
                            />
                        </View>
                        {renderLegendComponent()}
                    </View>
                </View>


                <View style={{ backgroundColor: 'white', elevation: 4, marginTop: 12, marginBottom: 10, height: 310 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 16, marginRight: 16, marginTop: 12 }}>
                        <Text style={{ fontFamily: 'Oswald-Bold', color: 'black', textAlign: 'center', bottom: 1, fontSize: 16 }}>Order Booking</Text>
                        <View style={{ borderWidth: 1, width: 110, borderColor: '#DDDDDD', borderRadius: 5 }}>
                            <Text style={{ fontFamily: 'Oswald-Bold', color: 'black', textAlign: 'center', bottom: 1, fontSize: 16 }}>Last 7 Days</Text>
                        </View>

                    </View>

                    <View style={{ marginLeft: 25 }}>
                        <BarChart
                            barWidth={22}
                            noOfSections={3}
                            barBorderRadius={8}
                            frontColor="lightgray"
                            data={datas}
                            yAxisThickness={0}
                            xAxisThickness={0}
                            yAxisTextStyle={{ color: 'black' }}
                        />
                    </View>

                </View>


            </ScrollView>



        </View>

    )
}


export default Analytics