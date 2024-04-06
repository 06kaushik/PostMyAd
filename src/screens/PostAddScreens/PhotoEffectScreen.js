import React from "react";
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, ScrollView, Switch, StyleSheet, Modal, Pressable } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import images from "../../constant/Images";


const PhotoEffectScreen = ({navigation}) => {

    return(
        <View>
             <View >
                <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={styles.linearStyle}>
                    <TouchableOpacity onPress={() => navigation.navigate('UploadFromPhone')}>
                        <Image source={images.back} style={styles.back} />
                    </TouchableOpacity>
                    <View>
                    <Text style={styles.prfile}>Edit</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('OrderSummary')}>
                    <Text style={{left:340,top:18,color:'white'}}>Save</Text>
                    </TouchableOpacity>
                    </View>
                </LinearGradient>

                <View>
                    <Image  source={images.appimage} style={{width:'80%',height:300,top:20,left:40}}/>
                </View>
            </View>



        </View>
    )
}

export default PhotoEffectScreen;

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
        left: 180,
        top: 38,
        fontFamily: 'Oswald',
        fontWeight: 'bold',
        fontSize: 14,
        color: 'white'

    },
})