import React, { useState, useEffect } from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity,ActivityIndicator,Pressable } from 'react-native'
import images from "../constant/Images";
import LinearGradient from 'react-native-linear-gradient';
import * as ImagePicker from 'react-native-image-picker'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Progress from 'react-native-progress';
import Video from "react-native-video";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import Modal from 'react-native-modal'




const GalleryUploadContent = ({ navigation }) => {

    const [image, setImage] = useState(null);
    console.log('imageeee',image?.uri);
    const [imageString, setImageString] = useState(null)
    const [uploadedFileType, setUploadedFileType] = useState(null);
    const [imagepath, setImagePath] = useState()
    const [video, setVideo] = useState(null)
    const [fileType, setImageFileType] = useState(null)
    console.log('gvssgss',fileType);
    const [videofileType, setVideoFileType] = useState(null)
    const [uniquename, setUniqueName] = useState(null)
    console.log('UNIQUENAME',uniquename );
    const [fileUniqueName, setFileUniqueName] = useState(null)
    console.log('VIDEO UNIQUENAME',fileUniqueName);
    const [originalFileName, setOriginalFileName] = useState(null)
    console.log('ORIGINAL NAME', originalFileName);
    const [userDetail, setDetail] = useState(null)
    const [allMacId, setAllMacId] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [isloading, setIsLoading] = useState(false)
    const [newCampaign, setnewCampaign] = useState('')

    

    // const [progress , setProgress] = useState(0);
    // const [indeterminate, setIndeterminate] = useState(true)

    // const Animate = () => {
    //     let progress = 0;
    //     setProgress({progress});
    //     setTimeout(() => {
    //         setIndeterminate({indeterminate: false});
    //         setInterval(() => {
    //             progress += Math.random() / 5;
    //             if (progress > 1) {
    //                 progress = 1;
    //             }
    //             setProgress({progress})
    //         }, 500)
    //     }, 1500)

    // }

    // useEffect(() => {
    //     Animate()
    // })
    let Milliseconds =
        String(new Date().getFullYear()) +
        String(new Date().getMonth()) +
        String(new Date().getDate()) +
        String(new Date().getHours()) +
        String(new Date().getMinutes()) +
        String(new Date().getMilliseconds());

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

    useEffect(() => {
        console.log('FILE TYPE', fileType);
        console.log('FILE NAME', image?.uri.slice(92, 104));
        console.log('USER ID', userDetail?._id);
        console.log('UNIQUE NAME', uniquename);
        console.log('video FILE NAMEeeeeee', video?.slice(63, 77));


    }, [uniquename])




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

    useEffect(() => {
        
        if (image?.uri.slice(-4) === '.jpg') {
            setImageFileType("image/jpeg")
            setUniqueName(image?.uri.slice(-12).replace(/\.[^/.]+$/, "").replace(/[&\/\\_#,@+()$~%'":-?<>{}\s+]/g, "").concat(Milliseconds))
        }
        if (video?.slice(63, 77)) {
            setVideoFileType("video/mp4")
            setFileUniqueName(video?.slice(-12).replace(/[&\/\\_#,@+()$~%'":-?<>{}\s+]/g, "").replace(/\.[^/.]+$/, "").concat(Milliseconds))
            setOriginalFileName(video?.slice(-8).replace(/\.[^/.]+$/, ""))

        }
    }, [image])

    useEffect(() => {
console.log("Uniquename +++====>", uniquename);
    }, [uniquename])


    const ImageUploader = () => {
        let body = {
            userid: userDetail?._id,
            imagename: newCampaign,
            filetype: fileType,
            uniquename: uniquename,
            imagestring: imageString,
            macArr: allMacId,
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

    }

    ///////////////////////// VIDEOOOOOO /////////////////////////

    const VideoUploader = async () => {
        setIsLoading(true);
        const datas = new FormData();


        datas.append("macArr", allMacId);
        datas.append('uniquename', fileUniqueName)
        // datas.append('uniquename', "himanshu1234")
        datas.append('userId', userDetail._id)

        datas.append("file", {
            name: newCampaign + ".mp4",
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
            
        } catch (e) {

            console.log('ERROR FROM VIDEO UPLOAAD', e);
            console.error(e);

        }
    }



    return (
        <View style={{ backgroundColor: 'white', height: '100%', width: '100%' }}>
            <StatusBar hidden={true} />
            <View>
                <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ height: 60 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Image source={images.back} style={styles.backbttn} />
                        <Text style={styles.headertxt}>Upload Content</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>

            <View >
                <Text style={{ fontSize: 24, fontWeight: 'bold', fontFamily: 'Oswald', color: '#525252', left: 20, top: 20, }}>Upload Content</Text>
            </View>

            <View style={{ top: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', fontFamily: 'Oswald', color: '#525252', top: 40, left: 20 }}>Give it a name</Text>
                <TextInput
                    // placeholder="type name ..."
                    // placeholderTextColor='black'
                    style={{ top: 60, width: '90%', left: 20, borderRadius: 10, height: 40, paddingLeft: 10, borderWidth: 1, borderColor: '#DDDDDD', color: '#000000' }}
                value={newCampaign}
                onChangeText={setnewCampaign}

                />

            </View>

            <View style={{ top: 70 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', fontFamily: 'Oswald', color: '#525252', top: 40, left: 20 }}>Select Media</Text>
                <TextInput
                    // placeholder="type name ..."
                    // placeholderTextColor='black'
                    multiline={true}
                    style={{ top: 60, width: '90%', left: 20, borderRadius: 10, height: 65, paddingLeft: 10, borderWidth: 1, borderColor: '#DDDDDD', color: '#000000' }}
                />


            </View>
            <View style={{}} >
                <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ height: 50, width: '50%', left: 30, borderRadius: 10, top: 73, }}>
                    <TouchableOpacity onPress={openGallery}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', top: 13, fontFamily: 'Oswald', fontSize: 16, color: 'white', }}>Choose file</Text>
                    </TouchableOpacity>
                    <Text style={{ top: 10, fontWeight: 'bold', left: 185 }}>{imageString?.fileName?.slice(49, 65)}</Text>
                </LinearGradient>
            </View>
            {uploadedFileType === 'image/jpeg' ?
                <Image source={image} style={{ height: '30%', width: '90%', alignItems: 'center', top: 100, left: 20 }} />

                :

                <Video source={image} style={{ height: '30%', width: '90%', alignItems: 'center', top: 100, left: 20 }} />
            }



            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', height: 70, backgroundColor: 'white', elevation: 4, bottom: 0, position: 'absolute', width: '100%' }}>
                <View style={{ borderWidth: 2, borderRadius: 5, borderColor: 'rgba(221, 221, 221, 1)', width: 170, height: 40, top: 10 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Text style={{ textAlign: 'center', color: '#525252', fontWeight: 'bold', top: 8, fontFamily: 'Oswald', fontSize: 16 }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                <View >
                    <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ width: 170, height: 40, borderRadius: 5, top: 10 }}>
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
                                        <Text style={{ fontWeight: 'bold', fontSize: 24, color: '#6F6F6F', textAlign: 'center' }}>Media Uploaded</Text>
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


                            
                        {uploadedFileType === 'image/jpeg' ?(
                            isloading ? (<View><ActivityIndicator 
                                visible={isloading}
                                size='large'
                                color='#B937FA'
                                style={{ flex: 1, opacity: 1, bottom: 300, right: 90 }}
                                textStyle={styles.spinnerTextStyle}
                            />
                            </View>
                            ) :
                            
                            (<TouchableOpacity onPress={() => ImageUploader()}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold', top: 8, fontFamily: 'Oswald', fontSize: 16, color: 'white' }}>Upload</Text>
                            </TouchableOpacity>)
                        )
                            :
                            (isloading ? (<View><ActivityIndicator
                                visible={isloading}
                                size='large'
                                color='#B937FA'
                                style={{ flex: 1, opacity: 1, bottom: 300, right: 90 }}
                                textStyle={styles.spinnerTextStyle}
                            />
                            </View>
                            ) :
                            <TouchableOpacity onPress={() => VideoUploader()}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold', top: 8, fontFamily: 'Oswald', fontSize: 16, color: 'white' }}>Upload</Text>
                            </TouchableOpacity>
                            )
                        }

                    </LinearGradient>
                </View>
            </View>



        </View>
    )
}

export default GalleryUploadContent;

const styles = StyleSheet.create({
    backbttn: {
        top: 30,
        left: 20
    },
    headertxt: {
        color: 'white',
        left: 40,
        top: 12,
        fontSize: 14,
        fontWeight: 'bold'
    },
    progress: {
        margin: 10,
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