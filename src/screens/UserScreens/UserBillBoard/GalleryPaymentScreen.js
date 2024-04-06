import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, ScrollView, Switch, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import images from "../../../constant/Images";
import * as ImagePicker from 'react-native-image-picker'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from "moment";
import Video from "react-native-video";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import Modal from 'react-native-modal'
import { adminRequest } from "../AxiosInstance";



const GalleryPaymentScreen = ({ navigation, route }) => {
    
    const [uploadedFileType, setUploadedFileType] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [isloading, setIsLoading] = useState(false)
    const [modalVisible1, setModalVisible1] = useState(false)
    const { billBoardName } = route.params
    const { scheduleDate } = route.params
    const { duration } = route.params
    const { address } = route.params
    const {basePrice} = route.params
    const {selectTime} = route.params
    const {amount} = route.params
 
    const {deviceId} = route.params
    const {billboardId} = route.params
    const {deviceMacId} = route.params
    console.log('MAC ID IN PAYMENT', deviceMacId);
    const {Videofiletype} = route.params
    console.log('video type', Videofiletype);
    const {adTitle} = route.params
    const {aboutAd} = route.params
    const {timeslot} = route.params
    const {date} = route.params
    const {videoname} = route.params
    const {VideoOriginalName} = route.params
    const {videoUri} = route.params
    const [userDetail, setDetail] = useState(null)


    const {imageFileType} = route.params
    console.log('image type', imageFileType);
    const {imageUrl} = route.params
    const {imageuniquename} = route.params
    const {imagestring} =  route.params


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




    const VideoUploader = async () => {
        setIsLoading(true);
        const datas = new FormData();


        datas.append("macArr", deviceMacId);
        datas.append('uniquename', videoname)
        // datas.append('uniquename', "himanshu1234")
        datas.append('userId', userDetail._id)

        datas.append("file", {
            name: VideoOriginalName + ".mp4",
            type: Videofiletype,
            uri: videoUri,
        });
        console.log('DATA OF VIDEO', datas);
        // let body = datas;

        try {
            let resp = await fetch("http://103.127.30.212:5000/api/nativeupload/nativeVideoUpload",
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    method: 'POST',
                    body: datas

                });

            setIsLoading(false);
            setModalVisible(!modalVisible)
            let response = await resp.json()

            console.log('RESPONSE FROM VIDEO', response);
            PostAddVideoapi()
        } catch (e) {

            console.log('ERROR FROM VIDEO UPLOAAD', e);
            console.error(e);

        }
    }

    const PostAddVideoapi = async () => {
        console.log('INSIDE POST API');
        let body = {
            date: date,
            billboardId: billboardId,
            deviceId:deviceId ,
            videoname: videoname,
            deviceMacId:deviceMacId ,
            filetype: Videofiletype,
            adTitle: adTitle,
            aboutAd: aboutAd,
            timeslot: timeslot,
            duration:duration

        }

        console.log('POST ADDD VIDEO', body);
        try {
            console.log('hejlflknlhnlnl');
            let res = await adminRequest.post('/api/billBoardBooking/bookingBoard',body)
            console.log('POST ADD RESPONSE', res.data);

        } catch (err) {
            console.log(('Error from POST ADD', err));

        }

    }



    /////////////////////////IMAGE ////////////////////

    const ImageUploader = () => {
        let body = {
            userid: userDetail?._id,
            imagename: imageUrl?.uri.slice(92, 104),
            filetype: imageFileType,
            uniquename: imageuniquename,
            imagestring: imagestring,
            macArr: deviceMacId,
        }
        console.log('IMAGEUPLOADER BODY', body);
        const ImageUploaderapi = async () => {

            try {
                setIsLoading(true);
                let res = await adminRequest.post('/api/mediaupload/base64upload', body)
                console.log('IMAGE UPLOADER RESPONSE', res.data);
                setIsLoading(false);
                setModalVisible(!modalVisible)

            } catch (error) {

                console.log('Error from Image Uploader', error);
            }
        }
        ImageUploaderapi()
        PostAddapi()
    }

    const PostAddapi = async () => {
        console.log('INSIDE POST API');
        let body = {
            date: date,
            billboardId: billboardId,
            deviceId:deviceId ,
            videoname: imageuniquename,
            deviceMacId:deviceMacId ,
            filetype: imageFileType,
            adTitle: adTitle,
            aboutAd: aboutAd,
            timeslot: timeslot,
            duration:duration

        }
        console.log('POST ADDD BODYYYYYY', body);
        try {
            let res = await adminRequest.post('/api/billBoardBooking/businessBookingBoard', body)
            console.log('POST ADD RESPONSE', res.data);

        } catch (err) {
            console.log(('Error from POST ADD', err));

        }

    }




    return (
        <View style={{ backgroundColor: '#f7f8fd', flex: 1,}}>
            <View>
                <View  style={{ height: 78,backgroundColor:'rgba(183,54,248,255)' }}>
                    <TouchableOpacity onPress={() => navigation.goBack('UserOrderSummary')}>
                        <View style={{ marginTop: '8%' }}>
                            <Image source={images.back} style={{ marginLeft: 16,top:5 }} />
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={{ alignSelf: 'center', bottom: 19, fontFamily: 'Oswald-Bold', color: 'white',fontSize:18 }}>Payment</Text>
                    </View>

                </View>
            </View>

            <View style={{ backgroundColor: 'white', elevation: 4, }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{marginTop:12}}>
                        <Text style={{ color: 'black', marginLeft: 16, fontSize: 18, fontFamily: 'Oswald-Bold' }}>{billBoardName}</Text>
                        <Text style={{ color: 'black', marginLeft: 16, fontSize: 16, fontFamily: 'Oswald-SemiBold' }}>{address}</Text>
                        <View style={{ marginLeft: 12, marginTop: 8 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ margin: 5 }} source={images.calender} />
                                <Text style={{ color: 'black', margin: 5, marginLeft: 10, fontFamily: 'Oswald-Bold' }}>{scheduleDate?.toString().slice(0, 10)}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 8  }}>
                                <Image style={{ margin: 5 }} source={images.time} />
                                <Text style={{ color: 'black', margin: 5, marginLeft: 13, fontFamily: 'Oswald-Bold' }}>{duration} sec</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 8  }}>
                                <Image style={{ margin: 5, right: 4 }} source={images.clock} />
                                {selectTime > 11 ?
                                    <Text style={{ color: 'black', margin: 5, fontFamily: 'Oswald-Bold' }}>{selectTime === 12 ? `${12} - ${1} PM` : `${selectTime - 12} - ${selectTime - 12 + 1} PM`}</Text>
                                        :(selectTime === null)?
                                        <Text style={{ color: 'rgba(183,54,248,255)', margin: 5, fontFamily: 'Oswald-Bold' }}>Pending</Text>
                                        :
                                        <Text style={{ color: 'black', margin: 5, fontFamily: 'Oswald-Bold' }}>{selectTime === 11 ? `${selectTime} - ${selectTime + 1} PM` : `${selectTime} - ${selectTime + 1} AM`}</Text>

                                }
                            </View>
                            
                        </View>
                    </View>
                    <View>
                        <Image source={images.baner} style={{ width: 138, height: 117, marginRight: 16, marginTop: 12, borderRadius: 8 }} />
                        <View  style={{ borderRadius: 10, width: 138, height: 24,backgroundColor:'rgba(183,54,248,255)',marginTop:12 }}>
                            <Text style={{ textAlign: 'center', top: 1, color: 'white', fontWeight: 'bold', fontFamily: 'Oswald', }}>Full Screen</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View>
                <View style={{ flexDirection: 'row', marginTop: 12 }}>
                    <Image style={{ marginLeft: 16,top:3 }} source={images.coupan} />
                    <Text style={{ color: '#6F6F6F', fontSize: 14, fontFamily: 'Oswald-Bold', marginLeft: 10, }}>Use Coupons</Text>
                </View>
            </View>
           

                <View style={{ backgroundColor: 'white', elevation: 4, marginTop: 12,height:210 }}>
                    <View style={{ marginTop: 12 }}>
                        <Text style={{ color: 'black', fontSize: 18, fontFamily: 'Oswald-Bold', marginLeft: 16 }}>Order Summary</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                            <View style={{ marginLeft: 16 }}>
                                <Text style={{ color: '#5A5A5A', fontFamily: 'Oswald-SemiBold',margin:5 }}>Screen(1)</Text>
                                {/* <Text style={{ color: '#5A5A5A', fontFamily: 'Oswald-SemiBold' }}>Screen wall (Full Screen)</Text> */}
                                <Text style={{ color: '#5A5A5A', fontFamily: 'Oswald-SemiBold',margin:5 }}>Time</Text>
                                <Text style={{ color: '#5A5A5A', fontFamily: 'Oswald-SemiBold',margin:5 }}>Duration ({duration} sec)</Text>
                            </View>
                            <View style={{ marginRight: 16 }}>
                                <Text style={{ color: '#5A5A5A', fontFamily: 'Oswald-SemiBold',margin:5 }}>{basePrice}/-</Text>
                                {/* <Text style={{ color: '#5A5A5A', fontFamily: 'Oswald-SemiBold' }}>1200/-</Text> */}
                                <Text style={{ color: '#5A5A5A', fontFamily: 'Oswald-SemiBold',margin:5 }}>{amount}/-</Text>
                                <Text style={{ color: '#5A5A5A', fontFamily: 'Oswald-SemiBold',margin:5 }}>{amount * duration}/-</Text>
                            </View>
                        </View>
                        <View style={{ borderWidth: 0.5, borderColor: '#e4e6ef', marginTop: 8, marginLeft: 16, marginRight: 16 }} />
                    </View>
                    <View style={{ marginTop: '2%', marginBottom: 50 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#5A5A5A', fontFamily: 'Oswald-SemiBold', fontSize: 16, marginLeft: 16 }}>Total Amount</Text>
                            <Text style={{ color: '#5A5A5A', fontFamily: 'Oswald-SemiBold', fontSize: 16, marginRight: 16 }}>{amount * duration}/-</Text>
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 12, backgroundColor: 'white', height:80,width:'100%',elevation:4,}}>
                    <View style={{ flexDirection: 'row',top:2,margin:8 }}>
                        <Text style={{ color: '#525252', marginLeft: 16, fontFamily: 'Oswald-Bold' }}>Cancellation Policy</Text>
                        <Image style={{ height: 15, width: 15, top: 7, marginLeft: 8 }} source={images.help} />
                        
                    </View>
                    <View style={{ flexDirection: 'row',top:2,margin:8 }}>
                        <Text style={{ color: '#525252', marginLeft: 16, fontFamily: 'Oswald-Bold' }}>Refund Policy</Text>
                        <Image style={{ height: 15, width: 15, top: 7, marginLeft: 39 }} source={images.help} />
                    </View>
                    
                </View>
               
               
               
                {/* <View style={{ marginTop: 12, backgroundColor: 'white', elevation: 4,height:32,width:'100%'  }}>
                    <View style={{ flexDirection: 'row',top:2 }}>
                        <Text style={{ color: '#525252', marginLeft: 16, fontFamily: 'Oswald-Bold' }}>Refund Policy</Text>
                        <Image style={{ height: 15, width: 15, top: 7, marginLeft: 39 }} source={images.help} />
                    </View>
                </View> */}


           
            <View style={{flexDirection:'row',flex:1}}>

                <View style={{width:'50%'}}>
                    <View style={{ height: 60, width: '100%',backgroundColor:'white',borderWidth:0.5,borderColor:'#C4C4C4',position:'absolute',bottom:0 }}>
                        <View style={{  }}>
                            <View style={{ marginTop: '1%' }}>
                                <Text style={{ alignSelf:'center', color: '#6F6F6F', fontFamily: 'Oswald-Bold', fontSize: 12 }}>Pay Using</Text>
                                <Text style={{  alignSelf:'center', color: '#6F6F6F', fontFamily: 'Oswald-Bold', fontSize: 24 }}>Wallet</Text>
                            </View>

                        </View>

                    </View>

                </View>
                <View style={{width:'50%',}}>
                    <View style={{ height: 60, width: '100%',backgroundColor:'rgba(183,54,248,255)',bottom:0,position:'absolute' }}>
                    <Modal
                            animationType="slide"
                            transparent={true}
                            hasBackdrop={true}
                            backdropOpacity={0.8}
                            isVisible={modalVisible}

                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>

                                    <Image source={images.confirmation} style={{ bottom: 20,alignSelf:'center' }} />
                                    <View style={{ bottom: 150 }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 24, color: '#6F6F6F', textAlign: 'center' }}>Ad scheduled</Text>
                                        <Text style={{ fontWeight: 'bold', fontSize: 32, color: '#76B33F', textAlign: 'center' }}>Successfully</Text>
                                    </View>
                                    {/* <Image source={images.error} style={{ bottom: 40 }} /> */}



                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => setModalVisible(!modalVisible)}
                                    >
                                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                            <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ height: 40, borderRadius: 8 }}>
                                                <Text style={styles.textStyle}>Back to Home Page</Text>
                                            </LinearGradient>
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
                                            <View  style={{ height: 30, borderRadius: 20 }} >
                                                <Text style={styles.textStyle}>Back to Home Page</Text>
                                            </View>
                                        </TouchableOpacity>

                                    </Pressable>

                                </View>
                            </View>
                        </Modal>

                        {uploadedFileType === 'image/jpeg' ? (
                            isloading ? (<View style={{opacity:1,backfaceVisibility:"hidden",}}><ActivityIndicator
                            //visibility of Overlay Loading Spinner
                            visible={isloading}
                            animating={isloading}
                            size='large'
                            color='#B937FA'
                            style={{ flex: 1, bottom: 300, right: 90, }}
                            textStyle={styles.spinnerTextStyle}
                        />
                        </View>
                            ) : 
                            (

                        
                            <View style={{ marginTop: '3%' ,flexDirection:'row',justifyContent:'space-between'}}>
                                {/* <Text style={{ marginLeft: 16, color: 'white', fontFamily: 'Oswald-Bold', fontSize: 12 }}>1 Smart BihhrthllBoard</Text> */}
                                <Text style={{ marginLeft: 16, color: 'white', fontFamily: 'Oswald-Bold', fontSize: 16,marginTop:'4%' }}>Rs {amount * duration} </Text>
                                <TouchableOpacity onPress={() => ImageUploader()}>
                                <Text style={{  color: 'white', fontFamily: 'Oswald-Bold', fontSize: 16, marginTop: '3.5%',marginRight:16 }}>Book</Text>
                                </TouchableOpacity>
                            </View> )
                        ):(
                            isloading ? (<View style={{}}><ActivityIndicator 
                                //visibility of Overlay Loading Spinner
                            visible={isloading}
                            size='large'
                            color='#B937FA'
                            style={{opacity: 1, bottom: 300, right: 90,backfaceVisibility:'hidden',shadowOpacity:5 }}
                            textStyle={styles.spinnerTextStyle}
                        />
                        </View>

                        ): 
                        <View style={{ marginTop: '3%' ,flexDirection:'row',justifyContent:'space-between'}}>
                        {/* <Text style={{ marginLeft: 16, color: 'white', fontFamily: 'Oswald-Bold', fontSize: 12 }}>1 Smart BihhrthllBoard</Text> */}
                        <Text style={{ marginLeft: 16, color: 'white', fontFamily: 'Oswald-Bold', fontSize: 16,marginTop:'5%' }}>Rs  {amount * duration} </Text>
                        <TouchableOpacity onPress={() => VideoUploader() }>
                        <Text style={{  color: 'white', fontFamily: 'Oswald-Bold', fontSize: 18, marginTop: 8,marginRight:16 }}>Book</Text>
                        </TouchableOpacity>
                    </View>
                        )
                            }


                       

                    </View>

                </View>
            </View>
        </View>
    )
}

export default GalleryPaymentScreen;

const styles = StyleSheet.create({
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        top: 9

    },

})