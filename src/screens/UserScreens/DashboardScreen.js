import React, { useState, useContext, useEffect } from 'react'
import { View, Text, ImageBackground, StyleSheet, Image, FlatList, Animated, Pressable, } from 'react-native'
import images from '../../constant/Images'
import { useIsFocused } from '@react-navigation/native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import BillBoardType from '../../Data/UserData/BillBoardType';
import axios from 'axios';
import VenueIcon from './Data/Venue';
import Cities from './Data/Cities';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarChart, PieChart } from "react-native-gifted-charts";
import moment from 'moment';
import Modal from 'react-native-modal'
import { adminRequest } from './AxiosInstance';
import { Button } from 'react-native-paper';



const UserDashBoard = ({ navigation }) => {

    const [billBoard, setBillBoards] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const isFocused = useIsFocused();
    const [userDetail, setDetail] = useState(null)
    const [orderStat, setOrderStat] = useState([])
    const [datas, setDatas] = useState()
    const [notification, setNotification] = useState([])
    const [pieData, setPieData] = useState()
    const [pieChart, setPieChart] = useState([
        { value: 0, color: '#5FCA5D', gradientCenterColor: '#3BE9DE' },
        { value: 0, color: 'red', gradientCenterColor: '#8F80F3' },
        { value: 0, color: 'orange', gradientCenterColor: '#FF7F97' },
    ])
    const scrollY = new Animated.Value(0)
    const diffClamp = Animated.diffClamp(scrollY, 0, 78)
    const translateY = diffClamp.interpolate({
        inputRange: [0, 78],
        outputRange: [0, -78]
    })
    const [personalInfo, setPersonalInfo] = useState(null)








    React.useEffect(() => {
        getBillBoards()
        getNotification()
        PiecharData()
        OdersStats()
    }, [isFocused]);

    const PiecharData = async () => {
        try {
            const resp = await adminRequest.get(`/api/order/userOrderStatus/${userDetail?._id}`)
            // console.log('RESPONSE FROM PIE DATAddd>>>>>', (resp.data.msg));
            setPieData(resp.data.msg)

            let arr = [{ value: resp.data.msg?.approved, color: '#5FCA5D', gradientCenterColor: '#3BE9DE' },
            { value: resp.data.msg?.rejected, color: 'red', gradientCenterColor: '#8F80F3' },
            { value: resp.data.msg?.pending, color: 'orange', gradientCenterColor: '#FF7F97' },]
            setPieChart(arr)

            // console.log('ARRRAAYYYY ', arr);

        } catch (error) {
            console.log('ERROR FROM PIE', error);

        }

    }

    useEffect(() => {
        PiecharData()

    }, [userDetail?._id])


    const Citiesss = ({ item }) => {
        return (
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('CityBillBoard', { state: item?.text })}>
                    <Image style={styles.nearme} source={item.pic} />
                </TouchableOpacity>
                <Text style={styles.nearmetext}>{item.text}</Text>
            </View>
        )
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.card}>
                <TouchableOpacity onPress={() => navigation.navigate('Billboards')}>
                    <Image style={styles.imagedata} source={item.image} />
                    <Text style={styles.title}>{item.title}</Text>
                </TouchableOpacity>
            </View>
        )
    }


    const GetBillBoard = ({ item }) => {

        return (
            <View style={styles.box}>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('UserBillBoard', { item: item, lattitude: item.lattitude, longitude: item.longitude, billboardName: item.billboardName })}>
                        <Image style={{ height: 120, width: '100%', borderTopLeftRadius: 6, borderTopRightRadius: 6 }} source={{ uri: item?.filesArr[0]?.fileurl }} />
                    </TouchableOpacity>
                    <View style={{ top: 10, left: 10 }}>
                        <Text style={{ color: 'black', fontSize: 16, fontFamily: 'Oswald-Bold', }}>{item.billboardName}</Text>
                    </View>
                    <View style={{ top: 10, left: 10 }}>
                        <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Oswald-Regular', top: 4 }}>{item.city}</Text>
                    </View>
                    <View style={{ marginTop: 8 }}>
                        <Text style={styles.price}>₹ {item.basePrice}/sec</Text>
                    </View>
                    {/* <View style={{ backgroundColor: 'red', width: '30%', borderRadius: 5, left: 115, bottom: 180 }}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>Live</Text>
                    </View> */}
                </View>

            </View>
        )
    }

    const getBillBoards = async () => {
        try {
            const resp = await adminRequest.get("api/billboard/getallbillboard");
            setBillBoards(resp.data.msg)
        } catch (err) {
            // Handle Error Here
            console.error("error from Billboard ==> ", err);
        }
    }

    useEffect(() => {
        getBillBoards()
    }, [])

    const BrowseVenue = ({ item }) => {
        return (

            <View>
                <TouchableOpacity onPress={() => navigation.navigate('BrowseBill', { VenueName: item.name })}>
                    <Image style={styles.icon} source={item.image} />
                </TouchableOpacity>
                <Text style={styles.venuetext}>{item.name}</Text>
            </View>
        )
    }

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





    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         BrowseVenue();
    //         getBillBoards();
    //         GetVideo();

    //     })
    //     return unsubscribe;

    // },[navigation])
    const dateTo = moment().format('YYYY-MM-DD');
    const dateFrom = moment().subtract(7, 'd').format('YYYY-MM-DD');

    const OdersStats = async () => {
        let body = {
            startDate: dateFrom,
            endDate: dateTo,
            orderType: "Approved",
        }
        // console.log('RESPONSE FROM ORDER STAT BODY', body);
        try {
            const resp = await adminRequest.post('/api/order/orderStats', body)
            // console.log('RESPONSE FROM ORDER STAT API>???>', resp.data.msg);
            setOrderStat(resp?.data?.msg)
            let graphData = []
            resp?.data?.msg.map((data) => {
                let obj = {
                    value: data.totalCount,
                    label: moment(data._id).format('dddd').substring(0, 3),
                    frontColor: 'rgba(183,54,248,255)',
                    labelTextStyle: { color: 'black' },

                    // labelTextStyle: {color: 'black'}
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
                        bottom: 50,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: 120,
                            marginRight: 20,
                        }}>
                        {renderDot('#5FCA5D')}
                        <Text style={{ color: 'black' }}>Approved: {pieData?.approved}</Text>
                    </View>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
                        {renderDot('red')}
                        <Text style={{ color: 'black' }}>Rejected: {pieData?.rejected}</Text>
                    </View>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
                        {renderDot('orange')}
                        <Text style={{ color: 'black' }}>Pending: {pieData?.pending}</Text>
                    </View>
                </View>


            </>
        );
    };
    const sum = pieData?.approved + pieData?.rejected + pieData?.pending


    ///////////// NOTIFICATION ///////////////////

    const getNotification = async () => {
        try {
            const resp = await adminRequest.get(`/api/notification/getallnotification?userId=${userDetail?._id}&status=Unread`)
            // console.log('RESPONSE FROM NOTIFICATION API', resp.data.msg);
            setNotification(resp.data.msg)

        } catch (error) {
            console.log('ERROR FROM NOTIFICATION API', error);
        }
    }

    useEffect(() => {
        getNotification()

    }, [userDetail?._id])



    const getUserInfo = async () => {
        try {
            const res = await adminRequest.get(`/api/user/profile/${userDetail?._id}`)
            console.log('RESPONSE FROM PoEpRSONAL INFORMATION', res.data.msg);
            setPersonalInfo(res.data.msg)

        } catch (error) {
            console.log('ERROR FROM PERSONAL INFO', error);

        }
    }

    useEffect(() => {
        getUserInfo()

    }, [userDetail?._id])

    // const checkCondition = () => {
    //     // some logic to check the condition
    //     if (personalInfo?.emailstatus === true) {
    //         setModalVisible(false);
    //     } else {
    //         setModalVisible(true);
    //     }
    // };

    useEffect(() => {
        if (personalInfo?.emailstatus === true && personalInfo?.mobileStatus === true) {
            setModalVisible(false);
        } if (personalInfo?.emailstatus === false || personalInfo?.mobileStatus === false) {
            setModalVisible(true)
        }

    }, [personalInfo?.emailstatus, personalInfo?.mobileStatus])




    return (

        <View style={styles.mainContainer}>

            <Animated.View
                style={{
                    transform: [
                        { translateY: translateY }
                    ],
                    elevation: 4,
                    zIndex: 100
                }}
            >

                <View style={{ backgroundColor: 'rgba(183,54,248,255)', height: 78, flexDirection: 'row', justifyContent: 'space-between', borderWidth: 0.5, elevation: 4, top: 0, left: 0, right: 0, position: 'absolute' }}>
                    <View style={{ flexDirection: 'row', top: 10, }}>
                        <Image source={images.p} style={{ width: 36, height: 29, top: 19, left: 16 }} />
                        <Image source={images.p1} style={styles.logo} />
                    </View>

                    <View style={{ marginLeft: 80, top: 33 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('UserNotification')}>
                            <Image source={images.bbell} style={{ height: 25, width: 25, tintColor: 'white' }} />
                            {notification?.length > 0 ?
                                <View style={{ borderWidth: 1, height: 15, width: 21, borderRadius: 30, borderColor: 'white', backgroundColor: 'white', bottom: 25, marginLeft: 12 }}>
                                    <Text style={{ color: 'black', fontFamily: 'Oswald-Bold', left: 4, position: 'absolute', fontSize: 8, bottom: 0.5 }}>{notification?.length}</Text>
                                </View>
                                :
                                null
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={{ right: 16, top: 32 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('UserProfileMain')}>
                            <Image source={require('../../assets/profile.png')} style={{ height: 25, width: 25 }} />
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{ right: 10,top:32}}>
                    <TouchableOpacity>
                        <Image source={images.search} style={styles.bell} />
                    </TouchableOpacity>

                </View> */}
                </View>


            </Animated.View>





            <ScrollView onScroll={(e) => {
                scrollY.setValue(e.nativeEvent.contentOffset.y)

            }}>
                <View style={{ marginTop: 80 }}>
                    <FlatList
                        data={Cities}
                        renderItem={Citiesss}
                        horizontal={true}

                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                <ImageBackground style={styles.imageBck}
                    source={images.add} >
                    <Text style={styles.coupantext}>Earn Free</Text>
                    <Text style={styles.coupantext1}>Advertisement</Text>
                    <Text style={styles.coupantext2}>Use Code : Feb new</Text>
                </ImageBackground>

                <View style={styles.browseContainer}>
                    <Text style={styles.browsetext}>Browse By Venue</Text>

                    <FlatList
                        data={VenueIcon}
                        renderItem={BrowseVenue}
                        horizontal={true}
                        style={{ marginTop: 12 }}
                        showsHorizontalScrollIndicator={false} />
                </View>

                <View style={styles.billboard}>
                    <View style={styles.billboardHeader}>
                        <Text style={styles.text}>Nearby Smart Billboards</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Billboards')}>
                            <Text style={styles.seeall}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={billBoard}
                        renderItem={GetBillBoard}
                        horizontal={true}
                        style={{ marginTop: 12 }}
                        showsHorizontalScrollIndicator={false}
                    />

                    {/* <Image style={styles.emptyBillBoard} source={images.emptybillboard} /> */}

                </View>

                <View style={styles.browseBillboard}>
                    <View style={styles.billHeader}>
                        <Text style={styles.browsetxt}>Browse by Billboard Type</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Billboards')}>
                            <Text style={styles.browseseeall}>See All</Text>
                        </TouchableOpacity>

                    </View>
                    <FlatList
                        data={BillBoardType}
                        renderItem={renderItem}
                        horizontal={true}
                        style={{ marginTop: 12 }}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                <View style={styles.analyticsContainer}>
                    <View style={styles.analyticsheader}>
                        <Text style={styles.anatxt}>Analytics</Text>
                        <Text style={styles.anaseetext} >See All</Text>
                    </View>

                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 16, marginRight: 16, marginTop: 12 }}>
                            <View style={{ borderWidth: 1, width: 70, borderColor: '#DDDDDD', borderRadius: 5 }}>
                                <Text style={{ fontFamily: 'Oswald-Bold', color: 'black', textAlign: 'center', bottom: 1 }}>Orders</Text>
                            </View>
                            <View style={{ borderWidth: 1, width: 110, borderColor: '#DDDDDD', borderRadius: 5 }}>
                                <Text style={{ fontFamily: 'Oswald-Bold', color: 'black', textAlign: 'center', bottom: 1 }}>Last 7 Days</Text>
                            </View>
                        </View>
                    </View>

                    {/* <Image style={styles.graph} source={images.graphd} /> */}

                    <View style={{ marginLeft: 25 }}>
                        <BarChart
                            barWidth={22}
                            noOfSections={3}
                            barBorderRadius={15}
                            frontColor="lightgray"
                            yAxisThickness={0}
                            xAxisThickness={0}
                            yAxisTextStyle={{ color: 'black' }}
                            data={datas} />
                    </View>


                </View>

                <View style={styles.orderContainer}>
                    <View style={styles.orderHeader}>
                        <Text style={styles.orderText}>Orders</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
                            <Text style={styles.orderseetxt}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        margin: 20,
                        padding: 16,
                        borderRadius: 20,

                    }}>
                        <View style={{ padding: 20, alignSelf: 'center', bottom: 40 }}>
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
            </ScrollView>



            <Modal isVisible={modalVisible}>
                <View style={{ backgroundColor: 'white', borderRadius: 15 }}>
                    <TouchableOpacity >
                        <Image style={{ height: 256, alignSelf: 'center' }} source={require('../../assets/modal1.png')} />
                        <Text style={{ textAlign: 'center', color: 'black', fontSize: 18, fontFamily: 'Oswald-Bold' }}>Profile is not Verified</Text>
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center', color: '#717171', fontSize: 14, fontFamily: 'Oswald-Bold' }}>Please click below to verify your profile</Text>
                    <View style={{ marginLeft: 16, marginRight: 16 }}>
                        <Button color='rgba(183,54,248,255)' mode="contained" onPress={() => navigation.navigate('UserProfileMain')} > Verify Profile</Button>
                    </View>

                    <View style={{ marginLeft: 16, marginRight: 16 }}>
                        <Button color='black' mode="text" onPress={() => setModalVisible(!modalVisible)} > Later</Button>
                    </View>
                </View>
            </Modal>



        </View>
    )
}

