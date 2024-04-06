import React, { useState, useEffect } from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import images from "../../../constant/Images";


const UserTermsandCondition = ({navigation}) => {
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
                            <Text style={{alignSelf:'center',bottom:19,fontFamily:'Oswald-Bold',color:'white',fontSize:18}}>Cancellation Policy</Text>
                            </View>
                        
                    

                </View>
            </View>
            <View style={{ backgroundColor: 'white', elevation: 4, marginLeft: 8, marginRight: 8, marginTop: 50, borderRadius: 15 }}>
                <Text style={styles.title}>Cancellation Policy</Text>
                <View style={{ borderWidth: 0.5, marginTop: 15, borderColor: '#B5B5C3' }} />

                <View style={{ marginBottom: 40, marginTop: 15 }}>
                    <Text style={styles.content}>SAPS.ai has adopted a client friendly and flexible cancellation policy.
                        The cancellation can only be done up to 6 hours before the streaming of an ad.
                        If you cancel the streaming of your content/ ad. up to 6 hours before the show, 15% of base ad price will be deducted as cancellation fee and the remaining will be refunded to you.


                    </Text>
                    <Text style={styles.content1}>You are allowed to cancel up to 2 content/ad transactions in 30 days.
                        You cannot cancel an ad. if you have applied any discount offers, vouchers or any other loyalty points.

                    </Text>
                    <Text style={styles.content2}>On cancellation of the ad, the Internet handling charges and payment gateway charges will not be refunded.

If you opt for the refund on any other payment source – Credit card/ Debit card or Net banking, the amount will take up to 10-15 days to get credited into your account.

We reserve the right to modify/ add/ alter/ revise/ discontinue or otherwise carry out any necessary changes to these terms and conditions and/ or the cancellation feature (either wholly or in part).

These terms and conditions are in addition to the terms and conditions and the privacy policy available here ____

To avail cancellation, you should be logged in to your SAPS.ai account.</Text>
                </View>
            </View>


        </View>
    )
}

export default UserTermsandCondition;
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
        paddingHorizontal: 10,
        alignSelf: 'center'

    },
    content2: {
        fontFamily: 'Oswald-SemiBold',
        color: '#525252',
        fontSize: 14,
        paddingHorizontal: 10,
        alignSelf: 'center'

    },
})