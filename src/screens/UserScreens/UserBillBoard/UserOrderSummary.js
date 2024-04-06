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



const UserOrderSummary = ({ navigation, route }) => {
    const [image, setImage] = useState(null);
    const [imagepath, setImagePath] = useState()
    const [video, setVideo] = useState(null)
    const [uploadedFileType, setUploadedFileType] = useState('image/jpeg');
    console.log('upload file type', uploadedFileType);
    const [imageString, setImageString] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);
    const [isloading, setIsLoading] = useState(false)
    const [modalVisible1, setModalVisible1] = useState(false)
    const { scheduleDate } = route.params
    console.log('date', scheduleDate);
    const { duration } = route.params
    const { selectTime } = route.params
    const { basePrice } = route.params
    const { amount } = route.params
    const { billBoardName } = route.params
    const { address } = route.params
    const { deviceId } = route.params
    const { billboardId } = route.params
    const { deviceMacId } = route.params
    const { Videofiletype } = route.params
    const { adTitle } = route.params
    const { aboutAd } = route.params
    const { timeslot } = route.params
    const { date } = route.params
    const { videoname } = route.params
    const { VideoOriginalName } = route.params
    const { videoUri } = route.params
    console.log('video', videoUri);
    const { imageUrl } = route.params
    const { imageFileType } = route.params
    const { imageName } = route.params
    const { imagestring } = route.params
    const { length } = route.params




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

                const source = { uri: response.assets[0].uri };
                setImagePath(response.assets[0].uri)
                setVideo(response.assets[0].uri)

                console.log('IMAGE/VIDEO PATH', source);
                setImageString(response.assets[0].base64)



                setImage(source);
            }
        });
    };


    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <View>
                <View style={{ height: 60, backgroundColor: 'rgba(183,54,248,255)' }}>
                    <TouchableOpacity onPress={() => navigation.goBack('AddBillboards')}>
                        <View style={{ marginTop: '8%' }}>
                            <Image source={images.back} style={{ marginLeft: 8, }} />
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={{ alignSelf: 'center', bottom: 19, fontFamily: 'Oswald-Bold', color: 'white' }}>Order Summary</Text>
                    </View>

                </View>
            </View>

            <View style={{ backgroundColor: 'white', elevation: 4, }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ color: 'black', marginLeft: 16, fontSize: 16, fontFamily: 'Oswald-Bold' }}>{billBoardName}</Text>
                        <Text style={{ color: 'black', marginLeft: 16, fontSize: 16, fontFamily: 'Oswald-Bold' }}>{address}</Text>
                        <View style={{ marginLeft: 16, marginTop: 5 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ margin: 5 }} source={images.calender} />
                                <Text style={{ color: 'black', margin: 5, marginLeft: 10, fontFamily: 'Oswald-Bold' }}>{scheduleDate?.toString().slice(0, 10)}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ margin: 5 }} source={images.time} />
                                <Text style={{ color: 'black', margin: 5, marginLeft: 13, fontFamily: 'Oswald-Bold' }}>{duration} sec</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
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
                        <View>
                            <Text style={{ color: '#B937FA', marginLeft: 16, fontFamily: 'Oswald-Bold' }}> {length} Smart Billboards more</Text>
                        </View>
                    </View>


                    <View>
                        <Image source={images.baner} style={{ width: 138, height: 117, marginRight: 16, marginTop: 8, borderRadius: 8 }} />
                        <View style={{ borderRadius: 10, width: 138, height: 24, backgroundColor: 'rgba(183,54,248,255)' }}>
                            <Text style={{ textAlign: 'center', top: 1, color: 'white', fontWeight: 'bold', fontFamily: 'Oswald', }}>Full Screen</Text>
                        </View>
                    </View>
                </View>
            </View>
            <ScrollView>

                <View style={{ backgroundColor: 'white', elevation: 4, marginTop: '3%', height: 250 }}>
                    <View>
                        <Text style={{ color: 'black', fontFamily: 'Oswald-Bold', fontSize: 16, marginLeft: 16 }}>Content</Text>
                        <View style={{ alignSelf: 'center',top:12 }}>
                            {uploadedFileType === 'image/jpeg' ?
                                <Image style={styles.ProfileImage} source={imageUrl} />
                                :
                                <Video style={styles.ProfileImage} source={videoUri} />
                            }

                        </View>


                    </View>

                </View>
                <View style={{ backgroundColor: 'white', elevation: 4, marginTop: '3%' }}>
                    <View>
                        <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Oswald-Bold', marginLeft: 16 }}>Insight Services</Text>
                        <View style={{ backgroundColor: '#F7F8FD', height: 80, left: 10, width: '45%', elevation: 4, borderRadius: 10, marginTop: 20 }}>
                            <Text style={{ top: 10, left: 10, fontWeight: 'bold', color: '#222222' }}>Basic</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={images.eye} style={{ left: 10, top: 20, }} />
                                <Text style={{ left: 15, top: 20, fontWeight: 'bold', fontFamily: 'Oswald', color: '#222222' }}>Number of Views</Text>
                                <Image source={images.help} style={{ left: 16, top: 24, }} />
                            </View>
                        </View>
                    </View>

                </View>
            </ScrollView>

            <View>
                <View style={{ height: 56, width: '100%', backgroundColor: 'rgba(183,54,248,255)' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <View style={{ marginTop: '1%' }}>
                            <Text style={{ marginLeft: 16, color: 'white', fontFamily: 'Oswald-Bold', fontSize: 12 }}>1 Smart BillBoard</Text>
                            <Text style={{ marginLeft: 16, color: 'white', fontFamily: 'Oswald-Bold', fontSize: 16 }}>Rs {amount * duration}/-</Text>
                        </View>

                        <TouchableOpacity onPress={() => navigation.navigate('PaymentScreen', {
                            basePrice: basePrice,
                            selectTime: selectTime,
                            amount: amount,
                            duration: duration,
                            scheduleDate: scheduleDate,
                            billBoardName: billBoardName,
                            address: address,
                            deviceId: deviceId,
                            billboardId: billboardId,
                            deviceMacId: deviceMacId,
                            Videofiletype: Videofiletype,
                            adTitle: adTitle,
                            aboutAd: aboutAd,
                            timeslot: selectTime,
                            date: date,
                            videoname: videoname,
                            VideoOriginalName: VideoOriginalName,
                            videoUri: videoUri,
                            imageUrl: imageUrl,
                            imageFileType: imageFileType,
                            imageName: imageName,
                            imagestring: imagestring
                        })}>
                            <Text style={{ marginRight: 24, color: 'white', fontFamily: 'Oswald-Bold', fontSize: 16, top: 10 }}>Next</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        </View>
    )
}

export default UserOrderSummary;

const styles = StyleSheet.create({
    ProfileImage: {
        height: 200,
        width: wp(90),
        // borderRadius: 90,
        //  paddingRight:100,
        alignSelf: 'center'

    },

})