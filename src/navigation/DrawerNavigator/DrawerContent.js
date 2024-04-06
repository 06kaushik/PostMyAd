import React, { useContext, useState,useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { ContextApi } from '../../component/Contextapi';
import images from '../../constant/Images';
import arrowRight from '../../assets/arrow1.png';
import SwipeButton from 'rn-swipe-button';
import AsyncStorage from '@react-native-async-storage/async-storage';




const DrawerContent = ({ props, navigation }) => {

    const { logout } = useContext(ContextApi)
    const [showBox, setShowBox] = useState(true);
    const [userDetail, setDetail] = useState(null)

    const onSlideRight = () => {
        logout()
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
    }; const getUser = async () => {
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
        <View style={{ flex: 1,backgroundColor:'white',height:'100%',width:'100%' }}>
            <DrawerContentScrollView {...props} style={{}}>
                <View style={styles.imagecontainer}>
                    <Image style={styles.ProfileImage} source={images.drawerlogo} />
                    <Text style={{ color: '#484848', left: 44, fontSize: 16, fontFamily: 'Oswald-Bold', marginTop: 15 }}>{userDetail?.firstName} {userDetail?.lastName}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={images.verify} style={{ width: 15, height: 15, top: 5, left: 50 }} />
                        <Text style={{ left: 55, fontSize: 12, top: 3,color:'#484848',fontFamily: 'Oswald-Regular' }}>Not Verified</Text>
                        <View style={{top:20,right:22}}>
                            <Text style={{fontSize:12,textAlign:'center',color:'#B937FA',fontFamily: 'Oswald-Regular'}}>Complete your profile</Text>
                        </View>

                    </View>
                </View>

                <View style={{ borderWidth: 0.5, marginTop: 50, borderColor: '#B5B5C3', right: 10 }} />
                <View style={{  right: 10 }}>
                    <View style={{ left: 20, }}>
                        <TouchableOpacity onPress={() => navigation.navigate('BillBoards')}>
                            <Image source={images.bill1} style={{ height: 20, width: 20, marginTop: 20 }} />
                            <Text style={{ color: '#484848', fontFamily: 'Oswald-Regular', fontSize: 16, left: 28, bottom: 27 }}> My Billboards</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ left: 20, }}>
                        <TouchableOpacity onPress={() => navigation.navigate('OrderScreen')}>
                            <Image source={images.orders1} style={{ height: 18, width: 18, }} />
                            <Text style={{ color: '#484848', fontFamily: 'Oswald-Regular', fontSize: 16, left: 28, bottom: 25 }}> My Orders</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ left: 20, }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Galleryy')}>
                            <Image source={images.gallery1} style={{ height: 18, width: 18, }} />
                            <Text style={{ color: '#484848', fontFamily: 'Oswald-Regular', fontSize: 16, left: 28, bottom: 25 }}> My Gallery</Text>
                        </TouchableOpacity>
                    </View>
                   

                    <View style={{ left: 20,  }}>
                        <TouchableOpacity onPress={() => navigation.navigate('My Campaign')}>
                            <Image source={images.camp} style={{ height: 20, width: 20, }} />
                            <Text style={{ color: '#484848', fontFamily: 'Oswald-Regular', fontSize: 16, left: 28, bottom: 25 }}> My Campaign</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ left: 20,bottom:2 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('My Profile')}>
                            <Image source={images.pro} style={{ height: 20, width: 20, }} />
                            <Text style={{ color: '#484848', fontFamily: 'Oswald-Regular', fontSize: 16, left: 28, bottom: 25 }}> My Profile</Text>
                        </TouchableOpacity>
                    </View>
                 

                    <View style={{ left: 20,bottom:2 }}>
                        <TouchableOpacity>
                            <Image source={images.wallet} style={{ height: 20, width: 20, }} />
                            <Text style={{ color: '#484848', fontFamily: 'Oswald-Regular', fontSize: 16, left: 28, bottom: 25 }}> Wallet</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderWidth: 0.5, borderColor: '#B5B5C3',bottom:10 }} />

                    {/* <View style={{ left: 20, marginTop: 2 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                            <Image source={images.settings} style={{ height: 20, width: 20, }} />
                            <Text style={{ color: '#484848', fontFamily: 'Oswald-Regular', fontSize: 16, left: 28, bottom: 25 }}> Settings</Text>
                        </TouchableOpacity>
                    </View> */}

                    <View style={{ left: 20,bottom:2 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Terms & Condition')}>
                            <Image source={images.terms} style={{ height: 20, width: 20, }} />
                            <Text style={{ color: '#484848', fontFamily: 'Oswald-Regular', fontSize: 16, left: 28, bottom: 25 }}> Cancellation Policy</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ left: 20, bottom:2 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('My Privacy')}>
                            <Image source={images.privacy} style={{ height: 20, width: 20, }} />
                            <Text style={{ color: '#484848', fontFamily: 'Oswald-Regular', fontSize: 16, left: 28, bottom: 25 }}> Privacy Policy</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderWidth: 0.5, marginTop: 26 , borderColor: '#B5B5C3' }} />


                    <View style={{ left: 20, bottom:32 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('My Content')}>
                            <Image source={images.privacy} style={{ height: 20, width: 20, }} />
                            <Text style={{ color: '#484848', fontFamily: 'Oswald-Regular', fontSize: 16, left: 28, bottom: 25 }}> Content Policy</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{ borderWidth: 0.5, marginTop: 26 , borderColor: '#B5B5C3' }} /> */}



                    {/* <View style={{ left: 20,marginTop:40}}>
                        <TouchableOpacity onPress={() => navigation.navigate('My Campaign')}>
                            <Image source={images.logout} style={{ height: 20, width: 20, }} />
                            <Text style={{ color: '#484848', fontWeight: '500', fontSize: 16, left: 28, bottom: 22 }}>Log Out</Text>
                        </TouchableOpacity>
                    </View> */}


                    {/* {renderSubHeading('Set a component as thumb icon & use forceReset')} */}
                    <View style={{ width: '90%', left: 12,bottom:20 }}>
                        <SwipeButton
                            height={43}
                            width={165}
                            railBackgroundColor="white"
                            railStyles={{
                                borderColor: '#B937FA',
                                backgroundColor: '#B937FA'
                            }}
                            thumbIconBackgroundColor={'#B937FA'}
                            title="      Log Out"
                            titleStyles={{ fontSize: 14, fontFamily: 'Oswald-Bold' }}
                            onSwipeSuccess={showConfirmDialog}
                            // onSwipeFail={showConfirmDialog}
                            thumbIconWidth={50}
                            thumbIconBorderColor='#B937FA'
                            thumbIconImageSource={arrowRight}
                            railFillBorderColor='grey'
                            thumbIconStyles={{borderRadius:35}}
                            
                            
                        />
                    </View>
                </View>

            </DrawerContentScrollView>
        </View>
    )
}

export default DrawerContent

const styles = StyleSheet.create({
    ProfileImage: {
        height: 93,
        width: 93,
        left: 49,



    },
    imagecontainer: {
        // flexDirection: 'row'
        top: 19
    },
    titleText: {
        fontSize: 12,
        fontWeight: 'normal',
        textAlign: 'center',
        color: '#ffffff',


    }
})