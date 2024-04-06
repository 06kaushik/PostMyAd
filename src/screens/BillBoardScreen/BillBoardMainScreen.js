import React, { useState, useEffect } from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TouchableOpacity, Alert, Pressable } from 'react-native'
import images from "../../constant/Images";
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '@react-native-community/checkbox';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from 'axios';
import Modal from "react-native-modal";



const AddNewCampaign1 = ({ navigation, route }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [seeAllBillBoard, setSeeAllBillBoard] = useState([])
    const [check, setChecked] = useState(false)
    const [deviceidarray, setDeviceIdArray] = useState([]);
    const [MacId, setMacId] = useState([])



    const Bilboard = ({ item }) => {
        return (
            <View style={styles.box}>
                <View>
                    <TouchableOpacity onLongPress={() => selectBoard()}>
                        <Image source={{ uri: item.filesArr[0].fileurl }} style={styles.board} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.name}>{item.billboardName}</Text>
                </View>
                <View>
                    <Text style={styles.address}>{item.city}</Text>
                </View>
                {/* <View>
                    <Image style={styles.viewImge} source={item.view} />
                </View> */}
                <View>
                    <Text style={styles.vnumber}>{item.viewNumber}</Text>
                </View>
                {/* <View>
                    <Image source={item.graph} style={styles.graph} />
                </View> */}
                {/* <View>
                    <Text style={styles.graphnum}>{item.graphNum}</Text>
                </View> */}
                {/* <View>
                    <Image source={item.rupee} style={styles.rupeeImg} />
                </View> */}
                <View style={{ bottom: 50, backgroundColor: 'red', width: '30%', borderRadius: 5, left: 10 }}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>Live</Text>
                </View>
                {/* <View>
                    <Text style={styles.status}>{item.status}</Text>
                </View> */}


                <CheckBox
                    disabled={false}

                    value={check}
                    onValueChange={(newValue) => {
                        setChecked(newValue)
                        storeDeviceId(item.deviceId._id)
                        storeMacId(item.deviceId.macId)
                    }}
                    style={{ bottom: 250, left: 120, }}
                />

            </View>
        )

    }


    function storeDeviceId(e, x, i) {

        let storeArr = [...deviceidarray];
        let index = storeArr.findIndex((item) => (item === e))
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

    const getAllBillboard = async () => {
        try {
            const resp = await axios.get("/api/billboard/getbillboard");
            setSeeAllBillBoard(resp.data.msg)
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
        <View style={{ backgroundColor: 'white', height: '100%', width: '100%' }}>
            <StatusBar hidden={true} />
            <View>
                <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ height: 80 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Image source={images.back} style={styles.backbttn} />
                        <Text style={styles.headertxt}>All Smart Billboards</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>

            <View >
                <Text style={{ fontSize: 24, fontWeight: 'bold', fontFamily: 'Oswald', color: '#525252', left: 20, top: 20, textDecorationLine: 'underline', }}>Select Smart Billboards</Text>
            </View>

            <View style={{ flexDirection: 'row', }}>

                <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    style={{ top: 40, left: 20, }}
                />
                <Text style={{ top: 45, left: 20, fontFamily: 'Oswald', fontSize: 16, fontWeight: 'bold', color: '#525252' }}>Select All</Text>
                <Text style={{ top: 45, left: 160, fontFamily: 'Oswald', fontSize: 16, fontWeight: 'bold', color: '#525252' }}>({deviceidarray.length} Selected)</Text>
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

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', height: 70, backgroundColor: 'white', elevation: 4, bottom: 0, position: 'absolute', width: '100%' }}>
                <View style={{ borderWidth: 2, borderRadius: 5, borderColor: 'rgba(221, 221, 221, 1)', width: 170, height: 40, top: 10 }}>
                    <Text style={{ textAlign: 'center', color: '#525252', fontWeight: 'bold', top: 8, fontFamily: 'Oswald', fontSize: 16 }}>Back</Text>
                </View>
                <View >
                    <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ width: 170, height: 40, borderRadius: 5, top: 10 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('PostAdd', { id: id, })}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', top: 8, fontFamily: 'Oswald', fontSize: 16, color: 'white' }}>Continue</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>



        </View>
    )
}

export default AddNewCampaign1;

const styles = StyleSheet.create({
    backbttn: {
        top: 50,
        left: 20
    },
    headertxt: {
        color: 'white',
        left: 40,
        top: 32,
        fontSize: 14,
        fontWeight: 'bold'
    },
    board: {
        width: '100%',
        height: '85%',
        borderRadius: 7
    },
    textInput: {
        backgroundColor: '#F7F8FD',
        height: 40,
        paddingLeft: 20,
        margin: 15,
        borderRadius: 10,
        fontWeight: 'bold'
    },
    searchBttn: {
        textAlign: 'center',
        margin: 3,
        color: 'white',
        fontWeight: 'bold',
    },
    searchContainer: {
        width: 90,
        height: 30,
        left: 300,
        borderRadius: 5,
        bottom: 50
    },
    rsltTxt: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#525252',
        backgroundColor: '#F7F8FD',
        left: 20
    },
    box: {
        width: '45%',
        height: 210,
        margin: 10,
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 2,
    },
    name: {
        color: '#525252',
        fontSize: 14,
        fontWeight: 'bold',
        left: 10,
        bottom: 40
    },
    address: {
        left: 11,
        color: '#6F6F6F',
        bottom: 38
    },
    viewImge: {
        left: 10,
        bottom: 30

    },
    vnumber: {
        left: 25,
        bottom: 45,
        color: '#3D3D3D',
        fontWeight: 'bold'
    },
    graph: {
        bottom: 60,
        left: 80
    },
    graphnum: {
        bottom: 76,
        color: '#3D3D3D',
        fontWeight: 'bold',
        left: 115
    },
    rupeeImg: {
        height: 15,
        width: 15,
        bottom: 92,
        left: 100
    },
    status: {
        bottom: 265,
        left: 130,
        backgroundColor: 'red',
        width: 40,
        textAlign: 'center',
        borderRadius: 2,
        height: 20,
        color: 'white',
        fontWeight: 'bold'

    },
    footerContainer: {
        width: '49.8%',
        position: 'absolute',
        top: 645
    },
    footer: {
        // flexDirection: 'row',
        // elevation: 50,
        // height: 70,
    },
    footerContainer1: {
        width: '50%',
        position: 'absolute',
        top: 645,
        left: '50%'
    },
    footer1: {
        flexDirection: 'row',
        elevation: 50,
        height: 70,
    },
    sorttxt: {
        fontSize: 18,
        left: '120%',
        color: 'white',
        fontWeight: 'bold',
        top: 20

    },
    filtertxt: {
        fontSize: 18,
        left: '140%',
        color: 'white',
        fontWeight: 'bold',
        top: 20


    },
    backbttn: {
        top: 50,
        left: 20
    },
    headertxt: {
        color: 'white',
        left: 40,
        top: 32,
        fontSize: 14,
        fontWeight: 'bold'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,

    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 75,
        bottom: 20,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2
        // },
        // shadowOpacity: 2.25,

        // shadowRadius: 4,
        elevation: 5,
        // shadowOpacity:50



    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        top: 20
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",

    },
    modalText: {

        textAlign: "center",
        bottom: 70,
        fontWeight: 'bold',
        left: 40
    },
    cross: {
        bottom: 70,
        left: 50

    }


})