import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import images from "../../../constant/Images";


const AgencyWithdrawDetail = ({navigation}) => {

    return (
        <View style={styles.main}>
            <View style={{ height: 78, backgroundColor: 'rgba(183,54,248,255)' }}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => navigation.goBack('')}>
                        <Image style={styles.back} source={images.back} />
                    </TouchableOpacity>
                    <Text style={styles.headertxt}>Withdraw</Text>
                </View>
            </View>

            <View style={styles.cont}>
                <View style={styles.subcon}>
                    <Text style={styles.avail} >Available Postmyad Wallet Balance </Text>
                    <Text style={styles.rupee}>₹ 1000</Text>
                </View>
                <View style={{ borderWidth: 1, borderColor: '#E4E6EF', marginTop: 12 }} />
                <View style={{ flexDirection: 'row', marginLeft: 16, marginTop: 25 }}>
                    <Text style={styles.withdrw}>Withdraw From </Text>
                    <Text style={styles.walletpma}>PostMyAd Wallet</Text>
                </View>
                <Text style={styles.amount}>₹ 1000</Text>
            </View>
            <ScrollView>
                <View style={styles.container1}>
                    <View style={{ marginTop: 12 }}>
                        <Text style={styles.transfer}>Transfer to</Text>
                        <View style={{ marginTop: 14 }}>
                            <Text style={styles.bname}>Bank Name</Text>
                            <TextInput
                                placeholder="Select your Bank"
                                placeholderTextColor={'gray'}
                                style={styles.textField}
                            />
                        </View>
                        <View style={{ marginTop: 14 }}>
                            <Text style={styles.bname}>IFSC Code</Text>
                            <TextInput
                                placeholder="Enter your IFSC Code"
                                placeholderTextColor={'gray'}
                                style={styles.textField}
                            />
                        </View>
                        <View style={{ marginTop: 14 }}>
                            <Text style={styles.bname}>Account Number</Text>
                            <TextInput
                                placeholder="Enter your account number"
                                placeholderTextColor={'gray'}
                                style={styles.textField}
                            />
                        </View>
                    </View>
                    <View style={styles.bttmcon}>
                        <Text style={styles.note}>PLEASE NOTE</Text>
                        <View>
                            <Text style={styles.notetxt}>- It will take 2-3 Business days for money to deposit in provided bank.</Text>
                            <Text style={styles.notetxt}>- Contact us on infor@postmyad.ai for any support.</Text>
                        </View>
                        <View style={{ borderWidth: 1, borderColor: '#DDDDDD', marginTop: 16, marginLeft: 16, marginRight: 16 }} />
                        <View>
                            <Text style={styles.tc}>Wallet T&C</Text>
                        </View>
                    </View>
                </View>
                <View style={{flex:1,bottom:10}} >
                    <View style={styles.bttn}>
                        <Text style={styles.contxt}>Continue</Text>
                    </View>
                </View>
            </ScrollView>


        </View>
    )
}

export default AgencyWithdrawDetail

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    headertxt: {
        color: 'white',
        fontFamily: 'Oswald-Bold',
        fontSize: 18,
        textAlign: 'center',
        bottom: 25
    },
    container: {
        // flexDirection:'row',

    },
    back: {
        marginLeft: 16,
        marginTop: 37
    },
    cont: {
        height: 163,
        backgroundColor: 'white',
        elevation: 4

    },
    subcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 16,
        marginRight: 16,
        marginTop: 12
    },
    avail: {
        color: '#2B2B2B',
        fontFamily: 'Oswald-Bold',
        fontSize: 14
    },
    rupee: {
        color: 'black',
        fontFamily: 'Oswald-Bold',
        fontSize: 14

    },
    withdrw: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'Oswald-Bold'

    },
    walletpma: {
        color: 'rgba(183,54,248,255)',
        fontSize: 16,
        fontFamily: 'Oswald-Bold'
    },
    amount: {
        marginLeft: 16,
        color: 'black',
        fontSize: 32,
        fontFamily: 'Oswald-Bold',
        marginTop: 8
    },
    container1: {
        height: 569,
        backgroundColor: 'white',
        marginTop: 12
    },
    transfer: {
        color: 'black',
        fontFamily: 'Oswald-Bold',
        fontSize: 16,
        marginLeft: 16
    },
    bname: {
        color: 'black',
        marginLeft: 16,
        fontSize: 16,
        fontFamily: 'Oswald-SemiBold'
    },
    textField: {
        marginLeft: 16,
        borderWidth: 1,
        height: 40,
        width: '90%',
        borderRadius: 8,
        borderColor: '#DDDDDD',
        marginTop: 12,
        paddingLeft: 15,
        color:'black'
    },
    bttmcon: {
        height: 170,
        backgroundColor: 'white',
        elevation: 4,
        marginTop: 22
    },
    note: {
        color: 'black',
        fontFamily: 'Oswald-Bold',
        marginLeft: 16,
        marginTop: 12
    },
    notetxt: {
        color: '#717171',
        fontSize: 13,
        fontFamily: 'Oswald-Bold',
        marginLeft: 16,
        marginTop: 12,

    },
    tc: {
        color: 'rgba(183,54,248,255)',
        fontSize: 16,
        fontFamily: 'Oswald-Bold',
        alignSelf: 'center',
        top: 10
    },
    bttn:{
        height:40,
        width:'90%',
        backgroundColor:'rgba(183,54,248,255)',
        position:'absolute',
        bottom:0,
        alignSelf:'center',
        borderRadius:8
        
        
    },
    contxt:{
        color:'white',
        fontFamily:'Oswald-Bold',
        fontSize:16,
        textAlign:'center',
        top:4
    }

})