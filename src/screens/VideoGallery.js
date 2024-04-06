import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, RefreshControl, ScrollView, StyleSheet, Alert } from 'react-native'
import images from "../constant/Images";
import axios from "axios";
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Video from 'react-native-video'




const VideoGallery = ({ navigation }) => {

    const [userDetail, setDetail] = useState([])
    const [userData, setUserData] = useState(null)
    const [showBox, setShowBox] = useState(true);
    const [seeAllBillBoard, setSeeAllBillBoard] = useState([])
    const [allMacId, setAllMacId] = useState([])
    



    let macid = []
    const getMaciDBillBoard = () =>{
        seeAllBillBoard?.forEach(item => {
            macid.push(item.deviceId.macId)
        })

    }

    useEffect(() => {
        getMaciDBillBoard()

    },[ seeAllBillBoard])



    const [refreshing, setRefreshing] = React.useState(false);

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
                <Video paused={true} controls={true} source={{ uri: item.compressedlink }} style={styles.ProfileImage} />
                <Text style={{ fontFamily: 'Oswald-Regular',  fontSize: 12, left: 10, color: 'black', bottom: 15, top: 10 }}>{item?.videoname.slice(0, 12)}</Text>
                <Text style={{ left: 10, fontSize: 10, fontWeight: '600', fontFamily: 'Oswald', top: 12, color: '#000000' }}>{item?.date?.toString().slice(0, 10)}</Text>
                <TouchableOpacity onPress={() => showConfirmDialog(item.uniquename, item.videoname)}>
                    <MaterialCommunityIcons name="delete-outline" color='black' size={20} style={{ left: 138, bottom: 15, }} />
                    {/* <Image source={images.delete} style={{ left: 162, bottom: 15, height: 20, width: 20 }} /> */}
                </TouchableOpacity>
            </View>
        )
    }

    const GetVideo = async () => {
        try {
            let res = await axios.get('/api/user/gallery')
            console.log("GET IMAGE RESPONSE ==> ", res);
            setDetail(res.data.msg)
        } catch (error) {
            console.log('GET IMAGE ERROR', error);

        }
    }

    useEffect(() => {
        GetVideo()

    }, [])

    const getUser = async () => {
        try {
            let userDetail = await AsyncStorage.getItem('USER');
            let data = JSON.parse(userDetail);
            console.log('DATA FROM USER', data);
            setUserData(data)
        } catch (error) {
            console.log("Something went wrong", error);
        }
    }

    useEffect(() => {
        getUser();
    }, [])


    const handleDelete = (uniquename, videoname) => {
        const body = {
            userid: userData._id,
            uniqueFilename: uniquename,
            macArr: allMacId,
            filetype: "video/mp4",
            videoName: uniquename

        }
        console.log('DELETE VIDEO FROK GALLERY', body);

        const deleteData = async () => {
            try {

                let res = await axios.post('/api/mediaupload/deletevideo', body)
                console.log('VIDEO DELETED RESPONSE', res.data);
                if ( res.data){
                    GetVideo()
                }

            } catch (error) {

                console.log('Error from Video delete', error);
            }
        }

        deleteData()
        

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

    

    const getAllBillboard = async () => {
        try {
            const resp = await axios.get("/api/billboard/getbillboard");
            resp.data.msg?.forEach((item) => {
              
               if (!allMacId.includes(item?.deviceId.macId)) {
                   setAllMacId( oldArray => [...oldArray,item?.deviceId?.macId]  )
               }
              
            })

            // await AsyncStorage.setItem('TOKEN', JSON.stringify(resp.data.token))

        } catch (err) {
            // Handle Error Here
            console.error("error from Billboard ==> ", err);
        }
    }

    useEffect(() => {
        getAllBillboard()
      


    }, [])



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

export default VideoGallery;

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