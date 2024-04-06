import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView,FlatList } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import images from "../../constant/Images";
import OrderData from "../../Data/OrderData/OrderData";
import OrderData1 from "../../Data/OrderData/Orderdata1";


const OrderScreen1 = ({navigation}) => {

    const Orderdata = ({item}) => {
        return(
            <View>
                <View style={{ top: 30 }} >
                    <Text style={{ textAlign: 'center', color: '#050423', fontWeight: 'bold', fontSize: 20, }}>{item.num}</Text>
                    <Text style={{ marginTop: 15, margin: 43, color: '#6D7D93', fontWeight: '500', fontSize: 12, fontFamily: 'Oswald', fontStyle: 'normal' }}>{item.view}</Text>
                </View>
            </View>
        )
    }

    const RecentData = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('OverView')}>
            <View style={styles.orderBox}>
                <Text style={styles.scheduleText}>{item.title}</Text>
                <Text style={styles.viewText}>{item.view}</Text>
                {/* <Text style={styles.liveView}>{item.liveView}</Text> */}
                <Text style={styles.order}>{item.orderId}</Text>
                <Text style={styles.promotion}>{item.subtitle}</Text>
                <Text style={styles.day}>{item.day}</Text>
                <Text style={styles.time}>{item.time}</Text>
                <Text style={styles.duration}>{item.duration}</Text>
            </View>
            </TouchableOpacity>
        )
    }



    return(
        <View>
             <View >
                <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={styles.linearStyle}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Image source={images.back} style={styles.back} />
                   
                    <Text style={styles.prfile}>Orders</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>


            <View style={{backgroundColor:'white', elevation:4}} >
                <Text style={{ left: 20, top: 10, fontFamily: 'Oswald', fontWeight: 'bold', fontSize: 16, color: '#525252' }}>Overview</Text>
                <View>
                    <FlatList
                        data={OrderData}
                        renderItem={Orderdata}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: 'white', height: 40, alignItems: 'center', elevation: 4, top: 7 }}>
                {/* <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']}> */}
                <TouchableOpacity onPress={() => navigation.navigate('BillBoardAdmin')}>
                <Text style={{ color: '#6906C3', fontWeight: 'bold' }}>Upcoming</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('BillOrder')}>
                <Text style={{ color: 'black', fontWeight: 'bold' }}>Published</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('BillAnalytical')}>
                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Rejected</Text>
                </TouchableOpacity>
                {/* </LinearGradient> */}
            </View>


            <View style={{ }}>
                <FlatList
                    data={OrderData1}
                    renderItem={RecentData}
                    ListFooterComponent={<View style={{ margin: 270 }} />}
                />


            </View>
              


        </View>
    )
}

export default OrderScreen1;

const styles = StyleSheet.create({
    linearStyle: {
        flexDirection: 'row',
        height: 80,

    },
    back: {
        left: 20,
        top: 40

    },
    prfile: {
        left: 33,
        top: 22,
        fontFamily: 'Oswald',
        fontWeight: 'bold',
        fontSize: 14,
        color: 'white'

    },
    scheduleText: {
        fontFamily: 'Oswald',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 12,
        left: 10,
        color: 'white',
        backgroundColor: '#5FCA5D',
        width: 125,
        height: 32,
        textAlign: 'center',
        borderRadius: 20,
        bottom: 15,
        paddingTop: 7,
        margin: 5





    },
    viewText: {
        borderWidth: 1.5,
        borderColor: '(rgba(225, 65, 195, 1)',
        textAlign: 'center',
        borderRadius: 20,
        height: 24,
        width: 71,
        color: '(rgba(225, 65, 195, 1)',
        left: 110,
        fontWeight: 'bold',
        top: 30


    },
    order: {
        right: 170,
        fontFamily: 'Oswald',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 12,
        color: '#6F6F6F',
        top: 40

    },
    orderBox: {
        width: 340,
        height: 150,
        padding: 1,
        margin: 10,
        backgroundColor: "white",
        borderRadius: 10,
        flexDirection: 'row',
        elevation: 2,
        top: 30


    },

    promotion: {
        fontFamily: 'Oswald',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
        right: 250,
        top: 70


    },
    day: {
        right: 370,
        top: 120,
        fontSize: 15,

    },
    time: {
        right: 330,
        top: 120,
        fontSize: 15,

    },
    duration: {
        fontSize: 20,
        textAlign: 'center'
        // fontSize:50

    },
    // liveView:{
    //     borderWidth: 1.5, 
    //     borderColor: '(rgba(225, 65, 195, 1)', 
    //     textAlign: 'center', 
    //     borderRadius: 20, 
    //     height: 24, 
    //     width: 71, 
    //     color: '(rgba(225, 65, 195, 1)',
    //     // left:100,
    //     fontWeight:'bold',
    //     top:30,
    //     left:20
    // }
})