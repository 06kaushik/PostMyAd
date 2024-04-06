import React, { useState, useEffect, useRef } from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, Pressable, TextInput, TouchableOpacity, ScrollView, Alert, Button } from 'react-native'
import images from "../../../constant/Images";
import LinearGradient from 'react-native-linear-gradient';
import moment from "moment";
import RBSheet from "react-native-raw-bottom-sheet";
import Video from "react-native-video";
import YoutubePlayer from "react-native-youtube-iframe";
import axios from "axios";
import Lottie from 'lottie-react-native';
import Modal from 'react-native-modal'





const AgencyOrderOverview = ({ route, navigation }) => {

    const { OrderDetail } = route.params
    console.log('ORDET DETAIL>>>>', OrderDetail?.OrderDetail);
    const [timing, setTiming] = useState([])
    console.log('timinggggggg', timing.join());
    const [showBox, setShowBox] = useState(true);
    const [isMore, setIsMore] = useState(false);
    const [showingItems, setShowingItems] = useState([]);
    console.log('SHOWIIINGGGGG ITEM', showingItems);
    const refRBSheet = useRef();
    const [orderData, setOrderData] = useState(null)
    console.log('ORDERRRR DATTTAAAAAAAAAAA >>>>><<<<', orderData);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false)




    function convertSecondsToTime() {
        if (orderData) {
            let time = [];
            for (let item of orderData?.secondsTaken[0][Object.keys(orderData?.secondsTaken[0])]) {
                time.push(
                    moment(`${orderData?.startscheduleDate}T${orderData?.startHour}:00:00+05:30`)
                        .add(item, "seconds")
                        .format("LTS")
                );
            }
            setTiming(time)
            return time;
        }
    }

    useEffect(() => {
        convertSecondsToTime()

    }, [orderData])

    const handleCancel = () => {
        let body = {
            orderId: orderData?._id
        }

        console.log('HANDLE CANCEL', body);
        const deleteOrder = async () => {
            try {
                const res = await axios.post('/api/order/cancelOrder', body)
                console.log("Get delete Result ", res.data);
                setOrderDelete(res.data.msg)
            } catch (error) {
                console.log('ERROR FROM CANCEL ORDER', error);




            }
        }
        deleteOrder()

    }

    const showConfirmDialog = () => {
        return Alert.alert(
            "Are you sure?",
            "Are you sure you want to Cancel this ORDER ?",
            [
                // The "Yes" button
                {
                    text: "Yes",
                    onPress: () => {
                        handleCancel()
                        setShowBox(false);
                        setModalVisible(!modalVisible)
                    },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "No",
                },
            ]
        );
    };


    useEffect(() => {
        setShowingItems([...timing.slice(0, 2)]);
        if (timing.length >= 2) {
            setIsMore(true);
        }

    }, [timing])

    const handleMore = () => {
        setShowingItems(timing.slice(0, showingItems.length + 10))
        if (showingItems.length + 10 > timing.length) {
            setIsMore(false);
        }
    }

    const timeSlot = (item) => {
        console.log('??????>>>>>><<<<<', item.item);

        return (
            <View style={{ marginTop: 5 }}>
                <Text style={{ color: '#525252', fontSize: 12, fontFamily: 'Oswald-Bold', borderWidth: 1, height: 24, width: 80, borderRadius: 8, textAlign: 'center', borderColor: 'rgba(183,54,248,255)', top: 5, margin: 10, marginLeft: 12 }} >{item.item}</Text>
            </View>
        )
    }

    const getOrderData = async () => {
        try {
            const resp = await axios.get(`/api/order/getOrderById/${OrderDetail?.OrderDetail}`)
            // console.log('ALLLL ORDER DATA BY ID BY NOTIII', resp.data.msg);
            setOrderData(resp.data.msg)

        } catch (error) {
            console.log('ERROR FROM ORDER BY ID', error);

        }
    }

    useEffect(() => {
        getOrderData()
    }, [OrderDetail?.OrderDetail])

    return (


        <View style={styles.main}>
            {orderData?.filetype === 'image/jpeg' ?
                <View>
                    <Image style={styles.ProfileImage} paused={true} controls={true} source={{ uri: orderData?.contentLink }} />
                </View>
                :
                orderData?.filetype === 'video/mp4' ?
                    <View>
                        <Video style={styles.ProfileImage} paused={true} controls={true} source={{ uri: orderData?.contentLink }} />
                    </View>
                    :
                    <YoutubePlayer
                        height={200}
                        videoId={orderData?.contentLink.slice(32, 44)}
                    />
            }

            <ScrollView>
                {orderData?.status === 'Rejected' ?
                    <View style={{ backgroundColor: 'white', elevation: 4, marginTop: 16, height: 150 }}>
                        <View>
                            <Video style={styles.ProfileImage} paused={true} controls={true} source={{ uri: route?.params?.OrderDetail?.contentLink }} />
                        </View>
                        <View style={styles.container}>
                            <Text style={styles.s}>Status</Text>
                            {orderData?.status === 'Approved' ?
                                <Text style={{
                                    color: 'green',
                                    fontSize: 18,
                                    fontFamily: 'Oswald-Bold',
                                    marginRight: 62
                                }}>{orderData?.status}</Text>

                                :
                                orderData?.status === 'Pending' ?
                                    <Text style={styles.p}>{orderData?.status}</Text>
                                    :
                                    orderData?.status === 'Expired' ?
                                        <Text style={styles.p}>{orderData?.status}</Text>
                                        :
                                        orderData?.status === 'Live' ?
                                            <Text style={{
                                                color: 'red',
                                                fontSize: 18,
                                                fontFamily: 'Oswald-Bold',
                                                marginRight: 70
                                            }}>{orderData?.status}</Text>
                                            :
                                            orderData?.status === 'Rejected' ?
                                                <Text style={{
                                                    color: 'red',
                                                    fontSize: 18,
                                                    fontFamily: 'Oswald-Bold',
                                                    marginRight: 70
                                                }}>{orderData?.status}</Text>
                                                :

                                                <Text style={{
                                                    color: '#FF6F6F',
                                                    fontSize: 18,
                                                    fontFamily: 'Oswald-Bold',
                                                    marginRight: 70
                                                }}>{orderData?.status}</Text>
                            }

                            {orderData?.status === 'Pending' ?
                                <TouchableOpacity onPress={showConfirmDialog}>
                                    <Text style={styles.c}>Cancel Order</Text>
                                </TouchableOpacity>
                                :
                                <Text style={styles.c}>{'                '}</Text>
                            }
                        </View>
                        {orderData?.status === 'Rejected' ?
                            <View style={{ flexDirection: 'row', marginTop: 8, }}>
                                <Text style={styles.approve} >Rejected by</Text>
                                <Text style={{ color: '#525252', fontSize: 14, fontFamily: 'Oswald-Bold', marginLeft: 55 }}>{orderData?.statusChangedBy?.name}</Text>
                            </View>
                            :
                            orderData?.status === 'Expired' ?
                                <View style={{ flexDirection: 'row', marginTop: 8, }}>
                                    <Text style={styles.approve} >Expired by</Text>
                                    <Text style={{ color: '#525252', fontSize: 14, fontFamily: 'Oswald-Bold', marginLeft: 55 }}>{orderData?.statusChangedBy?.name}</Text>
                                </View>
                                :
                                <View style={{ flexDirection: 'row', marginTop: 8, }}>
                                    <Text style={styles.approve} >Approved by</Text>
                                    <Text style={{ color: '#525252', fontSize: 14, fontFamily: 'Oswald-Bold', marginLeft: 55 }}>{orderData?.statusChangedBy?.name}</Text>
                                </View>

                        }

                        {orderData?.status === 'Rejected' ?
                            <View style={{ flexDirection: 'row', marginTop: 8, }}>
                                <Text style={styles.approve} >Rejected at</Text>
                                <Text style={{ color: '#525252', fontSize: 14, fontFamily: 'Oswald-Bold', marginLeft: 57 }}>{orderData?.statusChangedDate?.slice(0, 10)}</Text>
                            </View>
                            :
                            orderData?.status === 'Expired' ?
                                <View style={{ flexDirection: 'row', marginTop: 8, }}>
                                    <Text style={styles.approve} >Expired at</Text>
                                    <Text style={{ color: '#525252', fontSize: 14, fontFamily: 'Oswald-Bold', marginLeft: 57 }}>{orderData?.statusChangedDate?.slice(0, 10)}</Text>
                                </View>
                                :
                                <View style={{ flexDirection: 'row', marginTop: 8, }}>
                                    <Text style={styles.approve} >Approved at</Text>
                                    <Text style={{ color: '#525252', fontSize: 14, fontFamily: 'Oswald-Bold', marginLeft: 57 }}>{orderData?.statusChangedDate?.slice(0, 10)}</Text>
                                </View>

                        }

                        <View style={{ flexDirection: 'row', marginTop: 8, }}>
                            <Text style={styles.approve} >Reason </Text>
                            <Text style={{ color: '#525252', fontSize: 14, fontFamily: 'Oswald-Bold', marginLeft: 78 }}>{orderData?.reason}</Text>
                        </View>



                    </View>
                    :
                    <View style={{ backgroundColor: 'white', elevation: 4, marginTop: 16, height: 110 }}>
                        <View>
                            <Video style={styles.ProfileImage} paused={true} controls={true} source={{ uri: route?.params?.OrderDetail?.contentLink }} />
                        </View>
                        <View style={styles.container}>
                            <Text style={styles.s}>Status</Text>
                            {orderData?.status === 'Approved' ?
                                <Text style={{
                                    color: 'green',
                                    fontSize: 18,
                                    fontFamily: 'Oswald-Bold',
                                    marginRight: 62
                                }}>{orderData?.status}</Text>

                                :
                                orderData?.status === 'Pending' ?
                                    <Text style={styles.p}>{orderData?.status}</Text>
                                    :
                                    orderData?.status === 'Published' ?
                                        <Text style={{
                                            color: 'rgba(183,54,248,255)',
                                            fontSize: 18,
                                            fontFamily: 'Oswald-Bold',
                                            marginRight: 60
                                        }}>{orderData?.status}</Text>
                                        :
                                        orderData?.status === 'Expired' ?
                                            <Text style={styles.p}>{orderData?.status}</Text>
                                            :
                                            orderData?.status === 'Live' ?
                                                <Text style={{
                                                    color: 'red',
                                                    fontSize: 18,
                                                    fontFamily: 'Oswald-Bold',
                                                    marginRight: 70
                                                }}>{orderData?.status}</Text>
                                                :

                                                <Text style={{
                                                    color: '#FF6F6F',
                                                    fontSize: 18,
                                                    fontFamily: 'Oswald-Bold',
                                                    marginRight: 70
                                                }}>{orderData?.status}</Text>
                            }

                            {orderData?.status === 'Pending' ?
                                <TouchableOpacity onPress={showConfirmDialog}>
                                    <Text style={styles.c}>Cancel Order</Text>
                                </TouchableOpacity>
                                :
                                <Text style={styles.c}>{'                '}</Text>
                            }
                        </View>
                        {orderData?.status === 'Rejected' ?
                            <View style={{ flexDirection: 'row', marginTop: 8, }}>
                                <Text style={styles.approve} >Rejected by</Text>
                                <Text style={{ color: '#525252', fontSize: 14, fontFamily: 'Oswald-Bold', marginLeft: 55 }}>{orderData?.statusChangedBy?.name}</Text>
                            </View>
                            :
                            orderData?.status === 'Expired' ?
                                null
                                :
                                <View style={{ flexDirection: 'row', marginTop: 8, }}>
                                    <Text style={styles.approve} >Approved by</Text>
                                    <Text style={{ color: '#525252', fontSize: 14, fontFamily: 'Oswald-Bold', marginLeft: 55 }}>{orderData?.statusChangedBy?.name}</Text>
                                </View>

                        }

                        {orderData?.status === 'Rejected' ?
                            <View style={{ flexDirection: 'row', marginTop: 8, }}>
                                <Text style={styles.approve} >Rejected at</Text>
                                <Text style={{ color: '#525252', fontSize: 14, fontFamily: 'Oswald-Bold', marginLeft: 57 }}>{orderData?.statusChangedDate?.slice(0, 10)}</Text>
                            </View>
                            :
                            orderData?.status === 'Expired' ?
                                <View style={{ flexDirection: 'row', marginTop: 8, }}>
                                    <Text style={{
                                        color: '#6D787D',
                                        marginLeft: 16,
                                        fontSize: 14,
                                        marginTop: 10,
                                        fontFamily: 'Oswald-Bold',
                                    }} >Expired at</Text>
                                    <Text style={{ color: '#525252', fontSize: 14, fontFamily: 'Oswald-Bold', marginLeft: 57 }}>{orderData?.statusChangedDate?.slice(0, 10)}</Text>
                                </View>
                                :
                                <View style={{ flexDirection: 'row', marginTop: 8, }}>
                                    <Text style={styles.approve} >Approved at</Text>
                                    <Text style={{ color: '#525252', fontSize: 14, fontFamily: 'Oswald-Bold', marginLeft: 57 }}>{orderData?.statusChangedDate?.slice(0, 10)}</Text>
                                </View>

                        }

                    </View>
                }


                <View style={{ backgroundColor: 'white', elevation: 4, marginTop: 8, height: 300 }}>
                    <View>
                        <Text style={styles.add}>Ad Overview</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 8, }}>
                        <Text style={styles.approve} >Ad Name</Text>
                        <Text style={{ color: '#525252', fontSize: 14, fontFamily: 'Oswald-Bold', marginLeft: 80 }}>{orderData?.adTitle}</Text>
                    </View>


                    <View style={{ flexDirection: 'row', marginTop: 8, }}>
                        <Text style={styles.approve} >Start Date</Text>
                        <Text style={{ color: '#525252', fontSize: 14, fontFamily: 'Oswald-Bold', marginLeft: 70 }}>{moment(orderData?.startscheduleDate).format('DD-MM-YYYY')}</Text>

                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 8, }}>
                        <Text style={styles.approve} >End Date</Text>
                        <Text style={{ color: '#525252', fontSize: 14, fontFamily: 'Oswald-Bold', marginLeft: 78 }}>{moment(orderData?.endscheduleDate).format('DD-MM-YYYY')}</Text>

                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 8, }}>
                        <Text style={styles.approve} >Time Slot</Text>
                        {/* <Text style={{ color: '#525252', fontSize: 14, fontFamily: 'Oswald-Bold', marginLeft: 76 }}>{timing?.join(',')}</Text> */}
                        {/* <FlatList 
                        data={showingItems}
                        renderItem={timeSlot}
                        // horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{left:70}}
                        /> */}
                        {showingItems.map((x) => (
                            <Text style={{ color: '#525252', fontSize: 12, fontFamily: 'Oswald-Bold', borderWidth: 1, height: 24, width: 80, borderRadius: 8, textAlign: 'center', borderColor: '#DDDDDD', margin: 5, left: 70 }} key={x}>{x}</Text>
                        ))}
                        <View style={{ left: 80 }}  >

                            {isMore &&
                                <TouchableOpacity onPress={() => { refRBSheet?.current?.open() }}>
                                    <Text style={{ color: '#525252', fontSize: 12, fontFamily: 'Oswald-Bold', borderWidth: 1, height: 24, width: 70, borderRadius: 8, textAlign: 'center', borderColor: 'rgba(183,54,248,255)', top: 5 }} >See More</Text>
                                    <RBSheet
                                        ref={refRBSheet}
                                        closeOnDragDown={true}
                                        height={810}
                                        closeOnPressMask={true}
                                        animationType={'slide'}
                                        customStyles={{
                                            // wrapper: {
                                            //     backgroundColor: "transparent"
                                            // },
                                            draggableIcon: {
                                                backgroundColor: "#000"
                                            },
                                            container: { borderWidth: 1, borderColor: '#DDDDDD' }
                                        }}>
                                        <View>
                                            <Text style={{ textAlign: 'center', color: 'black', fontFamily: 'Oswald-Bold', fontSize: 16 }}>Time Slot ({OrderDetail.OrderDetail.timeSlot})</Text>
                                        </View>
                                        <View>
                                            <FlatList
                                                data={timing}
                                                renderItem={timeSlot}
                                                numColumns={4}
                                            />
                                            {/* <View style={{ borderWidth: 1, width: '100%', borderColor: '#DDDDDD', top: 5 }} /> */}

                                        </View>



                                    </RBSheet>
                                </TouchableOpacity>
                            }
                        </View>


                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 8, }}>
                        <Text style={styles.approve} >Repetition</Text>
                        <Text style={{ color: '#525252', fontSize: 14, fontFamily: 'Oswald-Bold', marginLeft: 70 }}>30 X {(orderData?.videoDuration) / 30} times </Text>

                    </View>
                    {/* <View style={{ flexDirection: 'row', marginTop: 8, }}>
                        <Text style={styles.approve} >Submitted by</Text>
                        <Text style={{ color: '#525252', fontSize: 14, fontFamily: 'Oswald-Bold', marginLeft: 55 }}>{orderData?.userId?.role}</Text>

                    </View> */}
                    <View style={{ flexDirection: 'row', marginTop: 8, }}>
                        <Text style={styles.approve} >Submitted at</Text>
                        <Text style={{ color: '#525252', fontSize: 14, fontFamily: 'Oswald-Bold', marginLeft: 57 }}>{moment(orderData?.orderDate).format('DD-MM-YYYY  , HH:MM A')}</Text>

                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 8, }}>
                        <Text style={styles.approve} >About</Text>
                        <Text style={{ color: '#525252', fontSize: 14, fontFamily: 'Oswald-Bold', marginLeft: 98 }}>{orderData?.aboutAd}</Text>

                    </View>
                </View>

                <View style={{ backgroundColor: 'white', elevation: 4, marginTop: 8, marginBottom: 100, height: 150 }}>
                    <View>
                        <Text style={styles.add}>Transaction Detail</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 8, }}>
                        <Text style={styles.s}>Order Id</Text>
                        <Text style={{ color: '#FF7F37', fontSize: 14, fontFamily: 'Oswald-Bold', top: 5, marginLeft: 70 }}>{orderData?.orderId}</Text>
                        {/* <Text style={styles.c}>Refund Policy</Text> */}
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 8, justifyContent: 'space-between' }}>
                        <Text style={styles.approve} >Amount</Text>
                        <Text style={styles.name}>Rs.{orderData?.orderPrice}</Text>
                        <Text>{'                   '}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 8, justifyContent: 'space-between' }}>
                        <Text style={styles.approve} >Mode of payment</Text>
                        <Text style={styles.name}>Wallet</Text>
                        <Text>{'                                     '}</Text>
                    </View>
                </View>
            </ScrollView>


            <View style={{ flex: 1, }}>
                <View style={{ backgroundColor: 'white', elevation: 4, position: 'absolute', bottom: 0, width: '100%' }}>
                    <TouchableOpacity>
                        {orderData?.status === 'Approved' ?
                            <View style={{
                                borderWidth: 1,
                                alignSelf: 'center',
                                borderRadius: 6,
                                marginTop: 15,
                                borderColor: 'green',
                                height: 40,
                                width: '92%',
                                marginBottom: 10
                            }}>
                                <Text style={{
                                    color: 'green',
                                    alignSelf: 'center',
                                    fontSize: 16,
                                    fontFamily: 'Oswald-Regular',
                                    top: 4
                                }}>{orderData?.status}</Text>
                            </View>
                            :
                            orderData?.status === 'Pending' ?
                                <View style={{
                                    borderWidth: 1,
                                    alignSelf: 'center',
                                    borderRadius: 6,
                                    marginTop: 15,
                                    borderColor: '#FF7F37',
                                    height: 40,
                                    width: '92%',
                                    marginBottom: 10
                                }}>
                                    <Text style={{
                                        color: '#FF7F37',
                                        alignSelf: 'center',
                                        fontSize: 16,
                                        fontFamily: 'Oswald-Regular',
                                        top: 4
                                    }}>{orderData?.status}</Text>
                                </View>
                                :
                                orderData?.status === 'Expired' ?
                                    <View style={{
                                        borderWidth: 1,
                                        alignSelf: 'center',
                                        borderRadius: 6,
                                        marginTop: 15,
                                        borderColor: '#FF6F6F',
                                        height: 40,
                                        width: '92%',
                                        marginBottom: 10
                                    }}>
                                        <Text style={{
                                            color: '#FF6F6F',
                                            alignSelf: 'center',
                                            fontSize: 16,
                                            fontFamily: 'Oswald-Regular',
                                            top: 4
                                        }}>{orderData?.status}</Text>
                                    </View>
                                    :
                                    orderData?.status === 'Rejected' ?
                                        <View style={{
                                            borderWidth: 1,
                                            alignSelf: 'center',
                                            borderRadius: 6,
                                            marginTop: 15,
                                            borderColor: 'red',
                                            height: 40,
                                            width: '92%',
                                            marginBottom: 10
                                        }}>
                                            <Text style={{
                                                color: 'red',
                                                alignSelf: 'center',
                                                fontSize: 16,
                                                fontFamily: 'Oswald-Regular',
                                                top: 4
                                            }}>{orderData?.status}</Text>
                                        </View>
                                        :
                                        orderData?.status === 'Published' ?
                                            <View style={{
                                                borderWidth: 1,
                                                alignSelf: 'center',
                                                borderRadius: 6,
                                                marginTop: 15,
                                                borderColor: 'rgba(146, 30, 246, 1)',
                                                height: 40,
                                                width: '92%',
                                                marginBottom: 10
                                            }}>
                                                <Text style={{
                                                    color: 'rgba(146, 30, 246, 1)',
                                                    alignSelf: 'center',
                                                    fontSize: 16,
                                                    fontFamily: 'Oswald-Regular',
                                                    top: 4
                                                }}>{orderData?.status}</Text>
                                            </View>
                                            :
                                            <View style={{
                                                borderWidth: 1,
                                                alignSelf: 'center',
                                                borderRadius: 6,
                                                marginTop: 15,
                                                borderColor: 'red',
                                                height: 40,
                                                width: '92%',
                                                marginBottom: 10
                                            }}>
                                                <Text style={{
                                                    color: 'red',
                                                    alignSelf: 'center',
                                                    fontSize: 16,
                                                    fontFamily: 'Oswald-Regular',
                                                    top: 4
                                                }}>{orderData?.status}</Text>
                                            </View>
                        }



                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                hasBackdrop={true}
                backdropOpacity={0.8}
                isVisible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <Lottie source={require('../../../assets/data-2.json')} autoPlay loop style={{ bottom: 20, alignSelf: 'center', height: 140, width: 140 }} />
                        <View style={{ bottom: 30 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 24, color: 'white', textAlign: 'center' }}>Order Cancelled</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 32, color: '#76B33F', textAlign: 'center' }}>Successfully</Text>
                        </View>
                        {/* <Image source={images.error} style={{ bottom: 40 }} /> */}

                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <TouchableOpacity onPress={() => navigation.goBack('')}>
                                <View style={{ height: 40, borderRadius: 8, backgroundColor: 'green' }}>
                                    <Text style={styles.textStyle}>Back to Orders</Text>
                                </View>
                            </TouchableOpacity>

                        </Pressable>

                    </View>
                </View>
            </Modal>



        </View>
    )
}

