import React from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import images from "../../constant/Images";
import AnalyticsData from "../../Data/BillBoardData/AnalyticsData";

const BillBoardAnalyticalAdmi = ({ navigation }) => {

    const Analytics = ({ item }) => {
        return (
            <View>
                <View >
                    <Text style={{ marginTop: 15, margin: 43, color: '#6D7D93', fontWeight: 'bold', fontSize: 12,fontFamily:'Oswald',fontStyle:'normal', }}>{item.title}</Text>
                    <Text style={{ textAlign: 'center', color: '#050423', fontWeight: 'bold', fontSize: 20, top: -10 }}>{item.value}</Text>

                </View>


            </View>
        )
    }

    return (

        <View>
           

            {/* <View style={{ backgroundColor: 'white', elevation: 4, }}>
                <FlatList
                    data={AnalyticsData}
                    renderItem={Analytics}
                    horizontal={true}
                />
            </View>

            <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:'white',top:'3%'}}>
                <Text style={{left:20,fontFamily:'Oswald',fontStyle:'normal',fontSize:16,color:'#525252',fontWeight:'600'}}>Booking Time</Text>
                <TouchableOpacity onPress={() => navigation.navigate('BillAnalyticalSeeMore')}>
                <Text style={{right:20,fontFamily:'Oswald',fontStyle:'normal',fontSize:12, fontWeight:'600',color:'#E141C3',top:3}}>See More</Text>
                </TouchableOpacity>
            </View>


            <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:'white',top:'8%'}}>
                <Text style={{left:20,fontFamily:'Oswald',fontStyle:'normal',fontSize:16,color:'#525252',fontWeight:'600'}}>Views</Text>
                <TouchableOpacity onPress={() => navigation.navigate('BillAnalyticalSeeMore1')}>
                <Text style={{right:20,fontFamily:'Oswald',fontStyle:'normal',fontSize:12, fontWeight:'600',color:'#E141C3',top:3}}>See More</Text>
                </TouchableOpacity>
            </View> */}

            <View style={{height:'100%',width:'100%',justifyContent:'center'}}>
                <Text style={{color:'black', fontSize:20, fontFamily:'Oswald-Bold',textAlign:'center'}}>Comming Soon</Text>
            </View>

        </View>
        
    )
}

export default BillBoardAnalyticalAdmi;