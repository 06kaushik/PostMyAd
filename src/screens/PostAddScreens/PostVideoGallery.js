import React, { useState, useEffect } from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, RefreshControl, ScrollView,Alert } from 'react-native'
import images from "../../constant/Images";
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from "axios";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Video from 'react-native-video'



const PostVideoGallery = ({ navigation, route }) => {

    const [userDetail, setDetail] = useState([])
    const{GalleryVideo} =route.params

    const [refreshing, setRefreshing] = React.useState(false);
    const [showBox, setShowBox] = useState(true);
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const phoneVideo = ({ item }) => {
        return (
            <View style={{
                width: '45%',
                height: 200,
                margin: 10,
                backgroundColor: "white",
                borderRadius: 10,
                elevation: 2,
            }}>
                <TouchableOpacity onPress={() => navigation.navigate('OrderSummary',{videoLink: item?.compressedlink,date: GalleryVideo?.date, time: GalleryVideo?.time, endtime: GalleryVideo?.endTime, MacId: GalleryVideo?.MacId, deviceId: GalleryVideo?.deviceId, adTitle: GalleryVideo?.adTitle, aboutAd: GalleryVideo?.aboutAd, billBoardId: GalleryVideo?.billBoardId,videoname:item?.videoname,videoFileType:'video/mp4', videoDate: item?.date,billboardname: GalleryVideo?.billboardname, billboardaddress:GalleryVideo?.billboardaddress,uniquenamevideoname: item.uniquename})} >
                <Video paused={true} source={{ uri: item.compressedlink }} style={styles.ProfileImage} />
                </TouchableOpacity>
                <Text style={{ fontFamily: 'Oswald', fontWeight: 'bold', fontSize: 12, left: 10, color: 'black', bottom: 15,top:10 }}>{item?.videoname.slice(0,12)}</Text>
                <Text style={{ left: 10, fontSize: 10, fontWeight: '600', fontFamily: 'Oswald',top:12 }}>{item?.date?.toString().slice(0, 9)}</Text>
                {/* <TouchableOpacity onPress={() => showConfirmDialog(item.uniquename, item.videoname)}>
                    <MaterialCommunityIcons name="delete-outline" color='black' size={20} style={{ left: 138, bottom: 15, }} />
                    <Image source={images.delete} style={{ left: 162, bottom: 15, height: 20, width: 20 }} />
                </TouchableOpacity> */}
            </View>
        )
    }


    const GetVideos = async () => {
        try {
            let res = await axios.get('/api/user/gallery')
            console.log("GET IMAGE RESPONSE ==> ", res.data);
            setDetail(res.data.msg)
        } catch (error) {
            console.log('GET IMAGE ERROR', error);

        }


    }

    useEffect(() => {
        GetVideos()

    }, [])

    const handleDelete = (uniquename, videoname) => {
        const body = {
            userid: userData._id,
            uniqueFilename: uniquename,
            macArr: ["0UTZ1MDOkNWMzgTZ"],
            filetype: "video/mp4",
            videoName: uniquename

        }
        console.log('DELETE VIDEO FROK GALLERY', body);

        const deleteData = async () => {
            try {

                let res = await axios.post('/api/mediaupload/deletevideo', body)
                console.log('VIDEO DELETED RESPONSE', res.data);

            } catch (error) {

                console.log('Error from Video delete', error);
            }
        }

        deleteData()
        GetImages()

    }

    const showConfirmDialog = (uniquename, videoname) => {
        return Alert.alert(
            "Are you sure?",
            "Are you sure you want to DELETE ?",
            [
                // The "Yes" button
                {
                    text: "Yes",
                    onPress: () => {
                        handleDelete(uniquename, videoname)
                        setShowBox(false);
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



    return (
        <>
        {userDetail?.VideodataArr?.length > 0 ?
            <View style={{ backgroundColor: 'white', height: '100%', width: '100%' }}>
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>


                    <View>
                        <FlatList
                            data={userDetail.VideodataArr}
                            renderItem={phoneVideo}
                            numColumns={2}
                            // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                            ListFooterComponent={<View style={{ margin: 100 }} />}
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

export default PostVideoGallery;

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
        height: '75%',
        width: '100%'
    },
})