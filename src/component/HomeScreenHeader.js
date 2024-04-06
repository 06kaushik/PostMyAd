import React from 'react'
import {View, Text, StatusBar, StyleSheet,Image,TextInput,TouchableOpacity} from 'react-native'
import images from '../constant/Images'
import LinearGradient from 'react-native-linear-gradient';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions, useNavigation } from '@react-navigation/native';

// import { NavigationContainer } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Header = ({navigation}) => {
    return(
        <View>
            <StatusBar hidden={true} />
            <View >
                <LinearGradient colors={['rgba(225, 65, 195, 1)','rgba(185, 55, 250, 1)','rgba(105, 6, 195, 1)']} style={styles.linearStyle}>
                <View >
                    <TouchableOpacity onPress={() => navigation.navigate()} >
               <Image source={images.menu} style={styles.menu}/>
               </TouchableOpacity>
               </View>
               <View>
                   <Image source={images.sapslogo} style={styles.logo} />
               </View>
               <View>
                   <Image source={images.bell} style={styles.bell} />
               </View>
                </LinearGradient>
                <View style={{left:10}}>
                <TextInput
                        style={styles.textInput}
                        placeholder='Try "Sector 60, Noida"'
                        placeholderTextColor='#6F6F6F'
                    />
                    <Image source={images.search} style={{ marginLeft: 15, marginTop: -105, }} />

                </View>
               
              
               
           </View>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
   
    menu:{
        height:20,
        width:25,
        marginTop:40,
        marginLeft:16,
        
    },
    logo:{
        // height:20,
        width:65,
        marginTop:40
    },
    
    bell:{
        height:25,
        width:25,
        marginTop:35,
        marginRight:15
    },
    linearStyle:{
        flexDirection:'row', 
        justifyContent:'space-between', 
        height:126

    },
    textInput: {
        height: hp(5),
        paddingLeft: 50,
        margin: 10,
        borderColor: 'black',
        borderRadius: 14,
        backgroundColor: 'white',
        width: wp(90),
        color: 'black',
        bottom:60,
        fontFamily:'Oswald',
        fontStyle:'normal',
        fontWeight:'bold',
        fontSize:12,
        


    },
})