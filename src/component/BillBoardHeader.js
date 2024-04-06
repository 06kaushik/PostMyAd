import React from "react";
import { View, Text, Image, StyleSheet, TextInput,TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import images from "../constant/Images";


const BillBoardHeader = ({navigation}) => {

    return (
        <View>
            <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ height: 80 }}>
                <TouchableOpacity onPress={() => navigation.navigation('Home')}>
                <Image source={images.back} style={styles.backbttn}  />
                </TouchableOpacity>
                <Text style={styles.headertxt}>All Smart Bilboards</Text>
            </LinearGradient>
        </View>
    )
}

export default BillBoardHeader;

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
    
})