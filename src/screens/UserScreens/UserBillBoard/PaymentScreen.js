import React, { useEffect, useState, useRef } from "react";
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, ScrollView, Switch, StyleSheet, Pressable, ActivityIndicator, ToastAndroid } from 'react-native'
import images from "../../../constant/Images";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import Modal from 'react-native-modal'
import { useIsFocused } from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import { adminRequest } from "../AxiosInstance";






const PaymentScreen = ({ navigation, route }) => {

    const [uploadedFileType, setUploadedFileType] = useState(null);
    // console.log('?>>>>>>>>>>>>>>>>>>>>>>>>>>', uploadedFileType);
    const [modalVisible, setModalVisible] = useState(false);
    const [isloading, setIsLoading] = useState(false)
    const [modalVisible1, setModalVisible1] = useState(false)
    const [walletAmount, setWalletAmount] = useState(null)
    const [debitAmount, setDebitAmount] = useState(null)
    const [coupons, setCoupons] = useState([])
    // console.log('COUPONSS DATA', coupons);
    const [select, setSelect] = useState([])
    // console.log('seleceddddddd dataaaaa', select);
    const { billBoardName } = route.params
    const { scheduleDate } = route.params
    const { duration } = route.params
    const { address } = route.params
    const { basePrice } = route.params
    const { selectTime } = route.params
    const { amount } = route.params
    const { min } = route.params
    const { webLink } = route.params
    const { billBoardData } = route.params

    const { deviceId } = route.params
    const { billboardId } = route.params
    const { deviceMacId } = route.params
    // console.log('BILLBOARD ID IN PAYMENT', billboardId);
    const { Videofiletype } = route.params
    console.log('video type', Videofiletype);
    const { adTitle } = route.params
    const { aboutAd } = route.params
    const { timeslot } = route.params
    const { date } = route.params
    const { videoname } = route.params
    console.log('VIDEOOOO NAME', videoname);
    const { VideoOriginalName } = route.params
    console.log('VIDEOORIGINAL NAME', VideoOriginalName);
    const { videoUri } = route.params
    console.log('VIDEO URI ', videoUri);
    const [userDetail, setDetail] = useState(null)
    const [videoError, setVideoError] = useState('')
    const [imageError, setImageError] = useState('')


    const { imageFileType } = route.params
    // console.log('image type', imageFileType);
    const { imageUrl } = route.params
    // console.log('imaggeeeeeeee uURRLLLLLLL', imageUrl?.uri.slice(92, 105));
    const { imageuniquename } = route.params
    const { imagestring } = route.params

    const { item } = route.params
    // console.log('COUPONSSSS ITEMMMM', item);
    const isFocused = useIsFocused();
    const refRBSheet = useRef();
    const refRBSheet1 = useRef()
    const refRBSheet2 = useRef()


    React.useEffect(() => {
        getWalletamount()
    }, [isFocused]);


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
            let response = await resp.json()
            console.log('RESPONSE FROM VIDEO', response);
            PostAddVideoapi(response.contentLink)
        } catch (e) {
            console.log('ERROR FROM VIDEO UPLOAAD', e?.response?.data?.msg);
            console.error(e);
        }
    }

    const PostAddVideoapi = async (contentLink) => {
        // console.log('INSIDE POST API VIDEO');
        let body = {
            date: date,
            billboardId: [billboardId],
            deviceId: deviceId,
            videoname: videoname,
            deviceMacId: deviceMacId,
            filetype: Videofiletype,
            adTitle: adTitle,
            aboutAd: aboutAd,
            timeslot: timeslot,
            duration: duration,
            contentLink: contentLink

        }

        console.log('POST ADDD VIDEO>>>>>>>>>>>', body);
        try {
            console.log('hejlflknlhnlnl');
            let res = await adminRequest.post('/api/billBoardBooking/bookingBoard', body)
            console.log('POST ADD RESPONSE', res.data);
            setIsLoading(false);
            setModalVisible(!modalVisible)

        } catch (err) {
            // ToastAndroid.show("SOMETHING WENT WRONG! TRY AGAIN", ToastAndroid.LONG, ToastAndroid.CENTER);
            // setIsLoading(false);
            console.log('ERRROR FROM VIDEO UPLOADING', err?.response?.data?.msg);
            setVideoError(err?.response?.data?.msg)
            setIsLoading(false);
            setModalVisible1(!modalVisible1)

        }

    }

    //////////////////  WEB LINK /////////////////////

    const WebLinkVideo = async () => {
        // console.log('INSIDE POST API');
        let body = {
            date: date,
            billboardId: [billboardId],
            deviceId: deviceId,
            videoname: webLink,
            deviceMacId: deviceMacId,
            filetype: 'url',
            adTitle: adTitle,
            aboutAd: aboutAd,
            timeslot: timeslot,
            duration: duration,
            contentLink: webLink

        }

        console.log('POST ADDD VIDEO WEB LINK', body);
        try {
            console.log('hejlflknlhnlnl');
            let res = await adminRequest.post('/api/billBoardBooking/bookingBoard', body)
            console.log('POST ADD RESPONSE FROM WEB LINK', res.data);
            setIsLoading(false);
            setModalVisible(!modalVisible)

        } catch (err) {
            // ToastAndroid.show("SOMETHING WENT WRONG! TRY AGAIN", ToastAndroid.LONG, ToastAndroid.CENTER, err);
            console.log('ERROR FROM WEB LINK API', err?.response?.data?.msg);
            setIsLoading(false);
            setModalVisible1(!modalVisible1)

        }

    }





    /////////////////////////IMAGE ////////////////////

    const ImageUploader = () => {
        let body = {
            userid: userDetail?._id,
            imagename: imageUrl?.uri.slice(92, 105),
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
                console.log('IMAGE UPLOADER RESPONSE>>>>>>>>', res.data);
                PostAddapi(res.data.contentLink)

            } catch (error) {

                console.log('Error from Image Uploader', error);
            }
        }
        ImageUploaderapi()
    }

    const PostAddapi = async (contentLink) => {
        console.log('INSIDE POST API');
        let body = {
            date: date,
            billboardId: [billboardId],
            deviceId: deviceId,
            videoname: imageuniquename,
            deviceMacId: deviceMacId,
            filetype: imageFileType,
            adTitle: adTitle,
            aboutAd: aboutAd,
            timeslot: timeslot,
            duration: duration,
            contentLink: contentLink


        }
        console.log('POST ADDD BODYYYYYY IMAGEE ===>', body);
        try {
            let res = await adminRequest.post('/api/billBoardBooking/bookingBoard', body)
            console.log('POST ADD RESPONSE FROM IMAGE', res.data);
            setIsLoading(false);
            setModalVisible(!modalVisible)

        } catch (err) {
            // ToastAndroid.show("SOMETHING WENT WRONG! TRY AGAIN", ToastAndroid.LONG, ToastAndroid.CENTER, err);
            console.log('ERROR FROM IMAGE POST API', err?.response?.data?.msg);
            setImageError(err?.response?.data?.msg)
            setIsLoading(false);
            setModalVisible1(!modalVisible1)


        }

    }


    const getWalletamount = async () => {
        let body = {
            userId: userDetail?._id
        }
        console.log('BODY OF WALLET AMOUNT', body);
        try {
            const resp = await adminRequest.post('/api/payment/getWalletData', body)
            console.log('RESPONSE FROM WALLET AMOUNT APIIZ', resp.data.msg);
            setWalletAmount(resp?.data?.msg)

        } catch (error) {
            console.log('ERROR FROM WALLET AMOUNT', error?.response?.data?.msg);
        }
    }


    useEffect(() => {

        getWalletamount()



    }, [userDetail?._id])


    const DebitAmount = () => {
        let body = {
            walletId: walletAmount?._id,
            // debitedAmount: (amount * duration) * 18 / 100,
            debitedAmount: basePrice * 30 * min + basePrice * 30 * min * 18 / 100,
            transactionStatus: "successful",
            status: "withdraw from wallet"
        }
        console.log('BODY OF DEBITED AMOUNT', body);

        const getDebitAmount = async () => {
            const resp = await adminRequest.post('/api/payment/makeTransaction', body)
            console.log('RESPONSE FROM DEBITED APII', resp.data.msg);
            setDebitAmount(resp.data.msg)

        }
        getDebitAmount()


    }

    useEffect(() => {

    }, [])


    const Coupon = () => {
        let body = {
            userId: userDetail?._id,
            couponCode: item?.couponName,
            count: 10
        }
        console.log('RESPONSE FROM BODY OF USER COUPON', body);

        const requestCoupons = async () => {
            const resp = await adminRequest.post('/coupon/ChnageCouponStatusToUser', body)
            console.log('RESPONSE FROM COUPON USER APIIIIIII', resp.data.msg);
        }
        requestCoupons()
    }


    const getCoupons = () => {
        let body = {
            "type": "active",
            "limit": 10,
            "page": 1,
            "recent": true
        }
        console.log('RESPONSE FROM BODY', body)
        const requestCoupons = async () => {
            const resp = await adminRequest.post('/coupon/getAllCoupon', body)
            console.log('RESPONSE FROM COUPANS API', resp.data.msg);
            setCoupons(resp.data.msg)

        }
        requestCoupons()

    }

    useEffect(() => {
        getCoupons()

    }, [])

    const onSuccess = async () => {

        let body = {
            userId: userDetail?._id,
            couponCode: coupons[0]?.couponName,
            amount: amount
        }
        console.log('RESPONSE FROM BODY COUPON USER', body);
        try {
            const resp = await adminRequest.post('/coupon/applyCouponToUser', body)
            console.log('RESPONSE FROM COUPON USER API>>>>', resp.data.msg);

        } catch (error) {
            console.log('ERROR FROM COUPON USER API', error);

        }
    }




    const renderItem = ({ item }) => {
        return (

            <View>
                {item?.minSpend < basePrice * 30 * min + basePrice * 30 * min * 18 / 100 ?
                    <View>
                        <TouchableOpacity onPress={() => { multiSelect(item.minSpend) || refRBSheet?.current?.close() }}>
                            {select.includes(item.minSpend) ?
                                <View style={{ borderWidth: 5, borderColor: 'green' }}>
                                    <ImageBackground style={{ height: 220, width: '100%', margin: 10, alignSelf: 'center' }} source={images.coupons}>
                                        <View style={{ marginTop: 20 }}>
                                            <Text style={{ color: 'maroon', fontSize: 25, fontWeight: 'bold', marginLeft: 40 }}>Get {item.discount}% Off {'\n'}upto ₹ {item.couponAmount} </Text>
                                            <Text style={{ marginLeft: 40, marginTop: 10 }}>Minimum Spend {'\n'} ₹{item.minSpend}</Text>
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            <Text style={{ marginLeft: 40, color: 'grey', }}>Valid till  {item.endDate.slice(0, 10)}</Text>
                                        </View>
                                    </ImageBackground>
                                </View>
                                :
                                <View>
                                    <ImageBackground style={{ height: 220, width: '100%', margin: 10, alignSelf: 'center' }} source={images.coupons}>
                                        <View style={{ marginTop: 20 }}>
                                            <Text style={{ color: 'maroon', fontSize: 25, fontWeight: 'bold', marginLeft: 40 }}>Get {item.discount}% Off {'\n'}upto ₹ {item.couponAmount} </Text>
                                            <Text style={{ marginLeft: 40, marginTop: 10 }}>Minimum Spend {'\n'} ₹{item.minSpend}</Text>
                                        </View>
                                        <View style={{ marginTop: 10 }}>
                                            <Text style={{ marginLeft: 40, color: 'grey', }}>Valid till  {item.endDate.slice(0, 10)}</Text>
                                        </View>
                                    </ImageBackground>
                                </View>
                            }

                        </TouchableOpacity>
                    </View>
                    :
                    null
                }
            </View>
        )
    }


    function multiSelect(e) {
        let storeArr = [...select];
        let index = storeArr.findIndex((item) => (item === e))
        if (index === -1) {
            storeArr.push(e)
        } else {
            storeArr.splice(index, 1)
        }
        setSelect(storeArr)
    }




    return (
        <View style={{ backgroundColor: '#f7f8fd', flex: 1, }}>
            <View>
                <View style={{ height: 78, backgroundColor: 'rgba(183,54,248,255)' }}>
                    <TouchableOpacity onPress={() => navigation.goBack('')}>
                        <View style={{ marginTop: '8%' }}>
                            <Image source={images.back} style={{ marginLeft: 16, top: 5 }} />
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={{ alignSelf: 'center', bottom: 19, fontFamily: 'Oswald-Bold', color: 'white', fontSize: 18 }}>Payment</Text>
                    </View>

                </View>
            </View>

            <View style={{ backgroundColor: 'white', elevation: 4, }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ marginTop: 12 }}>
                        <Text style={{ color: 'black', marginLeft: 16, fontSize: 18, fontFamily: 'Oswald-Bold' }}>{billBoardName}</Text>
                        <Text style={{ color: 'black', marginLeft: 16, fontSize: 16, fontFamily: 'Oswald-SemiBold' }}>{address}</Text>
                        <View style={{ marginLeft: 12, marginTop: 8 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ margin: 5 }} source={images.calender} />
                                <Text style={{ color: 'black', margin: 5, marginLeft: 10, fontFamily: 'Oswald-Bold' }}>{scheduleDate?.toString().slice(0, 10)}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                <Image style={{ margin: 5 }} source={images.time} />
                                <Text style={{ color: 'black', margin: 5, marginLeft: 13, fontFamily: 'Oswald-Bold' }}>30 x {min}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                <Image style={{ margin: 5, right: 4 }} source={images.clock} />
                                {selectTime > 11 ?
                                    <Text style={{ color: 'black', margin: 5, fontFamily: 'Oswald-Bold' }}>{selectTime === 12 ? `${12} - ${1} PM` : `${selectTime - 12} - ${selectTime - 12 + 1} PM`}</Text>
                                    : (selectTime === null) ?
                                        <Text style={{ color: 'rgba(183,54,248,255)', margin: 5, fontFamily: 'Oswald-Bold' }}>Pending</Text>
                                        :
                                        <Text style={{ color: 'black', margin: 5, fontFamily: 'Oswald-Bold' }}>{selectTime === 11 ? `${selectTime} - ${selectTime + 1} PM` : `${selectTime} - ${selectTime + 1} AM`}</Text>

                                }
                            </View>

                        </View>
                    </View>
                    <View>
                        <Image source={{ uri: billBoardData?.filesArr[0]?.fileurl }} style={{ width: 138, height: 117, marginRight: 16, marginTop: 12, borderRadius: 8 }} />
                        {/* <View style={{ borderRadius: 10, width: 138, height: 24, backgroundColor: 'rgba(183,54,248,255)', marginTop: 12 }}>
                            <Text style={{ textAlign: 'center', top: 1, color: 'white', fontWeight: 'bold', fontFamily: 'Oswald', }}>Full Screen</Text>
                        </View> */}
                    </View>
                </View>
            </View>


            <View style={{ backgroundColor: 'white', elevation: 4, marginTop: 12, height: 300 }}>
                <View style={{ marginTop: 12 }}>
                    <Text style={{ color: 'black', fontSize: 18, fontFamily: 'Oswald-Bold', marginLeft: 16 }}>Order Summary</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                        <View style={{ marginLeft: 16 }}>
                            <Text style={{ color: '#5A5A5A', fontFamily: 'Oswald-SemiBold', margin: 5 }}>Time Slot ({selectTime > 11 ?
                                <Text style={{ color: 'black', margin: 5, fontFamily: 'Oswald-Bold' }}>{selectTime === 12 ? `${12} - ${1} PM` : `${selectTime - 12} - ${selectTime - 12 + 1} PM`}</Text>
                                : (selectTime === null) ?
                                    <Text style={{ color: 'rgba(183,54,248,255)', margin: 5, fontFamily: 'Oswald-Bold' }}>Pending</Text>
                                    :
                                    <Text style={{ color: 'black', margin: 5, fontFamily: 'Oswald-Bold' }}>{selectTime === 11 ? `${selectTime} - ${selectTime + 1} PM` : `${selectTime} - ${selectTime + 1} AM`}</Text>

                            })</Text>
                            {/* <Text style={{ color: '#5A5A5A', fontFamily: 'Oswald-SemiBold' }}>Screen wall (Full Screen)</Text> */}
                            <Text style={{ color: '#5A5A5A', fontFamily: 'Oswald-SemiBold', margin: 5 }}>Repetition (30 * {min} * {basePrice})</Text>
                            <Text style={{ color: '#5A5A5A', fontFamily: 'Oswald-SemiBold', margin: 5 }}>GST (18%)</Text>
                        </View>
                        <View style={{ marginRight: 16 }}>
                            <Text style={{ color: '#5A5A5A', fontFamily: 'Oswald-SemiBold', margin: 5 }}>{basePrice}/-</Text>
                            {/* <Text style={{ color: '#5A5A5A', fontFamily: 'Oswald-SemiBold' }}>1200/-</Text> */}
                            <Text style={{ color: '#5A5A5A', fontFamily: 'Oswald-SemiBold', margin: 5 }}>{basePrice * 30 * min}/-</Text>
                            <Text style={{ color: '#5A5A5A', fontFamily: 'Oswald-SemiBold', margin: 5 }}>{basePrice * 30 * min * 18 / 100}/-</Text>
                        </View>
                    </View>
                    <View style={{ borderWidth: 0.5, borderColor: '#e4e6ef', marginTop: 8, marginLeft: 16, marginRight: 16 }} />
                </View>
                <View style={{ marginTop: '2%', marginBottom: 50 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: '#5A5A5A', fontFamily: 'Oswald-SemiBold', fontSize: 16, marginLeft: 16 }}>Sub Total</Text>
                        <Text style={{ color: 'rgba(183,54,248,255)', fontFamily: 'Oswald-SemiBold', fontSize: 16, marginRight: 16 }}>{basePrice * 30 * min + basePrice * 30 * min * 18 / 100}/-</Text>
                    </View>
                    <View style={{ borderWidth: 0.5, borderColor: '#e4e6ef', marginTop: 8, marginLeft: 16, marginRight: 16 }} />

                    {select.length > 0 ?
                        <View>
                            <TouchableOpacity onPress={() => { refRBSheet?.current?.open() }} >
                                <View style={{ flexDirection: 'row', marginTop: 12, justifyContent: 'space-between' }}>

                                    <Text style={{ color: '#6F6F6F', fontSize: 14, fontFamily: 'Oswald-Bold', marginLeft: 10, }}>Coupon Discount (Change)</Text>
                                    <Text style={{ color: '#6F6F6F', fontSize: 14, fontFamily: 'Oswald-Bold', marginRight: 16 }}>-₹{select}</Text>
                                    <RBSheet
                                        ref={refRBSheet}
                                        // closeOnDragDown={true}
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
                                        <View style={styles.main}>
                                            <View style={styles.container}>
                                                <Text style={styles.txt}>Apply Coupon</Text>
                                                {/* <TouchableOpacity onPress={() => { refRBSheet?.current?.close() }}>
                                                    <View style={{ borderWidth: 1, height: 30, width: 60, borderRadius: 8, backgroundColor: 'green', borderColor: 'green' }}>
                                                        <Text style={{ fontSize: 16, color: 'white', textAlign: 'center', fontFamily: 'Oswald-Bold' }}>Apply</Text>
                                                    </View>
                                                </TouchableOpacity> */}
                                            </View>
                                            <View style={{ borderWidth: 1, borderColor: '#DDDDDD', marginTop: 12, marginLeft: 16, marginRight: 16 }} />
                                            <View>

                                                <FlatList
                                                    data={coupons}
                                                    renderItem={renderItem}
                                                    ListFooterComponent={<View style={{ marginBottom: 150 }} />}
                                                />


                                            </View>

                                        </View>


                                    </RBSheet>
                                </View>
                            </TouchableOpacity>
                        </View>

                        :

                        <View>
                            <TouchableOpacity onPress={() => { refRBSheet?.current?.open() }} >
                                <View style={{ flexDirection: 'row', marginTop: 12 }}>
                                    <Image style={{ marginLeft: 16, top: 3 }} source={images.coupan} />
                                    <Text style={{ color: '#6F6F6F', fontSize: 14, fontFamily: 'Oswald-Bold', marginLeft: 10, }}>Use Coupons</Text>
                                    <RBSheet
                                        ref={refRBSheet}
                                        // closeOnDragDown={true}
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
                                        <View style={styles.main}>
                                            <View style={styles.container}>
                                                <Text style={styles.txt}>Apply Coupon</Text>
                                                {/* <TouchableOpacity onPress={() => { onSuccess() || refRBSheet?.current?.close() }}>
                                                    <View style={{ borderWidth: 1, height: 30, width: 60, borderRadius: 8, backgroundColor: 'green', borderColor: 'green' }}>
                                                        <Text style={{ fontSize: 16, color: 'white', textAlign: 'center', fontFamily: 'Oswald-Bold' }}>Apply</Text>
                                                    </View>
                                                </TouchableOpacity> */}
                                            </View>
                                            <View style={{ borderWidth: 1, borderColor: '#DDDDDD', marginTop: 12, marginLeft: 16, marginRight: 16 }} />
                                            <View>
                                                <FlatList
                                                    data={coupons}
                                                    renderItem={renderItem}
                                                    ListFooterComponent={<View style={{ marginBottom: 150 }} />}

                                                />


                                            </View>

                                        </View>


                                    </RBSheet>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }


                    <View style={{ borderWidth: 0.5, borderColor: '#e4e6ef', marginTop: 8, marginLeft: 16, marginRight: 16 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 }}>
                        <Text style={{ color: '#5A5A5A', fontFamily: 'Oswald-SemiBold', fontSize: 16, marginLeft: 20 }}>Total</Text>
                        {select.length > 0 ?
                            <Text style={{ color: 'rgba(183,54,248,255)', fontFamily: 'Oswald-SemiBold', fontSize: 16, marginRight: 16 }}>{basePrice * 30 * min + basePrice * 30 * min * 18 / 100 - select}/-</Text>
                            :
                            <Text style={{ color: 'rgba(183,54,248,255)', fontFamily: 'Oswald-SemiBold', fontSize: 16, marginRight: 16 }}>{basePrice * 30 * min + basePrice * 30 * min * 18 / 100}/-</Text>
                        }
                    </View>
                </View>
            </View>


            <View style={{ marginTop: 12, backgroundColor: 'white', height: 50, width: '100%', elevation: 4, }}>
                <View style={{ flexDirection: 'row', top: 2, margin: 8 }}>
                    <TouchableOpacity onPress={() => refRBSheet1?.current?.open()}>
                        <Text style={{ color: '#525252', marginLeft: 16, fontFamily: 'Oswald-Bold' }}>Cancellation Policy</Text>
                        <RBSheet
                            ref={refRBSheet1}
                            closeOnDragDown={true}
                            height={710}
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
                            <View style={{ marginLeft: 16, marginRight: 16 }}>
                                <Text style={styles.title}>Cancellation Policy</Text>
                                <View style={{ borderWidth: 0.5, marginTop: 15, borderColor: '#B5B5C3' }} />

                                <View style={{ marginBottom: 40, marginTop: 15 }}>
                                    <Text style={styles.content}>SAPS.ai has adopted a client friendly and flexible cancellation policy.
                                        The cancellation can only be done up to 6 hours before the streaming of an ad.
                                        If you cancel the streaming of your content/ ad. up to 6 hours before the show, 15% of base ad price will be deducted as cancellation fee and the remaining will be refunded to you.


                                    </Text>
                                    <Text style={styles.content1}>You are allowed to cancel up to 2 content/ad transactions in 30 days.
                                        You cannot cancel an ad. if you have applied any discount offers, vouchers or any other loyalty points.

                                    </Text>
                                    <Text style={styles.content2}>On cancellation of the ad, the Internet handling charges and payment gateway charges will not be refunded.

                                        If you opt for the refund on any other payment source – Credit card/ Debit card or Net banking, the amount will take up to 10-15 days to get credited into your account.

                                        We reserve the right to modify/ add/ alter/ revise/ discontinue or otherwise carry out any necessary changes to these terms and conditions and/ or the cancellation feature (either wholly or in part).

                                        These terms and conditions are in addition to the terms and conditions and the privacy policy available here ____

                                        To avail cancellation, you should be logged in to your SAPS.ai account.</Text>
                                </View>
                            </View>
                        </RBSheet>

                    </TouchableOpacity>
                    <Image style={{ height: 15, width: 15, top: 7, marginLeft: 8 }} source={images.help} />

                </View>


            </View>



            {/* <View style={{ marginTop: 12, backgroundColor: 'white', elevation: 4,height:32,width:'100%'  }}>
                    <View style={{ flexDirection: 'row',top:2 }}>
                        <Text style={{ color: '#525252', marginLeft: 16, fontFamily: 'Oswald-Bold' }}>Refund Policy</Text>
                        <Image style={{ height: 15, width: 15, top: 7, marginLeft: 39 }} source={images.help} />
                    </View>
                </View> */}



            <View style={{ flexDirection: 'row', flex: 1 }}>

                <View style={{ width: '50%' }}>
                    <View style={{ height: 60, width: '100%', backgroundColor: 'white', borderWidth: 0.5, borderColor: '#C4C4C4', position: 'absolute', bottom: 0 }}>
                        <View style={{}}>
                            <View style={{ marginTop: '1%' }}>
                                <Text style={{ alignSelf: 'center', color: '#6F6F6F', fontFamily: 'Oswald-Bold', fontSize: 12 }}>Pay Using</Text>
                                <Text style={{ alignSelf: 'center', color: '#6F6F6F', fontFamily: 'Oswald-Bold', fontSize: 24 }}>Wallet</Text>
                            </View>
                        </View>
                    </View>

                </View>
                <View style={{ width: '50%', }}>
                    <View style={{ height: 60, width: '100%', backgroundColor: 'rgba(183,54,248,255)', bottom: 0, position: 'absolute' }}>
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
                                        <Text style={{ fontWeight: 'bold', fontSize: 24, color: 'white', textAlign: 'center' }}>Ad scheduled</Text>
                                        <Text style={{ fontWeight: 'bold', fontSize: 32, color: '#76B33F', textAlign: 'center' }}>Successfully</Text>
                                    </View>
                                    {/* <Image source={images.error} style={{ bottom: 40 }} /> */}

                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => setModalVisible(!modalVisible)}
                                    >
                                        <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
                                            <View style={{ height: 40, borderRadius: 8, backgroundColor: 'rgba(183,54,248,255)' }}>
                                                <Text style={styles.textStyle}>Go to Orders Page</Text>
                                            </View>
                                        </TouchableOpacity>

                                    </Pressable>

                                </View>
                            </View>
                        </Modal>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            hasBackdrop={true}
                            backdropOpacity={0.8}
                            isVisible={modalVisible1}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>

                                    <Lottie source={require('../../../assets/data-7.json')} autoPlay loop style={{ bottom: 20, alignSelf: 'center', height: 140, width: 140 }} />
                                    <View style={{ bottom: 30 }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 24, color: 'white', textAlign: 'center' }}>Something went</Text>
                                        <Text style={{ fontWeight: 'bold', fontSize: 32, color: '#76B33F', textAlign: 'center' }}>Wrong</Text>
                                        {imageFileType === 'image/jpeg' ?
                                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', textAlign: 'center' }}>error :- {imageError}</Text>
                                            :
                                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', textAlign: 'center' }}>error :- {videoError}</Text>
                                        }
                                    </View>
                                    {/* <Image source={images.error} style={{ bottom: 40 }} /> */}

                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => setModalVisible1(!modalVisible1)}
                                    >
                                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                            <View style={{ height: 40, borderRadius: 8, backgroundColor: 'maroon' }}>
                                                <Text style={styles.textStyle}>Back to Home Page</Text>
                                            </View>
                                        </TouchableOpacity>

                                    </Pressable>

                                </View>
                            </View>
                        </Modal>

                        {imageFileType === null && Videofiletype === null ?
                            <View>
                                <View style={{ opacity: 0.5, }}>
                                    <ActivityIndicator

                                        visible={isloading}
                                        animating={isloading}
                                        size='large'
                                        color='#B937FA'
                                        style={{ flex: 1, bottom: 300, right: 90, }}
                                        textStyle={styles.spinnerTextStyle}
                                    />
                                </View>

                                <View style={{ marginTop: '3%', flexDirection: 'row', justifyContent: 'space-between' }}>

                                    {walletAmount?.walletBalance > basePrice * 30 * min - basePrice * 30 * min * 18 / 100 ?
                                        <Text style={{ marginLeft: 16, color: 'white', fontFamily: 'Oswald-Bold', fontSize: 16, marginTop: '5%' }}>Rs  {walletAmount?.walletBalance} </Text>
                                        :
                                        <TouchableOpacity onPress={() => navigation.navigate('Deposit', { walletId: walletAmount?._id })}>
                                            <Text style={{ marginLeft: 16, color: 'white', fontFamily: 'Oswald-Bold', fontSize: 16, marginTop: '5%' }}>Add Money To Wallet </Text>
                                        </TouchableOpacity>
                                    }

                                    {walletAmount?.walletBalance > basePrice * 30 * min - basePrice * 30 * min * 18 / 100 ?

                                        <TouchableOpacity onPress={() => DebitAmount() || Coupon() || WebLinkVideo()}>
                                            <Text style={{ color: 'white', fontFamily: 'Oswald-Bold', fontSize: 18, marginTop: 8, marginRight: 16 }}>Book</Text>
                                        </TouchableOpacity>
                                        :
                                        null
                                    }
                                </View>
                            </View>

                            :

                            <View>


                                {imageFileType === 'image/jpeg' ?
                                    (isloading ? (<View style={{ opacity: 0.5, }}>
                                        <ActivityIndicator
                                            //visibility of Overlay Loading Spinner
                                            visible={isloading}
                                            animating={isloading}
                                            size='large'
                                            color='#B937FA'
                                            style={{ flex: 1, bottom: 300, right: 90, }}
                                            textStyle={styles.spinnerTextStyle}
                                        />
                                    </View>)
                                        :
                                        (<View style={{ marginTop: '3%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            {/* <Text style={{ marginLeft: 16, color: 'white', fontFamily: 'Oswald-Bold', fontSize: 12 }}>1 Smart BihhrthllBoard</Text> */}
                                            {walletAmount?.walletBalance > basePrice * 30 * min - basePrice * 30 * min * 18 / 100 ?
                                                <Text style={{ marginLeft: 16, color: 'white', fontFamily: 'Oswald-Bold', fontSize: 16, marginTop: '5%' }}>Rs  {walletAmount?.walletBalance} </Text>
                                                :
                                                <TouchableOpacity onPress={() => navigation.navigate('Deposit', { walletId: walletAmount?._id })}>
                                                    <Text style={{ marginLeft: 16, color: 'white', fontFamily: 'Oswald-Bold', fontSize: 16, marginTop: '5%' }}>Add Money To Wallet </Text>
                                                </TouchableOpacity>
                                            }

                                            {walletAmount?.walletBalance > basePrice * 30 * min - basePrice * 30 * min * 18 / 100 ?

                                                <TouchableOpacity onPress={() => DebitAmount() || Coupon() || ImageUploader()}>
                                                    <Text style={{ color: 'white', fontFamily: 'Oswald-Bold', fontSize: 18, marginTop: 8, marginRight: 16 }}>Book</Text>
                                                </TouchableOpacity>
                                                :
                                                null
                                            }
                                        </View>)
                                    )

                                    :

                                    (isloading ? (<View style={{ opacity: 0.5 }}>
                                        <ActivityIndicator
                                            //visibility of Overlay Loading Spinner
                                            visible={isloading}
                                            size='large'
                                            color='#B937FA'
                                            style={{ opacity: 1, bottom: 300, right: 90, shadowOpacity: 5 }}
                                            textStyle={styles.spinnerTextStyle}
                                        />
                                    </View>)

                                        :

                                        <View style={{ marginTop: '3%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                            {/* <Text style={{ marginLeft: 16, color: 'white', fontFamily: 'Oswald-Bold', fontSize: 12 }}>1 Smart BihhrthllBoard</Text> */}
                                            {walletAmount?.walletBalance > basePrice * 30 * min - basePrice * 30 * min * 18 / 100 ?
                                                <Text style={{ marginLeft: 16, color: 'white', fontFamily: 'Oswald-Bold', fontSize: 16, marginTop: '5%' }}>Rs  {walletAmount?.walletBalance} </Text>
                                                :
                                                <TouchableOpacity onPress={() => navigation.navigate('Deposit', { walletId: walletAmount?._id, balance: walletAmount?.walletBalance })}>
                                                    <Text style={{ marginLeft: 16, color: 'white', fontFamily: 'Oswald-Bold', fontSize: 16, marginTop: '5%' }}>Add Money To Wallet </Text>
                                                </TouchableOpacity>
                                            }

                                            {walletAmount?.walletBalance > basePrice * 30 * min - basePrice * 30 * min * 18 / 100 ?

                                                <TouchableOpacity onPress={() => DebitAmount() || Coupon() || VideoUploader()}>
                                                    <Text style={{ color: 'white', fontFamily: 'Oswald-Bold', fontSize: 18, marginTop: 8, marginRight: 16 }}>Book</Text>
                                                </TouchableOpacity>
                                                :
                                                null
                                            }
                                        </View>
                                    )
                                }

                            </View>
                        }

                    </View>
                </View>



            </View>




        </View>
    )
}

export default PaymentScreen;

const styles = StyleSheet.create({
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        top: 9

    },
    main: {
        flex: 1
    },
    container: {
        marginTop: 12,
    },
    txt: {
        color: 'black',
        fontFamily: 'Oswald-Bold',
        fontSize: 16,
        textAlign: 'center'

    },
    cimage: {
        width: '100%',
        height: 210,

        alignSelf: 'center',
        borderRadius: 8
    },
    conatainer1: {
        marginTop: 16,

    },
    headertxt: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'Oswald-Bold',
        // left: 5,
        bottom: 5,
        left: 23,



    },
    title: {
        fontFamily: 'Oswald-Bold',
        color: '#525252',
        fontSize: 18,
        marginLeft: 20,
        marginTop: 5,
        textAlign: 'center'

    },
    content: {
        fontFamily: 'Oswald-SemiBold',
        color: '#525252',
        fontSize: 14,
        paddingHorizontal: 10,
        alignSelf: 'center',


    },
    content1: {
        fontFamily: 'Oswald-SemiBold',
        color: '#525252',
        fontSize: 14,
        paddingHorizontal: 10,
        alignSelf: 'center',
        marginTop: 15

    },
    content2: {
        fontFamily: 'Oswald-SemiBold',
        color: '#525252',
        fontSize: 14,
        paddingHorizontal: 10,
        alignSelf: 'center',
        marginTop: 15

    },

})
