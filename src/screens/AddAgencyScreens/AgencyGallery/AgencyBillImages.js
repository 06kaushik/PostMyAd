import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, RefreshControl, ScrollView, StyleSheet, Alert } from 'react-native'
import images from "../../../constant/Images";
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import axios from "axios";


const AgencyBillImages = ({navigation}) => {
    const [userImages, setUserImages] = useState([])
    console.log(('image data', userImages));


    const [refreshing, setRefreshing] = React.useState(false);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);



    const PhoneImage = ({ item }) => {
        console.log('IMAGE NAME IN AGENCY ', item);
        return (
            <View style={{
                width: '45%',
                height: 200,
                margin: 10,
                backgroundColor: "white",
                borderRadius: 10,
                elevation: 2,

            }}>
                <TouchableOpacity>
                    <Image style={{
                        height: '80%',
                        width: '100%'

                    }} source={{ uri: item?.imagelink }} />
                </TouchableOpacity>
                <Text style={{ fontFamily: 'Oswald-Bold', fontSize: 12, left: 10, color: 'black', bottom: 15 }}>{item?.imagename}</Text>
                <Text style={{ left: 10, fontSize: 10, fontFamily: 'Oswald-Regular', color: 'black' }}>{item?.date?.toString().slice(0, 10)}</Text>
                <TouchableOpacity onPress={() => showConfirmDialog(item.uniquename, item.videoname)}>
                    <MaterialCommunityIcons name="delete-outline" color='black' size={20} style={{ left: 138, bottom: 25, }} />

                    {/* <Image source={images.delete} style={{ left: 162, bottom: 15, height: 20, width: 20 }} /> */}
                </TouchableOpacity>

            </View>
        )
    }


    const GetImages = async () => {
        try {
            let res = await axios.get('/api/user/gallery')
            console.log("GET IMAGE RESPONSE ==> ", res);
            setUserImages(res.data.msg)
        } catch (error) {
            console.log('GET IMAGE ERROR', error);

        }
    }

    useEffect(() => {
        GetImages()

    }, [])
    return(
        <>
        {userImages?.ImagedataArr?.length > 0 ?
            <View style={{ backgroundColor: 'white', height: '100%', width: '100%' }}>
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    <View>
                        <FlatList
                            data={userImages.ImagedataArr}
                            renderItem={PhoneImage}
                            numColumns={2}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                            ListFooterComponent={<View style={{ margin: 200 }} />}
                        />
                    </View>
                </ScrollView>

            </View>
            :

            <View style={{ backgroundColor: 'white', height: '100%', width: '100%', justifyContent: 'center', paddingLeft: 20, paddingRight: 20 }}>
                <View style={{ backgroundColor: 'white', elevation: 4, }}>
                    <Text style={{ textAlign: 'center', fontSize: 25, color: 'black', fontFamily: 'Oswald-Bold' }}>No Image To Show</Text>
                </View>
            </View>
        }
    </>
    )
}

export default AgencyBillImages