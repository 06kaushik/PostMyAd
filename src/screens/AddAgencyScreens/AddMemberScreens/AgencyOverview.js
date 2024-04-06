import React, { useState, useContext, useEffect, useRef } from 'react'
import { View, Text, StatusBar, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator, Alert, ToastAndroid } from 'react-native'
import images from '../../../constant/Images'
import LinearGradient from 'react-native-linear-gradient';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import RBSheet from "react-native-raw-bottom-sheet";
import Lottie from 'lottie-react-native';



const AgencyOverview = ({ route, navigation }) => {

    const { memberData } = route.params
    console.log('MEMBER DATAA', memberData);
    const refRBSheet = useRef();


    const deleteMember = () => {
        let body = {
            agencyId: memberData?.agencyId,
            userId: memberData?.userId

        }
        console.log('RESPONSE FROM DELETE MEMBER BODY', body);

        const requestDelete = async () => {
            const resp = await axios.post('/admin/adagency/deleteAgencyMemberProfile', body)
            console.log('RESPONSE FROM DELETE MEMBER API', resp.data.msg);
        }
        requestDelete()
    }


    const showConfirmDialog = (uniquename, videoname) => {
        return Alert.alert(
            "Delete Member ?",
            "Are you sure you want to DELETE MEMBER ?",
            [
                // The "Yes" button
                {
                    text: "Yes",
                    onPress: () => {
                        deleteMember()
                        //         navigation.goBack('')
                        // ToastAndroid.show("Member Deleted SUCCESSFULLY !", ToastAndroid.LONG, ToastAndroid.CENTER);


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
        <View style={styles.mainContainer}>
            <ScrollView>

                <View style={styles.container1}>
                    <View>
                        <Text style={styles.title}>Personal Information</Text>
                    </View>
                    <View style={styles.container2}>
                        <Text style={styles.name}> First Name</Text>
                        <View style={{ marginTop: 8 }}>
                            <TextInput
                                placeholder=""
                                placeholderTextColor={'grey'}
                                value={memberData?.firstName}
                                style={styles.textInput} />
                        </View>
                    </View>
                    <View style={styles.container2}>
                        <Text style={styles.name}>Last Name</Text>
                        <View style={{ marginTop: 8 }}>
                            <TextInput
                                placeholder=""
                                placeholderTextColor={'grey'}
                                value={memberData?.lastName}
                                style={styles.textInput} />
                        </View>
                    </View>
                    <View style={styles.container2}>
                        <Text style={styles.name}>Email</Text>
                        <View style={{ marginTop: 8 }}>
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor={'grey'}
                                value={memberData?.email}
                                style={styles.textInput} />
                        </View>
                    </View>
                    <View style={styles.container2}>
                        <Text style={styles.name}>Phone Number</Text>
                        <View style={{ marginTop: 8 }}>
                            <TextInput
                                placeholder=""
                                placeholderTextColor={'grey'}
                                value={memberData?.mobileNumber.toString()}
                                style={styles.textInput} />
                        </View>
                    </View>
                    <View style={{ marginTop: 12 }}>
                        <Text style={styles.name}>Location</Text>
                        <View style={{ marginTop: 8 }}>
                            <TextInput
                                placeholder="Location"
                                placeholderTextColor={'grey'}
                                value={memberData?.location}
                                style={styles.textInput} />
                        </View>
                    </View>
                    <View style={{ marginTop: 12 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ color: '#A3A3A3', fontSize: 14, fontFamily: 'Oswald-Bold', marginLeft: 16 }}>Pin Code</Text>
                                <View style={{ marginTop: 8 }}>
                                    <TextInput
                                        placeholder="Pin Code"
                                        placeholderTextColor={'grey'}
                                        value={memberData?.pincode}
                                        style={{
                                            color: '#525252',
                                            fontFamily: 'Oswald-Regular',
                                            backgroundColor: '#F7F8FD',
                                            marginLeft: 20,
                                            width: 154,
                                            height: 35,
                                            borderRadius: 8,
                                            paddingLeft: 15,
                                            paddingTop: 3
                                        }} />
                                </View>
                            </View>
                            <View>
                                <Text style={{ color: '#A3A3A3', fontSize: 14, fontFamily: 'Oswald-Bold', marginRight: '30%' }}>City</Text>
                                <View style={{ marginTop: 8 }}>
                                    <TextInput
                                        placeholder="City"
                                        placeholderTextColor={'grey'}
                                        value={memberData?.city}
                                        style={{
                                            color: '#525252',
                                            fontFamily: 'Oswald-Regular',
                                            backgroundColor: '#F7F8FD',
                                            marginRight: 20,
                                            width: 154,
                                            height: 35,
                                            borderRadius: 8,
                                            paddingTop: 5
                                        }} />
                                </View>

                            </View>
                        </View>
                    </View>

                    <View style={{ marginTop: 12 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ color: '#A3A3A3', fontSize: 14, fontFamily: 'Oswald-Bold', marginLeft: 16 }}>State</Text>
                                <View style={{ marginTop: 8 }}>
                                    <TextInput
                                        placeholder="State"
                                        placeholderTextColor={'grey'}
                                        style={{
                                            color: '#525252',
                                            fontFamily: 'Oswald-Regular',
                                            backgroundColor: '#F7F8FD',
                                            marginLeft: 20,
                                            width: 154,
                                            height: 35,
                                            borderRadius: 8,
                                            paddingLeft: 15,
                                            paddingTop: 3
                                        }} />
                                </View>
                            </View>
                            <View>
                                <Text style={{ color: '#A3A3A3', fontSize: 14, fontFamily: 'Oswald-Bold', marginRight: '30%' }}>Country</Text>
                                <View style={{ marginTop: 8 }}>
                                    <TextInput
                                        placeholder="Country"
                                        placeholderTextColor={'grey'}
                                        value={memberData?.country}
                                        style={{
                                            color: '#525252',
                                            fontFamily: 'Oswald-Regular',
                                            backgroundColor: '#F7F8FD',
                                            marginRight: 20,
                                            width: 154,
                                            height: 35,
                                            borderRadius: 8,
                                            paddingTop: 5
                                        }} />
                                </View>

                            </View>
                        </View>
                    </View>

                    <View style={{ marginTop: 12, marginBottom: 100 }}>
                        <Text style={styles.name}>Adhar Card Number</Text>
                        <View style={{ marginTop: 8 }}>
                            <TextInput
                                placeholder="Adhar Card Number"
                                placeholderTextColor={'grey'}
                                style={styles.textInput} />
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={{ flex: 1 }}>
                <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ height: 60, width: '100%', bottom: 0, position: 'absolute' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <TouchableOpacity onPress={() => refRBSheet?.current?.open()}>
                            <Image style={styles.bttn} source={images.contactgroup} />
                            <RBSheet
                                ref={refRBSheet}
                                closeOnDragDown={true}
                                height={200}
                                closeOnPressMask={true}
                                animationType={'slide'}
                                customStyles={{
                                    // wrapper: {
                                    //     backgroundColor: "transparent"
                                    // },
                                    draggableIcon: {
                                        backgroundColor: "#000"
                                    }
                                }}>
                                <View>
                                    <Text style={{ textAlign: 'center', fontSize: 20, color: 'black', fontFamily: 'Oswald-Bold' }}>Contact Us</Text>
                                </View>
                                <View style={{ borderWidth: 1, borderColor: '#DDDDDD', marginLeft: 16, marginRight: 16, marginTop: 8 }} />
                                <View style={{ marginLeft: 30, marginTop: 20, }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Lottie source={require('../../../assets/data-4.json')} autoPlay loop style={{ height: 25, width: 25, top: 3 }} />
                                        <Text style={{ fontFamily: 'Oswald-Regular', fontSize: 16, color: 'black', margin: 5 }}>Email Id :  {memberData?.email}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', right: 18 }}>
                                        <Lottie source={require('../../../assets/data-5.json')} autoPlay loop style={{ height: 45, width: 45, left: 4 }} />
                                        <Text style={{ fontFamily: 'Oswald-Regular', fontSize: 16, color: 'black', margin: 5 }}>Mobile :    {memberData?.mobileNumber.toString()} </Text>
                                    </View>
                                </View>
                            </RBSheet>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => showConfirmDialog()}>
                            <Image style={styles.bttn1} source={images.deletegroup} />
                        </TouchableOpacity>
                    </View>

                </LinearGradient>
            </View>

        </View>
    )
}
export default AgencyOverview

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',


    },
    bttn: {
        marginLeft: 16
    },
    bttn1: {
        marginRight: 16
    },
    container1: {
        backgroundColor: 'white',
        elevation: 4,
        marginTop: 10
    },
    title: {
        color: 'black',
        marginLeft: 16,
        fontFamily: 'Oswald-Bold',
        fontSize: 18
    },
    name: {
        color: '#A3A3A3',
        fontSize: 14,
        fontFamily: 'Oswald-Bold',
        marginLeft: 16
    },
    container2: {
        marginTop: 12
    },
    textInput: {
        color: '#525252',
        fontFamily: 'Oswald-Regular',
        backgroundColor: '#F7F8FD',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 8,
        paddingLeft: 15

    }

})