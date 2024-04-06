import React, { useState } from "react";
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, ScrollView, Switch, StyleSheet, Modal, Pressable, ActivityIndicator } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import images from "../../constant/Images";
import axios from "axios";
import moment from "moment";
import Video from "react-native-video";



const OrderSummary = ({ navigation, route }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);
    const { GalleryData } = route.params
    const [isloading, setIsLoading] = useState(false)

    const { image } = route.params
    const { uniquename } = route.params
    const { date } = route.params
    const { time } = route.params
    const { endtime } = route.params
    const { MacId } = route.params
    const { deviceId } = route.params
    const { imageType } = route.params
    const { billBoardId } = route.params
    const { aboutAd } = route.params
    const { adTitle } = route.params
    const { videoLink } = route.params
    // const {videoStartDate} = route.params
    // console.log('VIDEO START DATE', videoStartDate);
    // const {videoEndDate} = route.params
    // console.log('VIDEO END DATE', videoEndDate);
    const { videoname } = route.params
    const { videoFileType } = route.params
    const { videoDate } = route.params
    const { billboardname } = route.params
    const { billboardaddress } = route.params
    const { uniquenamevideoname } = route.params




    let startscheduleDate = moment(date?.toString()).format().slice(0, 11) + time?.slice(1, 6) + ':00+05:30'
    let endscheduleDate = moment(date?.toString()).format().slice(0, 11) + endtime?.slice(1, 6) + ':00+05:30'

    let startTime = moment(moment(startscheduleDate).format("HH:mm:ss a"), "HH:mm:ss a");
    let endTime = moment(moment(endscheduleDate).format("HH:mm:ss a"), "HH:mm:ss a");
    let duration = moment.duration(endTime.diff(startTime));
    let minutes = parseInt(duration.asMinutes()) % 60;
    let hours = parseInt(duration.asHours());

    const PostAddapi = async () => {
        console.log('INSIDE POST API');
        let body = {
            startscheduleDate: startscheduleDate,
            endscheduleDate: endscheduleDate,
            deviceId: deviceId,
            videoname: uniquename,
            deviceMacId: MacId,
            filetype: imageType,
            billboardId: billBoardId,
            adTitle: adTitle,
            aboutAd: aboutAd

        }
        console.log('POST ADDD BODYYYYYY', body);
        try {
            setIsLoading(true);
            let res = await axios.post('/api/billBoardBooking/businessBookingBoard', body)
            console.log('POST ADD RESPONSE', res.data);
            setIsLoading(false);
            setModalVisible(!modalVisible)

        } catch (err) {
            console.log(('Error from POST ADD', err));

        }

    }

    const VideoUpload = async () => {
        setIsLoading(true);
        let body = {
            startscheduleDate: startscheduleDate,
            endscheduleDate: endscheduleDate,
            billboardId: billBoardId,
            deviceId: deviceId,
            videoname: uniquenamevideoname,
            deviceMacId: MacId,
            filetype: 'video/mp4',
            adTitle: adTitle,
            aboutAd: aboutAd

        }
        console.log('POST ADDD BODYYYYYY Videooo', body);
        try {
            let res = await axios.post('/api/billBoardBooking/businessBookingBoard', body)
            setIsLoading(false);
            setModalVisible(!modalVisible)
            console.log('POST ADD RESPONSE', res.data);

        } catch (err) {
            console.log(('Error from POST ADD', err));

        }

    }


    return (
        <View style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>

            <View>
                <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ height: 60 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Gallery', { date: date })}>
                        <View style={{ marginTop: '8%' }}>
                            <Image source={images.back} style={{ marginLeft: 8, }} />
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={{ alignSelf: 'center', bottom: 19, fontFamily: 'Oswald-Bold', color: 'white' }}>Order Summary</Text>
                    </View>



                </LinearGradient>
            </View>

            <View style={{ left: 20, top: 10, }}>
                <View>
                    <Text style={{ fontFamily: 'Oswald', fontWeight: 'bold', fontSize: 16, color: '#525252' }}>{billboardname}</Text>
                </View>
                <View>
                    <Text style={{ fontFamily: 'Oswald', fontWeight: '400', fontSize: 12, color: '#6F6F6F' }}>{billboardaddress}</Text>
                </View>

                <View style={{ top: 15, }}>
                    <View style={{ flexDirection: 'row', margin: 10 }}>
                        <Image source={images.calender} style={{ right: 10 }} />
                        <Text style={{ fontFamily: 'Oswald', fontWeight: 'bold', fontSize: 14, color: '#6F6F6F', left: 10 }}>{date?.toString().slice(0, 10)}</Text>
                        {/* <Image source={images.edit} style={{ left: 25, top: 5 }} /> */}

                    </View>
                    <View style={{ flexDirection: 'row', margin: 10 }}>
                        <Image source={images.time} style={{ right: 8 }} />
                        <Text style={{ fontFamily: 'Oswald', fontWeight: 'bold', fontSize: 14, color: '#6F6F6F', left: 15 }}>{hours ? `${hours} hr` : null} {minutes} min</Text>
                        {/* <Image source={images.edit} style={{ left: 37, top: 2 }} /> */}

                    </View>
                    <View style={{ flexDirection: 'row', margin: 10 }}>
                        <Image source={images.watch} style={{ right: 10 }} />
                        <Text style={{ fontFamily: 'Oswald', fontWeight: 'bold', fontSize: 14, color: '#FF7F37', left: 10 }}>{time}-{endtime}</Text>
                        <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ left: 40, borderRadius: 10, width: '35%', height: 25 }}>
                            <Text style={{ textAlign: 'center', top: 1, color: 'white', fontWeight: 'bold', fontFamily: 'Oswald', }}>Full Screen</Text>
                        </LinearGradient>
                    </View>
                </View>
                <View>

                    <Image source={images.banerimage} style={{ width: 138, height: 120, left: 210, borderRadius: 6, bottom: 150 }} />
                </View>
            </View>


            <View style={{ backgroundColor: 'white', flexDirection: 'row', height: 240, elevation: 4, bottom: 80 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ left: 20, fontWeight: 'bold', fontFamily: 'Oswald', fontSize: 14, color: '#525252', top: 10 }}>Content</Text>
                    <Image source={images.edit} style={{ left: 30, top: 13 }} />
                </View>
                {imageType === 'image/jpeg' ?
                    <Image source={{ uri: image }} style={{ width: '80%', top: 30, right: 20, height: 200, borderRadius: 5, }} />
                    :
                    <Video source={{ uri: videoLink }} style={{ width: '80%', top: 30, right: 20, height: 200, borderRadius: 5, }} />
                }

            </View>
            {/* 
                <View style={{  backgroundColor: 'white', height: 50, elevation: 4,bottom:120 }}>
                    <Text style={{ top: 20, left: 20, fontWeight: 'bold', fontFamily: 'Oswald', fontSize: 14, color: '#525252', }}>Insight Services</Text>
                    <View style={{ backgroundColor: '#F7F8FD', top: 30, height: 80, left: 10, width: '45%', elevation: 4, borderRadius: 10, }}>
                        <Text style={{ top: 10, left: 10, fontWeight: 'bold', color: '#222222' }}>Basic</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={images.eye} style={{ left: 10, top: 20, }} />
                            <Text style={{ left: 18, top: 20, fontWeight: 'bold', fontFamily: 'Oswald', color: '#222222' }}>Number of Views</Text>
                            <Image source={images.help} style={{ left: 25, top: 24, }} />
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'white', height: 80, left: 210, width: '45%', elevation: 4, borderRadius: 10, bottom: 50, }}>
                    </View>
                </View> */}

            <View style={{}}>
                <View style={{}}>
                    {/* <Image style={styles.ProfileImage} source={image} /> */}
                </View>

                <View style={{ backgroundColor: 'white', height: 130, bottom: 70, elevation: 4 }}>
                    <Text style={{ left: 20, fontWeight: 'bold', fontFamily: 'Oswald', fontSize: 14, color: '#525252', }}>Insight Services</Text>
                    <View style={{ backgroundColor: '#F7F8FD', height: 80, left: 10, width: '45%', elevation: 4, borderRadius: 10, top: 15 }}>
                        <Text style={{ top: 10, left: 10, fontWeight: 'bold', color: '#222222' }}>Basic</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={images.eye} style={{ left: 10, top: 20, }} />
                            <Text style={{ left: 15, top: 20, fontWeight: 'bold', fontFamily: 'Oswald', color: '#222222' }}>Number of Views</Text>
                            <Image source={images.help} style={{ left: 16, top: 24, }} />
                        </View>
                    </View>

                    {/* <View style={{ backgroundColor: 'white', height: 80, left: 210, width: '45%', elevation: 4, borderRadius: 10, bottom: 65, }}>
                    </View> */}
                </View>
            </View>



            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', height: 50, bottom: 0, backgroundColor: 'white', elevation: 4, position: 'absolute', width: '100%',borderWidth:1,borderColor:'#dddddd' }}>
                <View style={{ borderWidth: 2, borderRadius: 5, borderColor: 'rgba(221, 221, 221, 1)', width: '30%', height: 30, top: 10 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={{ textAlign: 'center', color: '#525252', fontWeight: 'bold', top: 2, fontFamily: 'Oswald', fontSize: 16 }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                <View >
                    <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ width: 120, height: 30, borderRadius: 5, top: 10 }}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Image source={images.confirmation} style={{ bottom: 20 }} />
                                    <View style={{ bottom: 150 }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 24, color: '#6F6F6F', textAlign: 'center' }}>Ad scheduled</Text>
                                        <Text style={{ fontWeight: 'bold', fontSize: 32, color: '#76B33F', textAlign: 'center' }}>Successfully</Text>
                                    </View>


                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => setModalVisible(!modalVisible)}
                                    >
                                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                            <Text style={styles.textStyle}>Back to Home Page</Text>
                                        </TouchableOpacity>

                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible1}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    {/* <Image source={images.confirmation} style={{ bottom: 20 }} />
                                    <View style={{ bottom: 150 }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 24, color: '#6F6F6F', textAlign: 'center' }}>Ad scheduled</Text>
                                        <Text style={{ fontWeight: 'bold', fontSize: 32, color: '#76B33F', textAlign: 'center' }}>Successfully</Text>
                                    </View> */}
                                    <Image source={images.error} style={{ bottom: 40 }} />


                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => {
                                            setModalVisible1(!modalVisible1);
                                            setModalVisible(!modalVisible)
                                        }}
                                    >
                                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                            <Text style={styles.textStyle}>Back to Home Page</Text>
                                        </TouchableOpacity>

                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                        {imageType === 'image/jpeg' ? (
                            isloading ? (<ActivityIndicator
                                //visibility of Overlay Loading Spinner
                                visible={isloading}
                                size={'large'}
                                //Text with the Spinner
                                style={{flex:1,opacity:1, bottom:300,right:90}}
                                // color='white'
                                //Text style of the Spinner Text
                                textStyle={styles.spinnerTextStyle}
                            />

                            ) :

                                (<TouchableOpacity onPress={() => PostAddapi()} >
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold', top: 2, fontFamily: 'Oswald', fontSize: 16, color: 'white' }}>Continue</Text>
                                </TouchableOpacity>)
                        )
                            :
                            (
                                isloading ? (<ActivityIndicator
                                    //visibility of Overlay Loading Spinner
                                    visible={isloading}
                                    size={'large'}
                                    //Text with the Spinner
                                    style={{flex:1,opacity:1, bottom:300,right:90}}
                                    // color='white'
                                    //Text style of the Spinner Text
                                    textStyle={styles.spinnerTextStyle}
                                />
                                ) :
                                    <TouchableOpacity onPress={() => VideoUpload()} >
                                        <Text style={{ textAlign: 'center', fontWeight: 'bold', top: 2, fontFamily: 'Oswald', fontSize: 16, color: 'white' }}>Continue</Text>
                                    </TouchableOpacity>
                            )
                        }

                    </LinearGradient>
                </View>
            </View>


        </View>
    )
}

export default OrderSummary;

const styles = StyleSheet.create({
    linearStyle: {
        flexDirection: 'row',
        height: 70,

    },
    back: {
        left: 20,
        top: 40

    },
    prfile: {
        left: 33,
        top: 22,
        fontFamily: 'Oswald',
        fontWeight: 'bold',
        fontSize: 14,
        color: 'white'

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        height: 50,
        bottom: 200,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        bottom: 30
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",

    },
    modalText: {

        textAlign: "center",
        bottom: 70,
        fontWeight: 'bold'
    }
})