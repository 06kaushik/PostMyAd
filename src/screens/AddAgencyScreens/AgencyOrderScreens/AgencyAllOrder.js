import React, { useState, useEffect, useRef } from 'react'
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import images from "../../../constant/Images";
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useIsFocused } from '@react-navigation/native';
import RBSheet from "react-native-raw-bottom-sheet";
import DateTimePickerModal from "react-native-modal-datetime-picker";






const numColumns = 4;

const AgencyAllOrder = ({ navigation }) => {

    const [orderDetail, setOrderDetail] = useState([])
    console.log('ORDER IN AGENCY ALL', orderDetail);
    const refRBSheet = useRef();
    const [date, setDate] = useState('');
    const [endDate, setEndDate] = useState('')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndTimePickerVisibility] = useState(false);
    const [data, setData] = useState([])
    const [filterData, setFilterData] = useState([])

    const [slot, setSlot] = useState([
        { time: '12-1 AM', id: 0 },
        { time: '1-2 AM', id: 1 },
        { time: '2-3 AM', id: 2 },
        { time: '3-4 AM', id: 3 },
        { time: '4-5 AM', id: 4 },
        { time: '5-6 AM', id: 5 },
        { time: '6-7 AM', id: 6 },
        { time: '7-8 AM', id: 7 },
        { time: '8-9 AM', id: 8 },
        { time: '9-10 AM', id: 9 },
        { time: '10-11 AM', id: 10 },
        { time: '11-12 AM', id: 11 },
        { time: '12-1 PM', id: 12 },
        { time: '1-2 PM', id: 13 },
        { time: '2-3 PM', id: 14 },
        { time: '3-4 PM', id: 15 },
        { time: '4-5 PM', id: 16 },
        { time: '5-6 PM', id: 17 },
        { time: '6-7 PM', id: 18 },
        { time: '7-8 PM', id: 19 },
        { time: '8-9 PM', id: 20 },
        { time: '9-10 PM', id: 21 },
        { time: '10-11 PM', id: 22 },
        { time: '11-12 PM', id: 23 },
    ]);




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

    ////////////////// END DATE /////////////////

    const showEndDatePicker = () => {
        setEndTimePickerVisibility(true)

    }
    const handleEndDateConfirm = (endDate) => {
        console.log('A End Date has been picked: ', endDate);
        setEndDate(endDate);
        hideDatePicker();
    };
    const hideEndDatePicker = () => {
        setEndTimePickerVisibility(false);
    };

    const renderItem = ({ item }) => {

        return (
            <View style={{ flex: 1, marginTop: 20 }}>

                <View style={{ borderWidth: 1, borderColor: 'rgba(35,63,97,255)', backgroundColor: 'white', height: 32, width: 88, borderRadius: 20, marginTop: 12, alignSelf: 'center', marginLeft: 18, marginRight: 18 }}>
                    <TouchableOpacity onPress={() => setData(item.id)} >
                        {item.id === data ?

                            <Text style={{ color: 'rgba(183,54,248,255)', textAlign: 'center', fontWeight: 'bold', marginTop: 3 }}>{item.time}</Text>
                            :
                            <Text style={{ color: 'black', textAlign: 'center', marginTop: 3 }}>{item.time}</Text>

                        }


                    </TouchableOpacity>
                </View>


            </View>
        )
    }
    let startDate = moment(date).format("YYYY-MM-DD")
    let newEndDate = moment(endDate).format("YYYY-MM-DD")


    const FilterData = async () => {
        const resp = await axios.get(`/api/order/orderListbyuser?limit=3&startDate=${startDate}&page=1&status=All&time=[${data}]&endDate=${newEndDate}`)
        console.log('RESPONSE FROM FILTER DATA API', resp.data.msg);
        setFilterData(resp.data.msg)
    }



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

            <View style={{ backgroundColor: 'white', elevation: 4,  }}>
                <View>
                    <View style={styles.sc}>
                        <Image source={images.search} style={{
                            padding: 10,
                            margin: 5,
                            height: 16,
                            width: 16,
                            resizeMode: 'stretch',
                            alignItems: 'center',
                            left: 5
                        }} />
                        <TextInput
                            placeholder='Search here'
                            placeholderTextColor={'#2D2D2D'}
                            style={styles.input}
                        // onChangeText={(text) => SearchFilter(text)}
                        // value={search}
                        />
                        <TouchableOpacity onPress={() => refRBSheet?.current?.open()}>
                            <Image source={images.filter} style={{
                                padding: 10,
                                margin: 5,
                                height: 16,
                                width: 16,
                                resizeMode: 'stretch',
                                alignItems: 'center',
                                right: 8

                            }} />
                            <RBSheet
                                ref={refRBSheet}
                                // closeOnDragDown={true}
                                height={630}
                                closeOnPressMask={true}
                                animationType={'slide'}
                                customStyles={{
                                    container: {
                                        borderTopRightRadius: 25,
                                        borderTopLeftRadius: 25
                                    },

                                }}>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 16, marginLeft: 16, marginTop: 12 }}>
                                    <Image source={images.cross} />
                                    <Text style={{ color: 'black', fontFamily: 'Oswald-Bold', fontSize: 16 }}>Time Sort</Text>
                                    <Text style={{ color: 'red', fontFamily: 'Oswald-Bold', fontSize: 14 }}>Reset</Text>
                                </View>
                                <View style={{ borderWidth: 1, borderColor: '#DDDDDD', top: 15 }} />

                                <View style={{ alignSelf: 'center', top: 30 }}>
                                    <Text style={{ color: 'black', fontFamily: 'Oswald-Bold', fontSize: 16 }}>Pick a  date Range</Text>
                                </View>


                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40 }}>
                                    <TouchableOpacity onPress={showDatePicker}>
                                        <View style={{ borderColor: '#dddddd', height: 32, width: 118, borderRadius: 8, borderWidth: 1, marginLeft: 16 }}>
                                            <Text style={styles.dateText}>{date ? date.toLocaleDateString() : 'Start Date'}</Text>
                                            <Image source={images.calender} style={styles.iconn} />
                                            <DateTimePickerModal
                                                isVisible={isDatePickerVisible}
                                                mode="date"
                                                onConfirm={handleConfirm}
                                                onCancel={hideDatePicker}

                                            />
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ marginRight: 16 }}>
                                        <TouchableOpacity onPress={showEndDatePicker}>
                                            <View style={{ borderColor: '#dddddd', height: 32, width: 118, borderRadius: 8, borderWidth: 1, }}>

                                                <Text style={styles.dateText1}>{endDate ? endDate.toLocaleDateString() : 'End Date'}</Text>

                                                <Image source={images.calender} style={styles.iconn} />
                                                <DateTimePickerModal
                                                    isVisible={isEndDatePickerVisible}
                                                    mode="date"
                                                    onConfirm={handleEndDateConfirm}
                                                    onCancel={hideEndDatePicker}
                                                />
                                            </View>

                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ borderWidth: 1, borderColor: '#DDDDDD', top: 15 }} />


                                <View>
                                    <FlatList
                                        data={slot}
                                        renderItem={renderItem}
                                        numColumns={numColumns}

                                    />
                                </View>

                                <TouchableOpacity onPress={() => FilterData()}>
                                    <View style={{ backgroundColor: 'rgba(183,54,248,255)', height: 42, width: '90%', marginRight: 16, marginLeft: 16, alignSelf: 'center', borderRadius: 15, marginTop: 35 }}>
                                        <Text style={{ color: 'white', fontFamily: 'Oswald-Bold', fontSize: 16, textAlign: 'center', top: 5 }}>Submit</Text>
                                    </View>
                                </TouchableOpacity>


                            </RBSheet>
                        </TouchableOpacity>
                    </View>
                </View></View>
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

