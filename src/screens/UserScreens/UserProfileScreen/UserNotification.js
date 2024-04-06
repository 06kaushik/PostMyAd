import React, { useState, useContext, useEffect } from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import images from "../../../constant/Images";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { adminRequest } from "../AxiosInstance";

const UserNotification = ({ navigation }) => {

    const [userDetail, setDetail] = useState(null)
    const [notification, setNotification] = useState([])
    console.log('NOTIIIIIII DATAA', notification);




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

    const getNotification = async () => {
        try {
            const resp = await adminRequest.get(`/api/notification/getallnotification?userId=${userDetail?._id}&status=Unread`)
            // console.log('RESPONSE FROM NOTIFICATION API', resp.data.msg);
            setNotification(resp.data.msg)


        } catch (error) {
            console.log('ERROR FROM NOTIFICATION API', error);


        }
        chnageStatus()
    }
    

    useEffect(() => {
        getNotification()
    }, [userDetail?._id,notification[0]?._id])


    //////////// CHANGE STATUS ///////

    const chnageStatus = async () => {
        let body = {
            notificationId: notification[0]?._id,
        }
        try {
            const resp = await adminRequest.post('/api/notification/changeStatusToRead', body)
            console.log('response from chnage status', resp.data.msg);

        } catch (error) {
            console.log('ERROR FROM CHNAGE STATUS', error);

        }

    }



    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('UserDetailScreen', { OrderDetail: item?.detailPage })}>
                <View style={{ backgroundColor: 'white', marginTop: 16, borderRadius: 8, marginLeft: 16, marginRight: 16, height: 100 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ height: 300, width: 300, bottom: 73, right: 100, }} source={{ uri: item?.image }} />
                        <Text style={{ right: 200, fontFamily: 'Oswald-Bold', color: 'black', top: 20, fontSize: 16 }}>{item.message}</Text>
                        <Text style={{ right: 380, top: 50, color: '#6D787D', fontFamily: 'Oswald-Bold' }}>#{item?.detailPage}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.main}>
            <View>
                <View style={{ height: 60, backgroundColor: 'rgba(183,54,248,255)' }}>
                    <TouchableOpacity onPress={() => navigation.goBack('')}>
                        <View style={styles.header} >
                            <Image style={styles.back} source={images.back} />
                            <Text style={styles.sec}>Notifications</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>

            {notification.length > 0 ?
                <View>
                    <FlatList
                        data={notification}
                        renderItem={renderItem}
                    />
                </View>
                :
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ color: 'black', alignSelf: 'center', fontSize: 20, fontFamily: 'Oswald-Bold' }}>No Notification To Show</Text>
                </View>
            }


        </View>
    )
}

export default UserNotification

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        marginTop: 18
    },
    back: {
        marginLeft: 16,
        marginTop: 8
    },
    sec: {
        marginLeft: 8,
        color: '#FFFFFF',
        fontFamily: 'Oswald-SemiBold',
        fontSize: 18
    },
    titletxt: {
        color: '#6F6F6F',
        fontFamily: 'Oswald-Bold',
        fontSize: 16,
        marginLeft: 16
    },
    cont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16
    },
    bbtn: {
        color: 'white',
        fontFamily: 'Oswald-SemiBold',
        textAlign: 'center',
        top: 2
    }
})