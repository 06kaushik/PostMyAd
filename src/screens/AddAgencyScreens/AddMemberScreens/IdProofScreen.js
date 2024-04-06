import React from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import { ScrollView } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";

const IdProofScreen = () => {
    return (


        <View style={styles.mainContainer}>
            <View style={styles.container1}>
                <View>
                    <Text style={styles.title}>Enter Details</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ marginLeft: 16, marginTop: 8 }}>
                        <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ height: 32, width: 157, borderRadius: 8}} >
                            <View style={{}}>
                                <Text style={{ alignSelf: 'center', color: 'white', fontSize: 14, fontFamily: 'Oswald-Bold', top: 2 }}>Adhar Card</Text>
                            </View>

                        </LinearGradient>
                    </View>
                    <View style={{ marginRight: 16, marginTop: 8, }}>
                        <View style={{ height: 32, width: 157, backgroundColor: '#F7F8FD', borderRadius: 8 }}>
                            <Text style={{ alignSelf: 'center', color: '#A3A3A3', fontSize: 14, fontFamily: 'Oswald-Bold', top: 3 }}>Pan Card</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.container2}>
                    <Text style={styles.name}>Adhar Card Number</Text>
                    <View style={{ marginTop: 8 }}>
                        <TextInput
                            placeholder="Adhaar Number"
                            placeholderTextColor={'grey'}
                            style={styles.textInput} />
                    </View>
                </View>

                {/* <View style={{flex:1,justifyContent:'center'}}>
                    <Text style={{color:'#A3A3A3',alignSelf:'center',fontFamily:'Oswald-Regular'}}>Please tick the box to continue</Text>
                    <View>
                        <View>

                        </View>
                    </View>
                        

                    
                </View> */}

                <View style={{  }}>
                <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ height: 40, width: 328, alignSelf: 'center', borderRadius: 8,marginBottom:20 }}>
                    <View style={{}}>
                        <Text style={{ color: 'white', alignSelf: 'center', top: 5, fontSize: 16, fontFamily: 'Oswald-Bold' }}>Next</Text>
                    </View>

                </LinearGradient>
            </View>






            </View>
           


        </View>




    )
}

export default IdProofScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',


    },
    container1: {
        backgroundColor: 'white',
        elevation: 4,
        marginTop: 10,height:'100%'
    },
    title: {
        color: 'black',
        marginLeft: 16,
        fontFamily: 'Oswald-Bold',
        fontSize: 18
    },
    name: {
        color: '#A3A3A3',
        fontSize: 14,
        fontFamily: 'Oswald-Bold',
        marginLeft: 16
    },
    container2: {
        marginTop: 12
    },
    textInput: {
        color: '#525252',
        fontFamily: 'Oswald-Regular',
        backgroundColor: '#F7F8FD',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 8,
        paddingLeft: 15

    }
})