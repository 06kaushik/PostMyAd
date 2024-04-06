import React from "react";
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import images from "../constant/Images";

const BillBoardAdminHeader = ({navigation}) => {

    return(
        <View>
           <View>
                    <Image source={images.baner} style={{ width: '100%' }} />
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('BillBoardAdmin')}>
                        <Image source={images.back} style={{ top: -250, left: 20 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ left: 20, bottom: 60 }}>
                    <Text style={{ backgroundColor: '#90C456', width: 45, color: 'white', borderRadius: 5, height: 23 }}>  4.2</Text>
                    <Image source={images.star} style={{ left: 28, height: 15, width: 15, bottom: 20 }} />
                </View>


        </View>
    )
}

export default BillBoardAdminHeader;