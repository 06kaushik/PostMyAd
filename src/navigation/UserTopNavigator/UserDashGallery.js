import React from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import images from "../../constant/Images";
import LinearGradient from 'react-native-linear-gradient';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import UserImages from "../../screens/UserScreens/UserGallery/UserImages";
import UserVideos from "../../screens/UserScreens/UserGallery/UserVideos";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import UserDashImages from "../../screens/UserScreens/UserGallery/UserDashboardImages";
import UserDashVideo from "../../screens/UserScreens/UserGallery/UserDashboardVideo";


const Tab = createMaterialTopTabNavigator();

const UserDashGallery = ({navigation,route}) => {
    return(
        <>
        <View style={{backgroundColor:'white',}}>
                <View  style={{ height: 78,backgroundColor:'rgba(183,54,248,255)'}}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: '8%' }}>
                        <TouchableOpacity onPress={() => navigation.goBack('Home')}>
                            <Image source={images.back} style={{ marginLeft: 16, top: 5 }} />
                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontFamily:'Oswald-Bold',fontSize:18 }}>Gallery</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('UserGalleryContent')}>
                            <Image source={images.plus1} style={{ height: 30, width: 30, right: '25%', bottom: 5 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


            <View >
            <TextInput
                    style={styles.textInput}
                    placeholder="Search here..."
                    placeholderTextColor='#5A5A5A' />
                <Image source={images.search} style={{ left: 27, bottom: 22, }} />
            </View>
            <Tab.Navigator screenOptions={{
                tabBarLabelStyle:{fontFamily:'Oswald-Bold'},
                tabBarActiveTintColor:'#6906C3',
                tabBarInactiveTintColor:'black',
                tabBarStyle:{elevation:4}
            }}>

                <Tab.Screen name="Photo" component={UserDashImages}  />
                
                <Tab.Screen name="Video" component={UserDashVideo}  />
            </Tab.Navigator>




        </>
    )
}
export default UserDashGallery;

const styles = StyleSheet.create({
    backbttn: {
        top: 50,
        left: 20
    },
    headertxt: {
        color: 'white',
        left: 40,
        top: 32,
        fontSize: 14,
        fontWeight: 'bold'
    },
    box: {
        width: '90%',
        height: 160,
        margin: 10,
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 2,
        left: 10
        // flexDirection:'row'
    },
    textInput: {
        height: hp(7),
        left: 16,
        borderRadius: 10,
        fontFamily: 'Oswald-SemiBold',
        width: wp(90),
        borderWidth: 1,
        borderColor: '#dddddd',
        right: 16,
        top: 12,
        paddingLeft: 40,
        backgroundColor: 'white',
        color:'black'
    },
    searchBttn: {
        textAlign: 'center',
        margin: 3,
        color: 'white',
        fontWeight: 'bold',
        width: 80
    },
    searchContainer: {
        // width: '30%',
        height: 30,
        borderRadius: 5,
        right: 110,
        top: '27%'
    },
    

})