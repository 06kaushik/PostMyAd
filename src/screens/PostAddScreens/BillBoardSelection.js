import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, Pressable } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import images from "../../constant/Images";
import BillBoardOverviewData from "../../Data/OrderData/BillBoardOverviewData";
import OrderOverviewData from "../../Data/OrderOverviewData";

const BillBoardSelection = ({navigation}) => {

    const Overview = ({ item }) => {
        return (
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', left: 20 }}>Ad Name</Text>
                    <Text style={{ left: 82, color: 'black' }}>{item.name}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', left: 20 }}>Start Date</Text>
                    <Text style={{ left: 73, color: 'black' }}>{item.date}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', left: 20 }}>End Date</Text>
                    <Text style={{ left: 82, color: 'black' }}>{item.edate}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', left: 20 }}>Start Time</Text>
                    <Text style={{ left: 73, color: 'black' }}>{item.time}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', left: 20 }}>End Time</Text>
                    <Text style={{ left: 82, color: 'black' }}>{item.etime}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', left: 20 }}>Duration</Text>
                    <Text style={{ left: 87, color: 'black' }}>{item.duration}</Text>
                </View>

            </View>
        )
    }

    const BoardOverview = ({ item }) => {
        return (
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', left: 20 }}>BillBoards</Text>
                    <Text style={{ left: 82, color: 'black' }}>{item.BillBoard}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', left: 20 }}>BillBoard Size</Text>
                    <Text style={{ left: 57, color: 'black' }}>{item.BillBoardSize}</Text>
                </View>

            </View>
        )
    }

    return(
        <View>
             <View >
                <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={styles.linearStyle}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Image source={images.back} style={styles.back} />
                    </TouchableOpacity>
                    <Text style={styles.prfile}>Ad Overview</Text>
                </LinearGradient>
                <View>
                    <Image source={images.order} style={styles.orderimg} />
                </View>
            </View>

            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: 'white', height: 40, alignItems: 'center', elevation: 4, top: 7 }}>
                    <TouchableOpacity >
                        <Text style={{ color: '#6906C3', fontWeight: 'bold', fontFamily: 'Oswald' }}>Overview</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('OrderBillBoard')}>
                        <Text style={{ color: '#717171', fontWeight: 'bold', fontFamily: 'Oswald' }}>BillBoards</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('OrderAnalytics')}>
                        <Text style={{ color: '#717171', fontWeight: 'bold', fontFamily: 'Oswald' }}>Analytics</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: 'white', height: 40, alignItems: 'center', elevation: 4, top: 15 }}>
                    <Text style={{ color: '#5A5A5A', fontWeight: 'bold', right: 30, fontFamily: 'Oswald' }}>Status</Text>
                    <Text style={{ color: '#FF7F37', fontWeight: 'bold', fontFamily: 'Oswald', right: 10 }}>Scheduled</Text>
                    <Text style={{ color: '#6906C3', fontWeight: 'bold', fontFamily: 'Oswald' }}>Cancel Order</Text>
                </View>
            </View>

            <View style={{ backgroundColor: 'white', elevation: 4, marginBottom: 60, height: 160, top: 25 }}>
                <View style={{ flexDirection: 'row', }} >
                    <Text style={{ left: 20, top: 5, color: '#5A5A5A', fontWeight: 'bold', fontSize: 16 }}>Ad Overview</Text>


                </View>
                <FlatList
                    data={OrderOverviewData}
                    renderItem={Overview}
                    style={{ top: 10 }}
                />
            </View>

            <View style={{ backgroundColor: 'white', height: 100, top: -25, elevation: 4 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: 10 }}>
                    <Text style={{ left: 20, color: '#5A5A5A', fontFamily: 'Oswald', fontWeight: 'bold', fontSize: 16 }}>BillBoard OverView</Text>
                    <Text style={{ right: 20, fontFamily: 'Oswald', fontWeight: 'bold', fontSize: 16, color: '#6906C3' }}>See all</Text>
                </View>

                <FlatList
                    data={BillBoardOverviewData}
                    renderItem={BoardOverview}
                    style={{ top: 20 }}
                />
            </View>

            <View style={{ borderWidth: 1, borderColor: 'rgba(105, 6, 195, 1)', height: 40, borderRadius: 10, width: '95%', left: 10, backgroundColor: 'white', elevation: 4, top: -5 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ textAlign: 'center', top: 8, fontFamily: 'Calibri', fontWeight: '700', fontSize: 16, left: 150, color: '#505050' }}>Scheduled</Text>
                    <Text style={{ fontFamily: 'Oswald', fontWeight: '600', fontSize: 12, left: 260, top: 10, color: '#525252' }}>2D 14H</Text>
                    <Image source={images.time} style={{ left: 200, top: 8 }} />

                </View>
            </View>


        </View>
    )
}

export default BillBoardSelection;

const styles = StyleSheet.create({
    linearStyle: {
        flexDirection: 'row',
        height: 70,

    },
    back: {
        left: 20,
        top: 40

    },
    prfile: {
        left: 33,
        top: 38,
        fontFamily: 'Oswald',
        fontWeight: 'bold',
        fontSize: 14,
        color: 'white'

    },
    orderimg: {
        width: '100%'
    }
})