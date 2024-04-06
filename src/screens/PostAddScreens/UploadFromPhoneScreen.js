import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, RefreshControl, ScrollView, StyleSheet, Alert } from 'react-native'
import images from "../../constant/Images";
import axios from "axios";
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Video from 'react-native-video'




const UploadFromPhone = ({ navigation }) => {

    const [userDetail, setDetail] = useState([])
    console.log('USER DETAIL FROM GALERY', userDetail);
    const [userData, setUserData] = useState(null)
    console.log('USER DATA', userData);
    const [showBox, setShowBox] = useState(true);



    const [refreshing, setRefreshing] = React.useState(false);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);


    const PhoneImage = ({ item }) => {
        return (
            <View style={{
                width: '45%',
                height: 200,
                margin: 10,
                backgroundColor: "white",
                borderRadius: 10,
                elevation: 2,

            }}>
                <TouchableOpacity>
                    <Image style={{
                        height: '80%',
                        width: '100%'

                    }} source={{ uri: item?.imagelink }} />
                </TouchableOpacity>
                <Text style={{ fontFamily: 'Oswald', fontWeight: 'bold', fontSize: 12, left: 10, color: 'black', bottom: 15 }}>{item?.imagename}</Text>
                <Text style={{ left: 10, fontSize: 10, fontWeight: '600', fontFamily: 'Oswald', color: 'black' }}>{item?.date?.toString().slice(0, 9)}</Text>

            </View>
        )
    }

    const phoneVideo = ({ item }) => {
        console.log('VIDEOOOO IN GALLERY', item);
        return (
            <View style={{
                width: '45%',
                height: 200,
                margin: 10,
                backgroundColor: "white",
                borderRadius: 10,
                elevation: 2,
            }}>
                <Video paused={true} source={{ uri: item.compressedlink }} style={styles.ProfileImage} />
                <Text style={{ fontFamily: 'Oswald', fontWeight: 'bold', fontSize: 12, left: 10, color: 'black', bottom: 15, top: 10 }}>{item?.videoname.slice(0, 12) + '.mp4'}</Text>
                <Text style={{ left: 10, fontSize: 10, fontWeight: '600', fontFamily: 'Oswald', top: 12,color:'#000000'}}>{item?.date?.toString().slice(0, 9)}</Text>
                <TouchableOpacity onPress={() => showConfirmDialog(item.uniquename, item.videoname)}>
                    <MaterialCommunityIcons name="delete-outline" color='black' size={20} style={{left: 138, bottom: 15,}} />
                    {/* <Image source={images.delete} style={{ left: 162, bottom: 15, height: 20, width: 20 }} /> */}
                </TouchableOpacity>
            </View>
        )
    }

    const GetImages = async () => {
        try {
            let res = await axios.get('/api/user/gallery')
            console.log("GET IMAGE RESPONSE ==> ", res);
            setDetail(res.data.msg)
        } catch (error) {
            console.log('GET IMAGE ERROR', error);

        }
    }

    useEffect(() => {
        GetImages()

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
        <View style={{ backgroundColor: 'white', height: '100%', width: '100%' }}>
            <View style={{}}>
                <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ height: 65 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: '8%' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                            <Image source={images.back} style={{ left: 20 }} />
                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontWeight: 'bold', left: '30%' }}>Gallery</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('GalleryUploadContent')}>
                            <Image source={images.plus1} style={{ height: 30, width: 30, right: '25%', bottom: 5 }} />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>

            {/* 
            <View style={{ flexDirection: 'row' }}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Search here..."
                    placeholderTextColor='#5A5A5A' />
                <View style={{}}>
                    <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={styles.searchContainer} >
                        <Text style={styles.searchBttn}>Search</Text>
                    </LinearGradient>
                </View>
            </View> */}
            {/* <Text style={{color:'black'}}>{userDetail._email}</Text> */}
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                {/* <View>
                <FlatList
                    data={userDetail.ImagedataArr}
                    renderItem={PhoneImage}
                    numColumns={2}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    ListFooterComponent={<View style={{ margin: 200 }} />}


                />
            </View> */}

                {
                    userDetail?.ImagedataArr?.map((item, index) => (
                        <View>
                        <View style={{
                            width: '40%',
                            
                            height: 200,
                            margin: 10,
                            backgroundColor: "white",
                            borderRadius: 10,
                            elevation: 2,
                        }}>
                            <TouchableOpacity onPress={() => navigation.navigate('OrderSummary', { uniquename: item?.uniquename, image: item?.imagelink, date: date, time: time, endtime: endTime, MacId: MacId, deviceId: deviceId, imageType: 'image/jpeg', adTitle: adTitle, aboutAd: aboutAd, billBoardId: billBoardId })} >
                                <Image style={{
                                    height: '87%',
                                    width: '100%',
                                    
                                    

                                }} source={{ uri: item?.imagelink }} />
                            </TouchableOpacity>
                            <Text style={{ fontFamily: 'Oswald', fontWeight: 'bold', fontSize: 12, left: 10, color: 'black', bottom: 12, }}>{item?.imagename+'.jpg'}</Text>
                            <Text style={{ left: 10, fontSize: 10, fontWeight: '600', fontFamily: 'Oswald',bottom:8 }}>{item?.date?.toString().slice(0, 9)}</Text>

                        </View>
                        
                        </View>
                    ))
                }


                {/* {
    userDetail?.VideodataArr.map((item,index)=>(
        <View style={{
            width: '45%',
            height: 200,
            margin: 10,
            backgroundColor: "white",
            borderRadius: 10,
            elevation: 2,
        }}>
            <Video source={{ uri: item.compressedlink }} style={styles.ProfileImage} />
        </View>
    ))
} */}
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
    )
}

export default UploadFromPhone;
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