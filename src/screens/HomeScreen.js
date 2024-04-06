import React, { useState, useEffect } from 'react'
import { View, Text, StatusBar, StyleSheet, Image, TextInput, ScrollView, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import images from '../constant/Images'
import LinearGradient from 'react-native-linear-gradient';
import AnalyticsData from '../Data/AnalyticsData';
import RecentOrderData from '../Data/RecentOrderData.js';
import GalleryData from '../Data/GalleryData';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import moment from 'moment';
import Video from 'react-native-video';



const HomeScreen = (props) => {
    const navigation = useNavigation();
    const [seeAllBillBoard, setSeeAllBillBoard] = useState([])
    const [orderDetail, setOrderDetail] = useState([])
    const [campaignData, setCampaignData] = useState([])
    const [video, setVideo] = useState([])
    const[billlength, setBillLength] = useState([])
    const [orderlength,setOrderLength] = useState([])
    



    const renderItem = ({ item }) => {
        return (
            <View style={{}}>
                <Text style={{ marginTop: 15, margin: 25, color: '#717171', fontFamily: 'Oswald-Regular', fontSize: 12, left: -3 }}>{item.title}</Text>
                <Text style={{ textAlign: 'center', color: '#050423', fontFamily: 'Oswald-Bold', fontSize: 20, top: -10, left: -5 }}>{item.value}</Text>
            </View>
        )
    }

    const LiveBillBoard = ({ item }) => {
       
        return (
            <View>

                <View style={styles.box}>

                    <TouchableOpacity onPress={() => navigation.navigate('BillBoardAdmin', { id: item._id, deviceId: item.deviceId._id, lattitude: item.lattitude, longitude: item.longitude, uri: item?.filesArr[0]?.fileurl })}>
                        <Image style={{ height: 120, width: '100%', borderTopLeftRadius: 6, borderTopRightRadius: 6 }} source={{ uri: item?.filesArr[0]?.fileurl }} />
                    </TouchableOpacity>
                    <View style={{ top: 10, left: 10 }}>
                        <Text style={{ color: 'black', fontSize: 16, fontFamily: 'Oswald-Bold' }}>{item?.billboardName}</Text>
                    </View>
                    <View style={{ top: 10, left: 10 }}>
                        <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Oswald-Regular' }}>{item?.city}</Text>
                    </View>
                    <View style={{ backgroundColor: 'red', width: '30%', borderRadius: 5, left: 115, bottom: 157 }}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>Live</Text>
                    </View>

                </View>
            </View>
        )
    }

    const Campaign = ({ item }) => {
       
        return (
            <View style={styles.campaignBox}>
                <TouchableOpacity onPress={() => navigation.navigate('CampaignOverView', { campaignName: item.campaignName, startscheduleDate: item.startscheduleDate, endscheduleDate: item.endscheduleDate, screens: item.screens, aboutCampaign: item.aboutCampaign })}>
                    <Image source={require('../assets/g2.png')} style={styles.campainImage} />
                </TouchableOpacity>

                <View>
                    <Text style={styles.boardText}>{item.campaignName}</Text>
                    <Text style={styles.subText}>{item.aboutCampaign}</Text>
                    {/* <TouchableOpacity style={styles.bttntxt}>
                        <Text style={styles.status}>Live
                        </Text>
                    </TouchableOpacity> */}
                </View>
            </View>

        )
    }

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
                    : item.status === "Live"? 
                     <Text style={styles.livestatus}>{item.status}</Text>
                    :
                    <Text style={styles.publishedText}>{item.status}</Text>
                }
                {/* <Text style={styles.scheduleText}>Scheduled</Text> */}
                <View style={{ flexDirection: 'row-reverse', bottom: '8%', right: '5%' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('OrderOverView', { adTitle: item.adTitle, startscheduleDate: item.startscheduleDate, endscheduleDate: item.endscheduleDate, aboutAd: item.aboutAd, deviceId: item.deviceId,orderId: item._id})}>
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

    const GalleryItem = ({ item }) => {
       
        return (
            <View style={{
                flex: 1,
                //    width:deviceWidth -25,
                backgroundColor: 'white',
                height: 150,
                width: 200,
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
                marginTop: '8%'
            }}>
                <Video paused={true} controls={true} source={{ uri: item?.compressedlink }} style={styles.ProfileImage} />
                <Text style={{fontFamily:'Oswald-Regular', fontSize:12,color:'black',marginLeft:8}}>{item?.videoname.slice(0, 12)}</Text>


            </View>
        )
    }

    const getAllBillboard = async () => {
        try {
            const resp = await axios.get("/api/billboard/getbillboard");
            setSeeAllBillBoard(resp.data.msg)
            // await AsyncStorage.setItem('TOKEN', JSON.stringify(resp.data.token))

        } catch (err) {
            // Handle Error Here
            console.error("error from Billboard ==> ", err);
        }
    }

    useEffect(() => {
        getAllBillboard()

    }, [])

    const GetOrders = async () => {
        try {
            let res = await axios.get('/api/order/orderListforBusinessOwner?limit=3&status=dashboard')
         
            setOrderDetail(res.data.msg)
        } catch (error) {
            console.log('GET ORDER ERROR', error);
        }
    }

    useEffect(() => {
        GetOrders()

    }, [])



    const getCampaignData = async () => {
        try {
            let res = await axios.post('/api/campaign/getcampaignListbyUserId?limit=10&status=dashboard')
          
            setCampaignData(res.data.msg)
        } catch (error) {
            console.log('GET CAMPAIGN ERROR', error);

        }
    }
    useEffect(() => {
        getCampaignData()

    }, [])

    // const GetImages = async () => {
    //     try {
    //         let res = await axios.get('/api/user/gallery')
    //         console.log("GET IMAGE RESPONSE ==> ", res);
    //         setGallery(res.data.msg)
    //     } catch (error) {
    //         console.log('GET IMAGE ERROR', error);

    //     }
    // }

    // useEffect(() => {
    //     GetImages()

    // }, [])

    const GetVideo = async () => {
        try {
            let res = await axios.get('/api/user/gallery')
           
            setVideo(res.data.msg)
        } catch (error) {
            console.log('GET VIDEO ERROR', error);

        }
    }

    useEffect(() => {
        GetVideo()

    }, [])


    // let VideoImage = [...video.VideodataArr, ...galleryImage.ImagedataArr]

    const GetOrdersLength = async () => {
        try {
            let res = await axios.get('/api/order/orderListforBusinessOwner?limit=1000&status=dashboard')
        
            setOrderLength(res.data.msg)
        } catch (error) {
            console.log('GET ORDER ERROR', error);
        }
    }

    useEffect(() => {
        GetOrdersLength()

    }, [])

    const getAllBillboardLength = async () => {
        try {
            const resp = await axios.get("/api/billboard/getbillboard");
           
            setBillLength(resp.data.msg)
            // await AsyncStorage.setItem('TOKEN', JSON.stringify(resp.data.token))

        } catch (err) {
            // Handle Error Here
            console.error("error from Billboard ==> ", err);
        }
    }

    useEffect(() => {
        getAllBillboardLength()

    }, [])




    return (
        <View style={{ flex: 1, backgroundColor: '#f7f8fd', height: '100%', width: '100%' }}>
            <StatusBar hidden={true} />
            <View >
                <LinearGradient colors={['#d723cd', '#6907c3']} style={styles.linearStyle}>

                    <View style={{ flexDirection: 'row', top: 10, }}>
                        <Image source={images.p} style={{ width: 36, height: 29, top: 19, left: 16 }} />
                        <Image source={images.p1} style={styles.logo} />

                    </View>
                    <View>
                        <TouchableOpacity>
                            <Image source={require('../assets/not.png')} style={styles.bell} />
                        </TouchableOpacity>

                    </View>
                    <View style={{ right: 16, top: 32 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                            <Image source={require('../assets/profile.png')} style={{ height: 25, width: 25 }} />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
                {/* <View style={{ left: 10 }}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Search here...'
                        placeholderTextColor='#6F6F6F'
                    />
                    <Image source={images.search} style={{ marginLeft: 18, marginTop: -95, }} />

                </View> */}



            </View>
            <ScrollView >
                <View >
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ top: 10, left: 8, height: 60, right: 60 }} >
                        <TouchableOpacity onPress={() => navigation.navigate('AddNewCampaign')}>
                            <Image source={images.createcampaign} style={{ margin: 10 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('BillBoards')}>
                            <Image source={images.schedule} style={{ margin: 10 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('GalleryUploadContent')}>
                            <Image source={images.content} style={{ margin: 10 }} />
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                <View style={{ backgroundColor: 'white', top: '0.5%', elevation: 4, borderWidth: 1, borderColor: '#dddddd',height:100 }} >
                    <View style={{ elevation: 1, top: 10, justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={styles.analyticsText} >
                            Analytics
                        </Text>
                        {/* <Text style={styles.seeAllText}>See All</Text> */}
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 8, marginLeft: 8, marginTop: 16 }}>
                            <Text style={{ color: '#717171', fontFamily: 'Oswald-Bold', fontSize: 12,marginLeft:13 }}>BillBoards</Text>
                            <Text style={{ color: '#717171', fontFamily: 'Oswald-Bold', fontSize: 12 }}>Orders</Text>
                            <Text style={{ color: '#717171', fontFamily: 'Oswald-Bold', fontSize: 12 }}>Views</Text>
                            <Text style={{ color: '#717171', fontFamily: 'Oswald-Bold', fontSize: 12,marginRight:13 }}>Revenue</Text>
                        </View>
                        <View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 30, marginLeft: 30, }}>
                                <Text style={{ color: '#050423', fontFamily: 'Oswald-Regular', fontSize: 20, }}>{billlength?.length}</Text>
                                <Text style={{ color: '#050423', fontFamily: 'Oswald-Regular', fontSize: 20,marginLeft:12 }}>{orderlength?.length}</Text>
                                <Text style={{ color: '#050423', fontFamily: 'Oswald-Regular', fontSize: 20,marginLeft:5}}>0</Text>
                                <Text style={{ color: '#050423', fontFamily: 'Oswald-Regular', fontSize: 20, }}>0</Text>

                            </View>
                        </View>
                    </View>



                </View>


                <View style={{ top: '1%' }} >
                    <Image source={images.add} style={{ width: '100%', height: 120 }} />
                </View>

                {seeAllBillBoard.length > 0 ?
                    <View style={{ top: '1.7%', backgroundColor: 'white', elevation: 4, borderWidth: 1, borderColor: '#dddddd', height: 260 }} >
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', }}>
                            <Text style={styles.liveText}>BillBoards</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('BillBoards')}>
                                <Text style={styles.liveseeAll}>See All</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ top: 12 }}>
                            <FlatList
                                data={seeAllBillBoard}
                                renderItem={LiveBillBoard}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false} />
                        </View>
                    </View>

                    :


                    <View style={{ top: '1.5%', backgroundColor: 'white', elevation: 4, borderWidth: 1, borderColor: '#dddddd', height: 260 }} >
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', }}>
                            <Text style={styles.liveText}>BillBoards</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('BillBoards')}>
                                <Text style={styles.liveseeAll}>See All</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ top: 12 }}>
                            <Image source={images.emptybillboard} style={{ alignSelf: 'center', top: 30 }} />
                            <Text style={{ top: 40, textAlign: 'center', fontSize: 14, color: '#717171', fontWeight: 'bold' }}>No BillBoards to show</Text>

                        </View>
                    </View>
                }



                {campaignData.length > 0 ?

                    <View style={{ top: '2.5%', backgroundColor: 'white', elevation: 4, height: 249, borderWidth: 1, borderColor: '#dddddd' }} >
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', }}>
                            <Text style={styles.liveText1}>Campaign</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Campaign')} >
                                <Text style={styles.liveseeAll1}>See All</Text>
                            </TouchableOpacity>
                        </View>



                        <View style={{}}>
                            <FlatList
                                data={campaignData}
                                renderItem={Campaign}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            />
                            {/* <Image source={images.campaign1} style={{ alignSelf: 'center', top: 30 }} />
                        <Text style={{ top: 40, textAlign: 'center', fontSize: 14, color: '#717171', fontWeight: 'bold' }}>No campigns to show</Text> */}
                        </View>
                    </View>
                    :
                    <View style={{ top: '2%', backgroundColor: 'white', elevation: 4, height: 249, borderWidth: 1, borderColor: '#dddddd', }} >
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', }}>
                            <Text style={styles.liveText1}>Campaign</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Campaign')} >
                                <Text style={styles.liveseeAll1}>See All</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{}}>

                            <Image source={images.campaign1} style={{ alignSelf: 'center', top: 30 }} />
                            <Text style={{ top: 40, textAlign: 'center', fontSize: 14, color: '#717171', fontWeight: 'bold' }}>No campigns to show</Text>
                        </View>
                    </View>
                }


                {orderDetail.length > 0 ?
                    <View style={{ top: '3.3%', backgroundColor: 'white', elevation: 4, borderWidth: 1, borderColor: '#dddddd', paddingBottom: 10 }} >
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', }}>
                            <Text style={styles.orderText}>Recent Orders</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('OrderScreen')}>
                                <Text style={styles.oredersSeeall}>See All</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ top: '0.5%' }}>
                            <FlatList
                                data={orderDetail}
                                renderItem={RecentOrder}
                                style={{}}
                            />
                        </View>
                    </View>

                    :

                    <View style={{ top: '2.5%', backgroundColor: 'white', elevation: 4, borderWidth: 1, borderColor: '#dddddd', height: 260 }} >
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', }}>
                            <Text style={styles.orderText}>Recent Orders</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('OrderScreen')}>
                                <Text style={styles.oredersSeeall}>See All</Text>
                            </TouchableOpacity>
                        </View>



                        <View style={{ top: '0.5%' }}>
                            <Image source={images.emptyorders} style={{ alignSelf: 'center', top: 30 }} />
                            <Text style={{ top: 40, textAlign: 'center', fontSize: 14, color: '#717171', fontWeight: 'bold' }}>No Orders to show</Text>
                        </View>
                    </View>
                }


                <View style={{ marginBottom: 80, top: '4%' }}>
                    <Image source={images.add} style={{ width: '100%' }} />
                </View>

                {video.VideodataArr?.length > 0 ?

                    <View style={{ backgroundColor: 'white', elevation: 4, borderWidth: 1, borderColor: '#dddddd', marginBottom: 40, height: 230 }} >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ left: 16, fontSize: 16, fontFamily: 'Oswald-Bold', color: '#484848', top: 8 }}>
                                Gallery
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Gallery')}>
                                <Text style={{ right: 16, fontFamily: 'Oswald-Bold', fontSize: 14, color: '#B937FA', top: 8 }}>See All</Text>
                            </TouchableOpacity>

                        </View>
                        <FlatList
                            data={video.VideodataArr}
                            renderItem={GalleryItem}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        // ListFooterComponent={<View style={{ margin: 50 }} />}

                        />
                    </View>

                    :

                    <View style={{ backgroundColor: 'white', elevation: 4, borderWidth: 1, borderColor: '#dddddd', marginBottom: 40, height: 240 }} >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ left: 16, fontSize: 16, fontFamily: 'Oswald-Bold', color: '#484848', top: 8 }}>
                                Gallery
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Gallery')}>
                                <Text style={{ right: 16, fontFamily: 'Oswald-Bold', fontSize: 14, color: '#B937FA', top: 8 }}>See All</Text>
                            </TouchableOpacity>

                        </View>
                        <Image source={images.gallerylogo} style={{ alignSelf: 'center', top: 30 }} />
                        <Text style={{ top: 40, textAlign: 'center', fontSize: 14, color: '#717171', fontWeight: 'bold' }}>Nothing Uploaded yet</Text>
                    </View>
                }



            </ScrollView>
        </View>

    )
}

