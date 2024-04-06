import React, { useState, useEffect } from 'react'
import { View, Text, Image, FlatList, TouchableOpacity, ScrollView, Switch, StyleSheet } from 'react-native'
import images from '../../constant/Images'
import BillBoardAdminData from '../../Data/BillBoardData/BillBoardAdmin'
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const BillBoardAdmin = ({ navigation, route }) => {

    const [billboarddetail, setBillBoardDetail] = useState([])
    const [userDetail, setDetail] = useState(null)
    const { id } = route.params
    const { deviceId } = route.params
    const { lattitude } = route.params
    const { longitude } = route.params


    const InsightData = ({ item }) => {
        return (
            <View>
                <View>
                    <Image source={item.rectangle} style={{ margin: 10, left: 10, }} />
                </View>
                <View>
                    <Image source={item.image} style={{ left: 45, bottom: 70, }} />
                </View>
                <View>
                    <Text style={{ bottom: 65, fontWeight: 'bold', textAlign: 'center', left: 10, color: 'black' }}>
                        {item.title}
                    </Text>
                </View>
                <View>
                    <Text style={{ bottom: 68, fontSize: 10, fontWeight: 'bold', textAlign: 'center', left: 10 }}>{item.subtitle} </Text>
                </View>
            </View>
        )
    }


    const BillBoardDetail = async () => {
        try {
            const resp = await axios.get(`/api/billboard/getbillboardbyid/${id}`);
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
            <ScrollView>
                <View style={{ backgroundColor: 'white', elevation: 4, top: '1%' }}>
                    <Text style={{ color: '#525252', fontWeight: 'bold', fontSize: 15, left: 20, fontFamily: 'Oswald' }}>{billboarddetail?.billboardName}</Text>
                    <Text style={{ color: '#6F6F6F', fontWeight: 'bold', left: 20 }}>{billboarddetail?.fullAddress}</Text>

                    <View style={{ top: 20, right: 5 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Map', { lattitude: lattitude, longitude: longitude, billboardname: billboarddetail?.billboardName })}>
                            <Text style={{ left: 20, backgroundColor: '#F7F8FD', width: 120, borderRadius: 5, height: 25, bottom: 5, fontWeight: 'bold', color: 'black' }}>        View on Map</Text>
                        </TouchableOpacity>
                        <Image source={images.map} style={{ left: 30, bottom: 27 }} />
                    </View>
                </View>


                <View style={{ backgroundColor: 'white', elevation: 4, top: '2%', height: '20%' }}>
                    <Text style={{ color: '#525252', fontFamily: 'Oswald', fontWeight: 'bold', fontSize: 16, left: 20, top: '5%' }}>Insights</Text>
                    <FlatList
                        data={BillBoardAdminData}
                        renderItem={InsightData}
                        horizontal={true}
                        style={{}}
                        showsHorizontalScrollIndicator={false} />
                </View>


                <View style={{ backgroundColor: 'white', elevation: 4, top: '3%' }} >
                    <Text style={{ fontWeight: 'bold', left: 20, color: 'black', fontSize: 16, top: 5, }}>About Billboard</Text>
                    <View style={{ top: '10%' }}>
                        <View style={{ flexDirection: 'row', }}>
                            <Text style={{ fontWeight: 'bold', left: 20, color: '#B5B5C3', fontSize: 12, }}>UID :</Text>
                            <Text style={{ left: 118, color: 'black' }}>{billboarddetail.billboardId}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', }}>
                            <Text style={{ fontWeight: 'bold', left: 20, color: '#B5B5C3', fontSize: 12, }}>Type :</Text>
                            <Text style={{ left: 110, color: 'black' }}>{billboarddetail.billboardType}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold', left: 20, color: '#B5B5C3', fontSize: 12, }}>Venue :</Text>
                            <Text style={{ left: 100, color: 'black' }}>{billboarddetail.venueType}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold', left: 20, color: '#B5B5C3', fontSize: 12, }}>Time Slot :</Text>
                            <Text style={{ left: 80, color: 'black' }}></Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold', left: 20, color: '#B5B5C3', fontSize: 12, }}>SAPA.ai Time :</Text>
                            <Text style={{ left: 55, color: 'black' }}>0</Text>
                        </View>

                        <View>
                            <Text style={{ fontWeight: 'bold', margin: 10, color: 'black', bottom: 10 }}>{billboarddetail.aboutBillboard}</Text>
                        </View>



                    </View>
                </View>


                <View style={{ backgroundColor: 'white', elevation: 4, top: '4%', marginBottom: 30 }}>
                    <View style={{ flexDirection: 'row', }} >
                        <Text style={{ left: 20, top: 5, color: 'black', fontWeight: 'bold', fontSize: 16 }}>About Device</Text>
                        <Text style={{ left: 40, top: 5, color: '#525252', fontWeight: 'bold' }}>Online</Text>
                        <Text style={{ left: 60, top: 5, color: '#525252', fontWeight: 'bold' }}>56</Text>
                        <Switch
                            style={{ left: 210 }}
                        />
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold', left: 20, ccolor: '#B5B5C3', fontSize: 12, }}>Device ID :</Text>
                            <Text style={{ left: 82, color: 'black' }}>{billboarddetail?.deviceId?.deviceUID}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold', left: 20, color: '#B5B5C3', fontSize: 12, }}>Device Name :</Text>
                            <Text style={{ left: 58, color: 'black' }}>{billboarddetail?.deviceId?.deviceName}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold', left: 20, color: '#B5B5C3', fontSize: 12, }}>Device Sensor :</Text>
                            <Text style={{ left: 55, color: 'black' }}>NaN</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold', left: 20, color: '#B5B5C3', fontSize: 12, }}>Added By :</Text>
                            <Text style={{ left: 85, color: 'black' }}></Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold', left: 20, color: '#B5B5C3', fontSize: 12, }}>Added On :</Text>
                            <Text style={{ left: 83, color: 'black' }}></Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold', left: 20, color: '#B5B5C3', fontSize: 12, }}>Owner :</Text>
                            <Text style={{ left: 105, color: 'black' }}>{userDetail?.firstName}</Text>
                        </View>

                    </View>
                </View>
            </ScrollView>


            <View style={styles.footerContainer}>
                <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']}>

                    <View style={styles.footer}>
                        <TouchableOpacity onPress={() => navigation.navigate('PostAdd', { id: id, deviceMacId: billboarddetail.deviceId.macId, billboardname: billboarddetail?.billboardName, billboardaddress: billboarddetail?.fullAddress })}>
                            <Text style={styles.sorttxt}>Post my ad</Text>
                        </TouchableOpacity>

                    </View>
                </LinearGradient>
            </View>
        </View>
    )
}

export default BillBoardAdmin;

const styles = StyleSheet.create({
    footerContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 0


    },
    footer: {

        elevation: 50,
        height: 50,

    },
    sorttxt: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        top: 10,
        textAlign: 'center'

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
        padding: 75,
        bottom: 170,
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
        // padding: 10,
        // elevation: 2,
        // top: 20

    },
    buttonOpen: {
        // backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
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
        color: 'black'
    }

})