import React,{useState,useEffect} from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import images from "../../constant/Images";
import LinearGradient from 'react-native-linear-gradient';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import OrderUpcoming from "../../screens/OrderScreen/orderUpcoming";
import OrderPublished from "../../screens/OrderScreen/OrderPublished";
import OrderRejected from "../../screens/OrderScreen/OrderRejected";
import axios from "axios";
import moment from "moment";




const Tab = createMaterialTopTabNavigator();

const OrderTopNavigator = ({ navigation,route }) => {
    const [publishedOrder,setPublishedPOrder] = useState([])
    const [upcomingOrder, setUpcomingOrder] = useState([])
    const [live,setLiveOrder] = useState([])

    const getPublishedOrderData = async () => {
        try {
            let res = await axios.get(`/api/order/orderListforBusinessOwner?limit=100&date=${moment().format("YYYY-MM-DD")}&page=1&status=completed`)
            setPublishedPOrder(res.data.msg)
        } catch (error) {
            console.log('GET PUBLISHED ORDER ERROR', error);

        }
    }
    useEffect(() => {
        getPublishedOrderData()

    }, [])

    const getUpcommingOrderData = async () => {
        try {
            let res = await axios.get(`/api/order/orderListforBusinessOwner?limit=100&date=${moment().format("YYYY-MM-DD")}&page=1&status=upcoming`)
            setUpcomingOrder(res.data.msg)
        } catch (error) {
            console.log('GET UPCOMMING ORDER ERROR', error);

        }
    }
    useEffect(() => {
        getUpcommingOrderData()

    }, [])
    const getLiveOrderData = async () => {
        try {
            let res = await axios.get(`/api/order/orderListforBusinessOwner?limit=100&date=${moment().format("YYYY-MM-DD")}&page=1&status=live`)
            setLiveOrder(res.data.msg)
        } catch (error) {
            console.log('GET UPCOMMING ORDER ERROR', error);

        }
    }
    useEffect(() => {
        getLiveOrderData()

    }, [])



    return (

        <>
            <View>
                <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ height: 60 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <View style={{ marginTop: '8%' }}>
                            <Image source={images.back} style={{ marginLeft: 8, }} />
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={{ alignSelf: 'center', bottom: 19, fontFamily: 'Oswald-Bold', color: 'white' }}>Orders</Text>
                    </View>



                </LinearGradient>
            </View>

            
            <View style={{backgroundColor:'white', elevation:4,height:130}} >
                <Text style={{ left: 20, top: 10, fontFamily: 'Oswald-Bold', fontSize: 16, color: '#525252' }}>Overview</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginRight:8,marginLeft:8,marginTop:16}}>
                    <Text style={{color:'black',fontFamily:'Oswald-Bold',fontSize:14}}>Total Ads</Text>
                    <Text style={{color:'black',fontFamily:'Oswald-Bold',fontSize:14}}>Published Ads</Text>
                    <Text style={{color:'black',fontFamily:'Oswald-Bold',fontSize:14}}>Upcoming</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginRight:30,marginLeft:30,marginTop:16}}>
                <Text style={{color:'#525252',fontFamily:'Oswald-Regular',fontSize:32,}}>{upcomingOrder.length + publishedOrder?.length + live?.length} </Text>
                    <Text style={{color:'#525252',fontFamily:'Oswald-Regular',fontSize:32}}>{publishedOrder?.length}</Text>
                    <Text style={{color:'#525252',fontFamily:'Oswald-Regular',fontSize:32}}>{live?.length}</Text>

                </View>
                {/* <View>
                    <FlatList
                        data={OrderData}
                        renderItem={Orderdata}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </View> */}
            </View>

            <Tab.Navigator screenOptions={{
                tabBarLabelStyle:{fontFamily:'Oswald-Bold'},
                tabBarActiveTintColor:'#6906C3',
                tabBarInactiveTintColor:'black',
                tabBarStyle:{elevation:4}
                
                
            }}>

                <Tab.Screen name="Upcoming" component={OrderUpcoming} />
                <Tab.Screen name="Published" component={OrderPublished} initialParams={{adTitle: route?.params, aboutAd: route?.params, deviceId: route?.params, startscheduleDate: route?.params, endscheduleDate: route?.params}} />
                <Tab.Screen name="Live" component={OrderRejected} />

            </Tab.Navigator>
        </>

    )
}



export default OrderTopNavigator;

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
    linearStyle: {
        flexDirection: 'row',
        height: 80,

    },
    back: {
        left: 20,
        top: 40

    },



    box: {
        width: '90%',
        height: 160,
        margin: 10,
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 2,
        left: 10
        // flexDirection:'row'
    },


    textInput: {

        height: 48,
        left: 16,
        borderRadius: 10,
        fontFamily: 'Oswald-SemiBold',
        width: 328,
        borderWidth: 1,
        borderColor: '#dddddd',
        right: 16,
        top: 12,
        paddingRight: 10,
        backgroundColor: 'white',
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
    prfile: {
        left: 33,
        top: 22,
        fontFamily: 'Oswald',
        fontWeight: 'bold',
        fontSize: 14,
        color: 'white'

    },

})