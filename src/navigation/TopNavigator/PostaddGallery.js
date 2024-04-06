import React from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import images from "../../constant/Images";
import LinearGradient from 'react-native-linear-gradient';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PostImageGallery from "../../screens/PostAddScreens/PostImageGallery";
import PostVideoGallery from "../../screens/PostAddScreens/PostVideoGallery";


const Tab = createMaterialTopTabNavigator();

const PostAddGallery = ({ navigation,route }) => {
    // const {date} = route.params
    // console.log('DATE IN TOP GALLE', date);

    return (

        <>
             <View>
                <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ height: 60 }}>
                  
                        <View style={{marginTop:'8%'  }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                            <Image source={images.back} style={{marginLeft:8,}} />
                            </TouchableOpacity>
                            </View>
                            <View>
                            <Text style={{alignSelf:'center',bottom:19,fontFamily:'Oswald-Bold',color:'white'}}>Gallery</Text>
                            </View>
                        
                    

                </LinearGradient>
            </View>




            <View >
            <TextInput
                    style={styles.textInput}
                    placeholder="           Search here..."
                    placeholderTextColor='#5A5A5A' />
                <Image source={images.search} style={{ left: 27, bottom: 22, }} />
            </View>
            <Tab.Navigator screenOptions={{
                tabBarLabelStyle:{fontFamily:'Oswald-Bold'},
                tabBarActiveTintColor:'#6906C3',
                tabBarInactiveTintColor:'black',
                tabBarStyle:{elevation:4}
                
                
            }}>

                <Tab.Screen name="Photo" component={PostImageGallery} initialParams={{GalleryData: route?.params}} />
                <Tab.Screen name="Video" component={PostVideoGallery} initialParams={{GalleryVideo: route?.params}} />
            </Tab.Navigator>
        </>

    )
}



export default PostAddGallery;

const styles = StyleSheet.create({
    backbttn: {
        top: 50,
        left: 20
    },
    headertxt: {
        color: 'white',
        left: 25,
        fontSize: 14,
        fontWeight: 'bold',
        bottom:2
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

        height: 48,
        left: 16,
        borderRadius: 10,
        fontFamily: 'Oswald-SemiBold',
        width: 328,
        borderWidth: 1,
        borderColor: '#dddddd',
        right: 16,
        top: 12,
        paddingRight: 10,
        backgroundColor: 'white',
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