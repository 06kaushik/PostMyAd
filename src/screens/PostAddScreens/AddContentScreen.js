import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, ScrollView, Switch, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import images from "../../constant/Images";
import * as ImagePicker from 'react-native-image-picker'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from "moment";
import Video from "react-native-video";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import Modal from 'react-native-modal'



const AddContentScreen = ({ navigation, route }) => {


    const { scheduleDate } = route.params
    const { startscheduletime } = route.params
    const { endscheduletime } = route.params
    const { deviceId } = route.params
    const { videoname } = route.params
    const { deviceMacId } = route.params
    const { filetype } = route.params
    const { campaignName } = route.params
    const { adTitle } = route.params
    const { aboutAd } = route.params
    const { billBoardId } = route.params
    const [image, setImage] = useState(null);
    const [fileType, setImageFileType] = useState(null)
    const [videofileType, setVideoFileType] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false)
    const [userDetail, setDetail] = useState(null)
    const [uniquename, setUniqueName] = useState(null)
    const [fileName, setFileName] = useState(null)
    const [imageString, setImageString] = useState(null)
    const [imagepath, setImagePath] = useState()
    const [isloading, setIsLoading] = useState(false)
    const [video, setVideo] = useState(null)
    const [uploadedFileType, setUploadedFileType] = useState(null);
    const [fileUniqueName, setFileUniqueName] = useState(null)
    const [originalFileName, setOriginalFileName] = useState(null)
    const { billboardname } = route.params
    const { billboardaddress } = route.params


    let startscheduleDate = moment(scheduleDate?.toString()).format().slice(0, 11) + startscheduletime?.slice(1, 6) + ':00+05:30'
    let endscheduleDate = moment(scheduleDate?.toString()).format().slice(0, 11) + endscheduletime?.slice(1, 6) + ':00+05:30'

    let Milliseconds =
        String(new Date().getFullYear()) +
        String(new Date().getMonth()) +
        String(new Date().getDate()) +
        String(new Date().getHours()) +
        String(new Date().getMinutes()) +
        String(new Date().getMilliseconds());

    let ImagePath = image?.uri.slice(92, 108)

    useEffect(() => {
        if (image?.uri.slice(-4) === '.jpg') {
            setImageFileType("image/jpeg")
            // setUniqueName(image?.uri.slice(92, 104).concat(Milliseconds))
            setUniqueName(image?.uri.slice(-12).replace(/\.[^/.]+$/, "").replace(/[&\/\\_#,@+()$~%'":-?<>{}\s+]/g, "").concat(Milliseconds))

        }
        if (video?.slice(63, 77)) {
            setVideoFileType("video/mp4")
            setFileUniqueName(video?.slice(-12).replace(/[&\/\\_#,@+()$~%'":-?<>{}\s+]/g, "").replace(/\.[^/.]+$/, "").concat(Milliseconds))
            setOriginalFileName(video?.slice(-12).replace(/\.[^/.]+$/, ""))

        }




    }, [image])

    useEffect(() => {
        console.log('FILE TYPE', fileType);
        console.log('FILE NAME', image?.uri.slice(92, 104));
        console.log('USER ID', userDetail?._id);
        console.log('UNIQUE NAME', uniquename);
        console.log('START SCHEDULE DATE', startscheduleDate);
        console.log('END SCHEDULE DATE', endscheduleDate);
        console.log('video FILE NAMEeeeeee', video?.slice(63, 77));


    }, [fileType])

    //    if (ImagePath.)
    // const SubmitBoard = () => {
    //     let startscheduleDate = scheduleDate

    //     const body = {
    //         startscheduleDate: scheduleDate,
    //         endscheduleDate: "2022-08-07T14:10:22+05:30",
    //         deviceId: "62e10614a2b674bfd77be638",
    //         videoname: image,
    //         deviceMacId: "jNWN2kTOwITNmBDN",
    //         filetype: "video/mp4"
    //     }
    //     console.log('BODY FROM SUBMIT BOARD', startscheduleDate);
    //     setModalVisible(true)
    // }
    // useEffect(() => {
    //     setTimeout(() => {
    //         setIsLoading(false);
    //     }, 5000);
    // }, [])


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


    //    const selectVideo = async () => {
    //         ImagePicker.launchImageLibrary({ mediaType: 'video', includeBase64: true }, (response) => {
    //             console.log("VIDEOOOOOOOO===>",response);
    //            setVideo({ video: response }) 

    //         })
    //     }



    // let path = DocumentDirectoryPath
    // console.log('DOCUMENT PATH', path);

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

    // const targetPath = `${image}/test.zip`
    //     const sourcePath = imagepath
    // console.log('TARGET PATH', sourcePath);
    //     zip(sourcePath, targetPath)
    //         .then((path) => {
    //             console.log(`zip completed at ${path}`)
    //         })
    //         .catch((error) => {
    //             console.error(error)
    //         })

    const ImageUploader = () => {
        let body = {
            userid: userDetail?._id,
            imagename: image?.uri.slice(92, 104),
            filetype: fileType,
            uniquename: uniquename,
            imagestring: imageString,
            macArr: [deviceMacId],
        }
        console.log('IMAGEUPLOADER BODY', body);
        const ImageUploaderapi = async () => {

            try {
                setIsLoading(true);
                let res = await axios.post('/api/mediaupload/base64upload', body)
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
            startscheduleDate: startscheduleDate,
            endscheduleDate: endscheduleDate,
            billboardId: billBoardId,
            deviceId: [deviceId],
            videoname: uniquename,
            deviceMacId: [deviceMacId],
            filetype: fileType,
            adTitle: adTitle,
            aboutAd: aboutAd

        }
        console.log('POST ADDD BODYYYYYY', body);
        try {
            let res = await axios.post('/api/billBoardBooking/businessBookingBoard', body)
            console.log('POST ADD RESPONSE', res.data);

        } catch (err) {
            console.log(('Error from POST ADD', err));

        }

    }


    const VideoUploader = async () => {
        setIsLoading(true);
        const datas = new FormData();


        datas.append("macArr", [deviceMacId]);
        datas.append('uniquename', fileUniqueName)
        // datas.append('uniquename', "himanshu1234")
        datas.append('userId', userDetail._id)

        datas.append("file", {
            name: originalFileName + ".mp4",
            type: videofileType,
            uri: video,
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
            startscheduleDate: startscheduleDate,
            endscheduleDate: endscheduleDate,
            billboardId: billBoardId,
            deviceId: [deviceId],
            videoname: fileUniqueName,
            deviceMacId: [deviceMacId],
            filetype: videofileType,
            adTitle: adTitle,
            aboutAd: aboutAd

        }


        console.log('POST ADDD BODYYYYYY', body);
        try {
            let res = await axios.post('/api/billBoardBooking/businessBookingBoard', body)
            console.log('POST ADD RESPONSE', res.data);

        } catch (err) {
            console.log(('Error from POST ADD', err));

        }

    }



    // const test = async() => {
    //     try{
    //        let resp= await fetch('http://10.5.50.75:4000/test' ,

    //        {
    //         method:'GET',
    //         headers: {'Content-Type': 'application/json'}
    //        })
    //        console.log('RESPONSE FROM TEST', resp.json());

    //     }catch(error){
    //         console.log('errorrrrrrrrrrrrrrr', error);
    //     }
    // }

    // test()

    let startTime = moment(moment(startscheduleDate).format("HH:mm:ss a"), "HH:mm:ss a");
    let endTime = moment(moment(endscheduleDate).format("HH:mm:ss a"), "HH:mm:ss a");
    let duration = moment.duration(endTime.diff(startTime));
    let minutes = parseInt(duration.asMinutes()) % 60;
    let hours = parseInt(duration.asHours());



    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <View>
                <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ height: 60 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <View style={{ marginTop: '8%' }}>
                            <Image source={images.back} style={{ marginLeft: 8, }} />
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={{ alignSelf: 'center', bottom: 19, fontFamily: 'Oswald-Bold', color: 'white' }}>Add Content</Text>
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
                        <Text style={{ fontFamily: 'Oswald', fontWeight: 'bold', fontSize: 14, color: '#6F6F6F', left: 10 }}>{scheduleDate?.toString().slice(0, 10)}</Text>
                        {/* <Image source={images.edit} style={{ left: 25, top: 5 }} /> */}

                    </View>
                    <View style={{ flexDirection: 'row', margin: 10 }}>
                        <Image source={images.time} style={{ right: 8 }} />
                        <Text style={{ fontFamily: 'Oswald', fontWeight: 'bold', fontSize: 14, color: '#6F6F6F', left: 15 }}>{hours ? `${hours} hr` : null} {minutes} min</Text>
                        {/* <Image source={images.edit} style={{ left: 37, top: 2 }} /> */}

                    </View>
                    <View style={{ flexDirection: 'row', margin: 10 }}>
                        <Image source={images.watch} style={{ right: 10 }} />
                        <Text style={{ fontFamily: 'Oswald', fontWeight: 'bold', fontSize: 14, color: '#FF7F37', left: 10 }}>{moment(startscheduleDate).format("hh:mm A")} - {moment(endscheduleDate).format("hh:mm A")}</Text>
                        <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ left: 40, borderRadius: 10, width: '35%', height: 25 }}>
                            <Text style={{ textAlign: 'center', top: 1, color: 'white', fontWeight: 'bold', fontFamily: 'Oswald', }}>Full Screen</Text>
                        </LinearGradient>
                    </View>
                </View>
                <View>
                    <Image source={images.banerimage} style={{ width: 138, height: 120, left: 190, borderRadius: 6, bottom: 150 }} />
                </View>
            </View>
            {/* 
            <View style={{ backgroundColor: 'white', height: 200, elevation: 4 }}>
                <FlatList
                    data={HeaderData}
                    renderItem={Headerdata}
                />
            </View> */}
            {
                image ?
                    <View style={{ bottom: 70 }}>
                        <View style={{}} >

                            {uploadedFileType === 'image/jpeg' ?



                                <Image style={styles.ProfileImage} source={image} />
                                :

                                <Video style={styles.ProfileImage} source={image} />
                            }

                        </View>


                        <View style={{ marginBottom: 100, backgroundColor: 'white', height: 150, top: 10, elevation: 4 }}>
                            <Text style={{ top: 20, left: 20, fontWeight: 'bold', fontFamily: 'Oswald', fontSize: 14, color: '#525252', }}>Insight Services</Text>
                            <View style={{ backgroundColor: '#F7F8FD', top: 30, height: 80, left: 10, width: '45%', elevation: 4, borderRadius: 10, }}>
                                <Text style={{ top: 10, left: 10, fontWeight: 'bold', color: '#222222' }}>Basic</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={images.eye} style={{ left: 10, top: 20, }} />
                                    <Text style={{ left: 15, top: 20, fontWeight: 'bold', fontFamily: 'Oswald', color: '#222222' }}>Number of Views</Text>
                                    <Image source={images.help} style={{ left: 16, top: 24, }} />
                                </View>
                            </View>


                        </View>
                    </View>

                    :

                    <View style={{ bottom: 100 }}>
                        <Text style={{ fontFamily: 'Oswald', fontWeight: 'bold', fontSize: 16, color: '#222222', left: 20, top: 20 }}>Add Content</Text>
                        <View style={{ flexDirection: 'row', top: 50, left: 10 }}>
                            <View style={{ width: 170, height: 220, borderWidth: 2, borderRadius: 10, borderColor: 'rgba(105, 6, 195, 1)' }}>
                                <Text style={{ left: 25, borderWidth: 2, width: 120, borderRadius: 5, borderColor: 'rgba(105, 6, 195, 1)', top: -10, backgroundColor: 'white', color: '#6906C3', fontFamily: 'Oswald', fontWeight: 'bold', textAlign: 'center', position: 'absolute' }}>Recommended</Text>
                                <Text style={{ textAlign: 'center', top: 30, fontWeight: 'bold', fontFamily: 'Oswald', fontSize: 16, color: 'black' }}>Upload Time</Text>
                                <Text style={{ textAlign: 'center', top: 30, fontWeight: 'bold', fontFamily: 'Oswald', fontSize: 16, color: 'rgba(105, 6, 195, 1)' }}>Instant</Text>
                                <Text style={{ textAlign: 'center', top: 60, fontWeight: 'bold', fontFamily: 'Oswald', fontSize: 12, color: '#6F6F6F' }}>Open postmyad Gallery and select saved content
                                    for Instant Publication.</Text>
                                <View>
                                    <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ height: 45, top: 84.5, borderRadius: 7, width: 167.5, position: 'absolute' }}>
                                        <TouchableOpacity onPress={() => navigation.navigate('Galleryy', { date: scheduleDate, time: startscheduletime, endTime: endscheduletime, MacId: [deviceMacId], deviceId: [deviceId], adTitle: adTitle, aboutAd: aboutAd, billBoardId: billBoardId, videoname: fileUniqueName, videoFileType: videofileType, billboardname: billboardname, billboardaddress: billboardaddress })}>
                                            <Text style={{ textAlign: 'center', top: 10, color: 'white', fontWeight: 'bold' }}>Gallery</Text>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                </View>
                            </View>
                            <View style={{ width: 170, height: 220, borderWidth: 2, left: 5, borderRadius: 10, borderColor: 'rgba(221, 221, 221, 1)', }}>
                                <Text style={{ textAlign: 'center', top: 30, fontWeight: 'bold', fontFamily: 'Oswald', fontSize: 16, color: 'black' }}>Upload Time</Text>
                                <Text style={{ textAlign: 'center', top: 30, fontWeight: 'bold', fontFamily: 'Oswald', fontSize: 16, color: 'rgba(105, 6, 195, 1)' }}>5-7 minutes</Text>
                                <Text style={{ textAlign: 'center', top: 60, fontWeight: 'bold', fontFamily: 'Oswald', fontSize: 12, color: '#6F6F6F' }}>Select content from your
                                    phone. upload time will depend on size of content.
                                </Text>
                                <View style={{ height: 45, top: 172.5, borderRadius: 8, width: 167.5, position: 'absolute', borderWidth: 2, borderColor: 'rgba(221, 221, 221, 1)', }}>
                                    <TouchableOpacity onPress={openGallery}>
                                        <Text style={{ textAlign: 'center', top: 9, color: '#525252', fontWeight: 'bold', }}>Upload From Phone</Text>
                                    </TouchableOpacity>

                                </View>

                            </View>

                        </View>

                        <View style={{ top: 80, }}>

                            <Text style={{ color: '#6F6F6F', fontWeight: 'bold', fontFamily: 'Oswald', fontSize: 14, left: 20 }}>TIP: Uploading content in your gallery will save time when you are Publishing AD.</Text>
                            {/* <Text style={{color:'#6F6F6F',textAlign:'center',fontWeight:'bold',fontFamily:'Oswald',fontSize:14}}>Publishing AD.</Text> */}
                        </View>

                    </View>


            }



            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', height: 70, backgroundColor: 'white', elevation: 4, bottom: 0, position: 'absolute', width: '100%' }}>

                <View style={{ borderWidth: 2, borderRadius: 5, borderColor: 'rgba(221, 221, 221, 1)', width: 170, height: 40, }}>
                    <TouchableOpacity onPress={() => navigation.navigate('BillBoards')} >
                        <Text style={{ textAlign: 'center', color: '#525252', fontWeight: 'bold', top: 8, fontFamily: 'Oswald', fontSize: 16 }}>Back</Text>
                    </TouchableOpacity>
                </View>
                <View >
                    <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ width: 170, height: 40, borderRadius: 5 }}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            hasBackdrop={true}
                            backdropOpacity={0.65}
                            isVisible={modalVisible}

                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>

                                    <Image source={images.confirmation} style={{ bottom: 20 }} />
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
                                            <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ height: 30, borderRadius: 20 }}>
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
                                            <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ height: 30, borderRadius: 20 }} >
                                                <Text style={styles.textStyle}>Back to Home Page</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>

                                    </Pressable>

                                </View>
                            </View>
                        </Modal>


                        {uploadedFileType === 'image/jpeg' ? (
                            isloading ? (<View><ActivityIndicator
                                //visibility of Overlay Loading Spinner
                                visible={isloading}
                                size='large'
                                color='#B937FA'
                                style={{ flex: 1, opacity: 1, bottom: 300, right: 90 }}
                                textStyle={styles.spinnerTextStyle}
                            />
                            </View>

                            ) :

                                (<TouchableOpacity onPress={() => ImageUploader()}>

                                    <Text style={{ textAlign: 'center', fontWeight: 'bold', top: 2, fontFamily: 'Oswald', fontSize: 16, color: 'white' }}>Continue</Text>
                                </TouchableOpacity>)
                        )
                            :
                            (
                                isloading ? (<View><ActivityIndicator
                                    //visibility of Overlay Loading Spinner
                                    visible={isloading}
                                    size='large'
                                    color='#B937FA'
                                    style={{ flex: 1, opacity: 1, bottom: 300, right: 90 }}
                                    textStyle={styles.spinnerTextStyle}
                                />
                                </View>

                                ) :
                                    <TouchableOpacity onPress={() => VideoUploader()}>
                                        <Text style={{ textAlign: 'center', fontWeight: 'bold', top: 8, fontFamily: 'Oswald', fontSize: 16, color: 'white' }}>Continue</Text>
                                    </TouchableOpacity>
                            )
                        }



                    </LinearGradient>
                </View>
            </View>


        </View>
    )
}

export default AddContentScreen;

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
    ProfileImage: {
        height: 200,
        width: wp(90),
        // borderRadius: 90,
        //  paddingRight:100,
        left: 20,
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
        // borderRadius: 20,
        padding: 10,
        // elevation: 2,
        bottom: 60
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {

    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        top: 5

    },
    modalText: {

        textAlign: "center",
        bottom: 70,
        fontWeight: 'bold'
    }, spinnerTextStyle: {
        color: 'black',
    },
})