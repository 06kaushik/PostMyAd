import React, { useState, useEffect } from 'react'
import { View, Text, Image, FlatList, ScrollView, Switch, StyleSheet, ImageBackground, Pressable, TouchableOpacity } from 'react-native'
import images from '../../../constant/Images'
import Slideshow from 'react-native-image-slider-show';



const AgencyMainBillBoard = ({ navigation, route }) => {

    const { item } = route.params
    // console.log('DATTAAAA', item);
    const [like, setLike] = useState('false')

    const onHeartClick = () => {
        setLike(!like);
    };

    return (
        <View style={styles.maincontainer}>

            <View>
                <View>
                    {/* source={{ uri: item?.filesArr[0]?.fileurl }} style={styles.headerImge} */}

                    <Slideshow
                        dataSource={[
                            { url: item?.filesArr[0]?.fileurl },
                            { url: item?.filesArr[1]?.fileurl, },
                            { url: item?.filesArr[2]?.fileurl, },
                            { url: item?.filesArr[3]?.fileurl, },

                        ]}
                    />
                    <View style={styles.icon}>
                        <TouchableOpacity onPress={() => navigation.goBack('')}>
                            <Image style={styles.back} source={images.back} />
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress={() => onHeartClick()}>
                        {like === false ?
                            <Image style={styles.heart} source={images.redheart} />
                            :
                            <Image style={styles.heart} source={images.heart} />
                        }
                    </TouchableOpacity> */}

                    </View>


                </View>
            </View>

            <ScrollView>
                <View style={styles.container1}>
                    <Text style={styles.title}>{item.billboardName}</Text>
                    <Text style={styles.address}>{item.city}</Text>
                    <Text style={styles.address}>{item?.pincode}</Text>
                    <TouchableOpacity style={styles.mapcontainer} onPress={() => navigation.navigate('Map')}>
                        <View style={styles.flex}>
                            <TouchableOpacity onPress={() => navigation.navigate('AgencyMap', { item: item })}>
                                <Text style={styles.maptxt}>View on Map</Text>
                            </TouchableOpacity>
                            <Image source={images.map} style={styles.mapimage} />
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.sec}>Rs {item.basePrice}/sec</Text>
                        </View>
                    </TouchableOpacity>
                    <View>

                    </View>

                </View>
                {/* <View style={{ backgroundColor: 'white', elevation: 4, marginTop:12, height: 136 }}>
                <Text style={{ color: '#525252', fontFamily: 'Oswald-Bold', fontSize: 18, marginLeft: 16,marginTop:12  }}>Insights</Text>
                <FlatList
                    data={BillBoardAdminData}
                    renderItem={InsightData}
                    horizontal={true}
                    style={{}}
                    showsHorizontalScrollIndicator={false} />
            </View> */}

                <View style={{ backgroundColor: 'white', elevation: 4, marginTop: 12, marginBottom: 70 }} >
                    <View>
                        <Text style={{ fontFamily: 'Oswald-Bold', marginLeft: 16, color: '#525252', fontSize: 18, marginTop: 12 }}>About Billboard</Text>
                    </View>

                    <View style={{ marginLeft: 16, marginTop: 8 }} >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: 'Oswald-Bold', color: '#B5B5C3', fontSize: 16, }}>UID</Text>
                            <Text style={{ fontFamily: 'Oswald-Bold', color: '#5A5A5A', fontSize: 16, marginLeft: 60 }}>: {item?.billboardId}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: 'Oswald-Bold', color: '#B5B5C3', fontSize: 16, marginTop: 8 }}>Size</Text>
                            <Text style={{ fontFamily: 'Oswald-Bold', color: '#5A5A5A', fontSize: 16, marginTop: 8, marginLeft: 58 }}>: {item?.billboardSize}</Text>


                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: 'Oswald-Bold', color: '#B5B5C3', fontSize: 16, marginTop: 8 }}>Location</Text>
                            <Text style={{ fontFamily: 'Oswald-Bold', color: '#5A5A5A', fontSize: 16, marginTop: 8, marginLeft: 28 }}>: {item?.locationType}</Text>

                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: 'Oswald-Bold', color: '#B5B5C3', fontSize: 16, marginTop: 8 }}>Venue Type</Text>
                            <Text style={{ fontFamily: 'Oswald-Bold', color: '#5A5A5A', fontSize: 16, marginTop: 8, marginLeft: 12, }}>: {item?.venueType}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: 'Oswald-Bold', color: '#B5B5C3', fontSize: 16, marginTop: 8 }}>Venue</Text>
                            <Text style={{ fontFamily: 'Oswald-Bold', color: '#5A5A5A', fontSize: 16, marginTop: 8, marginLeft: 12,textAlign:'left',marginRight:35}}>        : {item?.venueTags.join(',')}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontFamily: 'Oswald-Bold', color: '#B5B5C3', fontSize: 16, marginTop: 8 }}>About</Text>
                            <Text style={{ fontFamily: 'Oswald-Bold', color: '#5A5A5A', fontSize: 16, marginTop: 8, marginLeft: 42, marginBottom: 20 }}>: {item?.aboutBillboard}</Text>
                        </View>
                    </View>
                    
                </View>

            </ScrollView>

            <View style={styles.footerContainer}>
                <View style={{ width: '100%', position: 'absolute', bottom: 0, backgroundColor: 'rgba(183,54,248,255)' }}>
                    <View style={styles.footer}>
                        <TouchableOpacity onPress={() => navigation.navigate('AgencyAddPost', { item: item })}>
                            <Text style={styles.sorttxt}>Book</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>


        </View>
    )
}

export default AgencyMainBillBoard

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: '#f7f8fd'

    },
    headerImge: {
        width: '100%',
        height: 293

    },
    icon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16
    },
    back: {
        marginLeft: 8,

    },
    heart: {
        marginRight: 8
    },
    container1: {
        backgroundColor: 'white',
        elevation: 4,
        height: 150

    },
    title: {
        color: 'black',
        fontSize: 18,
        marginLeft: 16,
        fontFamily: 'Oswald-Bold',
        marginTop: 6
    },
    address: {
        color: '#6F6F6F',
        fontWeight: 'bold',
        marginLeft: 16,
        fontSize: 16,
        marginTop: 4
    },
    mapcontainer: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    maptxt: {
        left: 16,
        backgroundColor: '#F7F8FD',
        width: 120,
        borderRadius: 5,
        height: 40,
        paddingTop: 10,
        fontWeight: 'bold',
        color: 'black',
        borderWidth: 1,
        paddingLeft: 7,

        borderColor: '#e4e6ef'
    },
    mapimage: {
        top: 11,
        right: 3
    },
    flex: {
        flexDirection: 'row',


    },
    sec: {
        color: '#525252',
        alignSelf: 'center',
        top: 5,
        fontFamily: 'Oswald-Bold',
        fontSize: 18
    },
    box: {
        marginRight: 16,
        borderColor: '#e4e6ef',
        borderWidth: 1,
        borderRadius: 8,

        width: 120,
        height: 40,

    },
    footerContainer: {
        flex: 1,


    },
    footer: {

        height: 50,
    },
    sorttxt: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        marginTop: 13,
        textAlign: 'center'

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",

    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 75,
        bottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

    },
    modalText: {

        textAlign: "center",
        bottom: 70,
        fontWeight: 'bold',
        color: 'black',
        left: 40,
        fontSize: 17
    },
    cross: {
        bottom: 70,
        left: 50

    },
    buttonClose: {
        backgroundColor: "#2196F3",
        top: 40
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        height: 30,
        top: 5,
    },
})
