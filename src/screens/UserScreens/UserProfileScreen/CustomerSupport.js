import React, { useState, useContext, useEffect } from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import images from "../../../constant/Images";
import { ScrollView } from "react-native-gesture-handler";



const CustomerSupport = ({navigation}) => {
    return (
        <View style={{ flex: 1 }}>
            <View>
                <View style={{ height: 78, backgroundColor: 'rgba(183,54,248,255)' }}>

                    <View>
                        <TouchableOpacity onPress={() => navigation.goBack('')}>
                            <View style={{ marginTop: '8%', }}>
                                <Image source={images.back} style={{ marginTop: 5, marginLeft: 16 }} />
                                <View style={{ alignSelf: 'center', bottom: 20 }}>
                                    <Text style={{ color: 'white', fontFamily: 'Oswald-Bold', fontSize: 18 }}>Support</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView>

            <View style={{ backgroundColor: 'white', marginTop: 12, height: 580, elevation: 4 }}>
                <Text style={{ color: 'black', marginLeft:16, fontFamily: 'Oswald-Bold', fontSize: 28 }}>Submit a request</Text>
                <View style={{ marginTop: 12 }}>
                    <Text style={{ marginLeft: 16, color: '#525252', fontFamily:'Oswald-Bold', fontSize: 16}}>Your email address</Text>
                    <TextInput style={{
                        borderWidth: 1,
                        height: 40,
                        width: '90%',
                        alignSelf: 'center',
                        borderColor: '#DDDDDD',
                        borderRadius: 5,
                        marginTop: 8,
                        paddingLeft: 15
                    }} />
                </View>

                <View style={{ marginTop: 12 }}>
                    <Text style={{ marginLeft: 16, color: '#525252', fontFamily:'Oswald-Bold', fontSize:16 }}>Registered Mobile Number</Text>
                    <TextInput style={{
                        borderWidth: 1,
                        height: 40,
                        width: '90%',
                        alignSelf: 'center',
                        borderColor: '#DDDDDD',
                        borderRadius: 5,
                        marginTop: 8,
                        paddingLeft: 15
                    }} />
                </View>
                <View style={{ marginTop: 12 }}>
                    <Text style={{ marginLeft: 16, color: '#525252', fontFamily: 'Oswald-Bold', fontSize: 16 }}>Subject</Text>
                    <TextInput style={{
                        borderWidth: 1,
                        height: 40,
                        width: '90%',
                        alignSelf: 'center',
                        borderColor: '#DDDDDD',
                        borderRadius: 5,
                        marginTop: 8,
                        paddingLeft: 15
                    }} />
                </View>
                <View style={{ marginTop: 12 }}>
                    <Text style={{ marginLeft: 16, color: '#525252', fontFamily: 'Oswald-Bold', fontSize: 16 }}>Description</Text>
                    <TextInput style={{
                        borderWidth: 1,
                        height: 120,
                        width: '90%',
                        alignSelf: 'center',
                        borderColor: '#DDDDDD',
                        borderRadius: 5,
                        marginTop: 8,
                        paddingLeft: 15,
                        paddingBottom: 70
                    }} />
                </View>

                <View style={{ marginTop: 12 }}>
                    <Text style={{ marginLeft: 16, color: '#525252', fontFamily: 'Oswald-Bold', fontSize: 16 }}>Attachments</Text>
                    <View style={{ borderWidth: 1, width: '90%', height: 40, alignSelf: 'center', borderRadius: 5, borderColor: '#DDDDDD', marginTop: 8 }}>
                        <Text style={{ textAlign: 'center', color: 'rgba(183,54,248,255)', fontFamily: 'Oswald-Bold', fontSize: 16, top: 3 }}>Upload file here</Text>
                    </View>
                </View>
            </View>
            </ScrollView>



            <View style={{ backgroundColor:'rgba(183,54,248,255)', height: 53, width: '100%', marginTop: 12 }}>
                <Text style={{ textAlign: 'center', fontFamily: 'Oswald-Bold', color:'white', fontSize: 18, top: 5 }}>Submit</Text>

            </View>

        </View>
    )
}


export default CustomerSupport