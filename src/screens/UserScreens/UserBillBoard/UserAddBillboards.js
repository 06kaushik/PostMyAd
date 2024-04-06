import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, ScrollView, Switch, StyleSheet, Pressable, ActivityIndicator, Alert } from 'react-native'
import images from "../../../constant/Images";
import axios from 'axios';
import Modal from "react-native-modal";
import CheckBox from '@react-native-community/checkbox';
import { adminRequest } from "../AxiosInstance";



const AddBillboards = ({ navigation, route }) => {

    const [check, setChecked] = useState(false);
    const [deviceidarray, setDeviceIdArray] = useState([]);
    const [MacId, setMacId] = useState([])
    const [seeAllBillBoard, setSeeAllBillBoard] = useState([])
    const { scheduleDate } = route.params
    console.log('date', scheduleDate);
    const { duration } = route.params
    const { selectTime } = route.params
    const {basePrice} = route.params
    const {amount} = route.params
    const {billBoardName} = route.params
    const {address} = route.params
    const {deviceId} = route.params
    const {billboardId} = route.params
    const {deviceMacId} = route.params
    const {Videofiletype} = route.params
    const {adTitle} = route.params
    const {aboutAd} = route.params
    const {timeslot} = route.params
    const {date} = route.params
    const {videoname} = route.params
    const {VideoOriginalName} = route.params
    const {videoUri} = route.params
    const {imageUrl} = route.params
    const {imageFileType} = route.params
    const {imageName} = route.params
    const {imagestring} = route.params

    function storeDeviceId(e, x, i) {
        let storeArr = [...deviceidarray];
        let index = storeArr.findIndex((item) => (item === e))
        // console.log("== Check index ==", index);
        if (index === -1) {
            storeArr.push(e)
        } else {
            storeArr.splice(index, 1)
        }
        setDeviceIdArray(storeArr)

    }

    function storeMacId(e, x, i) {
        let storeArr = [...MacId];
        let index = storeArr.findIndex((item) => (item === e))
        // console.log("== Check index ==", index);
        if (index === -1) {
            storeArr.push(e)
        } else {
            storeArr.splice(index, 1)
        }
        setMacId(storeArr)

    }


    useEffect(() => {
        console.log('DEVICE ARRAY ID ', deviceidarray);

    }, [deviceidarray])

    const getBillBoards = async () => {
        try {
            const resp = await adminRequest.get("api/billboard/getallbillboard");
            setSeeAllBillBoard(resp.data.msg)
        } catch (err) {
            // Handle Error Here
            console.error("error from Billboard ==> ", err);
        }
    }

    useEffect(() => {
        getBillBoards()

    }, [])
    const Bilboard = ({ item }) => {
        return (
            <View style={styles.box}>
                <View>
                    <TouchableOpacity>
                        <Image style={{ height: 120, width: '100%', borderTopLeftRadius: 6, borderTopRightRadius: 6 }} source={{ uri: item?.filesArr[0]?.fileurl }} />
                    </TouchableOpacity>
                    <View style={{ left: 10 }}>
                        <Text style={{ color: 'black', fontSize: 16, fontFamily: 'Oswald-Bold', }}>{item.billboardName}</Text>
                    </View>
                    <View style={{ left: 10, bottom: 5 }}>
                        <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Oswald-Regular', top: 4 }}>{item.city}</Text>
                    </View>
                    <View style={{}}>
                        <Text style={styles.price}>₹ {item.basePrice}/sec</Text>
                    </View>
                    {/* <View style={{ backgroundColor: 'red', width: '30%', borderRadius: 5, left: 115, bottom: 180 }}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>Live</Text>
                    </View> */}
                </View>

                {deviceidarray.includes(item.deviceId._id) ?
                    <CheckBox
                        // disabled={true}

                        value={true}
                        onValueChange={(tick) => {
                            setChecked(tick)
                            console.log('NEW VALUEeessss', item.deviceId._id);
                            // setDeviceIdArray([...deviceidarray, item._id])
                            storeDeviceId(item.deviceId._id)
                            storeMacId(item.deviceId.macId)


                        }}

                        style={{ alignSelf: 'flex-end', bottom: 190 }}
                    />
                    :
                    <CheckBox
                        // disabled={fals

                        value={false}
                        onValueChange={(tick) => {
                            setChecked(tick)
                            console.log('NEW VALUEeessss', item.deviceId._id);
                            // setDeviceIdArray([...deviceidarray, item._id])
                            storeDeviceId(item.deviceId._id)
                            storeMacId(item.deviceId.macId)
                        }}

                        style={{ alignSelf: 'flex-end', bottom: 190 }}
                    />

                }
            </View>
        )

    }

    const handleNext = () => {
        if(deviceidarray.length > 0) {
            navigation.navigate('UserOrderSummary',{
                basePrice: basePrice,
                selectTime: selectTime,
                amount: amount,
                duration: duration,
                scheduleDate: scheduleDate,
                billBoardName: billBoardName,
                address: address,
                deviceId: deviceId,
                billboardId: billboardId,
                deviceMacId: deviceMacId,
                Videofiletype: Videofiletype,
                adTitle: adTitle ,
                aboutAd: aboutAd,
                timeslot: selectTime,
                date: date,
                videoname: videoname,
                VideoOriginalName: VideoOriginalName,
                videoUri: videoUri,
                imageUrl: imageUrl,
                imageFileType: imageFileType,
                imageName: imageName,
                imagestring: imagestring,
                length: deviceidarray.length
            })

            }else{
                Alert.alert('Select BillBoard')

            }
    }



    return (

        <View style={styles.main}>
            <View style={{ height: 78, backgroundColor: 'rgba(183,54,248,255)' }}>
               
                    <View style={{ marginTop: '11%',flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{flexDirection:'row'  }}>
                        <TouchableOpacity onPress={() => navigation.goBack('PaymentScreen')}>
                            <Image source={images.back} style={{ marginLeft: 16, top: 8 }} />
                            <Text style={{ alignSelf: 'center', fontFamily: 'Oswald-Bold', color: 'white', fontSize: 18,bottom:17,left:32}}>Add Smart Billboards</Text>
                       </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => handleNext() }>
                        <Text style={{fontFamily: 'Oswald-Bold', color: 'white', fontSize: 18,marginRight:16,marginBottom:6}}>Next</Text>
                        </TouchableOpacity>
                    </View>
              
                {/* <View>
                    <Text style={{ alignSelf: 'center', bottom: 19, fontFamily: 'Oswald-Bold', color: 'white', fontSize: 18 }}>Add Smart Billboards</Text>
                    <View>
                    <Text style={{fontFamily: 'Oswald-Bold', color: 'black', fontSize: 18}}>Next</Text>
                </View>
                </View> */}

            </View>


            <View style={{ backgroundColor: 'white', elevation: 4, height: 56 }}>
                <View style={styles.period}>
                    <View style={styles.cont}>
                        <Image style={styles.image} source={images.calender} />
                        <Text style={styles.txt}>{scheduleDate?.toString().slice(0, 10)}</Text>
                    </View>
                    <View style={styles.cont1}>
                        <Image style={styles.image} source={images.time} />
                        <Text style={{
                            color: '#6F6F6F',
                            fontFamily: 'Oswald-Bold',
                            fontSize: 12,
                            justifyContent: 'center',
                            textAlign: 'center',
                            marginLeft: 16,
                            top: 5,
                            right: 5
                        }}>{duration} sec</Text>
                    </View>
                    <View style={styles.cont2}>
                        <Image style={{ top: 3, left: 5 }} source={images.clock} />
                        <Text style={styles.txt}>{selectTime === 12 ? `${12} - ${1} PM` : `${selectTime - 12} - ${selectTime - 12 + 1} PM`}</Text>
                    </View>

                </View>
            </View>

            <View>
                <FlatList
                    data={seeAllBillBoard}
                    renderItem={Bilboard}
                    numColumns={2}
                    style={{ top: 50 }}
                    ListFooterComponent={<View style={{ margin: 210 }} />}
                />
            </View>

        </View>
    )
}

