import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Button, Image, FlatList, StyleSheet, Platform, TextInput, } from 'react-native'
import BillBoardAdminHeader from "../../component/BillBoardAdminHeader";
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import images from "../../constant/Images";
import RecentOrderData from "../../Data/RecentOrderData";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from "axios";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from '@react-native-picker/picker';
import moment from "moment";



const BillBoardOrderAdmin = ({ navigation,route }) => {
   
console.log('HHDSISDSV', route.params.id);
  
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [selectedValue, setSelectedValue] = useState("All");
    const [orderDetail, setOrderDetail] = useState([])
    console.log('ALL ORDER API DATA', orderDetail);
   
    
   

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const handleConfirm = (date) => {
        console.log('A date has been picked: ', date);
        setDate(date);
        hideDatePicker();
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };
    const handleConfirmTime = (time) => {
        console.log("A time has been picked: ", time);
        setTime(time)
        hideTimePicker();
    };
    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    let startDate = moment(date.toString()).format('YYYY-MM-DD')
    console.log('START DTE', startDate);
    // let endDate = moment(endscheduleDate.toString()).format().slice(0, 11) + endscheduletime.slice(1, 6) + ':00+05:30'


    const RecentOrder = ({ item }) => {

        let startTime = moment(moment(item.startscheduleDate).format("HH:mm:ss a"), "HH:mm:ss a");
        let endTime = moment(moment(item.endscheduleDate).format("HH:mm:ss a"), "HH:mm:ss a");
        let duration = moment.duration(endTime.diff(startTime));
        let minutes = parseInt(duration.asMinutes()) % 60;
        let hours = parseInt(duration.asHours());
        return (
            <View style={styles.orderBox}>
                {item.status === "Scheduled" ?
                    <Text style={styles.scheduleText}>{item.status}</Text>
                    : item.status === "Live" ?
                        <Text style={styles.livestatus}>{item.status}</Text>
                        :
                        <Text style={styles.publishedText}>{item.status}</Text>

                }
                {/* <Text style={styles.scheduleText}>Scheduled</Text> */}
                <View style={{ flexDirection: 'row-reverse', bottom: '8%', right: '5%' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('OrderOverView', { adTitle: item.adTitle, startscheduleDate: item.startscheduleDate, endscheduleDate: item.endscheduleDate, aboutAd: item.aboutAd, deviceId: item.deviceId, orderId: item._id })}>
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

    const getAllOrder = () => {
        let body = {
            date: startDate,
            type: "All",
            deviceId: route?.params?.id,
            businessOwner: true,
            page:1,
            limit:10
        }
        console.log('ORDER BODY', body);

        const getOrderApi = async() =>{
            try {
                const resp = await axios.post("/api/order/orderListbydeviceId",body);
                setOrderDetail(resp.data.msg)
                console.log('ORDERBODY ALL', resp.data);
                
            } catch (error) {
                console.error("error from Get AllOrder ==> ", err);
                
            }
        }
        getOrderApi()
        
    }

    useEffect(() => {
    
        getAllOrder()

    },[startDate])




    return (

        <View style={styles.mainContainer}>
            <View style={{ backgroundColor: 'white', elevation: 4, height: 56, bottom: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>

                    <TouchableOpacity onPress={showDatePicker}>
                        <View style={{ backgroundColor: '#dddddd', height: 40, width: 150, borderRadius: 8, borderWidth: 1,  borderColor: '#DDDDDD' }}>
                            <Text style={styles.dateText}>{date ? date.toLocaleDateString() : 'Start Date'}</Text>
                            <Image source={images.calender} style={styles.icon} />
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}

                            />
                        </View>
                    </TouchableOpacity>
                    {/* <View>
                        <TouchableOpacity onPress={showTimePicker}>
                            <View style={{ backgroundColor: '#dddddd', height: 40, width: 100, borderRadius: 8, borderWidth: 1, borderColor: '#DDDDDD' }}>

                                <Text style={styles.dateText}></Text>

                                <Image source={images.clock} style={styles.icon1} />
                                <DateTimePickerModal
                                    isVisible={isTimePickerVisible}
                                    mode="time"
                                    onConfirm={handleConfirmTime}
                                    onCancel={hideTimePicker}
                                />
                            </View>

                        </TouchableOpacity>
                    </View> */}

                    <View style={{height: 40, width: 150, borderRadius: 8, borderWidth: 1,  borderColor: '#DDDDDD',backgroundColor:'#dddddd' }}>
                        <Picker
                            dropdownIconColor={'black'}
                            selectedValue={selectedValue}
                            style={{  bottom: 10 }}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        >
                            <Picker.Item style={{ color: 'black',fontFamily:'Oswald-Bold' }} label="All" value="All" />
                            <Picker.Item style={{ color: 'black',fontFamily:'Oswald-Bold' }} label="Live" value="Live" />
                            <Picker.Item style={{ color: 'black',fontFamily:'Oswald-Bold' }} label="Approved" value="Approved" />
                            <Picker.Item style={{ color: 'black',fontFamily:'Oswald-Bold' }} label="Published" value="Published" />
                        </Picker>
                    </View>


                </View>
            </View>

            {orderDetail.length > 0 ?
            <View>
                <FlatList
                    data={orderDetail}
                    renderItem={RecentOrder}
                  ListFooterComponent={<View style={{marginBottom:150}}/>}
                />
            </View>
            :
            <View>
                <Image source={images.emptyorders} style={{ alignSelf: 'center', top: 30 }} />
                        <Text style={{ top: 40, textAlign: 'center', fontSize: 14, color: '#717171', fontWeight: 'bold' }}>Nothing Uploaded yet</Text>
                </View>
}
        </View>
    )
}

export default BillBoardOrderAdmin;


const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        marginTop: 16
    },
    container1: {

    },
    dateText: {
        color: 'black',
        paddingLeft: 50,
        paddingTop: 7,
        fontFamily:'Oswald-Bold'

    },
    icon: {
        bottom: 21,
        marginLeft: 5

    },
    icon1: {
        bottom: 18,
        marginLeft: 2


    },
    orderBox: {
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
