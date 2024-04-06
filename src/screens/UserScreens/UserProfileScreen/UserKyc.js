import React, { useState, useContext, useEffect } from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import images from "../../../constant/Images";
import LinearGradient from 'react-native-linear-gradient';


const UserKyc = () => {
    return(
        <View > 
             <View style={styles.container1}>
            
           
            <View style={styles.container2}>
                <Text style={styles.name}>Adhar Card</Text>
                <View style={{ marginTop: 8 }}>
                <TextInput
                        placeholder=""
                        placeholderTextColor={'grey'}
                        style={styles.textInput} />
                </View>
            </View>
            <View style={styles.container2}>
                <Text style={styles.name}>Name on Card</Text>
                <View style={{ marginTop: 8 }}>
                    <TextInput
                        placeholder=""
                        placeholderTextColor={'grey'}
                        style={styles.textInput} />
                </View>
            </View>


        <View style={{ flex:1,justifyContent:'center',marginTop:'70%'  }}>
                <View style={{ height: 48, width: 334, alignSelf: 'center', borderRadius: 8,marginBottom:20,backgroundColor:'rgba(183,54,248,255)' }}>
                    <View style={{}}>
                        <Text style={{ color: 'white', alignSelf: 'center', top: 9, fontSize: 16, fontFamily: 'Oswald-Bold' }}>Verified</Text>
                    </View>

                </View>
            </View>

        </View>



        </View>
    )
}

export default UserKyc


const styles = StyleSheet.create({
    main:{
        flex: 1,
        backgroundColor: '#F7F8FD',
    },
    container1: {
        backgroundColor: 'white',
        elevation: 4,
        marginTop: 10,
        height:'100%'
    },
    container2: {
        marginTop: 12
    },
    name: {
        color: '#525252',
        fontSize: 14,
        fontFamily: 'Oswald-Bold',
        marginLeft: 16
    },
    textInput: {
        color: '#525252',
        fontFamily: 'Oswald-Regular',
        backgroundColor: '#F8F9FD',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 8,
        paddingLeft: 15,
    },

})