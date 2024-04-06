import React,{useState} from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity,} from 'react-native'
import images from "../../constant/Images";
import LinearGradient from 'react-native-linear-gradient';


const AddNewCampaign = ({navigation}) => {

    const[campaignName, setCampaignName] = useState('')
    const [aboutCampaign, setAboutCampaign] = useState('')

    const handleContinue = () => {
        const body = {
            campaignName: campaignName,
            aboutCampaign : aboutCampaign
           
        }
        navigation.navigate('AddNewCampaign1',{CampaignName:campaignName,aboutCampaign:aboutCampaign})
    }


    return (
        <View style={{ backgroundColor: 'white', height: '100%', width: '100%' }}>
            <StatusBar hidden={true} />
            <View>
                <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ height: 60 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <View style={{ marginTop: '8%' }}>
                            <Image source={images.back} style={{ marginLeft: 8, }} />
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={{ alignSelf: 'center', bottom: 19, fontFamily: 'Oswald-Bold', color: 'white' }}>New Campaign</Text>
                    </View>



                </LinearGradient>
            </View>


            <View >
                <Text style={{ fontSize: 24, fontWeight: 'bold', fontFamily: 'Oswald', color: '#525252', left: 20, top: 20, textDecorationLine: 'underline', }}>Create New Campaign</Text>
            </View>

            <View style={{top:20}}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', fontFamily: 'Oswald', color: '#525252',top:40,left:20 }}>Give it a name</Text>
                <TextInput 
                // placeholder="type name ..."
                // placeholderTextColor='black'
                style={{top:60,width:'90%',left:20,borderRadius:10,height:40,paddingLeft:10,borderWidth:1,borderColor:'#DDDDDD',color:'#000000'}}
                value={campaignName}
                onChangeText={setCampaignName}

                />

            </View>

            <View style={{top:70}}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', fontFamily: 'Oswald', color: '#525252',top:40,left:20 }}>Tell us about campaign (optional)</Text>
            <TextInput 
                // placeholder="type name ..."
                // placeholderTextColor='black'
                multiline={true}
                style={{top:60,width:'90%',left:20,borderRadius:10,height:140,paddingLeft:10,borderWidth:1,borderColor:'#DDDDDD',color:'#000000'}}
                value={aboutCampaign}
                onChangeText={setAboutCampaign}
                />
                
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', height: 70, backgroundColor: 'white', elevation: 4,bottom:0,position:'absolute',width:'100%' }}>
                <View style={{ borderWidth: 2, borderRadius: 5, borderColor: 'rgba(221, 221, 221, 1)', width: 170, height: 40, top: 10 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Campaign')}>
                    <Text style={{ textAlign: 'center', color: '#525252', fontWeight: 'bold', top: 8, fontFamily: 'Oswald', fontSize: 16 }}>Back</Text>
                    </TouchableOpacity>
                </View>
                <View >
                    <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ width: 170, height: 40, borderRadius: 5, top: 10 }}>
                        <TouchableOpacity onPress={() => handleContinue()}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', top: 8, fontFamily: 'Oswald', fontSize: 16, color: 'white' }}>Continue</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>

        </View>
    )
}

export default AddNewCampaign;

const styles = StyleSheet.create({
    backbttn: {
        top: 30,
        left: 20
    },
    headertxt: {
        color: 'white',
        left: 40,
        top: 12,
        fontSize: 14,
        fontWeight: 'bold'
    },
    
})