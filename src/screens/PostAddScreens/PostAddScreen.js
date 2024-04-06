import React, { useState, useEffect } from "react";
import { StatusBar, Text, View, Image, StyleSheet, TextInput, TouchableOpacity, Pressable } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import images from "../../constant/Images";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";



const PostAddScreen = ({ navigation, route }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
    const [name, setName] = useState('');
    const [about, setAbout] = useState('')
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [etime, setEndTime] = useState('')
    const [billboarddetail, setBillBoardDetail] = useState([])
    const [userDetail, setDetail] = useState(null)
    const { id } = route.params
    const { deviceMacId } = route.params
    const {billboardname} = route.params
    const {billboardaddress} = route.params


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const showEndTimePicker = () => {
        setEndTimePickerVisibility(true);
    };

    const hideEndTimePicker = () => {
        setEndTimePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.log('A date has been picked: ', date);
        setDate(date);
        hideDatePicker();
    };

    const handleConfirmTime = (time) => {
        console.log("A time has been start picked: ", time.toString().slice(15, 25));
        setTime(time)
        hideTimePicker();
    };

    const handleConfirmEndTime = (etime) => {
        console.log("A time has been end picked: ", etime.toString().slice(15, 25));
        setEndTime(etime)
        hideEndTimePicker();
    };

    const BillBoardDetail = async () => {
        try {
            const resp = await axios.get(`/api/billboard/getbillboardbyid/${id}`);
            console.log("Get All BillBoards Detail ==> ", resp.data.msg.deviceId.macId);
            setBillBoardDetail(resp.data.msg)
            // await AsyncStorage.setItem('TOKEN', JSON.stringify(resp.data.token))

        } catch (err) {
            // Handle Error Here
            console.error("error from Billboard Detail ==> ", err);
        }
    }

    useEffect(() => {
        BillBoardDetail()

    }, [])

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



    return (
        <View style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>
            <StatusBar hidden={true} />
            <View>
                <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ height: 60 }}>
                <TouchableOpacity onPress={() => navigation.navigate('BillBoardAdmin',{id:id, uri: billboarddetail?.filesArr[0]?.fileurl})}>

                        <View style={{marginTop:'8%'  }}>
                            <Image source={images.back} style={{marginLeft:8,}} />
                            </View>
                            </TouchableOpacity>
                            <View>
                            <Text style={{alignSelf:'center',bottom:19,fontFamily:'Oswald-Bold',color:'white'}}>All Smart Bilboards</Text>
                            </View>
                        
                    

                </LinearGradient>
            </View>


            <View >
                <Text style={{ fontSize: 24, fontWeight: 'bold', fontFamily: 'Oswald', color: '#525252', left: 20, top: 20, textDecorationLine: 'underline', }}>Post AD</Text>
            </View>

            <View style={{ top: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', fontFamily: 'Oswald', color: '#525252', top: 40, left: 20 }}>Give it a name</Text>
                <TextInput
                    style={{ top: 60, width: '90%', left: 20, borderRadius: 10, height: 40, paddingLeft: 10, borderWidth: 1, borderColor: '#DDDDDD', color: '#000000' }}
                    placeholderTextColor='#000000'
                    value={name}
                    onChangeText={setName}
                />
            </View>


            <View style={{ top: 70 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', fontFamily: 'Oswald', color: '#525252', top: 40, left: 20 }}>Tell us about Ad (optional)</Text>
                <TextInput
                    multiline={true}
                    placeholderTextColor='#000000'
                    style={{ top: 60, width: '90%', left: 20, borderRadius: 10, height: 140, paddingLeft: 10, borderWidth: 1, borderColor: '#DDDDDD', color: '#000000' }}
                    value={about}
                    onChangeText={setAbout}
                />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', height: 70, backgroundColor: 'white', elevation: 4, bottom: 0, position: 'absolute', width: '100%' }}>
                <View style={{ borderWidth: 2, borderRadius: 5, borderColor: 'rgba(221, 221, 221, 1)', width: 170, height: 40, top: 10 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('BillBoardAdmin',{id: id,uri:billboarddetail?.filesArr[0]?.fileurl})}>
                        <Text style={{ textAlign: 'center', color: '#525252', fontWeight: 'bold', top: 8, fontFamily: 'Oswald', fontSize: 16 }}>Back</Text>
                    </TouchableOpacity>
                </View>
                <View >
                    <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ width: 170, height: 40, borderRadius: 5, top: 10 }}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            hasBackdrop={true}
                            backdropOpacity={0.75}
                            isVisible={modalVisible}

                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={styles.modalText}>Date & Time</Text>
                                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                            <Image source={images.cross} style={styles.cross} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ backgroundColor: 'white', height: 40, bottom: 40,  borderRadius: 5, borderWidth: 1 }}>
                                        <TouchableOpacity onPress={showDatePicker}>
                                            <Text style={{ textAlign: 'center', top: 7, color: 'black', right: 25 }}>{date ? date.toString("yyyy-MM-dd").slice(4, 10) : 'Start Date'}</Text>
                                            <Image source={images.calender} style={{ bottom: 13, left: 140 }} />
                                            <DateTimePickerModal
                                                isVisible={isDatePickerVisible}
                                                mode="date"
                                                onConfirm={handleConfirm}
                                                onCancel={hideDatePicker}
                                            />
                                        </TouchableOpacity>

                                    </View>
                                    <View style={{ backgroundColor: 'white', height: 40, bottom: 30, borderRadius: 5, borderWidth: 1 }}>
                                        <TouchableOpacity onPress={showTimePicker}>
                                            <Text style={{ textAlign: 'center', top: 7, color: 'black', right: 25 }}>{time ? time.toLocaleTimeString() : 'Start Time'}</Text>
                                            <Image source={images.clock} style={{ bottom: 13, left: 140 }} />
                                            <DateTimePickerModal
                                                isVisible={isTimePickerVisible}
                                                mode="time"
                                                onConfirm={handleConfirmTime}
                                                onCancel={hideTimePicker}
                                            />
                                        </TouchableOpacity>

                                    </View>
                                    <View style={{ backgroundColor: 'white', height: 40, bottom: 20, borderRadius: 5, borderWidth: 1 }}>
                                        <TouchableOpacity onPress={showEndTimePicker}>
                                            <Text style={{ textAlign: 'center', top: 7, color: 'black', right: 25 }}>{etime ? etime.toLocaleTimeString() : 'End Time'}</Text>
                                            <Image source={images.clock} style={{ bottom: 13, left: 140 }} />
                                            <DateTimePickerModal
                                                isVisible={isEndTimePickerVisible}
                                                mode="time"
                                                onConfirm={handleConfirmEndTime}
                                                onCancel={hideEndTimePicker}
                                            />
                                        </TouchableOpacity>

                                    </View>

                                    <Pressable
                                        style={[styles.buttonClose]}
                                        onPress={() => setModalVisible(!modalVisible) || navigation.navigate('AddContentScreen', {
                                            scheduleDate: date,
                                            startscheduletime: time.toString().slice(15, 25),
                                            endscheduletime: etime.toString().slice(15, 25),
                                            billBoardId: id,
                                            videoname: 'video',
                                            deviceMacId: deviceMacId,
                                            filetype: 'MP3',
                                            adTitle: name,
                                            aboutAd: about,
                                            deviceId: billboarddetail.deviceId._id,
                                            billboardname:billboardname,
                                            billboardaddress: billboardaddress

                                        })}
                                    >
                                        <View>
                                            <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} >
                                                <Text style={styles.textStyle}>Next</Text>
                                            </LinearGradient>
                                        </View>


                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', top: 8, fontFamily: 'Oswald', fontSize: 16, color: 'white' }}>Continue</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>



        </View>
    )
}

export default PostAddScreen;

const styles = StyleSheet.create({
    header: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#525252',
        left: 20,
        top: 25

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",

    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 75,
        bottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

    },
    buttonOpen: {
        // backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        top: 40
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        height: 30,
        top: 5,
    },
    modalText: {

        textAlign: "center",
        bottom: 70,
        fontWeight: 'bold',
        color: 'black',
        left: 40,
        fontSize:17
    },
    cross: {
        bottom: 70,
        left: 50

    }
})