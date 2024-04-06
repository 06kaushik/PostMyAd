import React, { useState, useEffect } from "react";
import { StatusBar, Text, View, Image, StyleSheet, TextInput, TouchableOpacity, Pressable, Alert,ToastAndroid } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import images from "../../../constant/Images";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";
import moment from "moment";




const UserPostAddScreen = ({ navigation, route }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [about, setAbout] = useState('')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(new Date());
    const { item } = route.params
    const [sec, setSec] = useState("");
    console.log('sec', sec.length);
    const [min, setMin] = useState("");
    console.log('MIN', min.length);
    const [minsec, setMinSec] = useState('')
    console.log('HDDODHDLHL', minsec);



    useEffect(() => {
        let MinToSec = min * 60
        setMinSec(MinToSec)


    }, [min, sec])

    let startscheduleDate = moment(date?.toString()).format().slice(0, 10)
    console.log('dateee Add content', startscheduleDate);

    let AddMinSec = Number(min) * Number(30)
    console.log('ADDDEDD', AddMinSec);


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.log('A date has been picked: ', date);
        setDate(date);
        hideDatePicker();
    };

    const handleContinue = () => {
        if (name.length > 0 && about.length > 0) {
            setModalVisible(true)

        } else {
            ToastAndroid.show("Fields cannot be Empty!", ToastAndroid.LONG, ToastAndroid.BOTTOM);

        }
    }

    const handleNext = () => {
        if (min.length > 0 ) {
            setModalVisible(!modalVisible)
            navigation.navigate('AgencyTimeSlot',
                {
                    scheduleDate: date,
                    duration: AddMinSec,
                    billBoardName: item?.billboardName,
                    address: item?.city,
                    basePrice: item?.basePrice,
                    billBoardData: item,
                    name: name,
                    about: about,
                    billData: item,
                    min:min,
                    startscheduleDate:startscheduleDate
                }
            )

        } else {
            ToastAndroid.show("SELECT REPEATITION !", ToastAndroid.LONG, ToastAndroid.CENTER);

        }
    }


    return (
        <View style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>
            <StatusBar hidden={true} />
            <View>
                <View style={{ height: 78, backgroundColor: 'rgba(183,54,248,255)' }}>
                    <TouchableOpacity onPress={() => navigation.goBack('UserBillBoard')}>

                        <View style={{ marginTop: '8%' }}>
                            <Image source={images.back} style={{ marginLeft: 16, top: 5 }} />
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={{ alignSelf: 'center', bottom: 19, fontFamily: 'Oswald-Bold', color: 'white', fontSize: 18 }}>All Smart Bilboards</Text>
                    </View>
                </View>
            </View>


            <View >
                <Text style={{ fontSize: 24, fontWeight: 'bold', fontFamily: 'Oswald', color: '#525252', left: 20, top: 20, textDecorationLine: 'underline', }}>Post AD</Text>
            </View>

            <View style={{ top: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', fontFamily: 'Oswald', color: '#525252', top: 40, left: 20 }}>Give it a name*</Text>
                <TextInput
                    style={{ top: 60, width: '90%', left: 20, borderRadius: 10, height: 40, paddingLeft: 10, borderWidth: 1, borderColor: '#DDDDDD', color: '#000000' }}
                    placeholderTextColor='#000000'
                    value={name}
                    onChangeText={setName}
                />
            </View>


            <View style={{ top: 70 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', fontFamily: 'Oswald', color: '#525252', top: 40, left: 20 }}>Tell us about Ad*</Text>
                <TextInput
                    multiline={true}
                    placeholderTextColor='#000000'
                    style={{ top: 60, width: '90%', left: 20, borderRadius: 10, height: 140, paddingLeft: 10, borderWidth: 1, borderColor: '#DDDDDD', color: '#000000', paddingBottom: 100 }}
                    value={about}
                    onChangeText={setAbout}
                />
            </View>

            <View style={styles.footerContainer}>
                <View style={{ height: 60, backgroundColor: 'rgba(183,54,248,255)' }}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        hasBackdrop={true}
                        backdropOpacity={0.75}
                        isVisible={modalVisible}
                        onBackdropPress={() => setModalVisible(false)}

                        

                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: 10 }}>
                                    <Text style={styles.modalText}>Date & Repetition</Text>
                                    {/* <TouchableOpacity onPress={() => setModalVisible(false)}>
                                        <Image source={images.cross} style={styles.cross} />
                                    </TouchableOpacity> */}
                                </View>
                                <View style={{ backgroundColor: 'white', height: 50, bottom: 40, width: 300, borderRadius: 5, borderWidth: 1, alignSelf: 'center', borderColor: '#6D787D' }}>
                                    <Text style={{ position: 'absolute', top: -13, left: 15, backgroundColor: 'white', color: 'black', fontFamily: 'Oswald-Bold' }}>Date</Text>
                                    <TouchableOpacity onPress={showDatePicker}>
                                        <Text style={{ top: 15, color: '#6D787D', fontSize: 16, marginLeft: 16 }}>{date ? date.toString("yyyy-MM-dd").slice(4, 10) : 'Start Date'}</Text>
                                        <Image source={images.calender} style={{ bottom: 13, left: 260, height: 30, width: 30 }} />
                                        <DateTimePickerModal
                                            isVisible={isDatePickerVisible}
                                            mode="date"
                                            onConfirm={handleConfirm}
                                            onCancel={hideDatePicker}
                                            minimumDate= {new Date()}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View style={{ backgroundColor: 'white', height: 60, width: 300, borderRadius: 5, borderWidth: 1, alignSelf: 'center', borderColor: '#6D787D' }}>
                                    <Text style={{ position: 'absolute', top: -13, left: 15, backgroundColor: 'white', color: 'black', fontFamily: 'Oswald-Bold' }}>Repetition</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ marginLeft: 16, marginTop: 15, flexDirection: 'row' }}>
                                            <Text style={{ fontSize: 14, color: '#222222', fontFamily: 'Oswald-Bold'}}>Seconds</Text>
                                            <Text style={{ borderWidth: 1, borderColor: '#6D787D', width: 32, left: 5, paddingLeft: 6, borderRadius: 5,height:32,paddingTop:5,color:'#212121' }}>30</Text>
                                            <Text style={{color:'black',fontSize:20,fontWeight:'500'}}>    X</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                                            <View style={styles.dropDown}>
                                                <Picker
                                                    dropdownIconColor={'black'}
                                                    mode='dropdown'
                                                    itemStyle={{height:30}}
                                                    selectedValue={min}
                                                    style={{ bottom: 15 }}
                                                    onValueChange={(itemValue, itemIndex) => setMin(itemValue)}
                                                >
                                                   <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white' }} label="0" value="0" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="1" value="1" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="2" value="2" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="3" value="3" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="4" value="4" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="5" value="5" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="6" value="6" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="7" value="7" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="8" value="8" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="9" value="9" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="10" value="10" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="11" value="11" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="12" value="12" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="13" value="13" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="14" value="14" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="15" value="15" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="16" value="16" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="17" value="17" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="18" value="18" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="19" value="19" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="20" value="20" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="21" value="21" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="22" value="22" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="23" value="23" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="24" value="24" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="25" value="25" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="26" value="26" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="27" value="27" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="28" value="28" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="29" value="29" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="30" value="30" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="31" value="31" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="32" value="32" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="33" value="33" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="34" value="34" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="35" value="35" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="36" value="36" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="37" value="37" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="38" value="38" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="39" value="39" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="40" value="40" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="41" value="41" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="42" value="42" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="43" value="43" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="44" value="44" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="45" value="45" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="46" value="46" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="47" value="47" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="48" value="48" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="49" value="49" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="50" value="50" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="51" value="51" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="52" value="52" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="53" value="53" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="54" value="54" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="55" value="55" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="56" value="56" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="57" value="57" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="58" value="58" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="59" value="59" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="60" value="60" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="61" value="61" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="62" value="62" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="63" value="63" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="64" value="64" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="65" value="65" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold', backgroundColor:'white' }} label="66" value="66" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="67" value="67" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="68" value="68" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="69" value="69" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="70" value="70" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="71" value="71" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="72" value="72" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white' }} label="73" value="73" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="74" value="74" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white' }} label="75" value="75" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="76" value="76" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="77" value="77" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="78" value="78" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="79" value="79" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="80" value="80" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="81" value="81" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="82" value="82" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="83" value="83" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold', backgroundColor:'white' }} label="84" value="84" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold', backgroundColor:'white' }} label="85" value="85" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="86" value="86" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="87" value="87" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="88" value="88" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="89" value="89" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="90" value="90" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="91" value="91" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="92" value="92" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="93" value="93" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="94" value="94" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="95" value="95" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="96" value="96" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="97" value="97" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="98" value="98" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="99" value="99" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="100" value="100" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="101" value="101" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="102" value="102" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold', backgroundColor:'white' }} label="103" value="103" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold', backgroundColor:'white' }} label="104" value="104" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white' }} label="105" value="105" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="106" value="106" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold', backgroundColor:'white' }} label="107" value="107" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold', backgroundColor:'white' }} label="108" value="108" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold', backgroundColor:'white' }} label="109" value="109" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold', backgroundColor:'white' }} label="110" value="110" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="111" value="111" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold', backgroundColor:'white' }} label="112" value="112" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="113" value="113" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold', backgroundColor:'white' }} label="114" value="114" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="115" value="115" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold', backgroundColor:'white' }} label="116" value="116" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold', backgroundColor:'white' }} label="117" value="117" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold',backgroundColor:'white'  }} label="118" value="118" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold', backgroundColor:'white' }} label="119" value="119" />
                                                    <Picker.Item style={{ color: '#6D787D', fontFamily: 'Oswald-Bold', backgroundColor:'white' }} label="120" value="120" />
                                                </Picker>
                                            </View>
                                            <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Oswald-Bold', top: 14, left: 5 }}>Repeat</Text>
                                        </View>
                                    </View>

                                </View>

                                <Pressable
                                    style={[styles.buttonClose]}
                                    onPress={() => handleNext()}
                                >
                                    <View style={{alignSelf:'center',}}>
                                        <View style={{ backgroundColor: 'rgba(183,54,248,255)',height:40,width:296,borderRadius:5 }}>
                                            <Text style={styles.textStyle}>Next</Text>
                                        </View>
                                    </View>


                                </Pressable>
                            </View>
                        </View>
                    </Modal>

                    <View style={styles.footer}>
                        <TouchableOpacity onPress={() => handleContinue()}>
                            <Text style={styles.sorttxt}>Continue</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>



        </View>
    )
}

export default UserPostAddScreen;

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
        top: 40,
        width: 260,
        alignSelf: 'center',
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        height: 30,
        top: 8,
        fontSize:16
    },
    modalText: {

        textAlign: "center",
        bottom: 70,
        fontWeight: 'bold',
        color: 'black',
        left: 15,
        fontSize: 17
    },
    cross: {
        bottom: 70,
        left: 50

    },
    footerContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 0
    },
    sorttxt: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        top: 15,
        textAlign: 'center'

    },
    dropDown: {
        height:32,
        width: 110,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#6D787D',
        top: 13.5,
        

    },
    dropDown1: {
        height: 24,
        width: 133,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        backgroundColor: '#dddddd',
        marginLeft: 8
    },
    dropdownheader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginTop: 10
        alignSelf: 'center'
    },
})