import React from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import images from "../../../constant/Images";
import LinearGradient from 'react-native-linear-gradient';



const AgencyRejectedOrder = () => {
    return(

        <View style={styles.main}>
            <View style={styles.containerBox}>
                <View>
                    <View style={styles.insideBox}>
                        <View style={styles.live}>
                            <Text style={styles.txt} >Live</Text>
                        </View>
                        <View style={styles.view}>
                            <Text style={styles.txt1}>View</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.order}>Order Id</Text>
                    </View>
                    <View>
                        <Text style={styles.title}>Pizza Promotion</Text>
                    </View>
                    <View style={styles.bottombox}>
                        <Text style={styles.date}>05th April 2022</Text>
                        <Text style={styles.time}>04:00 - 05:00 PM</Text>
                        <Text style={styles.duration}>Duration: 30 sec</Text>
                    </View>
                </View>

            </View>

        </View>
    )
}

export default AgencyRejectedOrder;

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    containerBox: {
        backgroundColor: 'white',
        elevation: 4,
        height: 111,
        width: 328,
        marginLeft: 16,
        marginRight: 16,
        alignSelf: 'center',
        borderRadius: 8,
        marginTop: 32

    },
    insideBox: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    txt: {
        color: 'white',
        fontSize: 12,
        fontFamily: 'Oswald-SemiBold',
        textAlign: 'center',
        top: 3

    },
    txt1: {
        color: '#B937FA',
        fontSize: 12,
        fontFamily: 'Oswald-SemiBold',
        textAlign: 'center',

    },
    live: {
        height: 32,
        width: 118,
        borderRadius: 15,
        backgroundColor: 'red',
        bottom: 13
    },
    view: {
        height: 24,
        width: 71,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#B937FA',
        marginRight: 16,
        marginTop: 8
    },
    order: {
        color: '#6F6F6F',
        fontSize: 10,
        fontFamily: 'Oswald-Regular',
        marginLeft: 16
    },
    title: {
        color: '#3D3D3D',
        fontSize: 14,
        fontFamily: 'Oswald-Bold',
        marginLeft: 16
    },
    bottombox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 16,
        marginRight: 16, marginTop: 8
    },
    date: {
        color: '#6F6F6F',
        fontSize: 12,
        fontFamily: 'Oswald-SemiBold'

    },
    time: {
        color: '#6F6F6F',
        fontSize: 12,
        fontFamily: 'Oswald-SemiBold'

    },
    duration: {
        color: '#3D3D3D',
        fontSize: 12,
        fontFamily: 'Oswald-SemiBold'

    }
})