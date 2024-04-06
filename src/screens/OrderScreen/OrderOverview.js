import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, Pressable } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import images from "../../constant/Images";
import BillBoardOverviewData from "../../Data/OrderData/BillBoardOverviewData";
import OrderOverviewData from "../../Data/OrderOverviewData";
import moment from "moment";


const OrderOverview = ({ navigation,route }) => {

    const {campaignName} = route.params
    const {startscheduleDate} = route.params
    const {endscheduleDate} = route.params
    const {screens} = route.params
    const {aboutCampaign} = route.params
    

    const Overview = ({ item }) => {
        let startTime = moment(moment(startscheduleDate).format("HH:mm:ss a"), "HH:mm:ss a");
        let endTime = moment(moment(endscheduleDate).format("HH:mm:ss a"), "HH:mm:ss a");
        let duration = moment.duration(endTime.diff(startTime));
        let minutes = parseInt(duration.asMinutes()) % 60;
        let hours = parseInt(duration.asHours());
        return (
            <View style={{}}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: 'Oswald-Bold', left: 16, color: '#525252', fontSize: 14 }}>Ad Name :</Text>
                    <Text style={{ left: 82, color: '#717171',fontSize:14,fontFamily: 'Oswald-SemiBold',}}>{campaignName}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: 'Oswald-Bold', left: 16, color: '#525252', fontSize: 14 }}>Start Date :</Text>
                    <Text style={{ left: 73, color: '#717171',fontSize:14,fontFamily: 'Oswald-SemiBold' }}>{moment(startscheduleDate).format("DD/MM/YYYY")}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: 'Oswald-Bold', left: 16, color: '#525252', fontSize: 14 }}>End Date :</Text>
                    <Text style={{ left: 82, color: '#717171',fontSize:14,fontFamily: 'Oswald-SemiBold' }}>{moment(endscheduleDate).format("DD/MM/YYYY")}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: 'Oswald-Bold', left: 16, color: '#525252', fontSize: 14 }}>Start Time :</Text>
                    <Text style={{ left: 73, color: '#717171',fontSize:14,fontFamily: 'Oswald-SemiBold' }}>{moment(startscheduleDate).format("hh:mm A")}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: 'Oswald-Bold', left: 16, color: '#525252', fontSize: 14 }}>End Time :</Text>
                    <Text style={{ left: 82, color: '#717171',fontSize:14,fontFamily: 'Oswald-SemiBold' }}>{moment(endscheduleDate).format("hh:mm A")}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: 'Oswald-Bold', left: 16, color: '#525252', fontSize: 14 }}>Duration :</Text>
                    <Text style={{ left: 84, color: '#717171',fontSize:14,fontFamily: 'Oswald-SemiBold' }}>{hours ? `${hours} hr`: null } {minutes} min</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: 'Oswald-Bold', left: 16, color: '#525252', fontSize: 14 }}>Billboards :</Text>
                    <Text style={{ left: 76, color: '#717171',fontSize:14,fontFamily: 'Oswald-SemiBold' }}>{screens.length}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: 'Oswald-Bold', left: 16, color: '#525252', fontSize: 14 }}>About :</Text>
                    <Text style={{ left: 100, color: '#717171',fontSize:14,fontFamily: 'Oswald-SemiBold' }}>{aboutCampaign}</Text>
                </View>

            </View>
        )
    }

    // const BoardOverview = ({ item }) => {
    //     return (
    //         <View>
    //             <View style={{ flexDirection: 'row' }}>
    //                 <Text style={{ fontWeight: 'bold', left: 20, color: '#525252', fontSize: 14 }}>BillBoards :</Text>
    //                 <Text style={{ left: 82, color: '#717171' }}>{item.BillBoard}</Text>
    //             </View>

    //             <View style={{ flexDirection: 'row' }}>
    //                 <Text style={{ fontWeight: 'bold', left: 20, color: '#525252', fontSize: 14 }}>BillBoard Size :</Text>
    //                 <Text style={{ left: 57, color: '#717171' }}>{item.BillBoardSize}</Text>
    //             </View>

    //         </View>
    //     )
    // }


    return (
        <View style={{height:'100%'}}>

            <View>
                <View style={{ flexDirection: 'row',  backgroundColor: 'white', height: 40, alignItems: 'center', elevation: 4, top: '1%' }}>
                    <Text style={{ color: '#5A5A5A',  left:16, fontFamily: 'Oswald-Bold' }}>Status</Text>
                    <Text style={{ color: '#FF7F37',  fontFamily: 'Oswald-Bold', left: 100 }}>Scheduled</Text>
                    {/* <Text style={{ color: '#6906C3',  fontFamily: 'Oswald-Bold',left:150 }}>Cancel Order</Text> */}
                </View>
            </View>

            <View style={{ backgroundColor: 'white', elevation: 4, height: 500, top: '3%' }}>
                <View style={{ flexDirection: 'row', }} >
                    <Text style={{ left: 16, top: 5, color: '#5A5A5A',fontFamily:'Oswald-Bold', fontSize: 16 }}>Ad Overview</Text>


                </View>
                <FlatList
                    data={OrderOverviewData}
                    renderItem={Overview}
                    style={{ top: 10 }}
                />
            </View>
{/* 
            <View style={{ backgroundColor: 'white', height: 100, elevation: 4, top: '5%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: 10 }}>
                    <Text style={{ left: 20, color: '#5A5A5A', fontFamily: 'Oswald-Bold', fontSize: 16 }}>BillBoard OverView</Text>
                    <Text style={{ right: 20, fontFamily: 'Oswald-Bold',fontSize: 16, color: '#6906C3' }}>See all</Text>
                </View>

                <FlatList
                    data={BillBoardOverviewData}
                    renderItem={BoardOverview}
                    style={{ top: 20 }}
                />
            </View> */}

            <View style={{ borderWidth: 1, borderColor: 'rgba(105, 6, 195, 1)', height: 40, borderRadius: 10, width: '95%', left: 10, backgroundColor: 'white', elevation: 4,position:'absolute',bottom:15 }}>
                <View style={{}}>
                    <Text style={{ textAlign: 'center', top: 5, fontFamily: 'Oswald-Bold', fontSize: 16, color: '#505050' }}>Scheduled</Text>
                    {/* <View style={{flexDirection:'row',justifyContent:'flex-end',right:10,bottom:10}}>
                    <Image source={images.timecolor} style={{right:10,bottom:6}} />
                        <Text style={{ fontFamily: 'Oswald-Bold', fontSize: 12, color: '#525252',bottom:6 }}>2D 14H</Text>
                       
                    </View> */}


                </View>
            </View>


        </View>

    )
}

export default OrderOverview;

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