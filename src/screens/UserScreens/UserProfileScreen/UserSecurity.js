import React, { useState, useContext, useEffect } from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import images from "../../../constant/Images";
import LinearGradient from 'react-native-linear-gradient';

const UserSecurityScreen = ({ navigation }) => {

    return (
        <View style={styles.main}>
            <View>
                <View  style={{ height: 60, backgroundColor:'rgba(183,54,248,255)'}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
                        <View style={styles.header} >
                            <Image style={styles.back} source={images.back} />
                            <Text style={styles.sec}>Security</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>

            <View style={{ backgroundColor: 'white', elevation: 4, marginTop: 24, marginLeft: 16, marginRight: 16, borderRadius: 15, height: 320 }}>
                <View>
                    <Text style={styles.pass}>Current Password</Text>
                    <TextInput
                        placeholder=""
                        style={styles.text}
                    />
                </View>
                <View>
                    <Text style={styles.pass}>New Password</Text>
                    <TextInput
                        placeholder=""
                        style={styles.text}
                    />
                </View>
                <View>
                    <Text style={styles.pass}>Confirm Password</Text>
                    <TextInput
                        placeholder=""
                        style={styles.text}
                    />
                </View>
                <View>
                    <View style={{ marginTop: 32 }}>
                        <View style={{ height: 32, width: 149, alignSelf: 'center', borderRadius: 15,backgroundColor:'rgba(183,54,248,255)' }}>
                            <View>
                                <Text style={styles.reset}>ResetPassword</Text>
                            </View>

                        </View>
                    </View>
                </View>
            </View>


        </View>
    )
}

export default UserSecurityScreen

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        marginTop: 18
    },
    back: {
        marginLeft: 16,
        marginTop: 8
    },
    sec: {
        marginLeft: 8,
        color: '#FFFFFF',
        fontFamily: 'Oswald-SemiBold',
        fontSize: 18
    },
    pass: {
        color: '#525252',
        fontSize: 16,
        fontFamily: 'Oswald-Bold',
        marginLeft: 24,
        marginTop: 8
    },
    text: {
        marginLeft: 16,
        marginRight: 16,
        // borderWidth:1,
        width: '90%',
        height: 40,
        borderRadius: 10,
        backgroundColor: '#F8F9FD',
        marginTop: 8,
        alignSelf:'center'
    },
    reset: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Oswald-SemiBold',
        top: 2
    }

})