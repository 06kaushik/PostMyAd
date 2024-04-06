import React,{useState,useEffect} from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, TextInput,ActivityIndicator, Pressable, } from 'react-native'
import images from "../../../constant/Images";
import Modal from 'react-native-modal'
import RazorpayCheckout from 'react-native-razorpay';
import axios from "axios";
import Lottie from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { adminRequest } from "../AxiosInstance";


const Deposite = ({ navigation,route }) => {

    const [isloading, setIsLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [amount , setAmount] = useState()
    const {walletId} = route.params
    const [orderId, setOrderId] = useState(null)
    const{balance} = route.params
    const [walletAmount, setWalletAmount] = useState(null)
    const [userDetail, setDetail] = useState(null)


    const getUser = async () => {
        try {
            let userDetail = await AsyncStorage.getItem('USER');
            let data = JSON.parse(userDetail);
            setDetail(data)
        } catch (error) {
            console.log("Something went wrong", error);
        }
    }

    useEffect(() => {
        getUser();
    }, [])


    const getWalletamount = async () => {
        let body = {
            userId: userDetail?._id
        }
        console.log('BODY OF WALLET AMOUNT', body);
        try {
            const resp = await adminRequest.post('/api/payment/getWalletData', body)
            console.log('RESPONSE FROM WALLET AMOUNT APII', resp.data.msg);
            setWalletAmount(resp?.data?.msg)

        } catch (error) {
            console.log('ERROR FROM WALLET AMOUNT', error);
        }
    }

    // getWalletamount()
    useEffect(() => {
        getWalletamount()

    }, [userDetail?._id])

    

    const razorPay = async() => {
        const datas = await fetch("http://103.127.30.212:5000/razorpay", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: Number(amount), currency:"INR" }),
          });
          const response = await datas.json();
          console.log("Responcse After Order Creategegeerjghjjgj",  response);
        //   setOrderId(response)

          var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_jDldpfkR2IrLGM', // Your api key
            amount: response.amount,
            order_id: response.id,
            name: 'foo',
            prefill: {
                name: "Psi sharma",
                email: "letsconnect@psiborg.in",
                contact: "98587584858",
            },
            theme: {color: 'rgba(183,54,248,255)'}
          }
          RazorpayCheckout.open(options).then(async(data) => {
            // handle success
            console.log('CHECKOUT WORKINGGGGGG');
            const dataa = await fetch("http://103.127.30.212:5000/successandverifysignature",{
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      p_id: data.razorpay_payment_id,
                      o_id: response.id,
                      razorpay_signature: data.razorpay_signature,
                      walletId,
                      creditedAmount: Number(amount)
                     }),
                    });
                    const resp = await dataa.json();
                    console.log('RESONSE FROM SIGNATURE API', resp);
                    setModalVisible(!modalVisible)
            // alert(`Success: ${data.razorpay_payment_id}`);
          }).catch((error) => {
            // handle failure
            alert(`Error: ${error.code} | ${error.description}`); 
          });
    }

    
    return (
        <View style={styles.main}>
            <View style={{ height: 78, backgroundColor: 'rgba(183,54,248,255)' }}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => navigation.goBack('')}>
                        <Image style={styles.back} source={images.back} />
                    </TouchableOpacity>
                    <Text style={styles.headertxt}>Deposit</Text>
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
                        <Text style={styles.txt}>₹ {balance}</Text>
                    </View>
                    <View style={{ borderWidth: 1, borderColor: '#E4E6EF', marginTop: 12 }} />
                    <View style={{ flexDirection: 'row', marginTop: 25 }}>
                        <Text style={styles.addmonytxt}>Add money to </Text>
                        <Text style={styles.posttxt}>PostMyAd Wallet</Text>
                    </View>
                    <View style={{ marginTop: 12 }}>
                        <TextInput
                            placeholder="₹ Enter an amount (eg:1000)"
                            placeholderTextColor={'grey'}
                            style={styles.txtinput}
                            keyboardType='numeric'
                            value={amount}
                            onChangeText={setAmount }
                        />
                    </View>
                    <TouchableOpacity onPress={() => razorPay()}>
                    <View style={styles.bttncont}>
                    <Modal
                                animationType="slide"
                                transparent={true}
                                hasBackdrop={true}
                                backdropOpacity={0.8}
                                isVisible={modalVisible}
                                onBackdropPress={() => setModalVisible(false)}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>

                                        <Lottie source={require('../../../assets/data-6.json')} autoPlay loop style={{ bottom: 20, alignSelf: 'center', height: 140, width: 140 }} />
                                        <View style={{ bottom: 30 }}>
                                            {/* <Text style={{ fontWeight: 'bold', fontSize: 24, color: 'white', textAlign: 'center' }}>Ad scheduled</Text> */}
                                            <Text style={{ fontWeight: 'bold', fontSize: 32, color: '#76B33F', textAlign: 'center' }}>Success</Text>
                                        </View>
                                        {/* <Image source={images.error} style={{ bottom: 40 }} /> */}

                                        <Pressable
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => setModalVisible(!modalVisible)}
                                        >
                                            {/* <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                            <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ height: 40, borderRadius: 8 }}>
                                                <Text style={styles.textStyle}>Back to Home Page</Text>
                                            </LinearGradient>
                                        </TouchableOpacity> */}

                                        </Pressable>

                                    </View>
                                </View>
                            </Modal>
                        <Text style={styles.continue}>Continue</Text>
                    </View></TouchableOpacity>
                </View>


                <View style={{ backgroundColor: 'white', elevation: 4, marginTop: 30, }}>
                    <View>
                        <Text style={{ color: 'black', fontFamily: 'Oswald-Bold', fontSize: 16, marginLeft: 16, marginTop: 8 }}>PLEASE NOTE</Text>
                        <View style={{ marginLeft: 16, marginRight: 16, marginTop: 12, }}>
                            <Text style={{ fontSize: 13, margin: 5,color: '#717171', }}>-  Postmyad wallet can be recharged using Netbanking, Credit/debit and UPI.</Text>
                            <Text style={{ fontSize: 13, margin: 5,color: '#717171',}}>-  Postmyad wallet can be recharged using Netbanking, Credit/debit and UPI.</Text>
                            <Text style={{ fontSize: 13, margin: 5,color: '#717171', }}>-  Postmyad wallet can be recharged using Netbanking, Credit/debit and UPI.</Text>
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

export default Deposite;

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