export default UserDashBoard;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#f7f8fd'

    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
        marginLeft: 8,
        marginRight: 8,

    },
    bell: {
        height: 20,
        width: 20,
    },
    menu: {
        height: 20,
        width: 20
    },
    textInput: {
        backgroundColor: 'white',
        width: 328,
        height: 40,
        alignSelf: 'center',
        borderRadius: 8,
        paddingLeft: 40,
    },
    search: {
        flexDirection: 'row',
    },
    searchicon: {

    },

    nearme: {
        height: 50,
        width: 50,
        margin: 5
    },
    nearmetext: {
        color: '#6F6F6F',
        fontSize: 12,
        fontFamily: 'Oswald-SemiBold',
        alignSelf: 'center'
    },
    imageBck: {
        marginTop: 12,
        height: 126,
        width: '100%'

    },
    coupantext: {
        color: 'white',
        alignSelf: 'flex-end',
        fontSize: 16,
        fontFamily: 'Oswald-Bold',
        marginRight: '15%',
        marginTop: 12
    },
    coupantext1: {
        color: 'white',
        alignSelf: 'flex-end',
        fontSize: 16,
        fontFamily: 'Oswald-Bold',
        marginRight: '10%',
        marginTop: 5
    },
    coupantext2: {
        color: '#B937FA',
        alignSelf: 'flex-end',
        fontSize: 12,
        fontFamily: 'Oswald-Bold',
        marginRight: '6%',
        marginTop: 5,
        backgroundColor: 'white',
        height: 24,
        width: 116,
        borderRadius: 8,
        paddingLeft: 5
    },
    browseContainer: {
        backgroundColor: 'white',
        elevation: 4,
        height: 124,

        borderColor: '#717171'

    },
    browseContainer1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    browsetext: {
        color: '#2D2D2D',
        fontFamily: 'Oswald-Bold',
        fontSize: 18,
        marginLeft: 16,
        marginTop: '2%'
    },
    icon: {
        height: 20,
        width: 20,
        margin: 12,
        marginLeft: 16,
        alignSelf: 'center',
    },
    venuetext: {
        color: '#6F6F6F',
        fontSize: 12,
        fontFamily: 'Oswald-Regular',
        alignSelf: 'center',
        marginLeft: 8
    },
    billboard: {
        backgroundColor: 'white',
        elevation: 4,
        marginTop: 12,
        borderColor: '#717171',
        height: 300,


    },
    billboardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '2%'

    },
    text: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'Oswald-Bold',
        marginLeft: 16,
    },
    seeall: {
        color: '#B937FA',
        fontSize: 14,
        fontFamily: 'Oswald-Bold',
        marginRight: 16,

    },
    emptyBillBoard: {
        alignSelf: 'center',
        marginTop: 20
    },
    browseBillboard: {
        backgroundColor: 'white',
        elevation: 4,
        marginTop: 12,
        borderColor: '#717171',



    },
    billHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '2%'

    },
    browsetxt: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'Oswald-Bold',
        marginLeft: 16,

    },
    browseseeall: {
        color: '#B937FA',
        fontSize: 14,
        fontFamily: 'Oswald-Bold',
        marginRight: 16,

    },
    imagedata: {

        width: '100%',
        height: 180,
        resizeMode: 'cover'

    },
    card: {
        width: 200,
        height: 216,
        padding: 1,
        margin: 15,
        backgroundColor: "white",
        borderRadius: 10,
        // flexDirection: 'row',
        elevation: 2,
        bottom: 10
    },
    title: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'Oswald-Bold',
        alignSelf: 'center'
    },
    galleryContainer: {
        backgroundColor: 'white',
        elevation: 4,
        marginTop: 12,
        borderColor: '#717171',
        height: 250


    },
    galleryheader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '2%'

    },
    gtext: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'Oswald-Bold',
        marginLeft: 16,

    },
    seetext: {
        color: '#B937FA',
        fontSize: 14,
        fontFamily: 'Oswald-Bold',
        marginRight: 16,

    },
    gallerylogo: {
        alignSelf: 'center',
        marginTop: 10

    },
    analyticsContainer: {
        backgroundColor: 'white',
        elevation: 4,
        marginTop: 12,
        borderColor: '#717171',
        height: 350
    },
    analyticsheader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '2%'

    },
    anatxt: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'Oswald-Bold',
        marginLeft: 16,
    },
    anaseetext: {
        color: '#B937FA',
        fontSize: 14,
        fontFamily: 'Oswald-Bold',
        marginRight: 16,

    },
    dropdownheader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    dropDown: {
        height: 24,
        width: 104,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        backgroundColor: '#dddddd',
        marginLeft: 8
    },
    dropDown1: {
        height: 24,
        width: 104,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        backgroundColor: '#dddddd',
        marginRight: 8
    },
    graph: {
        alignSelf: 'center',
        height: 260,
        width: 360
    },
    orderContainer: {
        backgroundColor: 'white',
        elevation: 4,
        marginTop: 12,
        borderColor: '#717171',
        height: '100%',
        marginBottom: 30

    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '2%'

    },
    orderseetxt: {
        color: '#B937FA',
        fontSize: 14,
        fontFamily: 'Oswald-Bold',
        marginRight: 16,

    },
    orderText: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'Oswald-Bold',
        marginLeft: 16,
    },
    pie: {
        alignSelf: 'center'
    },
    box: {
        width: 200,
        height: 235,
        padding: 1,
        margin: 15,
        backgroundColor: "white",
        borderRadius: 10,
        // flexDirection: 'row',
        elevation: 2,
        bottom: 10
    },
    ProfileImage: {
        height: '100%',
        width: '100%',
        borderRadius: 8
    },
    price: {
        color: '#050423',
        fontSize: 16,
        fontFamily: 'Oswald-SemiBold',
        marginLeft: 8,
        top: 8

    },
    logo: {
        height: 29,
        width: 130,
        top: 19,
        left: 25

    },
    // linearStyle: {
    //     // flexDirection: 'row',
    //     // justifyContent: 'space-between',
    //     // height: 90,
    //     // backgroundColor: '#d723cd'
    // },
    bell: {
        // height: 25,
        // width: 25,
        // marginTop: 33,
        // left: 55,
        // tintColor:'white'

        // marginRight: 15
    },
    SquareShapeView: {

        width: 15,
        height: 15,
        backgroundColor: '#5FCA5D'

    },
    SquareShapeView1: {

        width: 15,
        height: 15,
        backgroundColor: 'red'

    },
    centeredView: {
        flex: 1,


    },
    modalView: {
        // margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        height: 430,
        width: '100%',
        bottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

    },
    // centeredView: {
    //     flex: 1,
    //     justifyContent: "center",

    // },
    // modalView: {
    //     margin: 20,
    //     backgroundColor: "white",
    //     borderRadius: 20,
    //     padding: 75,
    //     bottom: 20,
    //     shadowColor: "#000",
    //     shadowOffset: {
    //         width: 0,
    //         height: 2
    //     },
    //     shadowOpacity: 0.25,
    //     shadowRadius: 4,
    //     elevation: 5,

    // },
})