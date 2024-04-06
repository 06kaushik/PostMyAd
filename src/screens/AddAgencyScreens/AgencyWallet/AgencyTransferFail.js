import React, { useState, useEffect } from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import images from "../../../constant/Images";


const AgencyTransferFailed = ({navigation}) => {
    return (

        <View style={styles.main}>
            <View style={{ height: 78, backgroundColor: '#F00000', }}>
                <View style={styles.cont}>
                    <TouchableOpacity onPress={() => navigation.goBack('')}>
                    <Image style={{ marginTop: 5 }} source={images.back} />
                    </TouchableOpacity>
                    <Text style={styles.txt}>Transfer failed</Text>
                    <Text style={{ color: 'white', fontFamily: 'Oswald-SemiBold', top: 5 }}>Help</Text>
                </View>
            </View>
            <View style={styles.container}>
                <View>
                    <Text style={styles.amnt}>Amount</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.rupee}>₹ 5000</Text>
                    <Image style={{ marginTop: 32, marginLeft: 16 }} source={images.bigcross} />
                </View>
                <View style={{ borderWidth: 1, borderColor: '#DDDDDD', marginLeft: 16, marginRight: 16, marginTop: 8 }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={styles.too}>To Your</Text>
                        <Text style={styles.your}>PostMyAd</Text>
                    </View>
                    <View>
                        <Image style={styles.image} source={images.wpma} />
                    </View>
                </View>
                <View style={{ borderWidth: 1, borderColor: '#DDDDDD', marginLeft: 16, marginRight: 16, marginTop: 24 }} />

                <View>
                    <View>
                        <Text style={styles.from}>From Your</Text>
                        <Text style={styles.bank}>HDFC Bank</Text>
                        <Text style={styles.acc}>A/c No. XX 9898</Text>
                    </View>
                    <View style={{ marginTop: 12, marginLeft: 16 }}>
                        <Text style={styles.added}>Added at 01:25 PM, 31 jul 2022</Text>
                        <Text style={styles.upi}>UPI Ref No: 415236547898412</Text>

                    </View>
                </View>


            </View>

            <View style={{ flex: 1 }}>
                <View style={styles.bttn}>
                    <Text style={styles.bttntxt}>Download Invoice</Text>

                </View>
            </View>

        </View>
    )
}

export default AgencyTransferFailed

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    cont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 16,
        marginRight: 16,
        marginTop: 35
    },
    txt: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Oswald-Bold',
        bottom: 4

    },
    container: {
        height: 460,
        width: '90%',
        borderWidth: 1,
        alignSelf: 'center',
        marginTop: 16,
        borderColor: '#DDDDDD',
        borderRadius: 8
    },
    bttn: {
        height: 57,
        width: '90%',
        backgroundColor: 'rgba(183,54,248,255)',
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        borderRadius: 15,
        marginBottom: 10
    },
    bttntxt: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Oswald-Bold',
        top: 10
    },
    amnt: {
        color: 'black',
        fontFamily: 'Oswald-Bold',
        fontSize: 18,
        marginLeft: 16,
        marginTop: 12
    },
    rupee: {
        color: '#525252',
        fontFamily: 'Oswald-Bold',
        fontSize: 56,
        marginLeft: 16,
        marginTop: 8
    },
    too: {
        color: '#717171',
        fontFamily: 'Oswald-Bold',
        fontSize: 16,
        marginLeft: 16,
        marginTop: 8
    },
    your: {
        color: 'black',
        fontFamily: 'Oswald-Bold',
        fontSize: 18,
        marginLeft: 16,
        marginTop: 3
    },
    mobile: {
        color: '#717171',
        fontFamily: 'Oswald-Bold',
        fontSize: 14,
        marginLeft: 16,
        marginTop: 6
    },
    image: {
        marginRight: 16,
        marginTop: 28
    },
    from: {
        color: '#717171',
        fontFamily: 'Oswald-Bold',
        fontSize: 16,
        marginLeft: 16,
        marginTop: 8
    },
    bank: {
        color: 'black',
        fontFamily: 'Oswald-Bold',
        fontSize: 18,
        marginLeft: 16,
        marginTop: 3

    },
    acc: {
        color: '#717171',
        fontFamily: 'Oswald-Bold',
        fontSize: 16,
        marginLeft: 16,
        marginTop: 3

    },
    added: {
        color: '#717171',
        fontFamily: 'Oswald-Bold',
        fontSize: 16,
        marginTop: 3

    },
    wallet: {
        color: '#717171',
        fontFamily: 'Oswald-Bold',
        fontSize: 16,
        marginTop: 3

    },
    upi: {
        color: '#717171',
        fontFamily: 'Oswald-Bold',
        fontSize: 16,
        marginTop: 3

    }
})
