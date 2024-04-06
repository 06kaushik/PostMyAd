import React, { useState, useEffect } from "react";
import { StatusBar, Text, View, ScrollView, FlatList, Image, RefreshControl, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import images from "../../constant/Images";
import LinearGradient from 'react-native-linear-gradient';
import UpcomingData from "../../Data/Campaign/CampaignUpcommingData";
import axios from "axios";
import moment from "moment";


const CampaignOngoing = ({ navigation }) => {

    const [onGoing, setOngoing] = useState([])
    const [refreshing, setRefreshing] = React.useState(false);


    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const Upcoming = ({ item }) => {
        let startTime = moment(moment(item.startscheduleDate).format("HH:mm:ss a"), "HH:mm:ss a");
        let endTime = moment(moment(item.endscheduleDate).format("HH:mm:ss a"), "HH:mm:ss a");
        let duration = moment.duration(endTime.diff(startTime));
        let minutes = parseInt(duration.asMinutes()) % 60;
        let hours = parseInt(duration.asHours());
        return (
            <View style={styles.box}>
                
                <View style={{ flexDirection: 'row', }}>
                <TouchableOpacity onPress={() => navigation.navigate('CampaignOverView', { campaignName: item.campaignName, startscheduleDate: item.startscheduleDate, endscheduleDate: item.endscheduleDate, screens: item.screens, aboutCampaign: item.aboutCampaign })}>
                        <Image source={require('../../assets/g1.png')} style={{ height: 160, borderTopLeftRadius: 10, borderTopRightRadius: 10, }} />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 16 }}>
                        <Text style={{ color: 'black', fontFamily: 'Oswald-Bold', fontSize: 16 }}>{item.campaignName}</Text>
                        <Text style={{ color: 'black', fontFamily: 'Oswald-SemiBold', fontSize: 14 }}>{item.aboutCampaign}</Text>
                        <View style={{ flexDirection: 'row', paddingTop: 15 }}>
                            <Image source={images.calender} style={{}} />
                            <Text style={{ fontFamily: 'Oswald-Regular', color: '#5A5A5A', fontSize: 12, marginLeft: 5 }}>{moment(item.startscheduleDate).format("DD/MM/YYYY")} - {moment(item.endscheduleDate).format("DD/MM/YYYY")}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                            <Image source={images.time} style={{ marginLeft: 1 }} />
                            <Text style={{ fontFamily: 'Oswald-Regular', color: '#5A5A5A', fontSize: 12, marginLeft: 8 }}>{hours ? `${hours} hr` : null} {minutes} min</Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                            <Image source={images.clock} style={{ marginLeft: -2 }} />
                            <Text style={{ fontFamily: 'Oswald-Regular', color: '#5A5A5A', fontSize: 12, marginLeft: 3 }}>{moment(item.startscheduleDate).format("hh:mm A")} - {moment(item.endscheduleDate).format("hh:mm A")}</Text>
                        </View>
                        {/* <View style={{ backgroundColor: 'red', width: '35%', borderRadius: 5, bottom: 320, right: 80 }}>
                            <Image source={item.live} style={{ left: 5, top: 5 }} />
                            <Text style={{ textAlign: 'center', left: 5, color: 'white' }}>Live</Text>
                        </View> */}
                    </View>


                </View>
            </View>
        )
    }

    const getOngoingCampaignData = async () => {
        try {
            let res = await axios.post(`api/campaign/getcampaignListbyUserId?limit=4&date=${moment().format("YYYY-MM-DD")}&page=1&status=live`)
            console.log("GET ONGOING CAMPAIGN RESPONSE ==> ", res.data);
            setOngoing(res.data.msg)
        } catch (error) {
            console.log('GET CAMPAIGN ERROR', error);

        }
    }
    useEffect(() => {
        getOngoingCampaignData()

    }, [])




    return (
        <>
            {onGoing?.length > 0 ?
                <View style={{ backgroundColor: 'white', height: '100%', width: '100%' }}>
                    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>


                        <View>
                            <FlatList
                                data={onGoing}
                                renderItem={Upcoming}
                                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                                ListFooterComponent={<View style={{ margin: 200 }} />}
                            />
                        </View>

                    </ScrollView>

                </View>
                :
                <View style={{ alignSelf: 'center', marginTop: 100 }}>
                    <Image style={{ alignSelf: 'center' }} source={images.campaign1} />
                    <Text style={{ fontSize: 14, color: '#717171', fontWeight: 'bold' }}>No campigns to show</Text>

                </View>
            }
        </>
    )
}

export default CampaignOngoing;

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
        width: '30%',
        height: 30,
        left: 250,
        borderRadius: 5,
        bottom: 50
    },
    box: {
        flex: 1,
        width: '90%',
        height: 160,
        margin: 10,
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 2,
        left: 10
        // flexDirection:'row'
    },

})