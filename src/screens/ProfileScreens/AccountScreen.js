import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import images from "../../constant/Images";


const AccountScreen = ({navigation}) => {
    return (

        <View>
            <View >
                <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={styles.linearStyle}>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Image source={images.back} style={styles.back} />
                    </TouchableOpacity>
                    <Text style={styles.prfile}>Account</Text>
                </LinearGradient>
            </View>
            <ScrollView>

                <View style={styles.container1}>
                    <Text style={styles.acctxt}>Your Name</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor='#6F6F6F'
                    />

                    <View>
                        <Text style={styles.acctxt}>Phone Number</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor='#6F6F6F'
                        />
                    </View>

                    <View>
                        <Text style={styles.acctxt}>Email</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor='#6F6F6F'
                        />
                    </View>

                    <View>
                        <Text style={styles.acctxt}>Full Address</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor='#6F6F6F'
                        />
                    </View>

                    <View>
                        <Text style={styles.acctxt}>Pincode</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor='#6F6F6F'
                        />
                    </View>

                    <View>
                        <Text style={styles.acctxt}>State</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor='#6F6F6F'
                        />
                    </View>

                    <View>
                        <Text style={styles.acctxt}>Country</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor='#6F6F6F'
                        />
                    </View>

                    <View>
                        <Text style={styles.acctxt}>Aadhar Card</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor='#6F6F6F'
                        />
                    </View>

                    <View>
                        <Text style={styles.acctxt}>Pancard</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor='#6F6F6F'
                        />
                    </View>

                    <View>
                        <Text style={styles.acctxt}>Your Name</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor='#6F6F6F'
                        />
                    </View>

                </View>


                <View>
                <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={styles.lgoutbttn}>
                    <Text style={styles.logouttxt}>Apply</Text>
                    </LinearGradient>
                </View>


            </ScrollView>
        </View>
    )
}

export default AccountScreen;

const styles = StyleSheet.create({
    linearStyle: {
        flexDirection: 'row',
        height: 80,

    },
    back: {
        left: 20,
        top: 40

    },
    prfile: {
        left: 33,
        top: 38,
        fontFamily: 'Oswald',
        fontWeight: 'bold',
        fontSize: 14,
        color: 'white'

    },
    container1: {
        backgroundColor: 'white',
        elevation: 4,
        width: '95%',
        left: 10,
        borderRadius: 15,
        marginBottom: 200,
        height: 630,
        top: 40
    },
    acctxt: {
        fontFamily: 'Calibri',
        fontWeight: '700',
        fontSize: 16,
        left: 20,
        color: '#525252',
        margin: 5, top: 10
    },
    acctxt1: {
        fontFamily: 'Calibri',
        fontWeight: '700',
        fontSize: 14,
        left: 20,
        color: '#9CA9C5'
    },
    rback: {
        left: 365,
        top: 30
    },
    line: {
        borderWidth: 0.2,
        borderColor: 'black',
        margin: 10,

    },
    textInput: {
        height: 28,
        left: 25,
        borderRadius: 10,
        backgroundColor: '#F8F9FD',
        width: '90%',
        top: 10
    },
    lgoutbttn:{
        top:-100,
        width:120,
        left:260,
        height:35,
        borderRadius:15

    },
    logouttxt:{
        textAlign:'center',
        top:7,
        color:'white',
        fontFamily:'Calibri',
        fontStyle:'normal',
        fontWeight:'700',
        fontSize:16


    }

})