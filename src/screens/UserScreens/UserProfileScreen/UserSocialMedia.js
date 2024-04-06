import React, { useState, useContext, useEffect } from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import images from "../../../constant/Images";
import LinearGradient from 'react-native-linear-gradient';


const UserSocialMedia = () => {
    return(
        <View style={{flex:1}}>
            <View style={styles.container}>
                <Text style={styles.connect}>Connect your Account</Text>
                <View style={{ marginTop:16}}>
                    <TouchableOpacity>
                        <View style={{flexDirection:'row'}}>
                        <Image style={styles.fb} source={images.connectFb} />
                        <Text style={{color:'#F00000',fontFamily:'Oswald-Bold', fontSize:16,marginTop:28}}>Disconnect</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image style={styles.tt} source={images.connecttwitter} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image style={styles.ld} source={images.connectlink} />
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    )
}

export default UserSocialMedia
const styles = StyleSheet.create({
container: {
    marginTop:8
    
    
},
connect: {
    color: '#3D3D3D',
    fontFamily: 'Oswald-Bold',
    fontSize: 24,
    marginLeft:16

},
fb: {
   
    margin: 20
},
tt: {
    
    margin: 20
},
ld: {
    
    margin: 20
}
})