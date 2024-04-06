import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StatusBar, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import images from '../../../constant/Images'
import LinearGradient from 'react-native-linear-gradient';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const AllOrderScreen = () => {

    const [orderDetail, setOrderDetail] = useState([])
    console.log('ORDER IN AGENCY ALL', orderDetail);

    const GetOrders = async () => {
        try {
            let res = await axios.get('/api/order/orderListforBusinessOwner?&status=All')
            setOrderDetail(res.data.msg)
        } catch (error) {
            console.log('GET ORDER ERROR', error);
        }
    }

    useEffect(() => {
        GetOrders()

    }, [])

    const RecentOrder = ({ item }) => {
        let startTime = moment(moment(item.startscheduleDate).format("HH:mm:ss a"), "HH:mm:ss a");
        let endTime = moment(moment(item.endscheduleDate).format("HH:mm:ss a"), "HH:mm:ss a");
        let duration = moment.duration(endTime.diff(startTime));
        let minutes = parseInt(duration.asMinutes()) % 60;
        let hours = parseInt(duration.asHours());
        return (
            <View style={styles.containerBox}>
                {item.status === "Scheduled" ?
                    <Text style={styles.scheduleText}>{item.status}</Text>
                    : item.status === "Live" ?
                        <Text style={styles.livestatus}>{item.status}</Text>
                        :
                        <Text style={styles.publishedText}>{item.status}</Text>
                }
                {/* <Text style={styles.scheduleText}>Scheduled</Text> */}
                <View style={{ flexDirection: 'row-reverse', bottom: '8%', right: '5%' }}>
                    <TouchableOpacity>
                        <Text style={styles.viewText}>View</Text>
                    </TouchableOpacity>
                </View>
                {/* <Text style={styles.liveView}>{item.liveView}</Text> */}
                <View style={{ bottom: '10%' }}>
                    <Text style={styles.order}>Order Id #{item._id.slice(0, 8)}...</Text>
                    <Text style={styles.promotion}>{item.adTitle}</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 12, marginRight: 12 }}>
                        <Text style={styles.day}>{item.orderDate.slice(0, 10)}</Text>
                        <Text style={styles.time}>{moment(item.startscheduleDate).format("hh:mm A")} - {moment(item.endscheduleDate).format("hh:mm A")} </Text>

                        <Text style={styles.duration}> {hours ? `${hours} hr` : null} {minutes} min</Text>
                    </View>
                </View>
            </View>
        )
    }



    return (

        <View style={styles.main}>

            {orderDetail.length > 0 ?
                <View>
                    <FlatList
                        data={orderDetail}
                        renderItem={RecentOrder}
                        style={{}}
                    />
                </View>
                :
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Image style={{ alignSelf: 'center' }} source={images.emptyorders} />
                    <Text style={{ color: '#717171', fontFamily: 'Oswald-Bold', fontSize: 16, alignSelf: 'center' }}>No Orders To show</Text>
                </View>
            }

        </View>
    )
}


export default AllOrderScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor:'#f7f8fd'

    },
    containerBox: {
        flex: 1,
        //    width:deviceWidth -25,
        backgroundColor: 'white',
        height: 111,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 0.75,
        shadowRadius: 5,
        elevation: 5,
        marginLeft: 8,
        marginRight: 8,
        margin: 5,
        marginTop: '6%'
    },

    scheduleText: {
        fontFamily: 'Oswald-Bold',
        fontStyle: 'normal',
        fontSize: 12,
        color: 'white',
        backgroundColor: '#5FCA5D',
        width: 125,
        height: 32,
        textAlign: 'center',
        borderRadius: 20,
        bottom: 10,
        paddingTop: 5,
    },
    livestatus: {
        fontFamily: 'Oswald-Bold',
        fontStyle: 'normal',
        fontSize: 12,
        color: 'white',
        backgroundColor: 'red',
        width: 125,
        height: 32,
        textAlign: 'center',
        borderRadius: 20,
        bottom: 10,
        paddingTop: 5,
    },
    publishedText: {
        fontFamily: 'Oswald-Bold',
        fontStyle: 'normal',
        fontSize: 12,
        color: 'white',
        backgroundColor: '#6907c3',
        width: 125,
        height: 32,
        textAlign: 'center',
        borderRadius: 20,
        bottom: 10,
        paddingTop: 5,
    },
    viewText: {
        borderWidth: 1.5,
        borderColor: '#B937FA',
        textAlign: 'center',
        borderRadius: 20,
        // height: 24, 
        width: wp(20),
        color: '#B937FA',
        // left: wp(45),
        fontFamily: 'Oswald-Bold',
        top: 10,
    },
    order: {
        fontFamily: 'Oswald-Regular',
        fontStyle: 'normal',
        fontSize: 14,
        color: '#6F6F6F',
        left: '3%',
        bottom: 14
    },
    promotion: {
        fontFamily: 'Oswald-Bold',
        fontStyle: 'normal',
        fontSize: 16,
        color: 'black',
        left: '3%',
        bottom: 15
    },
    day: {
        fontSize: 14,
        color: 'black',
        bottom: 10,
        fontFamily: 'Oswald-Regular',
    },
    time: {
        fontSize: 12,
        color: 'black',

        bottom: 8,
        fontFamily: 'Oswald-Regular'
    },
    duration: {
        fontSize: 12,
        color: 'black',

        bottom: 8,
        fontFamily: 'Oswald-Regular'

        // fontSize:50

    },
})
