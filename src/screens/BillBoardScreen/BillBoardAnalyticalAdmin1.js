import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList,ScrollView } from 'react-native'
import images from "../../constant/Images";
import SeeMore from "../../Data/BillBoardData/AnalyticalSeeMore";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";


const data = [
    { year: '2011', earnings: 13000 },
    { year: '2012', earnings: 16500 },
    { year: '2013', earnings: 14250 },
    { year: '2014', earnings: 19000 }
];

const BillBoardAnalyticalSeeMore = ({ navigation }) => {

    const BillBoardGraph = ({ item }) => {
        return (
            <View>
                <View style={{ top: 30 }} >
                    <Text style={{ textAlign: 'center', color: '#050423', fontWeight: 'bold', fontSize: 20, }}>{item.time}</Text>
                    <Text style={{ marginTop: 15, margin: 43, color: '#6D7D93', fontWeight: '500', fontSize: 12, fontFamily: 'Oswald', fontStyle: 'normal' }}>{item.picker}</Text>
                </View>
            </View>
        )
    }

    return (

        <View>
            <ScrollView>

            <View>
                <Image source={images.baner} style={{ width: '100%' }} />
            </View>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('BillAnalytical')}>
                    <Image source={images.back} style={{ top: -250, left: 20 }} />
                </TouchableOpacity>
            </View>
            <View style={{ left: 20, bottom: 60 }}>
                <Text style={{ backgroundColor: '#90C456', width: 45, color: 'white', borderRadius: 5, height: 23 }}>  4.2</Text>
                <Image source={images.star} style={{ left: 28, height: 15, width: 15, bottom: 20 }} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: 'white', height: 40, alignItems: 'center', elevation: 4, top: -45 }}>
                {/* <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']}> */}
                <TouchableOpacity onPress={() => navigation.navigate('BillBoardAdmin')}>
                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Overview</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('BillOrder')}>
                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('BillAnalytical')}>
                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Analytics</Text>
                </TouchableOpacity>
                {/* </LinearGradient> */}
            </View>

            <View style={{ backgroundColor: 'white', elevation: 4, top: -35 }}>
                <Text style={{ left: 20, top: 10, fontFamily: 'Oswald', fontWeight: 'bold', fontSize: 16, color: '#525252' }}>Booking Time</Text>
                <View>
                    <FlatList
                        data={SeeMore}
                        renderItem={BillBoardGraph}
                        horizontal={true}
                    />
                </View>
            </View>

            <View style={{ backgroundColor: 'white', elevation: 4, top: -20,marginBottom:50}}>
                <Text style={{ left: 20, fontFamily: 'Oswald', fontWeight: 'bold', fontSize: 16, color: '#525252',top:20 }}>Booking Time</Text>
                <View style={{left:30}}>
                <VictoryChart width={350} theme={VictoryTheme.material} >
                    <VictoryBar data={data} x="quarter" y="earnings" />
                </VictoryChart>
                </View>
            </View>



            </ScrollView>
        </View>
    )
}

export default BillBoardAnalyticalSeeMore;