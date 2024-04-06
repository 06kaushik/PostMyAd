import React, { useState, useEffect } from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import images from "../../../constant/Images";
import LinearGradient from 'react-native-linear-gradient';
import axios from "axios";


const AgencyOrderBillboard = ({ route, navigation }) => {
    const { OrderDetail } = route.params
    console.log('OFHDSHDS', OrderDetail?.OrderDetail);

    const [seeAllBillBoard, setSeeAllBillBoard] = useState([])
    const [orderData, setOrderData] = useState(null)



    const GetBillBoard = ({ item }) => {
        return (
            <View style={styles.box}>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('UserBillBoard', { item: item })}>
                        <Image source={{ uri: item?.filesArr[0]?.fileurl }} style={styles.cardImage} />
                    </TouchableOpacity>
                </View>
                <View style={styles.cardflex}>
                    <Text style={styles.billboardname}>{item.billboardName}</Text>


                </View>
                <View>
                    <Text style={styles.address}>{item.city}</Text>
                </View>
                <View style={{ marginTop: 8 }}>
                    <Text style={styles.price}>₹ {item.basePrice}/sec</Text>
                </View>
                {/* <View>
                    <Text style={styles.off}>40% OFF</Text>
                </View> */}
            </View>

        )
    }

    const getOrderData = async () => {
        try {
            const resp = await axios.get(`/api/order/getOrderById/${OrderDetail?.OrderDetail}`)
            // console.log('ALLLL ORDER DATA BY ID', resp.data.msg);
            setOrderData(resp.data.msg)

        } catch (error) {
            console.log('ERROR FROM ORDER BY ID', error);

        }
    }

    useEffect(() => {
        getOrderData()
    }, [OrderDetail?.OrderDetail])

    const getBillBoard = async () => {

        let body = {
            deviceId: orderData?.deviceId
        }

        console.log('BILLBOARD BODY', body);

        try {
            const resp = await axios.post("api/billBoard/getbillboardList", body);
            // console.log("Get CAMPAIGN BillBoards ==> ", resp.data.msg);
            setSeeAllBillBoard(resp.data.msg)


        } catch (err) {
            // Handle Error Here
            console.error("error from Billboard ==> ", err);
        }


    }

    useEffect(() => {
        getBillBoard()

    }, [orderData?.deviceId])

    return (

        <View>
            {seeAllBillBoard.length > 0 ?
                <View>
                    <FlatList
                        data={seeAllBillBoard}
                        renderItem={GetBillBoard}
                        ListFooterComponent={<View style={{ margin: 150 }} />}
                    />
                </View>
                :
                <View>

                    <View style={{ marginTop: '20%' }}>
                        <Image source={images.emptybillboard} style={{ alignSelf: 'center', top: 30 }} />
                        <Text style={{ top: 40, textAlign: 'center', fontSize: 14, color: '#717171', fontWeight: 'bold' }}>No BillBoards to show</Text>

                    </View>
                </View>
            }


        </View>
    )
}

export default AgencyOrderBillboard

const styles = StyleSheet.create({
    box: {
        backgroundColor: 'white',
        elevation: 4,
        height: 280,
        width: '93%',
        alignSelf: 'center',
        borderRadius: 8,
        marginTop: 16
    },
    cardImage: {
        width: '100%',
        height: 177,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    cardflex: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    billboardname: {
        fontSize: 18,
        fontFamily: 'Oswald-Bold',
        color: '#2D2D2D',
        marginLeft: 16,
        top: 6
    },
    heartImage: {
        marginRight: 16,
        marginTop: 8,
        width: 20,
        height: 17.83
    },

    address: {
        color: '#8C8C8C',
        fontSize: 14,
        fontFamily: 'Oswald-SemiBold',
        marginLeft: 16,
        top: 4
    },
    price: {
        color: '#050423',
        fontSize: 18,
        fontFamily: 'Oswald-SemiBold',
        marginLeft: 16,
        top: 6
    },
})