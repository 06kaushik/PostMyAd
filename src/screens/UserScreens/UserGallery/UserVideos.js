import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, RefreshControl, ScrollView, StyleSheet, Alert } from 'react-native'
import images from "../../../constant/Images";
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from "axios";
import Video from 'react-native-video'



const UserVideos = ({navigation,route}) => {
    const[userVideo, setUserVideo] = useState([])
    const [refreshing, setRefreshing] = React.useState(false);

    const { scheduleDate } = route.params
    console.log('date', scheduleDate);
    const { duration } = route.params
    const { selectTime } = route.params
    const {basePrice} = route.params
    const {amount} = route.params
    const {billBoardName} = route.params
    const {address} = route.params
    const {deviceId} = route.params
    const {billboardId} = route.params
    const {deviceMacId} = route.params
    const {Videofiletype} = route.params
    console.log('v file type', Videofiletype);
    const {adTitle} = route.params
    const {aboutAd} = route.params
    const {timeslot} = route.params
    const {date} = route.params
    const {videoname} = route.params
    const {VideoOriginalName} = route.params
    const {videoUri} = route.params
    const {imageUrl} = route.params
    const {imageFileType} = route.params
    const {imageName} = route.params
    const {imagestring} = route.params



    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const phoneVideo = ({ item }) => {
        console.log('gallery videos', item);
        return (
            
            <View style={{
                
                backgroundColor: 'white',
        elevation: 4,
        height: 250,
        width: '93%',
        alignSelf: 'center',
        borderRadius: 8,
        marginTop: 16
            }}>
                <TouchableOpacity onPress={() => navigation.navigate('GalleryPayment',{ 
                selectTime: selectTime.selectTime,
                amount: amount.amount,
                basePrice:basePrice.basePrice,
                duration: duration.duration,
                scheduleDate: scheduleDate.scheduleDate,
                billBoardName: billBoardName.billBoardName,
                address: address.address,
                deviceId: deviceId.deviceId,
                billboardId: billboardId.billboardId,
                deviceMacId: deviceMacId.deviceMacId,
                Videofiletype: 'video/mp4',
                adTitle: adTitle.adTitle ,
                aboutAd: aboutAd.aboutAd,
                timeslot: timeslot.timeslot,
                date: date.date,
                videoname: item?.uniquename,
                VideoOriginalName: item?.videoname,
                videoUri: item?.compressedlink,
                })}>

                <Video paused={true} controls={true} source={{ uri: item.compressedlink }} style={styles.ProfileImage} />
                </TouchableOpacity>
                <Text style={{ fontFamily: 'Oswald-Regular',  fontSize: 14, left: 10, color: 'black', bottom: 15, }}>{item?.videoname.slice(0, 12)}</Text>
                <Text style={{ left: 10, fontSize: 12, fontWeight: '600', fontFamily: 'Oswald', color: '#000000' }}>{item?.date?.toString().slice(0, 10)}</Text>
                {/* <TouchableOpacity onPress={() => showConfirmDialog(item.uniquename, item.videoname)}>
                    <MaterialCommunityIcons name="delete-outline" color='black' size={20} style={{ left: 138, bottom: 15, }} />
                    <Image source={images.delete} style={{ left: 162, bottom: 15, height: 20, width: 20 }} />
                </TouchableOpacity> */}
            </View>
        )
    }


    const GetVideo = async () => {
        try {
            let res = await axios.get('/api/user/gallery')
            console.log("GET IMAGE RESPONSE ==> ", res);
            setUserVideo(res.data.msg)
        } catch (error) {
            console.log('GET IMAGE ERROR', error);

        }
    }

    useEffect(() => {
        GetVideo()

    }, [])

    
    return(
        <>
        {userVideo?.VideodataArr?.length > 0 ?
            <View style={{ backgroundColor: 'white', height: '100%', width: '100%' }}>
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>


                    <View>
                        <FlatList
                            data={userVideo.VideodataArr}
                            renderItem={phoneVideo}
                            ListFooterComponent={<View style={{ margin: 80 }} />}
                        />
                    </View>

                </ScrollView>

            </View>
            :

            <View style={{ backgroundColor: 'white', height: '100%', width: '100%', justifyContent: 'center', paddingLeft: 20, paddingRight: 20 }}>
                <View style={{ backgroundColor: 'white', elevation: 4, }}>
                    <Text style={{ textAlign: 'center', fontSize: 25, color: 'black', fontFamily: 'Oswald-Bold' }}>No Video To Show</Text>
                </View>
            </View>
        }
    </>
    )
}

export default UserVideos

const styles = StyleSheet.create({
    backbttn: {
        top: 50,
        left: 20
    },
    headertxt: {
        color: 'white',
        left: hp(25),
        top: 32,
        fontSize: 14,
        fontWeight: 'bold'
    },
    textInput: {
        backgroundColor: '#F7F8FD',
        height: 40,
        paddingLeft: 20,
        margin: 15,
        borderRadius: 10,
        fontWeight: 'bold',
        width: '90%',
        // backgroundColor: 'grey',
    },
    searchBttn: {
        textAlign: 'center',
        margin: 3,
        color: 'white',
        fontWeight: 'bold',
        width: 80


    },
    searchContainer: {
        // width: '30%',
        height: 30,
        borderRadius: 5,
        right: 110,
        top: '27%'



    },
    box: {
        width: '90%',
        height: 160,
        margin: 10,
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 2,
        left: 10
        // flexDirection:'row'
    },
    ProfileImage: {
        height: '80%',
        width: '100%'
    },
})