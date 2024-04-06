import React, { useState, useEffect } from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import images from "../../../constant/Images";
import LinearGradient from 'react-native-linear-gradient';
import { useIsFocused } from '@react-navigation/native';
import axios from "axios";
import moment from 'moment';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const UserUpcomingOrder = ({navigation}) => {

    const [live, setLive] = useState([])
    console.log('PENDING DATA', live);
    const isFocused = useIsFocused();

    const GetOrders = async () => {
        try {
            let res = await axios.get('/api/order/orderListforBusinessOwner?&status=live')
            console.log('API DATA LIVE', res.data.msg);
            setLive(res.data.msg)
        } catch (error) {
            console.log('GET LIVE ORDER ERROR', error);
        }
    }

    React.useEffect(() => {
        GetOrders()

    }, [isFocused]);


    useEffect(() => {
        GetOrders()
    }, [])

    const RecentOrder = ({ item }) => {
        console.log('ORDER ITEM pending', item);
        let startTime = moment(moment(item.startscheduleDate).format("HH:mm:ss a"), "HH:mm:ss a");
        let endTime = moment(moment(item.endscheduleDate).format("HH:mm:ss a"), "HH:mm:ss a");
        let duration = moment.duration(endTime.diff(startTime));
        let minutes = parseInt(duration.asMinutes()) % 60;
        let hours = parseInt(duration.asHours());
        return (
            <View style={styles.containerBox}>
                {item.status === "Approved" ?
                    <Text style={styles.scheduleText}>{item.status}</Text>
                    : item.status === "Live" ?
                        <Text style={styles.livestatus}>{item.status}</Text>
                        : item.status === "Rejected" ?
                            <Text style={styles.Rejectedtxt}>{item.status}</Text>
                            :
                            <Text style={styles.publishedText}>{item.status}</Text>
                }
                {/* <Text style={styles.scheduleText}>Scheduled</Text> */}
                <View style={{ flexDirection: 'row-reverse', bottom: '8%', right: '5%' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('UserDetailScreen', { OrderDetail: item })}>
                        <Text style={styles.viewText}>View</Text>
                    </TouchableOpacity>
                </View>
                {/* <Text style={styles.liveView}>{item.liveView}</Text> */}
                <View style={{ bottom: '10%' }}>
                    <Text style={styles.order}>Order Id #{item._id.slice(0, 8)}...</Text>
                    <Text style={styles.promotion}>{item.adTitle}</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 12, marginRight: 12 }}>
                        <Text style={styles.day}>{item.orderDate.slice(0, 10)}</Text>
                        <Text style={styles.time}>{item.timeSlot}</Text>

                        <Text style={styles.duration}>{item.videoDuration / 60} min</Text>
                    </View>
                </View>
            </View>
        )
    }



    return (

        <View style={styles.main}>
            {live.length > 0 ?
                <View>
                    <FlatList
                        data={live}
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

export default UserUpcomingOrder;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor:'#f7f8fd'
    },
    containerBox: {

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
        marginTop: '6%',
        width: '93%',
        alignSelf: 'center'
    },

    scheduleText: {
        fontFamily: 'Oswald-Bold',
        fontStyle: 'normal',
        fontSize: 14,
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
        fontSize: 14,
        color: 'red',
        backgroundColor: 'white',
        width: 125,
        height: 32,
        textAlign: 'center',
        borderRadius: 20,
        bottom: 10,
        paddingTop: 5,
        borderWidth:1,
        borderColor:'#DDDDDD'


    },
    Rejectedtxt: {
        fontFamily: 'Oswald-Bold',
        fontStyle: 'normal',
        fontSize: 14,
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
        fontSize: 14,
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