export default HomeScreen;
const deviceWidth = Math.round(Dimensions.get('window').width)
const styles = StyleSheet.create({
    analyticsText: {
        fontFamily: 'Oswald-Bold',
        fontStyle: 'normal',
        fontSize: 16,
        lineHeight: 24,
        color: '#5A5A5A',

        paddingLeft: 20,
        // top: 20
    },
    seeAllText: {
        fontFamily: 'Oswald-Bold',
        fontStyle: 'normal',
        fontSize: 14,
        lineHeight: 24,
        color: '#B937FA',
        paddingRight: 16
    },
    liveText: {
        fontFamily: 'Oswald-Bold',
        fontStyle: 'normal',
        fontSize: 16,
        lineHeight: 24,
        color: '#5A5A5A',
        paddingLeft: 16,
        top: 8




    },
    liveseeAll: {

        fontFamily: 'Oswald-Bold',
        fontStyle: 'normal',
        fontSize: 14,
        lineHeight: 24,
        color: '#B937FA',
        paddingRight: 10,
        top: 8


    },
    box: {
        width: 180,
        height: 190,
        padding: 1,
        margin: 15,
        backgroundColor: "white",
        borderRadius: 10,
        // flexDirection: 'row',
        elevation: 2,
        bottom: 10
    },
    campaignBox: {
        flex: 1,
        //    width:deviceWidth -25,
        backgroundColor: 'white',
        height: 200,
        width: 154,
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
        marginTop: '8%'
    },
    boardText: {
        fontSize: 15,
        fontFamily: 'Oswald-Bold',
        color: '#484848',
        marginLeft: 10
    },
    subText: {
        fontFamily: 'Oswald-Regular',
        color: '#8C8C8C',
        marginLeft: 10
    },
    status: {
        // fontWeight: '700',
        // fontSize: 15,
        // fontFamily: 'Oswald',
        // fontStyle: 'normal',
        // // right: 190,
        // color: 'white',
        // backgroundColor: 'red',
        // borderRadius: 10,
        // paddingLeft: 30,
        // width: 80,
        // height: 25,
        // left: 20,
        // bottom: 35
        marginLeft: 20
    },
    orderText: {
        fontSize: 16,
        fontFamily: 'Oswald-Bold',
        fontStyle: 'normal',
        lineHeight: 24,
        paddingLeft: 16,
        // borderWidth:2,
        // marginBottom: 100,
        color: '#484848',
        top: 8

    },
    oredersSeeall: {

        fontFamily: 'Oswald-Bold',
        fontStyle: 'normal',
        fontSize: 14,
        lineHeight: 24,
        color: '#B937FA',

        paddingRight: 16,
        top: 8


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
    livestatus:{
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

    liveView: {
        borderWidth: 1.5,
        borderColor: '(rgba(225, 65, 195, 1)',
        textAlign: 'center',
        borderRadius: 20,
        height: 24,
        width: 71,
        color: '(rgba(225, 65, 195, 1)',
        // left:100,
        fontWeight: 'bold',
        top: 30,
        left: 20

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
    galleryText: {
        fontFamily: 'Oswald',
        fontStyle: 'normal',
        fontSize: 16,
        lineHeight: 24,
        color: '#5A5A5A',
        fontWeight: 'bold',
        left: 20,
        top: 13


    },
    gallerySeeAll: {
        left: 350,
        fontFamily: 'Oswald',
        fontStyle: 'normal',
        fontSize: 16,
        lineHeight: 24,
        color: '#(rgba(225, 65, 195, 1)',
        fontWeight: 'bold',
        bottom: 10
    },
    liveText1: {
        fontFamily: 'Oswald-Bold',
        fontStyle: 'normal',
        fontSize: 16,
        lineHeight: 24,
        color: '#5A5A5A',
        paddingLeft: 16,
        top: 8



    },
    liveseeAll1: {

        fontFamily: 'Oswald-Bold',
        fontStyle: 'normal',
        fontSize: 14,
        lineHeight: 24,
        color: '#B937FA',
        paddingRight: 16,
        top: 8


    },
    menu: {
        height: 20,
        width: 25,
        marginTop: 40,
        marginLeft: 16,

    },
    logo: {
        height: 29,
        width: 130,
        top: 19,
        left: 25

    },

    bell: {
        height: 25,
        width: 25,
        marginTop: 33,
        left: 35
        // marginRight: 15
    },
    linearStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 90

    },
    textInput: {
        height: hp(5),
        paddingLeft: 40,
        paddingBottom: 9,
        margin: 10,
        borderColor: 'black',
        borderRadius: 8,
        backgroundColor: 'white',
        width: wp(90),
        color: 'black',
        bottom: 60,
        fontFamily: 'Oswald-SemiBold',
        fontStyle: 'normal',
        fontSize: 12,



    },
    campainImage: {
        height: 123,
        width: 154,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    bttntxt: {
        backgroundColor: 'red',
        marginLeft: 10,
        width: 60,
        borderRadius: 8
    },
    ProfileImage: {
        height: '100%',
        width: '100%',
        borderRadius: 8

    },




})