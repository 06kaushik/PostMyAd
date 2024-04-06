import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView,FlatList,Pressable } from 'react-native'


const RecentAnalytics = () => {
    return(
        <View style={{backgroundColor:'white',height:40,borderRadius:10,width:'70%',top:'20%',alignSelf:'center'}}>
                  
             <Text style={{color:'#6906C3',fontFamily:'Oswald-Bold',fontSize:16,textAlign:'center',top:7}}>Comming Soon</Text>
              
            



        </View>
    )
}

export default RecentAnalytics
const styles = StyleSheet.create({
    linearStyle: {
        flexDirection: 'row',
        height: 70,

    },
    back: {
        left: 20,
        top: 40

    },
    prfile: {
        left: 153,
        top: 35,
        fontFamily: 'Calibri',
        fontWeight: '700',
        fontSize: 18,
        color: 'white'

    },
    orderimg:{
        width:'100%'
    },
    canceltxt:{
        fontFamily: 'Calibri',
        fontWeight: '700',
        fontSize: 12,
        color: 'white',
        left:315,
        top:17

    }
})