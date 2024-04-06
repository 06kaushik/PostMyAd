import React, { useState, useContext, useEffect } from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import images from "../../../constant/Images";



const AgencyKyc = ({navigation}) => {
    return (

        <View style={styles.mainContainer}>
            <View style={styles.container1}>
                <View>
                    <Text style={styles.title}>KYC Document</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ marginLeft: 16, marginTop: 8 }}>
                        <View  style={{ height: 32, width: 157, borderRadius: 8,backgroundColor:'rgba(183,54,248,255)' }} >
                            <View style={{}}>
                                <Text style={{ alignSelf: 'center', color: 'white', fontSize: 14, fontFamily: 'Oswald-Bold', top: 2 }}>Adhar Card</Text>
                            </View>

                        </View>
                    </View>
                    <View style={{ marginRight: 16, marginTop: 8, }}>
                        <View style={{ height: 32, width: 157, backgroundColor: '#F7F8FD', borderRadius: 8 }}>
                            <Text style={{ alignSelf: 'center', color: '#A3A3A3', fontSize: 14, fontFamily: 'Oswald-Bold', top: 3 }}>Pan Card</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.container2}>
                    <Text style={styles.name}>Adhar Card Number</Text>
                    <View style={{ marginTop: 8 }}>
                        <TextInput
                            placeholder="Adhaar Number"
                            placeholderTextColor={'grey'}
                            style={styles.textInput} />
                    </View>
                </View>

                {/* <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ color: '#A3A3A3', alignSelf: 'center', fontFamily: 'Oswald-Regular' }}>Please tick the box to continue</Text>
                    <View>
                        <View>
                        </View>
                    </View>
                </View> */}
                {/* <View style={{ flex: 1 }}>
                <View style={{ height: 60, width: '100%', bottom: 0, position: 'absolute',marginBottom:20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <TouchableOpacity>
                            <View style={styles.cont}>
                                <Text style={styles.bottombttn}>Cancel</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={() => navigation.navigate('ProfileMainScreen')}>
                        <View style={styles.cont1}>
                                <Text style={styles.bottombttn1}>Save</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </View> */}
            </View>
        </View>

    )
}

export default AgencyKyc;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',


    },
    container1: {
        backgroundColor: 'white',
        elevation: 4,
        marginTop: 10, height: '100%'
    },
    title: {
        color: 'black',
        marginLeft: 16,
        fontFamily: 'Oswald-Bold',
        fontSize: 18
    },
    name: {
        color: '#A3A3A3',
        fontSize: 14,
        fontFamily: 'Oswald-Bold',
        marginLeft: 16
    },
    container2: {
        marginTop: 12
    },
    textInput: {
        color: '#525252',
        fontFamily: 'Oswald-Regular',
        backgroundColor: '#F7F8FD',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 8,
        paddingLeft: 15

    },
    bottombttn: {
       
        fontFamily: 'Oswald-SemiBold',
        fontSize: 16,
        color:'#A3A3A3',
        textAlign:'center',
        top:4,
       

    },
    bottombttn1: {
        
        fontFamily: 'Oswald-SemiBold',
        fontSize: 16,
        color:'white',
        textAlign:'center',
        top:4

    },
    cont:{
        borderWidth:1,
        width:153,
        height:40,
        borderRadius:8,
        marginLeft:16,
        borderColor:'#CCCCCC'
    },
    cont1:{
        width:153,
        height:40,
        borderRadius:8,
        marginRight:16,
        backgroundColor:'rgba(183,54,248,255)'
    }
})