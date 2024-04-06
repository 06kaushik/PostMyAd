import React, { useState, useEffect, useRef } from 'react'
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import images from "../../../constant/Images";
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RBSheet from "react-native-raw-bottom-sheet";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { color } from 'react-native-reanimated';


const numColumns = 2;


const UserAllOrder = ({ navigation, route }) => {



    const [orderDetail, setOrderDetail] = useState([])
    console.log('ALL ORDER', orderDetail.length);
    const isFocused = useIsFocused();
    const refRBSheet = useRef();
    const [date, setDate] = useState('');
    const [endDate, setEndDate] = useState('')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndTimePickerVisibility] = useState(false);
    const [data, setData] = useState([])
    console.log('TIME SLOTTTTTTTT', data);
    const [filterData, setFilterData] = useState([])
    const { allFilter } = route.params
    const [startDatee, setStartDate] = useState(null)
    console.log('DOVHDSVHHHVDOHOHVSD', startDatee);
    const [newEndDatee, setNewEndDate] = useState(null)
    console.log('BVNOVNIOVNWIPVNPINVRNVVVPV>>>>', newEndDatee);
    const [search, setSearch] = useState('')
    const [masterData, setmasterData] = useState([])
    const [menuItems, setMenuItems] = useState([
        { id: '1', name: 'Date', },
        { id: '2', name: 'Time Slots', },
        { id: '3', name: 'Status', },
    ])
    const [selectedItem, setSelectedItem] = useState('1')

    const [status, setStatus] = useState([
        { name: 'Pending', id: 0, color:'#FF7F37',bgColor:'#FF7F37',textColor:'white' },
        { name: 'Approved', id: 1,color:'green',bgColor:'green',textColor:'white' },
        { name: 'Rejected', id: 2,color:'red',bgColor:'red',textColor:'white' },
        { name: 'Published', id: 3 ,color:'purple',bgColor:'purple',textColor:'white' },
        { name: 'Live', id: 4 ,color:'red',bgColor:'#DDDDDD',center:'center',textColor:'white' }
    ]);
   const [filterStatus, setFilterStatus] = useState('All')
   console.log('STATUSSSSSSSSSSS', filterStatus);

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
                <TouchableOpacity onPress={() => setData(item.id)} >
                    <View style={{ borderWidth: 1, borderColor: '#DDDDDD', backgroundColor: 'white', height: 32, width: 88, borderRadius: 20, marginTop: 12, alignSelf: 'center', marginLeft: 18, marginRight: 18 }}>

                        {item.id === data ?
                            <View style={{ backgroundColor: 'rgba(183,54,248,255)', borderWidth: 1, height: 32, width: 88, borderRadius: 20, borderColor: 'rgba(183,54,248,255)', right: 1, bottom: 1 }}>
                                <Text style={{ color: 'white', textAlign: 'center', fontFamily: 'Oswald-Bold', marginTop: 3 }}>{item.time}</Text>
                            </View>
                            :
                            <Text style={{ color: 'black', textAlign: 'center', marginTop: 3, fontFamily: 'Oswald-Regular' }}>{item.time}</Text>
                        }


                    </View>
                </TouchableOpacity>

            </View>
        )
    }

    const statusFilter = ({ item }) => {
        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', margin: 10 }}>
                    <TouchableOpacity onPress={() => setFilterStatus(item.name)}>
                        {item.name === filterStatus ? 
                        <View style={{ borderWidth: 1, backgroundColor: item.bgColor, borderColor: item.bgColor, height: 32, width: 95, borderRadius: 15, right: 5,alignSelf: item.center }}>
                            <Text style={{ color: item.textColor, fontWeight: 'bold', textAlign: 'center', top: 4 }}>+ {item.name}</Text>
                        </View>
                        : 
                        <View style={{ borderWidth: 1, borderColor: item.bgColor, height: 32, width: 95, borderRadius: 15, right: 5,alignSelf: item.center }}>
                            <Text style={{ color: item.color, fontWeight: 'bold', textAlign: 'center', top: 4 }}>+ {item.name}</Text>
                        </View>
    }

                    </TouchableOpacity>

                </View>
            </View>
        )

    }




    let startDate = moment(date).format("YYYY-MM-DD")
    // setStartDate(startDate)
    let newEndDate = moment(endDate).format("YYYY-MM-DD")
    // setNewEndDate(newEndDate)


    const FilterStartDate = () => {
        const startDate = moment(date).format("YYYY-MM-DD")
        setStartDate(startDate)
    }

    const FilterEndDate = () => {
        const newEndDate = moment(endDate).format("YYYY-MM-DD")
        setNewEndDate(newEndDate)
    }

    useEffect(() => {
        FilterStartDate()
    }, [date])

    useEffect(() => {
        FilterEndDate()

    }, [endDate])


    const SearchFilter = (text) => {
        if (text) {
            const newData = masterData.filter((item) => {
                const itemData = item.adTitle ? item.adTitle.toUpperCase() : item._id.slice(0, 8) ? item._id.slice(0, 8).toUpperCase() :
                    ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setOrderDetail(newData);
            setSearch(text)

        } else {
            setOrderDetail(masterData)
            setSearch(text)
        }
    }

    const GetOrders = async () => {
        try {
            const resp = await axios.get(`/api/order/orderListbyuser?limit=3&startDate=${startDatee}&page=1&status=${filterStatus}&time=[${data}]&endDate=${newEndDatee}`)
            console.log('ALL ORDERS IN USER>>>>>>>>>>>>>', resp.data.msg);

            setOrderDetail(resp.data.msg)
            setmasterData(resp.data.msg)
        } catch (error) {
            console.log('GET ORDER ERROR', error);
        }
    }

    React.useEffect(() => {
        GetOrders()

    }, [isFocused]);


    useEffect(() => {
        GetOrders()

    }, [startDatee, newEndDatee, data, filterStatus])

    const RecentOrder = ({ item }) => {
        console.log('ORDER ITEM', item);
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
                    onChangeText={(text) => SearchFilter(text)}
                    value={search}
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
                            <TouchableOpacity onPress={() => refRBSheet?.current?.close()}>
                                <Image source={images.cross} />
                            </TouchableOpacity>
                            <Text style={{ color: 'black', fontFamily: 'Oswald-Bold', fontSize: 16, right: 10 }}>Sort by</Text>
                            <Text style={{ color: 'red', fontFamily: 'Oswald-Bold', fontSize: 14 }}></Text>
                        </View>


                        <View style={styles.content}>
                            <View style={styles.menuColumn}>
                                {menuItems.map(
                                    (item, index) => {
                                        return (
                                            <TouchableOpacity key={item.id} onPress={() => setSelectedItem(item.id)} style={[styles.menuItem, item.id === selectedItem ? styles.selectedMenuItem : null]}>
                                                <Text style={styles.menuItemText}>{item.name}</Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                )
                                }

                            </View>

                            <View style={styles.settingsColumn}>

                                {selectedItem === '1' ?
                                    <View style={styles.settingsView} >
                                        <View style={{ margin: 10 }}>
                                            <TouchableOpacity onPress={showDatePicker}>
                                                <View style={{ borderColor: '#dddddd', height: 32, width: 118, borderRadius: 8, borderWidth: 1, right: 8 }}>
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
                                                    <View style={{ borderColor: '#dddddd', height: 32, width: 118, borderRadius: 8, borderWidth: 1, right: 8, top: 30 }}>


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

                                    </View>
                                    :
                                    selectedItem === '2'
                                        ?
                                        <View>
                                            <View>
                                                <FlatList
                                                    data={slot}
                                                    renderItem={renderItem}
                                                    numColumns={numColumns}

                                                />
                                            </View>
                                        </View>
                                        :
                                        selectedItem === '3'
                                            ?

                                            <View>
                                                <FlatList
                                                    data={status}
                                                    renderItem={statusFilter}
                                                    numColumns={2}
                                                />
                                            </View>
                                            :
                                            null
                                }


                            </View>


                        </View>

                        <TouchableOpacity onPress={() => GetOrders() && refRBSheet?.current?.close()}>
                            <View style={{ backgroundColor: 'rgba(183,54,248,255)', height: 42, width: '90%', marginRight: 16, marginLeft: 16, alignSelf: 'center', borderRadius: 15, bottom: 20 }}>
                                <Text style={{ color: 'white', fontFamily: 'Oswald-Bold', fontSize: 16, textAlign: 'center', top: 5 }}>Submit</Text>
                            </View>
                        </TouchableOpacity>


                    </RBSheet>
                </TouchableOpacity>
            </View>


            {orderDetail.length > 0 ?
                <View>
                    <FlatList
                        data={orderDetail}
                        renderItem={RecentOrder}
                        ListFooterComponent={<View style={{ marginBottom: 200 }} />}
                    />
                </View>
                :
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Image style={{ alignSelf: 'center' }} source={images.emptyorders} />
                    <Text style={{ color: '#717171', fontFamily: 'Oswald-Bold', fontSize: 16, alignSelf: 'center' }}>No Orders To show</Text>
                </View>
            }

            {/* <View>
                <FlatList
                    data={filterData}
                    renderItem={FilterAllData}

                />
            </View> */}

        </View>
    )
}

export default UserAllOrder;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'white'
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
        backgroundColor: 'green',
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
        borderWidth: 1,
        borderColor: '#DDDDDD'


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
        backgroundColor: 'orange',
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
    content: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 20
    },

    // menu Column - left
    menuColumn: {
        flex: .4,
        flexDirection: 'column',
        // borderRightColor: '#DDDDDD',
        // borderRightWidth: 1,
    },
    menuItem: {
        // flex: 1,
        flex: 0,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        // alignItems: 'flex-start',
        // borderWidth:1,
        backgroundColor: '#F7F8FD',

    },
    selectedMenuItem: {
        backgroundColor: 'white',
        // borderLeftColor: 'blue',
        // borderLeftWidth: 5,

    },

    menuItemText: {
        marginLeft: 10,
        alignSelf: 'flex-start',
        color: 'pink',
        fontSize: 16,
        fontWeight: 'bold',
    },


    // settings column -right
    settingsColumn: {
        flex: .6,
        padding: 15,
        height: '90%',


    },


})