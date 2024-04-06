import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StatusBar, ImageBackground, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import images from '../../../constant/Images'
import LinearGradient from 'react-native-linear-gradient';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';


const AgencyAnalytics = () => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.container1}>
                <View style={styles.container}>
                    <Text style={styles.booking}>Booking Stats</Text>
                    <Text style={styles.seall}>Sell All</Text>
                </View>
               
            </View>
            <View style={{flex:1,justifyContent:'center'}}>
                <Text style={styles.data}>No Data yet</Text>
                </View>
            

        </View>
    )
}
export default AgencyAnalytics

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white'

    },
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:8
    },
    booking:{
        color:'#5A5A5A',
        fontFamily:'Oswald-Bold',
        fontSize:16,
        marginLeft:16,
    },
    seall:{
        color:'#B937FA',
        fontSize:12,
        fontFamily:'Oswald-Bold',
        marginRight:16

    },
    container1:{
        backgroundColor:'white',
        elevation:4
    },
    data:{
        color:'black',
        alignSelf:'center',
        fontSize:20,
        fontFamily:'Oswald-Bold'
    }
})