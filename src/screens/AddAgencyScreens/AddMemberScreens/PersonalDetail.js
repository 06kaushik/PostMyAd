import React, { useEffect, useState } from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Pressable,ToastAndroid } from 'react-native'
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import images from "../../../constant/Images";
import Modal from 'react-native-modal'
import Lottie from 'lottie-react-native';



const PersonalDetailScreen = ({ navigation }) => {

    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')
    const [location, setLocation] = useState('')
    const [pincode, setPinCode] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [addMember, setAddMember] = useState([])
    const [isloading, setIsLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [lastName, setLastName] = useState('')

    const AddMember = () => {
        let body = {
            email: email,
            firstName: name,
            lastName:lastName,
            mobileNumber: mobile,
            location: location,
            state: state,
            city: city,
            pincode: pincode,
            country: country,
        }
        console.log('ADD MEMBER BODY', body);

        const addingMember = async () => {
            console.log('fjhhjjjhfjhfhjfhjfjfjfjfjf');

            try {
                setIsLoading(true);
                const resp = await axios.post('/admin/adagency/addMember', body)
                console.log('RESPONSE FROM ADDING MEMBER', resp.data.msg);
                console.log('ffffffkfkfkfkfkfkfkfkufkufkufukfukfukfukfukfufufuu');
                setIsLoading(false);
                setModalVisible(!modalVisible)
               

            } catch (error) {
                console.log('ERROR FROM ADDING MEMBER', error);

            }

        }
        addingMember()
    }




    return (
        <View>
            <ScrollView>
                <View style={styles.mainContainer}>
                    <View style={styles.container1}>
                        <View>
                            <Text style={styles.title}>Enter Details</Text>
                        </View>
                        <View style={styles.container2}>
                            <Text style={styles.name}>First Name</Text>
                            <View style={{ marginTop: 8 }}>
                                <TextInput
                                    placeholder="First name"
                                    placeholderTextColor={'grey'}
                                    value={name}
                                    onChangeText={setName}
                                    style={styles.textInput} />
                            </View>
                        </View>
                        <View style={styles.container2}>
                            <Text style={styles.name}>Last Name</Text>
                            <View style={{ marginTop: 8 }}>
                                <TextInput
                                    placeholder="Last name"
                                    placeholderTextColor={'grey'}
                                    value={lastName}
                                    onChangeText={setLastName}
                                    style={styles.textInput} />
                            </View>
                        </View>
                        <View style={styles.container2}>
                            <Text style={styles.name}>Email</Text>
                            <View style={{ marginTop: 8 }}>
                                <TextInput
                                    placeholder="Email"
                                    placeholderTextColor={'grey'}
                                    value={email}
                                    onChangeText={setEmail}
                                    style={styles.textInput} />
                            </View>
                        </View>
                        <View style={styles.container2}>
                            <Text style={styles.name}>Phone Number</Text>
                            <View style={{ marginTop: 8 }}>
                                <TextInput
                                    placeholder="Phone Number"
                                    placeholderTextColor={'grey'}
                                    value={mobile}
                                    onChangeText={setMobile}
                                    keyboardType={'numeric'}
                                    maxLength={10}
                                    style={styles.textInput} />
                            </View>
                        </View>
                        <View style={styles.container2}>
                            <Text style={styles.name}>Location</Text>
                            <View style={{ marginTop: 8 }}>
                                <TextInput
                                    placeholder="Location"
                                    placeholderTextColor={'grey'}
                                    value={location}
                                    onChangeText={setLocation}
                                    style={styles.textInput} />
                            </View>
                        </View>
                        <View style={styles.container2}>
                            <Text style={styles.name}>Pin Code</Text>
                            <View style={{ marginTop: 8 }}>
                                <TextInput
                                    placeholder="Pin Code"
                                    placeholderTextColor={'grey'}
                                    value={pincode}
                                    onChangeText={setPinCode}
                                    keyboardType={'numeric'}
                                    maxLength={6}
                                    style={styles.textInput} />
                            </View>
                        </View>
                        <View style={styles.container2}>
                            <Text style={styles.name}>City</Text>
                            <View style={{ marginTop: 8 }}>
                                <TextInput
                                    placeholder="City"
                                    placeholderTextColor={'grey'}
                                    value={city}
                                    onChangeText={setCity}
                                    style={styles.textInput} />
                            </View>
                        </View>
                        <View style={styles.container2}>
                            <Text style={styles.name}>State</Text>
                            <View style={{ marginTop: 8 }}>
                                <TextInput
                                    placeholder="State"
                                    placeholderTextColor={'grey'}
                                    value={state}
                                    onChangeText={setState}
                                    style={styles.textInput} />
                            </View>
                        </View>
                        <View style={{ marginTop: 12, }}>
                            <Text style={styles.name}>Country</Text>
                            <View style={{ marginTop: 8 }}>
                                <TextInput
                                    placeholder="Country"
                                    placeholderTextColor={'grey'}
                                    value={country}
                                    onChangeText={setCountry}
                                    style={styles.textInput} />
                            </View>
                        </View>


                        <View style={{ marginTop: 10, marginBottom: 20 }}>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                hasBackdrop={true}
                                backdropOpacity={0.8}
                                isVisible={modalVisible}

                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>

                                        <Lottie source={require('../../../assets/data-2.json')} autoPlay loop style={{ top: 100,alignSelf:'center',height:140,width:140 }} />
                                        <View style={{ top:220 }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 24, color: 'white', textAlign: 'center' }}>Member Added</Text>
                                            <Text style={{ fontWeight: 'bold', fontSize: 32, color: '#76B33F', textAlign: 'center' }}>Successfully</Text>
                                        </View>
                                        {/* <Image source={images.error} style={{ bottom: 40 }} /> */}



                                        <Pressable
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => setModalVisible(!modalVisible)}
                                        >
                                            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                                <View  style={{ height: 40, borderRadius: 8,marginTop:440,width:'90%',alignSelf:'center',backgroundColor:'rgba(183,54,248,255)' }}>
                                                    <Text style={styles.textStyle}>Back to Home Page</Text>
                                                </View>
                                            </TouchableOpacity>

                                        </Pressable>

                                    </View>
                                </View>
                            </Modal>
                            {isloading ? (<ActivityIndicator
                                visible={isloading}
                                size={'large'}
                                textContent='Loading ...'
                                textStyle={styles.spinnerTextStyle}
                            />

                            ) : (
                                <TouchableOpacity onPress={() => AddMember()}>
                                    <View  style={{ height: 40, width: 328, alignSelf: 'center', borderRadius: 8,backgroundColor:'rgba(183,54,248,255)' }}>
                                        <View style={{}}>
                                            <Text style={{ color: 'white', alignSelf: 'center', top: 5, fontSize: 16, fontFamily: 'Oswald-Bold' }}>Next</Text>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                            )}
                        </View>




                    </View>



                </View>
            </ScrollView>



        </View>

    )
}

export default PersonalDetailScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',


    },
    container1: {
        backgroundColor: 'white',
        elevation: 4,
        marginTop: 10
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

    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        top: 9

    },

})