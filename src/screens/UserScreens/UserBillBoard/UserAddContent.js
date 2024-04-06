import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, ScrollView, Switch, StyleSheet, Pressable, ActivityIndicator, Alert, ToastAndroid, TextInput } from 'react-native'
import images from "../../../constant/Images";
import * as ImagePicker from 'react-native-image-picker'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from "moment";
import Video from "react-native-video";
import AsyncStorage from '@react-native-async-storage/async-storage';



const UserContentScreen = ({ navigation, route }) => {
    const [image, setImage] = useState(null);
    // console.log('IMAAAAAAAAAGGEEEEEEEEEEEEEEEEEEEE', image);
    const [imagepath, setImagePath] = useState()
    const [video, setVideo] = useState(null)
    const [uploadedFileType, setUploadedFileType] = useState(null);
    // console.log('hvnoisnvpnsnbsbnsbnbsisnbvnbvpfsn bfnbk ndf;bn;fnbpnbpfnbp;', uploadedFileType);
    const [imageString, setImageString] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);
    const [isloading, setIsLoading] = useState(false)
    const [modalVisible1, setModalVisible1] = useState(false)
    const [imageType, setImageFileType] = useState(null)
    // console.log('imageeeeeeeee>>>>>>> file type', imageType);
    const [videofileType, setVideoFileType] = useState(null)
    const [videofileUniqueName, setVideoFileUniqueName] = useState(null)
    const [imageuniquename, setImageUniqueName] = useState(null)
    // console.log('UNIQUEEEEEEEEEEE >>>>>>>', imageuniquename);
    const { billBoardName } = route.params
    const { scheduleDate } = route.params
    const { duration } = route.params
    const { address } = route.params
    const { basePrice } = route.params
    const { selectTime } = route.params
    const { amount } = route.params
    const { billData } = route.params
    // console.log('DATA', billData?.deviceId?.macId);
    const { name } = route.params
    const { about } = route.params
    const [userDetail, setDetail] = useState(null)
    const [originalFileName, setOriginalFileName] = useState(null)
    // console.log('file name original', originalFileName);
    const [webLink, setWebLink] = useState('')

    const { min } = route.params
    const { billBoardData } = route.params




    let startscheduleDate = moment(scheduleDate?.toString()).format().slice(0, 10)
    // console.log('dateee', startscheduleDate);



    function openGallery() {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            mediaType: 'video/image',
            title: 'Video Picker',
            videoQuality: 'medium',
            durationLimit: 30,
            thumbnail: true,
            includeBase64: true

        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                console.log("=====> ", response.assets[0].type)
                setUploadedFileType(response.assets[0].type)

                const source = { uri: response.assets[0].uri };
                setImagePath(response.assets[0].uri)
                setVideo(response.assets[0].uri)

                console.log('IMAGE/VIDEO PATH', source);
                setImageString(response.assets[0].base64)
                setImage(source);
            }
        });
    };
    let Milliseconds =
        String(new Date().getFullYear()) +
        String(new Date().getMonth()) +
        String(new Date().getDate()) +
        String(new Date().getHours()) +
        String(new Date().getMinutes()) +
        String(new Date().getMilliseconds());

    useEffect(() => {
        if (image?.uri.slice(-4) === '.jpg') {
            setImageFileType("image/jpeg")
            // setUniqueName(image?.uri.slice(92, 104).concat(Milliseconds))
            setImageUniqueName(image?.uri.slice(-12).replace(/\.[^/.]+$/, "").replace(/[&\/\\_#,@+()$~%'":-?<>{}\s+]/g, "").concat(Milliseconds))

        }
        if (video?.slice(63, 77)) {
            setVideoFileType("video/mp4")
            setVideoFileUniqueName(video?.slice(-12).replace(/[&\/\\_#,@+()$~%'":-?<>{}\s+]/g, "").replace(/\.[^/.]+$/, "").concat(Milliseconds))
            setOriginalFileName(video?.slice(-12).replace(/\.[^/.]+$/, ""))

        }
    }, [image])

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

    const handleNext = () => {
        // if (imageType === null && videofileType === null) {
        //     ToastAndroid.show("CHOOSE MEDIA", ToastAndroid.LONG, ToastAndroid.CENTER);


        // } else {
        navigation.navigate('PaymentScreen', {
            basePrice: basePrice,
            selectTime: selectTime,
            amount: amount,
            duration: duration,
            scheduleDate: scheduleDate,
            billBoardName: billBoardName,
            address: address,
            deviceId: [billData?.deviceId?._id],
            billboardId: billData?._id,
            deviceMacId: [billData?.deviceId?.macId],
            Videofiletype: videofileType,
            adTitle: name,
            aboutAd: about,
            timeslot: selectTime,
            date: startscheduleDate,
            videoname: videofileUniqueName,
            VideoOriginalName: originalFileName,
            videoUri: video,
            imageUrl: image,
            imageFileType: imageType,
            imageName: imageuniquename,
            imagestring: imageString,
            min: min,
            webLink: webLink,
            billBoardData: billBoardData,
            imageuniquename: imageuniquename

        })

    }
    const UnselectImage = () => {
        setImage(null)
    }

    return (
        <View style={{ backgroundColor: '#f7f8fd', flex: 1 }}>

            <View>
                <View style={{ height: 78, backgroundColor: 'rgba(183,54,248,255)' }}>
                    <TouchableOpacity onPress={() => navigation.goBack('TimeSlot')}>
                        <View style={{ marginTop: '8%' }}>
                            <Image source={images.back} style={{ marginLeft: 16, top: 5 }} />
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={{ alignSelf: 'center', bottom: 19, fontFamily: 'Oswald-Bold', color: 'white', fontSize: 18 }}>Add Content</Text>
                    </View>

                </View>
            </View>
            <ScrollView>

                <View style={{ backgroundColor: 'white', elevation: 4, borderWidth: 1, borderColor: '#e4e6ef' }}>
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



                {uploadedFileType === 'image/jpeg' ?

                    <ImageBackground
                        source={image}
                        style={styles.ProfileImage}>
                        <TouchableOpacity onPress={() => UnselectImage()}>

                            {image === null ?

                                <View style={{ bottom: 50 }}>
                                    <View style={{}}>
                                        {/* <Text style={{ color: 'black', fontFamily: 'Oswald-Bold', fontSize: 16, marginLeft: 16 }}>Content</Text> */}

                                        <View>
                                            <TouchableOpacity onPress={() => openGallery()}>
                                                <ImageBackground source={images.gall} style={{ alignSelf: 'center', width: '100%', height: 200 }}>
                                                    <Text style={{ color: 'rgba(183,54,248,255)', top: 150, fontFamily: 'Oswald-Bold', fontSize: 18, alignSelf: 'center' }}>Format Supported: mp4/jpeg</Text>
                                                </ImageBackground>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                    <View style={{ flexDirection: 'row', marginLeft: 16, marginTop: 10, alignSelf: 'center' }}>
                                        <Text style={{ color: 'black', fontFamily: 'Oswald-Bold', fontSize: 14, top: 5 }}>Link From Web</Text>
                                        <View style={{ marginLeft: 8 }}>
                                            <TextInput
                                                value={webLink}
                                                onChangeText={setWebLink}
                                                style={{ width: 280, height: 35, borderWidth: 1, borderColor: '#DDDDDD', paddingLeft: 10, color: 'black', borderRadius: 8 }}
                                            />
                                        </View>
                                    </View>


                                </View>
                                :
                                <Image source={images.cross} style={{ tintColor: 'white', height: 30, width: 30, alignSelf: 'flex-end', right: 16, top: 10 }} />
                            }
                        </TouchableOpacity>


                    </ImageBackground>



                    // <Image style={styles.ProfileImage} source={image} />
                    :
                    uploadedFileType === 'video/mp4' ?


                        <Video style={styles.ProfileImage} source={image} />
                        :


                        <View style={{ backgroundColor: 'white', elevation: 4, marginTop: 12, height: 330 }}>
                            <View style={{}}>
                                <Text style={{ color: 'black', fontFamily: 'Oswald-Bold', fontSize: 16, marginLeft: 16 }}>Content</Text>
                                {/* 
                                <View>
                                    <TouchableOpacity onPress={() => openGallery()}>
                                        <Image style={{ alignSelf: 'center', marginTop: 12, width: '100%' }} source={require('../../../assets/gall.png')} />
                                    </TouchableOpacity>
                                </View> */}
                                <View>
                                    <TouchableOpacity onPress={() => openGallery()}>
                                        <ImageBackground source={images.gall} style={{ alignSelf: 'center', marginTop: 12, width: '100%', height: 200 }}>
                                            <Text style={{ color: 'rgba(183,54,248,255)', top: 150, fontFamily: 'Oswald-Bold', fontSize: 18, alignSelf: 'center' }}>Format Supported: mp4/jpeg</Text>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                </View>

                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 30, marginLeft: 16 }}>
                                <Text style={{ color: 'black', fontFamily: 'Oswald-Bold', fontSize: 14, top: 5 }}>Link From Web</Text>
                                <View style={{ marginLeft: 8 }}>
                                    <TextInput
                                        value={webLink}
                                        onChangeText={setWebLink}
                                        style={{ width: 280, height: 35, borderWidth: 1, borderColor: '#DDDDDD', paddingLeft: 10, color: 'black', borderRadius: 8 }}
                                    />
                                </View>
                            </View>


                        </View>

                }
                <View style={{ backgroundColor: 'white', elevation: 4, marginTop: 12, marginBottom: 50 }}>
                    <View>
                        <Text style={{ color: 'black', fontSize: 18, fontFamily: 'Oswald-Bold', marginLeft: 16, marginTop: 12 }}>Order Summary</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                            <View style={{ marginLeft: 16 }}>
                                <Text style={{ color: '#5A5A5A', fontFamily: 'Oswald-SemiBold', margin: 5 }}>Screen(1)</Text>
                                {/* <Text style={{ color: '#5A5A5A', fontFamily: 'Oswald-SemiBold' }}>Screen wall (Full Screen)</Text> */}
                                <Text style={{ color: '#5A5A5A', fontFamily: 'Oswald-SemiBold', margin: 5 }}>Repetition 30 * {min} * {basePrice} </Text>
                                {/* <Text style={{ color: '#5A5A5A', fontFamily: 'Oswald-SemiBold', margin: 5 }}>Duration ({duration} sec)</Text> */}
                            </View>
                            <View style={{ marginRight: 16 }}>
                                <Text style={{ color: '#5A5A5A', fontFamily: 'Oswald-SemiBold', margin: 5, }}>{basePrice}/-</Text>
                                {/* <Text style={{ color: '#5A5A5A', fontFamily: 'Oswald-SemiBold' }}>{}/-</Text> */}
                                <Text style={{ color: '#5A5A5A', fontFamily: 'Oswald-SemiBold', margin: 5 }}>{basePrice * 30 * min}/-</Text>
                                {/* <Text style={{ color: '#5A5A5A', fontFamily: 'Oswald-SemiBold', margin: 5 }}>{amount * 3}/-</Text> */}
                            </View>
                        </View>
                        <View style={{ borderWidth: 0.5, borderColor: '#e4e6ef', marginTop: 8, marginLeft: 16, marginRight: 16 }} />
                    </View>
                    <View style={{ marginTop: '2%', marginBottom: 50 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#5A5A5A', fontFamily: 'Oswald-Bold', fontSize: 18, marginLeft: 16 }}>Total Amount</Text>
                            <Text style={{ color: '#5A5A5A', fontFamily: 'Oswald-Bold', fontSize: 18, marginRight: 16 }}>{basePrice * 30 * min}/-</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>

            <View style={{ flex: 1 }}>
                <View style={{ height: 64, width: '100%', backgroundColor: 'rgba(183,54,248,255)', position: 'absolute', bottom: 0 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <View style={{ marginTop: '1%' }}>
                            <Text style={{ marginLeft: 16, color: 'white', fontFamily: 'Oswald-Bold', fontSize: 14 }}>1 Smart BillBoard</Text>
                            <Text style={{ marginLeft: 16, color: 'white', fontFamily: 'Oswald-Bold', fontSize: 16 }}>{basePrice * 30 * min}</Text>
                        </View>
                        <TouchableOpacity onPress={() => handleNext()}>
                            <Text style={{ marginRight: 24, color: 'white', fontFamily: 'Oswald-Bold', fontSize: 18, top: 10 }}>Next</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        </View>
    )
}

export default UserContentScreen;

const styles = StyleSheet.create({
    ProfileImage: {
        height: 200,
        width: wp(90),
        // borderRadius: 90,
        //  paddingRight:100,
        left: 20,
        marginTop: 60
    },

})