export default AddBillboards

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#f7f8fd'

    },
    period: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 16,
        marginRight: 16,
        marginTop: 12
    },
    txt: {

        color: '#6F6F6F',
        fontFamily: 'Oswald-Bold',
        fontSize: 12,
        justifyContent: 'center',
        textAlign: 'center',
        marginLeft: 16,
        top: 5
    },
    cont: {
        flexDirection: 'row',
        // borderWidth:1,
        height: 32,
        width: 101,
        backgroundColor: '#F7F8FD',
        borderRadius: 8

    },
    cont1: {
        flexDirection: 'row',
        // borderWidth:1,
        height: 32,
        width: 71,
        backgroundColor: '#F7F8FD',
        borderRadius: 8


    },
    cont2: {
        flexDirection: 'row',
        // borderWidth:1,
        height: 32,
        width: 100,
        backgroundColor: '#F7F8FD',
        borderRadius: 8

    },
    image: {
        left: 5,
        top: 5
    },
    box: {
        width: 156,
        height: 220,
        margin: 10,
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 2,
        marginLeft: 12,
        marginRight: 12
    },
    board: {
        width: '100%',
        height: '85%',
        borderRadius: 7
    },
    price: {
        color: '#050423',
        fontSize: 16,
        fontFamily: 'Oswald-SemiBold',
        marginLeft: 8,


    },
})

