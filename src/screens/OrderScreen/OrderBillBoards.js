import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, Pressable } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import images from "../../constant/Images";
import OrderBillBoardData from "../../Data/OrderData/OrderBillBoardData";
import axios from "axios";


const OrderBillBoards = ({ navigation, route }) => {

    const [seeAllBillBoard, setSeeAllBillBoard] = useState([])
    const { screens } = route.params

    const Bilboard = ({ item }) => {

        return (
            <View style={styles.box}>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('BillBoardAdmin', { id: item._id, deviceId: item.deviceId._id, lattitude: item.lattitude, longitude: item.longitude, uri: item?.filesArr[0]?.fileurl })}>
                        <Image source={{ uri: item.filesArr[0].fileurl }} style={styles.board} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.name}>{item.billboardName}</Text>
                </View>
                <View>
                    <Text style={styles.address}>{item.fullAddress.slice(0, 16)}..</Text>
                </View>
                <View>
                    <Image style={styles.viewImge} source={item.view} />
                </View>
                <View>
                    <Text style={styles.vnumber}>{item.viewNumber}</Text>
                </View>
                <View style={{ right: 7 }}>
                    <View>
                        <Image source={item.graph} style={styles.graph} />
                    </View>
                    <View>
                        <Text style={styles.graphnum}>{item.graphNum}</Text>
                    </View>
                    <View>
                        <Image source={item.rupee} style={styles.rupeeImg} />
                    </View>
                </View>
                {/* <View>
                    <Text style={styles.status}>{item.status}</Text>
                </View> */}

            </View>

        )


    }

    // const getAllBillboard = async () => {
    //     try {
    //         const resp = await axios.get("api/billBoard/getbillboardList");
    //         console.log("Get All BillBoards ==> ", resp.data.msg);
    //         setSeeAllBillBoard(resp.data.msg)
    //         // await AsyncStorage.setItem('TOKEN', JSON.stringify(resp.data.token))

    //     } catch (err) {
    //         // Handle Error Here
    //         console.error("error from Billboard ==> ", err);
    //     }
    // }

    const getBillBoard = async () => {

        let body = {
            deviceId: screens
        }


        try {
            const resp = await axios.post("api/billBoard/getbillboardList", body);
            setSeeAllBillBoard(resp.data.msg)

        } catch (err) {
            // Handle Error Here
            console.error("error from Billboard ==> ", err);
        }


    }

    useEffect(() => {
        getBillBoard()

    }, [])



    return (
        <View>
            <View style={{}}>
                <FlatList
                    data={seeAllBillBoard}
                    renderItem={Bilboard}
                    numColumns={2}

                />
            </View>

        </View>
    )
}

export default OrderBillBoards;

const styles = StyleSheet.create({
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
    rsltTxt: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#525252',
        // backgroundColor: '#F7F8FD',
        left: 20
    },
    box: {
        width: 156,
        height: 185,
        margin: 10,
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 2,
        left: 6




    },
    name: {
        color: '#525252',
        fontSize: 16,
        fontFamily: 'Oswald-Bold',
        left: 10,
        bottom: 40
    },
    address: {
        left: 11,
        color: '#6F6F6F',
        bottom: 38,
        fontFamily: 'Oswald-Regular'
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
        left: 85
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
        bottom: 248,
        left: 108,
        backgroundColor: 'red',
        width: 40,
        textAlign: 'center',
        borderRadius: 2,
        height: 20,
        color: 'white',
        fontWeight: 'bold',



    },
    footerContainer: {
        width: '49.8%',
        position: 'absolute',
        top: 645
    },
    footer: {
        flexDirection: 'row',
        elevation: 50,
        height: 70,
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


    },
    headertxt: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        left: 5,
        bottom: 2
    },


})