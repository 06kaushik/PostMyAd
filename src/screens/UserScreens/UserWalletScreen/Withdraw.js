import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import images from "../../../constant/Images";

const Withdraw = ({ navigation }) => {
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
                <View >
                    <Image style={styles.walletimage} source={images.walletMain} />
                </View>
                <View>
                    <Text style={styles.text}>Postmyad Wallet</Text>
                    <Text style={styles.subtxt}>An easy way to pay and get refund</Text>
                </View>
                <View style={styles.btxt}>
                    <View>
                        <Text style={styles.btxt1}>Instant</Text>
                        <Text style={styles.btxt1}>Checkout</Text>
                    </View>
                    <View>
                        <Text style={styles.btxt1}>Faster</Text>
                        <Text style={styles.btxt1}>Refund</Text>
                    </View>
                    <View>
                        <Text style={styles.btxt1}>Exciting</Text>
                        <Text style={styles.btxt1}>Reward</Text>
                    </View>
                </View>
            </View>
            <ScrollView>
                <View style={styles.container1}>
                    <View style={styles.containertxt}>
                        <Text style={styles.txt}>Available Postmyad Wallet Balance </Text>
                        <Text style={styles.txt}>₹ 1000</Text>
                    </View>
                    <View style={{ borderWidth: 1, borderColor: '#E4E6EF', marginTop: 12 }} />
                    <View style={{ flexDirection: 'row', marginTop: 25 }}>
                        <Text style={styles.addmonytxt}>Withdraw from </Text>
                        <Text style={styles.posttxt}>PostMyAd Wallet</Text>
                    </View>
                    <View style={{ marginTop: 12 }}>
                        <TextInput
                            placeholder="₹ Enter an amount (eg:1000)"
                            style={styles.txtinput}
                            keyboardType='numeric'
                        />
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('WithdrawDetail')}>
                    <View style={styles.bttncont}>
                        <Text style={styles.continue}>Continue</Text>
                    </View>
                    </TouchableOpacity>
                </View>


                <View style={{ backgroundColor: 'white', elevation: 4, marginTop: 30, }}>
                    <View>
                        <Text style={{ color: 'black', fontFamily: 'Oswald-Bold', fontSize: 16, marginLeft: 16, marginTop: 8 }}>PLEASE NOTE</Text>
                        <View style={{ marginLeft: 16, marginRight: 16, marginTop: 12, }}>
                            <Text style={{ fontSize: 13, margin: 5, }}>-  Postmyad wallet can be recharged using Netbanking, Credit/debit and UPI.</Text>
                            <Text style={{ fontSize: 13, margin: 5 }}>-  Postmyad wallet can be recharged using Netbanking, Credit/debit and UPI.</Text>
                            <Text style={{ fontSize: 13, margin: 5 }}>-  Postmyad wallet can be recharged using Netbanking, Credit/debit and UPI.</Text>
                        </View>
                    </View>

                    <View style={{ borderWidth: 1, borderColor: '#DDDDDD', marginTop: 12, marginLeft: 16, marginRight: 16, }} />

                    <View style={{ marginTop: 8 }}>
                        <Text style={{ color: 'rgba(183,54,248,255)', fontSize: 18, fontFamily: 'Oswald-Bold', textAlign: 'center' }}>Wallet T&C</Text>
                    </View>

                </View>
            </ScrollView>
        </View>
    )
}

export default Withdraw;

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    headertxt: {
        color: 'white',
        fontFamily: 'Oswald-Bold',
        fontSize: 18,
        marginRight:180,
        marginTop:30
        // textAlign: 'center',
        // bottom: 25
    },
    container: {
        flexDirection:'row',
        justifyContent:'space-between'

    },
    back: {
        marginLeft: 16,
        marginTop: 37
    },
    cont: {
        backgroundColor: 'white',
        width: '100%',
        height: 270,
        elevation: 4,
        marginTop: 8
    },
    walletimage: {
        alignSelf: 'center',
        height: 130,
        width: 176
    },
    text: {
        color: 'rgba(183,54,248,255)',
        fontSize: 20,
        fontFamily: 'Oswald-Bold',
        textAlign: 'center'

    },
    subtxt: {
        color: '#525252',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Oswald-Regular'

    },
    btxt: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
        marginLeft: 16,
        marginRight: 16
    },
    btxt1: {
        color: '#525252',
        fontSize: 16,
        fontFamily: 'Oswald-Bold',
        textAlign: 'center'
    },
    container1: {
        height: 240,
        elevation: 4,
        backgroundColor: 'white',
        marginTop: 12
    },
    containertxt: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 16,
        marginRight: 16,
        marginTop: 12
    },
    txt: {
        color: 'black',
        fontFamily: 'Oswald-Bold'
    },
    addmonytxt: {
        color: 'black',
        fontSize: 16,
        marginLeft: 16,
        fontFamily: 'Oswald-Bold'
    },
    posttxt: {
        color: 'rgba(183,54,248,255)',
        fontSize: 16,
        fontFamily: 'Oswald-Bold'
    },
    txtinput: {
        borderBottomWidth: 1,
        borderBottomColor: '#E4E6EF',
        marginLeft: 16,
        marginRight: 16,
        color: 'black'
    },
    bttncont: {
        height: 40,
        width: '90%',
        backgroundColor: 'rgba(183,54,248,255)',
        borderRadius: 8,
        alignSelf: 'center',
        marginTop: 26
    },
    continue: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Oswald-Bold',
        fontSize: 16,
        top: 4
    }
})