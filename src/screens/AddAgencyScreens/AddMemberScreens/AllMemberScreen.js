import React, { useState, useContext, useEffect } from 'react'
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import images from "../../../constant/Images";
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



const AllMemberScreen = ({navigation,route}) => {

    const [memberList, setMemberList] = useState([])
    const [userDetail, setUserDetail] = useState(null)


    const getUser = async () => {
        
        try {
            let userDetail = await AsyncStorage.getItem('USER');
            let data = JSON.parse(userDetail);
            setUserDetail(data)
        } catch (error) {
            console.log("Something went wrong", error);
        }
    }

    useEffect(() => {
        getUser();
    }, [])


    const getAgencyMember = async () => {
        try {
            let res = await axios.get(`/admin/adagency/getallmember/${userDetail?._id}`)
            console.log("GET MEMBER RESPONSE ==> ", res.data.msg);

            setMemberList([...[{ first: true, addImage: require('../../../assets/addmember.png') }], ...res.data.msg])
        } catch (error) {
            console.log('GET MEMBER ERROR', error);

        }

    }

    useEffect(() => {
        getAgencyMember()
    }, [userDetail?._id])

    const getAllMember = ({ item }) => {
        console.log('ITEM MEMEBER in member', item);
        return (
            <>

                {item.first ?
                    <View style={styles.agencyBox}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => navigation.navigate('MemberPersonalDetail')}>
                                <Image style={{ height: 48, width: 48, borderTopLeftRadius: 6, borderTopRightRadius: 6, alignSelf: 'center' }} source={images.addagency} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View style={styles.agencyBox}>
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('MembersProfile',{
                                  firstName: item?.firstName,
                                  lastName: item?.lastName,
                                  city: item?.city,
                                  country: item?.country,
                                  mobileNumber: item?.mobileNumber,
                                  pincode: item?.pincode,
                                  email: item?.email,
                                  location: item?.location,
                                  agencyId : userDetail?._id,
                                  userId: item?._id
                                 
                            })}>
                                <Image style={styles.pic} source={images.pic1} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.name}>{item?.firstName} {item?.lastName}</Text>
                        </View>
                        <View style={styles.cont}>
                            <View>
                                <Text style={styles.num}>0</Text>
                                <Text style={styles.value}>Orders</Text>

                            </View>
                            <View>
                                <Text style={styles.num}>0</Text>
                                <Text style={styles.value}>Approved</Text>
                            </View>
                            <View>
                                <Text style={styles.num}>0</Text>
                                <Text style={styles.value}>Rejected</Text>
                            </View>
                        </View>
                    </View>


                }

            </>

        )

    }


    return (


        <View style={styles.main}>
            <View>
                <View  style={{ height: 65,backgroundColor:'rgba(183,54,248,255)' }}>

                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                            <View style={{ marginTop: '8%', marginLeft: 16 }}>
                                <Image source={images.back} style={{ marginTop: 5 }} />
                                <View style={{ alignSelf: 'center', bottom: 20 }}>
                                    <Text style={{ color: 'white', fontFamily: 'Oswald-Bold', }}>Members</Text>
                                </View>
                            </View>

                        </TouchableOpacity>

                    </View>
                </View>
            </View>

            <View>
                <FlatList
                    data={memberList}
                    renderItem={getAllMember}
                    numColumns={2}
                    style={{ marginTop: 16 }} />
            </View>
        </View>
    )
}

export default AllMemberScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    agencyBox: {
        width: 180,
        height: 190,
        padding: 1,
        margin: 15,
        backgroundColor: "white",
        borderRadius: 10,
        // flexDirection: 'row',
        elevation: 2,
        bottom: 10
    },
    ProfileImage: {
        height: '100%',
        width: '100%',
        borderRadius: 8
    },
    pic: {
        width: 89,
        height: 89,
        alignSelf: 'center',
        marginTop: 15
    },
    name: {
        color: '#525252',
        fontSize: 14,
        fontFamily: 'Oswald-Bold',
        alignSelf: 'center'
    },
    cont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 16,
        marginRight: 16,
        marginTop: 16
    },
    num: {
        color: '#525252',
        fontSize: 12,
        fontFamily: 'Oswald-Bold',
        alignSelf: 'center'
    },
    value: {
        color: '#CCCCCC',
        fontSize: 10,
        fontFamily: 'Oswald-Bold'
    }
})