import React,{useState} from 'react';
import { View, Text, StyleSheet,Image,ImageBackground,TouchableOpacity } from 'react-native'
import MapView, { PROVIDER_GOOGLE,Marker,Callout} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import images from '../../../constant/Images';

const UserMap = ({navigation,route}) => {

    const {item} = route.params
    console.log('LATTITUDE',item);
    const {longitude} = route.params
    console.log('LONGITUDE',longitude);
    const {billboardName} = route.params
    console.log('billboard name',billboardName);
   
    return(
        <View style={{top:20}}>
            <View>
                <TouchableOpacity onPress={() => navigation.goBack('UserBillBoard')}>
                <Image source={images.leftarrow} style={{height:20,width:20,left:20,bottom:10}} />
                </TouchableOpacity>
            </View> 
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
               
            
                region={{
                    latitude: item.lattitude,
                    longitude: item.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
               
            >
                 <Marker
                    coordinate= {{
                        latitude: item.lattitude,
                        longitude: item.longitude,


                    }}
                    
                    image={images.logoPin}
                    title='BillBoard Name'
                    description='Noida'
                >
                    <Callout tooltip>
                        <View>
                            <View style={styles.bubble}>
                                <Text style={styles.name}>{item.billboardName}</Text>

                                {/* <Image style={styles.image} source={require('../../assets/demo.jpeg')} /> */}

                                {/* <Text style={{color:'black'}}>image</Text> */}

                            </View>
                            <View style={styles.arrowBorder} />
                            <View style={styles.arrow} />
                        </View>

                    </Callout>

                </Marker>

                </MapView>
          

        </View>

    )
}

export default UserMap

const styles = StyleSheet.create({
    map: {
        height: '100%'
    },
    // Callout bubble
    bubble: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 150,
    },
    // Arrow below the bubble
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
        // marginBottom: -15
    },
    // Character name
    name: {
        fontSize: 18,
        marginBottom: 5,
        color:'rgba(183,54,248,255)',
        fontFamily:'Oswald-Bold',
    
       textAlign:'center'
    },
    // Character image
    image: {
        width: "100%",
        height: 80,
    },
});