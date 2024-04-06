import React, { useState, useContext,useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import images from '../../constant/Images';
import * as ImagePicker from 'react-native-image-picker'
import { ProgressBar } from '@react-native-community/progress-bar-android';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ContextApi } from '../../component/Contextapi';


const ProfileScreen = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const { logout } = useContext(ContextApi)
    const [userDetail, setDetail] = useState(null)


    function openGallery() {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            }
        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.assets[0].uri };
                console.log(source);
                setImage(source);
            }
        });
    };


    const handleLogout = () => {
        logout();

    }

    const showConfirmDialog = () => {
        return Alert.alert(
          "Are you sure?",
          "Are you sure you want to LOGOUT ?",
          [
            // The "Yes" button
            {
              text: "Yes",
              onPress: () => {
                onSlideRight()
                setShowBox(false);
              },
            },
            // The "No" button
            // Does nothing but dismiss the dialog when tapped
            {
              text: "No",
            },
          ]
        );
      };
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


    return (
        <View>
            <View >
                <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={styles.linearStyle}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Image source={images.back} style={styles.back} />
                    
                    <Text style={styles.prfile}>Profile</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>


            <ScrollView>

                <View style={styles.container}>
                    <TouchableOpacity onPress={openGallery}>
                        <Image style={styles.ProfileImage} source={require('../../assets/avatar.jpeg')} />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.text}>{userDetail?.firstName} {userDetail?.lastName}</Text>
                        <Text style={styles.text1}>{userDetail?.role ? userDetail?.role : 'Business Owner' } </Text>
                        {/* <Text style={styles.text2}>H&M Store</Text> */}
                    </View>
                </View>
                <View style={styles.example}>
                    <Text style={styles.ptxt}>Complete your profile</Text>
                    <Progress.Bar
                        progress={0.3}
                        width={200}
                        color='rgba(225, 65, 195, 1)'
                        style={styles.progress}
                    />
                </View>

                <View style={styles.container1}>

                    <Image source={images.rback} style={styles.rback} />
                    <TouchableOpacity onPress={() => navigation.navigate('Account')}>
                        <Text style={styles.acctxt}>Account</Text>
                    </TouchableOpacity>
                    <Text style={styles.acctxt1}>Edit Name, address , profile picture</Text>
                    <View style={styles.line} />

                    <View>
                        <Image source={images.rback} style={styles.rback} />
                        <TouchableOpacity onPress={() => navigation.navigate('OrderScreen')}>
                            <Text style={styles.acctxt}>My Orders</Text>
                        </TouchableOpacity>
                        <Text style={styles.acctxt1}>View & manage billboards</Text>
                        <View style={styles.line} />
                    </View>

                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('BillBoards')}>
                        <Image source={images.rback} style={styles.rback} />
                        <Text style={styles.acctxt}>My billboards</Text>
                        <Text style={styles.acctxt1}>View & manage billboards</Text>
                        <View style={styles.line} />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Campaign')}>
                        <Image source={images.rback} style={styles.rback} />
                        <Text style={styles.acctxt}>My Campaigns</Text>
                        <Text style={styles.acctxt1}>View & manage billboards</Text>
                        <View style={styles.line} />
                        </TouchableOpacity>
                    </View>


                    <View>
                        <Image source={images.rback} style={styles.rback} />
                        <TouchableOpacity onPress={() => navigation.navigate('Security')}>
                            <Text style={styles.acctxt}>Security</Text>
                        </TouchableOpacity>
                        <Text style={styles.acctxt1}>Change Password</Text>
                        <View style={styles.line} />
                    </View>

                    <View>
                        <Image source={images.rback} style={styles.rback} />
                        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                            <Text style={styles.acctxt}>Notification</Text>
                        </TouchableOpacity>
                        <Text style={styles.acctxt1}>Manage notifications</Text>
                    </View>

                </View>

                <View style={styles.container2}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('TermsandCondition')}>
                        <Image source={images.rback} style={styles.rback} />
                        <Text style={styles.acctxt}>Cancellation Policy</Text>
                        <View style={styles.line} />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Image source={images.rback} style={styles.rback1} />
                        <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
                        <Text style={styles.privacy}>Privacy Policy</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Image source={images.rback} style={styles.rback1} />
                        <TouchableOpacity onPress={() => navigation.navigate('ContentPolicy')}>
                        <Text style={styles.privacy}>Content Policy</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <View>
                    <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={styles.lgoutbttn}>
                        <TouchableOpacity onPress={handleLogout}>
                            <Text style={styles.logouttxt}>Sign out</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>



            </ScrollView>
        </View>
    )
}

export default ProfileScreen;

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
        left: 35,
        top: 22,
        fontFamily: 'Oswald',
        fontWeight: 'bold',
        fontSize: 14,
        color: 'white'

    },
    ProfileImage: {
        height: 100,
        width: 100,
        borderRadius: 90,
        left: 20,
        top: 10
    },
    container: {
        flexDirection: 'row',
        top: 10,
        backgroundColor: 'white',
        elevation: 4,
        height: 150

    },
    text: {
        left: 50,
        top: 10,
        fontFamily: 'Oswald',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#525252'

    },
    text1: {
        left: 50,
        top: 10,
        Family: 'Oswald',
        fontWeight: 'bold',
        fontSize: 14,
        color: '#525252'


    },
    text2: {
        left: 50,
        top: 10,
        Family: 'Oswald',
        fontWeight: 'bold',
        fontSize: 14,
        color: '#525252'
    },
    progress: {
        // width:'50%',
        left: 150,
        top: -35,
        borderRadius: 15,


    },
    ptxt: {
        left: 150,
        top: -35,
        color: 'rgba(225, 65, 195, 1)',
        Family: 'Oswald',
        fontWeight: '600',
        fontSize: 14,

    },
    container1: {
        backgroundColor: 'white',
        elevation: 4,
        width: '95%',
        left: 10,
        borderRadius: 15,
        marginBottom: 100,
        height: 480


    },
    acctxt: {
        fontFamily: 'Calibri',
        fontWeight: '700',
        fontSize: 16,
        left: 20,
        color: '#525252',
        margin: 5,


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
    container2: {
        bottom: 90,
        backgroundColor: 'white',
        elevation: 4,
        width: '95%',
        left: 10,
        borderRadius: 15,
        height: 135,
        marginBottom: 70
    },
    lgoutbttn: {
        top: -140,
        width: '95%',
        left: 10,
        height: 50,
        borderRadius: 10

    },
    logouttxt: {
        textAlign: 'center',
        top: 12,
        color: 'white',
        fontFamily: 'Calibri',
        fontStyle: 'normal',
        fontWeight: '700',


    },
    privacy: {
        fontFamily: 'Calibri',
        fontWeight: '700',
        fontSize: 16,
        left: 20,
        color: '#525252',
        margin: 5,
        top: -15

    },
    rback1: {
        left: 365,
        top: 8

    }



})