import React,{useState,useEffect} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView,FlatList,RefreshControl } from 'react-native'
import moment from "moment";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from "axios";
import images from "../../../constant/Images";




const AgencyPublishedOrder =  ({navigation}) =>{
    const [publishedOrder,setPublishedPOrder] = useState([])
    const [refreshing, setRefreshing] = React.useState(false);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);



    const RecentData = ({ item }) => {
   
            console.log('RECENT ORDER DATAbbvvb', item);
            let startTime = moment(moment(item.startscheduleDate).format("HH:mm:ss a"), "HH:mm:ss a");
            let endTime = moment(moment(item.endscheduleDate).format("HH:mm:ss a"), "HH:mm:ss a");
            let duration = moment.duration(endTime.diff(startTime));
            let minutes = parseInt(duration.asMinutes()) % 60;
            let hours = parseInt(duration.asHours());
            return (
                <View style={styles.orderBox}>
                 
                        <Text style={styles.publishedText}>Published</Text>
                        
                    
                    {/* <Text style={styles.scheduleText}>Scheduled</Text> */}
                    <View style={{ flexDirection: 'row-reverse', bottom: '8%', right: '5%' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('OrderOverView',{adTitle:item?.adTitle, aboutAd: item?.aboutAd, deviceId: item?.deviceId,startscheduleDate:item?.startscheduleDate, endscheduleDate: item?.endscheduleDate })}>
                        <Text style={styles.viewText}>View</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <Text style={styles.liveView}>{item.liveView}</Text> */}
                    <View style={{ bottom: '10%' }}>
                        <Text style={styles.order}>Order Id #{item._id.slice(0, 8)}...</Text>
                        <Text style={styles.promotion}>{item.adTitle}</Text>
    
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 12, marginRight: 12 }}>
                            <Text style={styles.day}>{item.orderDate.slice(0, 10)}</Text>
                            <Text style={styles.time}>{moment(item.startscheduleDate).format("hh:mm A")} - {moment(item.endscheduleDate).format("hh:mm A")} </Text>
    
                            <Text style={styles.duration}> {hours ? `${hours} hr` : null} {minutes} min</Text>
                        </View>
                    </View>
                </View>
            )
    }
    const getPublishedOrderData = async () => {
        try {
            let res = await axios.get(`/api/order/orderListforBusinessOwner?limit=100&date=${moment().format("YYYY-MM-DD")}&page=1&status=completed`)
            console.log("GET PUBLISHED ORDER RESPONSE ---- ==> ", res.data);
            setPublishedPOrder(res.data.msg)
        } catch (error) {
            console.log('GET PUBLISHED ORDER ERROR', error);

        }
    }
    useEffect(() => {
        getPublishedOrderData()

    }, [])


    return(

        <View>
             <>
            {publishedOrder?.length > 0 ?
                <View style={{ backgroundColor: 'white', height: '100%', width: '100%' }}>
                    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>


                        <View>
                            <FlatList
                                data={publishedOrder}
                                renderItem={RecentData}
                                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                                ListFooterComponent={<View style={{ margin: 200 }} />}
                            />
                        </View>

                    </ScrollView>

                </View>
                :
                <View style={{ backgroundColor: 'white', height: '100%', width: '100%', justifyContent: 'center', paddingLeft: 20, paddingRight: 20 }}>
                    <View style={{ alignSelf:'center' }}>
                        <Image style={{ textAlign: 'center', fontSize: 25, color: 'black', fontFamily: 'Oswald-Bold',marginLeft:10 }} source={images.emptyorders} />
                        <Text style={{ textAlign: 'center', fontSize: 14, color: '#717171', fontWeight: 'bold' }}>No Orders to show</Text>

                    </View>
                </View>
            }
        </>

        </View>
    )
}

export default AgencyPublishedOrder;
const styles = StyleSheet.create({
    linearStyle: {
        flexDirection: 'row',
        height: 80,

    },
    back: {
        left: 20,
        top: 40

    },
    publishedText: {
        fontFamily: 'Oswald-Bold',
        fontStyle: 'normal',
        fontSize: 12,
        color: 'white',
        backgroundColor: '#3E50B4',
        width: 125,
        height: 32,
        textAlign: 'center',
        borderRadius: 20,
        bottom: 10,
        paddingTop: 5,

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
        borderColor: '#B937FA',
        textAlign: 'center',
        borderRadius: 20,
        // height: 24, 
        width: wp(20),
        color: '#B937FA',
        // left: wp(45),
        fontFamily: 'Oswald-Bold',
        top: 10,
    },
    order: {

        fontFamily: 'Oswald-Regular',
        fontStyle: 'normal',
        fontSize: 14,
        color: '#6F6F6F',
        left: '3%',
        bottom: 14
    },
    orderBox: {
        flex: 1,
        //    width:deviceWidth -25,
        backgroundColor: 'white',
        height: 111,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 0.75,
        shadowRadius: 5,
        elevation: 5,
        marginLeft: 8,
        marginRight: 8,
        margin: 5,
        marginTop: '6%'


    },

    promotion: {
        fontFamily: 'Oswald-Bold',
        fontStyle: 'normal',
        fontSize: 16,
        color: 'black',
        left: '3%',
        bottom: 15
    },
    day: {
        fontSize: 14,
        color: 'black',
        bottom: 10,
        fontFamily: 'Oswald-Regular',
    },
    time: {
        fontSize: 12,
        color: 'black',

        bottom: 8,
        fontFamily: 'Oswald-Regular'
    },
    duration: {
        fontSize: 12,
        color: 'black',

        bottom: 8,
        fontFamily: 'Oswald-Regular'

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