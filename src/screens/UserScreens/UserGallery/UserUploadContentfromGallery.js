import React, { useState, useEffect } from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity,ActivityIndicator,Pressable } from 'react-native'
import images from "../../../constant/Images";
import LinearGradient from 'react-native-linear-gradient';
import * as ImagePicker from 'react-native-image-picker'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Progress from 'react-native-progress';
import Video from "react-native-video";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import Modal from 'react-native-modal'



const UserUploadContent = ({navigation}) => {
    return(
        <View style={{flex:1}}>
             <StatusBar hidden={true} />
            <View>
                <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ height: 60 }}>
                    <TouchableOpacity onPress={() => navigation.goBack('DashBoardGallery')}>
                        <Image source={images.back} style={styles.backbttn} />
                        <Text style={styles.headertxt}>Upload Content</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>


        </View>
    )
}


export default UserUploadContent
const styles = StyleSheet.create({
    backbttn: {
        top: 30,
        left: 20
    },
    headertxt: {
        color: 'white',
        left: 40,
        top: 12,
        fontSize: 14,
        fontWeight: 'bold'
    },
})