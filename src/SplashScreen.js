import React from "react";
import {View, Text,Image,ImageBackground} from 'react-native'
import images from "./constant/Images";



const SplashScreen = () => {
    return(
        <View>
            <ImageBackground source={images.BackgroundImage}  style={{height:'100%', width:'100%'}}>
                <View style={{top:150}}>
            <Image source={images.p} style={{alignSelf:'center'}}/>
            <Image source={images.p1} style={{alignSelf:'center',top:100}} />
            </View>
            </ImageBackground>
        </View>

    )
}

export default SplashScreen;