export default AgencyAllOrder;

const styles = StyleSheet.create({
    main: {
        flex: 1,
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
    container: {
        backgroundColor: 'white',
        elevation: 4,
        height: 70

    },
    headertxt: {
        color: '#525252',
        fontSize: 16,
        fontFamily: 'Oswald-Bold',
        marginLeft: 16
    },
    cont: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    txt: {
        color: '#BABABA',
        fontSize: 12,
        fontFamily: 'Oswald-Bold',
        marginLeft: 16,
        marginRight: 16


    },
    num: {
        color: '#525252',
        fontSize: 32,
        fontFamily: 'Oswald-SemiBold',
        alignSelf: 'center',
        marginLeft: 16,
        marginRight: 16


    },
    dateText: {
        color: 'black',
        paddingLeft: 40,
        paddingTop: 3,
        fontFamily: 'Oswald-Bold'

    },
    dateText1: {
        color: 'black',
        paddingLeft: 40,
        paddingTop: 3,
        fontFamily: 'Oswald-Bold'

    },
    iconn: {
        bottom: 21,
        marginLeft: 5
    },
    icon1: {
        bottom: 23,
        marginLeft: 2
    },
    app: {
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Oswald-SemiBold',
        top: 2
    },
    sc: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#F7F8FD',
        borderWidth: 1,
        borderColor: '#DDDDDD',
        height: 48,
        alignSelf: 'flex-start',
        borderRadius: 15,
        margin: 10,
        width: '93%',
        marginTop: 12,
        marginLeft: 16
    },
    input: {
        flex: 1,
        color: 'black',
        paddingLeft: 15,
        fontSize: 12


    },
    icon: {
        height: 20,
        width: 20,
        margin: 12,
        marginLeft: 16,
        alignSelf: 'center',


    },
})