export default AgencyOrderOverview

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8
    },
    s: {
        color: '#5A5A5A',
        fontSize: 18,
        fontFamily: 'Oswald-Bold',
        marginLeft: 16
    },
    p: {
        color: '#FF6F6F',
        fontSize: 18,
        fontFamily: 'Oswald-Bold',
        marginRight: 70
    },
    c: {
        color: '#B937FA',
        fontSize: 14,
        fontFamily: 'Oswald-Bold',
        marginRight: 16
    },
    approve: {
        color: '#6D787D',
        marginLeft: 16,
        fontSize: 14,
        fontFamily: 'Oswald-Bold',

    },
    name: {
        color: '#525252',
        fontSize: 14,
        fontFamily: 'Oswald-Bold',



    },
    add: {
        fontSize: 18,
        fontFamily: 'Oswald-Bold',
        color: '#525252',
        marginLeft: 16, marginTop: 8
    },
    submit: {
        color: '#FF7F37',
        alignSelf: 'center',
        fontSize: 16,
        fontFamily: 'Oswald-Regular',
        top: 4
    },
    cont: {
        borderWidth: 1,
        alignSelf: 'center',
        borderRadius: 6,
        marginTop: 15,
        borderColor: '#FF7F37',
        height: 40,
        width: '92%',
        marginBottom: 10
    },
    ProfileImage: {
        height: 205,
        width: '100%',
        // borderRadius: 90,
        //  paddingRight:100,
        alignSelf: 'center',


    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        top: 9

    },


})