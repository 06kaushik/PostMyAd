import React, { useState, useEffect } from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import images from "../../constant/Images";
import axios from "axios";
import { adminRequest } from "./AxiosInstance";


const WishlistBill = ({ navigation }) => {
    const [wishlist, setWishlisted] = useState(null)
    


    const requestLikeData = async () => {
        try {
            const resp = await adminRequest.get('/api/user/getAllWishlist')
            // console.log('RESPONSE FROM WISHLISTED>>>>>', resp.data.msg);
            setWishlisted(resp.data.msg)
        } catch (error) {
            console.log('ERROR FROM WISHLISTED ', error);

        }
    }

    useEffect(() => {
        requestLikeData()
    }, [])


    const renderItem = ({ item }) => {
        // console.log('WISHLIESTEDD ITEM>>>', item);
       
        return (
            <TouchableOpacity onPress={() => navigation.navigate('UserBillBoard', { item: item })}>
                <View style={styles.box}>
                    <View>

                        <Image source={{ uri: item?.filesArr[0]?.fileurl }} style={styles.cardImage} />

                    </View>
                    <View style={styles.cardflex}>
                        <Text style={styles.billboardname}>{item.billboardName}</Text>
                        {/* <TouchableOpacity onPress={() => heartClicked()}>
                        {wishlisted?.billboardWishList?.filter(value => value?._id  === item?._id).length > 0 ?
                            <Image style={styles.heartImage} source={images.rhh} />
                            :
                            <Image style={styles.heartImage} source={images.ehh} />
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
            </TouchableOpacity>
        )
    }



    return (
        <View style={styles.main}>
            <View style={{ height: 78, backgroundColor: 'rgba(183,54,248,255)' }}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => navigation.goBack('')}>
                        <Image style={styles.back} source={images.back} />
                    </TouchableOpacity>
                    <Text style={styles.headertxt}>Wishlist</Text>
                </View>
            </View>

            <View>
                <FlatList
                    data={wishlist?.billboardWishList}
                    renderItem={renderItem}
                    ListFooterComponent={<View style={{ margin: 100 }} />}
                />
            </View>

        </View>
    )
}

export default WishlistBill;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor:'white'
    },
    headertxt: {
        color: 'white',
        fontFamily: 'Oswald-Bold',
        fontSize: 18,
        marginRight: 180,
        marginTop: 30
        // bottom: 25
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    back: {
        marginLeft: 16,
        marginTop: 37,
    },
    box: {
        backgroundColor: 'white',
        elevation: 4,
        height: 290,
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
        width: 30,
        height: 30
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
})