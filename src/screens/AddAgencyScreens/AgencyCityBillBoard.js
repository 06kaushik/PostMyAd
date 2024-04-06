import React, { useState, useEffect, useRef, useCallback } from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import images from "../../constant/Images";
import axios from 'axios';
import SwitchSelector from "react-native-switch-selector";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import VenueIcon from "../UserScreens/Data/Venue";
import RBSheet from "react-native-raw-bottom-sheet";
import CheckBox from '@react-native-community/checkbox';
import { useIsFocused } from '@react-navigation/native';
import { Slider } from '@miblanchard/react-native-slider';



const numcol = 4

const type = [
    {
        name: 'Indoor',
        about: 'An indoor digital billboard can build brand awareness by placing',
        about1: 'the right message in places where the right people see it when they are inside.',
    },
    {
        name: 'Outdoor',
        about: 'An outdoor digital billboard can build brand awareness by placing',
        about1: 'the right message in places where the right people see it when they are outside.',
    }
]

const bill = [
    {
        name: 'All',
    },
    {
        name: 'Pedestal'
    },
    {
        name: 'Standing Display',
    },
    {
        name: 'Monopole'
    },
    {
        name: 'Spectacular'
    },
    {
        name: 'Window',
    },
    {
        name: 'Wall Mounted'
    },
    {
        name: 'Kiosk'
    },
    {
        name: 'Flag'
    }
]
const AgencyCityBillBoard = ({ navigation, route }) => {

    const [billBoard, setBillBoards] = useState([])
    // console.log('BILLLBOARDSS TABB', billBoard);
    const { VenueName } = route.params
    const refRBSheet = useRef();
    const [placeType, setPlaceType] = useState(false)
    const [selectVenue, setSelectVenue] = useState(null)

    const [like, setLike] = useState('false')
    const isFocused = useIsFocused();
    const [unSelected, setUnSelected] = useState(null)
    const [select, setSelect] = useState([])
    console.log('SELECTED VENUE DATA', select);


    const { state } = route.params
    console.log('stateeeeee', state);
    const [search, setSearch] = useState('')
    const [masterData, setmasterData] = useState([])
    const [wishlisted, setWishlisted] = useState([])
    const [inoutType, setInOutType] = useState([])
    const [billType, setBillType] = useState(false)
    const [getBillType, setGetBillType] = useState([])
    console.log('BILLBOARD TYPE', getBillType);
    const [value, setValue] = useState(0)


    React.useEffect(() => {
        AllBillBoard()
    }, [isFocused]);



    function multiSelect(e) {
        console.log('dhcdlncldkncdcc', e);
        let storeArr = [...select];
        let index = storeArr.findIndex((item) => (item === e))
        if (index === -1) {
            storeArr.push(e)
        } else {
            storeArr.splice(index, 1)
        }
        setSelect(storeArr)
    }
    function TypeSelect(e) {
        let storeArr = [...inoutType];
        let index = storeArr.findIndex((item) => (item === e))
        if (index === -1) {
            storeArr.push(e)
        } else {
            storeArr.splice(index, 1)
        }
        setInOutType(storeArr)
    }

    function BillType(e) {
        let storeArr = [...getBillType];
        let index = storeArr.findIndex((item) => (item === e))
        if (index === -1) {
            storeArr.push(e)
        } else {
            storeArr.splice(index, 1)
        }
        setGetBillType(storeArr)
    }


    // const getBillBoards = async () => {
    //     try {
    //         const resp = await axios.get("api/billboard/getallbillboard");
    //         setBillBoards(resp.data.msg)
    //     } catch (err) {
    //         // Handle Error Here
    //         console.error("error from Billboard ==> ", err);
    //     }
    // }

    useEffect(() => {
        AllBillBoard()

    }, [select, state])

    const onHeartClick = () => {
        setLike(!like);
    };


    const GetBillBoard = ({ item }) => {
        return (
            <View style={styles.box}>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('AgencyMainBillBoards', { item: item })}>
                        <Image source={{ uri: item?.filesArr[0]?.fileurl }} style={styles.cardImage} />
                    </TouchableOpacity>
                </View>
                <View style={styles.cardflex}>
                    <Text style={styles.billboardname}>{item.billboardName}</Text>
                    {/* <TouchableOpacity onPress={() => onHeartClick()}>
                        {like === false ?
                            <Image style={styles.heartImage} source={images.redheart} />
                            :
                            <Image style={styles.heartImage} source={images.heart1} />
                        }
                    </TouchableOpacity> */}

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

    const SearchFilter = (text) => {
        if (text) {
            const newData = masterData.filter((item) => {
                const itemData = item.billboardName ? item.billboardName.toUpperCase() : item.city ? item.city.toUpperCase() :
                    ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

            setBillBoards(newData);
            setSearch(text)

        } else {
            setBillBoards(masterData)
            setSearch(text)
        }
    }


    React.useEffect(() => {
        setUnSelected(VenueName)

    }, [VenueName])


    const BrowseVenue = ({ item }) => {
        return (
            <>
                <TouchableOpacity onPress={() => { multiSelect(item.name) }}>
                    {select.includes(item.name) ?
                        <View>
                            <Image style={styles.icon1} source={item.image} />
                            <Text style={styles.venuetext1}>{item.name}</Text>
                            <View>
                            </View>
                        </View>
                        :
                        <View>
                            <Image style={styles.icon} source={item.image} />
                            <Text style={styles.venuetext}>{item.name}</Text>
                        </View>
                    }
                </TouchableOpacity>

            </>


        )
    }

    // useEffect(async() => {

    // //     try {
    // //         const resp = await axios.get("api/billboard/getallbillboard");
    // //         setBillBoards(resp.data.msg)
    // //     } catch (err) {
    // //         // Handle Error Here
    // //         console.error("error from Billboard ==> ", err);

    // // }


    // },[])





    const rbsheetIcon = ({ item }) => {
        return (
            <View style={styles.rbvenue}>
                <TouchableOpacity onPress={() => { multiSelect(item.name) }}>
                    {select.includes(item.name) ?
                        <>
                            <Image style={styles.icon3} source={item.image} />
                            <Text style={styles.venuetext3}>{item.name}</Text>
                        </>
                        :
                        <>
                            <Image style={styles.icon2} source={item.image} />
                            <Text style={styles.venuetext2}>{item.name}</Text>
                        </>
                    }
                </TouchableOpacity>
            </View>
        )
    }

    const handlePress = () => {
        // navigation.goBack();
        // navigation.navigate('Home');
    }





    const AllBillBoard = () => {
        let body = {
            venueTags: select,
            venueType: "",
            limit: 10,
            page: 1,
            sort: "",
            locationType: ""
        }
        console.log('BillBoard by Venue', body);


        const VenueBillboards = async () => {
            if (select.length !== 0) {
                try {
                    const resp = await axios.post('/api/billboard/billboard', body)
                    console.log('RESPONSE FROM VENUE API', resp.data.msg);
                    setBillBoards(resp.data.msg);
                    setmasterData(resp.data.msg)

                } catch (error) {

                }
            }
            else if (select.length === 0) {
                try {
                    const resp = await axios.get(`/api/billboard/searchbillboard?page=1&limit=10&searchQuery=${state}`)
                    setBillBoards(resp.data.msg)
                    setmasterData(resp.data.msg)
                } catch (err) {
                    // Handle Error Here
                    console.error("error from Billboard ==> ", err);
                }
            }
            else {
                try {
                    const resp = await axios.get("api/billboard/getallbillboard");
                    setBillBoards(resp.data.msg)
                    setmasterData(resp.data.msg)
                } catch (err) {
                    // Handle Error Here
                    console.error("error from Billboard ==> ", err);
                }
            }
        }
        VenueBillboards()

    }


    const InOutType = ({ item }) => {
        return (
            <View>
                {inoutType.includes(item.name) ?
                    <View>
                        <View style={styles.CheckBox}>
                            <CheckBox

                                value={true}
                                onValueChange={(newValue) => {
                                    TypeSelect(item.name)
                                    setPlaceType(newValue)
                                }}
                            />
                            <Text style={{ color: '#525252', fontSize: 14, fontFamily: 'Oswald-Bold', marginLeft: 5, marginTop: 3, }}>{item.name}</Text>
                        </View>
                        <Text style={{ color: '#717171', fontSize: 12, fontFamily: 'Oswald-Bold', alignSelf: 'center' }}>{item.about} {item.about1}</Text>

                    </View>
                    :
                    <View>
                        <View style={styles.CheckBox}>
                            <CheckBox

                                value={false}
                                onValueChange={(newValue) => {
                                    TypeSelect(item.name)
                                    setPlaceType(newValue)
                                }}
                            />
                            <Text style={{ color: '#525252', fontSize: 14, fontFamily: 'Oswald-Bold', marginLeft: 5, marginTop: 3, }}>{item.name}</Text>
                        </View>
                        <Text style={{ color: '#717171', fontSize: 12, fontFamily: 'Oswald-Bold', alignSelf: 'center' }}>{item.about}   {item.about1}</Text>
                    </View>
                }


            </View>


        )

    }


    const TypeBillboards = ({ item }) => {
        return (
            <View>
                {getBillType.includes(item.name) ?
                    <View style={styles.CheckBox}>
                        <CheckBox
                            value={true}
                            onValueChange={(newValue) => {
                                BillType(item.name)
                                setBillType(newValue)
                            }}
                        />
                        <Text style={styles.chktxt}>{item.name}</Text>
                    </View>
                    :

                    <View style={styles.CheckBox}>
                        <CheckBox
                            value={false}
                            onValueChange={(newValue) => {
                                BillType(item.name)
                                setBillType(newValue)
                            }}
                        />
                        <Text style={styles.chktxt}>{item.name}</Text>
                    </View>
                }

            </View>
        )

    }




    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <View>
                <View style={{ height: 78, backgroundColor: 'rgba(183,54,248,255)' }}>
                    <TouchableOpacity onPress={() => { navigation.goBack('', setSelect([])) }}>
                        <View style={{ marginTop: '8%' }}>
                            <Image source={images.back} style={{ marginLeft: 16, top: 5 }} />
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={{ alignSelf: 'center', bottom: 19, fontFamily: 'Oswald-Bold', color: 'white', fontSize: 18 }}>All Smart Bilboards</Text>
                    </View>
                </View>
            </View>


            <View style={{ backgroundColor: 'white', elevation: 4, height: 150 }}>
                <View>
                    <View style={styles.sc}>
                        <Image source={images.search} style={{
                            padding: 10,
                            margin: 5,
                            height: 16,
                            width: 16,
                            resizeMode: 'stretch',
                            alignItems: 'center',
                            left: 5
                        }} />
                        <TextInput
                            placeholder='Search here'
                            placeholderTextColor={'#2D2D2D'}
                            style={styles.input}
                            onChangeText={(text) => SearchFilter(text)}
                            value={search}
                        />
                        <TouchableOpacity onPress={() => refRBSheet?.current?.open()}>
                            {/* <Image source={images.filter} style={{
                                padding: 10,
                                margin: 5,
                                height: 16,
                                width: 16,
                                resizeMode: 'stretch',
                                alignItems: 'center',
                                right: 8

                            }} /> */}
                            <RBSheet
                                ref={refRBSheet}
                                closeOnDragDown={true}
                                height={600}
                                closeOnPressMask={true}
                                animationType={'slide'}
                                customStyles={{
                                    // wrapper: {
                                    //     backgroundColor: "transparent"
                                    // },
                                    draggableIcon: {
                                        backgroundColor: "#000"
                                    }
                                }}
                            >
                                <ScrollView>
                                    <View>
                                        <View style={{}}>
                                            <Text style={styles.filter}>Filters</Text>
                                            <TouchableOpacity onPress={() => navigation.goBack('')}>
                                                <Image style={styles.cross} source={images.cross} />
                                            </TouchableOpacity>
                                            <View style={{ borderWidth: 1, borderColor: '#DDDDDD', bottom: 8 }} />
                                        </View>
                                        <View>
                                            <Text style={styles.pricetxt}>Price</Text>
                                            <Text style={styles.num}>₹ 100 - ₹ 10000</Text>
                                            <View style={{ borderWidth: 1, borderColor: '#DDDDDD', marginTop: 8, marginLeft: 16, marginRight: 16 }} />
                                        </View>
                                        <View>
                                            <Text style={styles.place}>Type of Place</Text>

                                            <View style={{ borderWidth: 1, borderColor: '#DDDDDD', marginTop: 12, marginLeft: 16, marginRight: 16 }} />
                                            <View>
                                                <FlatList
                                                    data={type}
                                                    renderItem={InOutType}
                                                />
                                            </View>
                                            <View>
                                                <Text style={{ color: '#222222', fontSize: 16, fontFamily: 'Oswald-Bold', marginLeft: 16, marginTop: 8 }}>Billboard Type</Text>
                                                <View>
                                                    <FlatList
                                                        data={bill}
                                                        renderItem={TypeBillboards} />
                                                </View>
                                                <View style={{ borderWidth: 1, borderColor: '#DDDDDD', marginTop: 12, marginLeft: 16, marginRight: 16, }} />

                                                <View>
                                                    <Text style={styles.ven}>Venue</Text>
                                                    <View>
                                                        <FlatList
                                                            data={VenueIcon}
                                                            renderItem={rbsheetIcon}
                                                            numColumns={numcol} />
                                                    </View>
                                                    <View style={{ borderWidth: 1, borderColor: '#DDDDDD', marginTop: 12, marginLeft: 16, marginRight: 16, }} />

                                                </View>

                                                <View style={{}}>
                                                    <Text style={styles.size}>Size</Text>
                                                    <View style={styles.CheckBox}>
                                                        <CheckBox
                                                            disabled={false}
                                                            // value={toggleCheckBox}
                                                            // onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                                        />
                                                        <Text style={styles.chktxt}>All</Text>
                                                    </View>
                                                    <View style={styles.CheckBox}>
                                                        <CheckBox
                                                            disabled={false}
                                                            // value={toggleCheckBox}
                                                            // onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                                        />
                                                        <Text style={styles.chktxt}>12 * 12</Text>
                                                    </View>
                                                    <View style={styles.CheckBox}>
                                                        <CheckBox
                                                            disabled={false}
                                                            // value={toggleCheckBox}
                                                            // onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                                        />
                                                        <Text style={styles.chktxt}>8 * 8</Text>
                                                    </View>
                                                    <View style={styles.CheckBox}>
                                                        <CheckBox
                                                            disabled={false}
                                                            // value={toggleCheckBox}
                                                            // onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                                        />
                                                        <Text style={styles.chktxt}>12 * 8</Text>
                                                    </View>
                                                    <View style={{ borderWidth: 1, borderColor: '#DDDDDD', marginTop: 12, marginLeft: 16, marginRight: 16, }} />
                                                </View>


                                                <View style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
                                                    <Text style={styles.clear}>Clear all</Text>
                                                    <TouchableOpacity onPress={() => {refRBSheet.current.close() || AllBillBoard()}}>
                                                        <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ width: 163, height: 40, borderRadius: 8, marginRight: 16 }} >
                                                            <Text style={styles.showbttn}>Apply</Text>
                                                        </LinearGradient>
                                                    </TouchableOpacity>
                                                </View>

                                            </View>





                                        </View>


                                    </View>
                                </ScrollView>

                            </RBSheet>
                        </TouchableOpacity>


                    </View>
                </View>

                <View style={styles.browseContainer}>
                    <FlatList
                        data={VenueIcon}
                        renderItem={BrowseVenue}
                        horizontal={true}
                        style={{ marginLeft: 8 }}
                        showsHorizontalScrollIndicator={false} />
                </View>
            </View>

            {billBoard.length > 0 ?
                <View>
                    <FlatList
                        data={billBoard}
                        renderItem={GetBillBoard}
                        ListFooterComponent={<View style={{ margin: 170 }} />}
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
export default AgencyCityBillBoard

const styles = StyleSheet.create({
    sc: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#F7F8FD',
        borderWidth: 1,
        borderColor: '#DDDDDD',
        height: 48,
        alignSelf: 'flex-start',
        borderRadius: 15,
        margin: 10,
        width: '93%',
        marginTop: 12,
        marginLeft: 16
    },
    input: {
        flex: 1,
        color: 'black',
        paddingLeft: 15,
        fontSize: 12


    },
    icon: {
        height: 20,
        width: 20,
        margin: 12,
        marginLeft: 16,
        alignSelf: 'center',


    },
    venuetext: {
        color: '#6F6F6F',
        fontSize: 12,
        fontFamily: 'Oswald-Regular',
        alignSelf: 'center',
        marginLeft: 8,
        textAlign: 'center'
    },
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
    off: {
        color: '#6907C3',
        fontSize: 12,
        fontFamily: 'Oswald-Bold',
        alignSelf: 'center',
        bottom: 20,
        marginRight: '25%'

    },
    icon1: {
        height: 20,
        width: 20,
        margin: 12,
        marginLeft: 16,
        alignSelf: 'center',
        tintColor: 'rgba(183,54,248,255)'

    },
    venuetext1: {
        color: '#B937FA',
        fontSize: 12,
        fontFamily: 'Oswald-Regular',
        alignSelf: 'center',
        marginLeft: 8
    },
    filter: {
        color: '#2D2D2D',
        fontFamily: 'Oswald-Bold',
        fontSize: 16,
        alignSelf: 'center'
    },
    cross: {
        alignSelf: 'flex-end',
        bottom: 30,
        marginRight: 16
    },
    pricetxt: {
        color: '#2D2D2D',
        fontSize: 16,
        fontFamily: 'Oswald-Bold',
        marginLeft: 16
    },
    num: {
        color: '#5A5A5A',
        fontSize: 14,
        fontFamily: 'Oswald-Bold',
        marginLeft: 16,
        marginTop: 8
    },
    place: {
        color: '#222222',
        fontSize: 16,
        marginLeft: 16,
        fontFamily: 'Oswald-Bold',
        marginTop: 8
    },
    CheckBox: {
        flexDirection: 'row',
        marginLeft: 16,
        marginTop: 8
    },
    chktxt: {
        color: '#717171',
        fontSize: 14,
        fontFamily: 'Oswald-SemiBold',
        marginLeft: 5,
        marginTop: 3
    },
    ven: {
        color: '#222222',
        fontSize: 16,
        fontFamily: 'Oswald-Bold',
        marginLeft: 16,
        marginTop: 8,

    },
    icon2: {
        height: 24,
        width: 24,
        margin: 5,
        marginLeft: 13,
        alignSelf: 'center',
    },
    venuetext2: {
        // color: '#B937FA',
        color: '#6F6F6F',
        fontSize: 12,
        fontFamily: 'Oswald-Regular',
        alignSelf: 'center',
        marginLeft: 8,
        tintColor: ''
    },
    icon3: {
        height: 24,
        width: 24,
        margin: 5,
        marginLeft: 13,
        alignSelf: 'center',
        tintColor: '#B937FA',
    },
    venuetext3: {
        color: '#B937FA',
        fontSize: 12,
        fontFamily: 'Oswald-Regular',
        alignSelf: 'center',
        marginLeft: 8
    },
    rbvenue: {

        margin: 5,
        flex: 1,
        justifyContent: 'center'
    },
    size: {
        color: '#2D2D2D',
        fontSize: 16,
        fontFamily: 'Oswald-Bold',
        marginLeft: 16,
        marginTop: 8
    },
    clear: {
        color: '#222222',
        fontFamily: 'Oswald-Bold',
        fontSize: 16,
        marginLeft: 16,
        marginTop: 5
    },
    showbttn: {
        color: 'white',
        fontFamily: 'Oswald-Bold',
        fontSize: 16,
        alignSelf: 'center',
        top: 3

    }
})
