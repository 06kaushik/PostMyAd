import React, { useState, useEffect } from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, RefreshControl, ScrollView, Alert } from 'react-native'
import images from "../../constant/Images";
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Video from 'react-native-video'



const PostImageGallery = ({ navigation, route }) => {

    const [userDetail, setDetail] = useState([])
    const { GalleryData } = route.params
    const [refreshing, setRefreshing] = React.useState(false);
    const [showBox, setShowBox] = useState(true);
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);


    const PhoneImage = ({ item }) => {
        console.log('IMAAGE DATA IN CAMPAIGN GALLERY', item);
        return (
            <View style={{
                width: '45%',
                height: 200,
                margin: 10,
                backgroundColor: "white",
                borderRadius: 10,
                elevation: 2,
            }}>
                <TouchableOpacity onPress={() => navigation.navigate('CampaignSummary', { uniquename: item?.uniquename, image: item?.imagelink, date: GalleryData?.date, time: GalleryData?.time, endtime: GalleryData?.endTime, MacId: GalleryData?.MacId, deviceId: GalleryData?.deviceId, imageType: 'image/jpeg', adTitle: GalleryData?.adTitle, aboutAd: GalleryData?.aboutAd, billBoardId: GalleryData?.billBoardId, billboardname: GalleryData?.billboardname, billboardaddress: GalleryData?.billboardaddress })} >
                    <Image style={{
                        height: '80%',
                        width: '100%'

                    }} source={{ uri: item?.imagelink }} />
                </TouchableOpacity>
                <Text style={{ fontFamily: 'Oswald', fontWeight: 'bold', fontSize: 12, left: 10, color: 'black', bottom: 15 }}>{item?.imagename}</Text>
                <Text style={{ left: 10, fontSize: 10, fontWeight: '600', fontFamily: 'Oswald' }}>{item?.date?.toString().slice(0, 9)}</Text>

            </View>
        )
    }


    const GetImages = async () => {
        try {
            let res = await axios.get('/api/user/gallery')
            console.log("GET IMAGE RESPONSE ==> ", res.data);
            setDetail(res.data.msg)
        } catch (error) {
            console.log('GET IMAGE ERROR', error);

        }


    }

    useEffect(() => {
        GetImages()

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
            {userDetail?.ImagedataArr?.length > 0 ?
                <View style={{ backgroundColor: 'white', height: '100%', width: '100%' }}>
                    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>


                        <View>
                            <FlatList
                                data={userDetail.ImagedataArr}
                                renderItem={PhoneImage}
                                numColumns={2}
                                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                                ListFooterComponent={<View style={{ margin: 200 }} />}
                            />
                        </View>

                    </ScrollView>

                </View>
                :

                <View style={{ backgroundColor: 'white', height: '100%', width: '100%', justifyContent: 'center', paddingLeft: 20, paddingRight: 20 }}>
                    <View style={{ backgroundColor: 'white', elevation: 4, }}>
                        <Text style={{ textAlign: 'center', fontSize: 25, color: 'black', fontFamily: 'Oswald-Bold' }}>No Image To Show</Text>
                    </View>
                </View>
            }
        </>
    )
}

export default PostImageGallery;

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