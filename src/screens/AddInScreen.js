import React, { useState, useEffect } from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import images from "../constant/Images";
import axios from 'axios';
import SwitchSelector from "react-native-switch-selector";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const screenOptions = [
    { label: 'List', value: 'List' },
    { label: 'Grid', value: 'Grid' }
];

const BillBoardMainScreen = ({ navigation, route }) => {

    const [seeAllBillBoard, setSeeAllBillBoard] = useState([])
    const[gridView, setGridView] = useState('List')
    

    const Bilboard = ({ item }) => {
        return (
            <View style={styles.box}>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('BillBoardAdmin',{ id: item._id, deviceId: item.deviceId._id, lattitude: item.lattitude, longitude: item.longitude,uri: item?.filesArr[0]?.fileurl  })}>
                        <Image source={{ uri: item?.filesArr[0]?.fileurl }} style={styles.board} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.name}>{item.billboardName}</Text>
                </View>
                <View>
                    <Text style={styles.address}>{item.city}</Text>
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


    const getAllBillboard = async () => {
        try {
            const resp = await axios.get("/api/billboard/getbillboard");
            setSeeAllBillBoard(resp.data.msg)
            // await AsyncStorage.setItem('TOKEN', JSON.stringify(resp.data.token))

        } catch (err) {
            // Handle Error Here
            console.error("error from Billboard ==> ", err);
        }
    }

    useEffect(() => {
        getAllBillboard()

    }, [])

    const BilboardGrid = () => {
        return(
            <View style={{backgroundColor:'white',height:40,borderRadius:10,width:'70%',top:'20%',alignSelf:'center',marginLeft:20}}>
            <Text style={{color:'#B937FA',fontFamily:'Oswald-Bold',fontSize:16,textAlign:'center',top:7,marginLeft:20}}>Comming Soon</Text>
       </View>
        )

    }



    return (
        <View style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>
            <StatusBar hidden={true} />
            <View>
                <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ height: 60 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <View style={{marginTop:'8%'  }}>
                            <Image source={images.back} style={{marginLeft:8,}} />
                            </View>
                            </TouchableOpacity>
                            <View>
                            <Text style={{alignSelf:'center',bottom:19,fontFamily:'Oswald-Bold',color:'white'}}>All Smart Bilboards</Text>
                            </View>
                        
                    

                </LinearGradient>
            </View>



            <View style={{ backgroundColor: 'white', elevation: 4, height: 130 }} >

                <TextInput
                    style={styles.textInput}
                    placeholder="Search here..."
                    placeholderTextColor='#5A5A5A' />
                <Image source={images.search} style={{ left: 27, bottom: 22, }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-around',top:10 }}>
                    <View style={{ borderWidth: 1, backgroundColor: 'white', height: 32, width: 89, borderColor: 'rgba(221, 221, 221, 1)', borderRadius: 8 }}>
                        <Image source={images.sort} style={{ top: 7, left: 7 }} />
                        <Text style={{ color: 'black', textAlign: 'center', fontSize: 14, fontFamily: 'Oswald-Bold', bottom: 15, left: 7 }}>Sort</Text>
                    </View>
                    <View style={{ borderWidth: 1, backgroundColor: 'white', height: 32, width: 89, borderColor: 'rgba(221, 221, 221, 1)', borderRadius: 8 }}>
                        <Image source={images.pinned} style={{ top: 7, left: 10 }} />
                        <TouchableOpacity onPress={() => navigation.navigate('Map2',{BillBoardData: seeAllBillBoard})}>
                        <Text style={{ color: 'black', textAlign: 'center', fontSize: 14, fontFamily: 'Oswald-Bold', bottom: 14, left: 5 }}>Map</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: 90 }}>
                <SwitchSelector
                    initial={0}
                      onPress={value => {
                        console.log("====+", value)
                        setGridView(value)
                      }}
                    textColor={'black'} //'#7a44cf'
                    selectedColor={'white'}
                    buttonColor={'purple'}
                    borderColor={'rgba(221, 221, 221, 1)'}
                    hasPadding
                    height={32}
                    borderRadius={8}
                    options={screenOptions}
                />
            </View>

                </View>
            </View>

            {/* <View style={{ top: 24 }}>
                <Text style={styles.rsltTxt}>{seeAllBillBoard.length} result</Text>
            </View> */}

            <View style={{ top: '1%' }}>
                {gridView === 'List' ? 
                <FlatList
                key={'_'}
                keyExtractor={item => "_" + item.id}
                    data={seeAllBillBoard}
                    renderItem={Bilboard}
                    numColumns={2}
                    ListFooterComponent={<View style={{ margin: 110 }} />}
                />
                :
                <FlatList
                key={'#'}
                keyExtractor={item => "#" + item.id}
                    data={seeAllBillBoard}
                    renderItem={BilboardGrid}
                    horizontal={true}
                    ListFooterComponent={<View style={{ margin: 110 }} />}
                />
        }


                {/* <Text style={{fontSize:25,textAlign:'center',fontWeight:'bold'}}>Nothing Assigned yet</Text> */}
            </View>

            {/* <View style={styles.footerContainer}>
                <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']}>
                    <View style={styles.footer}>
                        <Text style={styles.sorttxt}>Sort</Text>
                    </View>
                </LinearGradient>
            </View>

            <View style={styles.footerContainer1}>
                <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']}>
                    <View style={styles.footer1}>
                        <Text style={styles.filtertxt}>Filter</Text>
                    </View>
                </LinearGradient>
            </View> */}


        </View>
    )
}

export default BillBoardMainScreen;

const styles = StyleSheet.create({
    board: {
        width: '100%',
        height: '85%',
        borderRadius: 7
    },
    textInput: {

        height: hp(7),
        left: 16,
        borderRadius: 10,
        fontFamily: 'Oswald-SemiBold',
        width: wp(90),
        borderWidth: 1,
        borderColor: '#dddddd',
        right: 16,
        top: 12,
        paddingLeft:40,
        fontStyle: 'normal',
        color:'black'
    },
    searchBttn: {
        textAlign: 'center',
        margin: 3,
        color: 'black',
        fontWeight: 'bold',
        width: 80,


    },
    searchContainer: {
        // width: '30%',
        height: 30,
        borderRadius: 5,
        right: 80,
        top: '42%'



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
        marginLeft:12,
        marginRight:12




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
        fontFamily: 'Oswald-Bold',
        // left: 5,
        bottom: 5,
        left:23,
        
        

    },
    GridBox:{
        flex:1,
        width: '90%',
        height: 185,
        margin: 10,
        backgroundColor: "red",
        borderRadius: 10,
        elevation: 2,
        left: 6

    }


})