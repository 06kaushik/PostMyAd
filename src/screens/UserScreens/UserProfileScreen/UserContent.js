import React, { useState, useEffect } from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import images from "../../../constant/Images";


const UserContentPolicy = ({navigation}) => {
    return (
        <View>
             <View>
                <View style={{ height: 78,backgroundColor:'rgba(183,54,248,255)' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <View style={{marginTop:'8%'  }}>
                            <Image source={images.back} style={{marginLeft:16,top:5}} />
                            </View>
                            </TouchableOpacity>
                            <View>
                            <Text style={{alignSelf:'center',bottom:19,fontFamily:'Oswald-Bold',color:'white',fontSize:18}}>Content Policy</Text>
                            </View>
                        
                    

                </View>
            </View>
            <View style={{ backgroundColor: 'white', elevation: 4, marginLeft: 8, marginRight: 8, marginTop: 50, borderRadius: 15 }}>
                <Text style={styles.title}>Content Policy</Text>
                <View style={{ borderWidth: 0.5, marginTop: 15, borderColor: '#B5B5C3' }} />

                <View style={{ marginBottom: 40, marginTop: 15 }}>
                    <Text style={styles.content}>This policy pertains to any information, text, links, graphics, photos, audio, videos, digital art or art of any form, NFTs or other materials or arrangements of materials uploaded, downloaded or appearing on the Services (collectively referred to as “Content”).


                    </Text>
                    <Text style={styles.content1}>SAPS.ai reserves the right to remove content that violates our rules and policies, including for example, copyright or trademark violations or other intellectual property misappropriation, impersonation, unlawful conduct, or harassment. Information regarding specific policies and the process for reporting or appealing violations can be found in our Help Center. If you believe that your Content has been copied in a way that constitutes copyright infringement, please report this by visiting the Help Center.
                        All Content is the sole responsibility of the person who originated such Content. We may not monitor or control the Content posted on the SAPS.ai platform and we cannot and do not take the responsibility for such Content
                    </Text>
                </View>
            </View>


        </View>
    )
}

export default UserContentPolicy;

const styles = StyleSheet.create({
    headertxt: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'Oswald-Bold',
        // left: 5,
        bottom: 5,
        left: 23,



    },
    title: {
        fontFamily: 'Oswald-Bold',
        color: '#525252',
        fontSize: 18,
        marginLeft: 20,
        marginTop: 5

        // marginTop:99
    },
    content: {
        fontFamily: 'Oswald-SemiBold',
        color: '#525252',
        fontSize: 14,
        paddingHorizontal: 10,
        alignSelf: 'center'


    },
    content1: {
        fontFamily: 'Oswald-SemiBold',
        color: '#525252',
        fontSize: 14,
        paddingHorizontal: 18,
        alignSelf: 'center'

    },
    // content2: {
    //     fontFamily: 'Oswald-SemiBold',
    //     color: '#525252',
    //     fontSize: 14,
    //     paddingHorizontal: 10,
    //     alignSelf: 'center'

    // },
})