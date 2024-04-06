import React from "react";
import { StatusBar, Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import images from "../../constant/Images";
import LinearGradient from 'react-native-linear-gradient';
import UpcomingData from "../../Data/Campaign/CampaignUpcommingData";


const CampaignUpcoming = ({ navigation }) => {

    const Upcoming = ({ item }) => {
        return (
            <View style={styles.box}>
                <View>
                <TouchableOpacity onPress={() => navigation.navigate('')}>
                    <Image source={item.image} style={{ borderRadius: 5,height:158 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ bottom: 140, left: 170 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, fontFamily: 'Oswald', color: 'black' }}>{item.title}</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, fontFamily: 'Oswald', color: '#5A5A5A' }}>{item.subtitle}</Text>
                </View>
                <View style={{top:10}}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={item.cimage} style={{ bottom: 130, left: 160 }} />
                    <Text style={{ bottom: 130, left: 170,fontFamily:'Oswald',fontWeight:'bold',color:'#5A5A5A' }}>{item.date}</Text>
                </View>
              
                <View style={{ flexDirection: 'row', top: 8 }}>
                    <Image source={item.timage} style={{ bottom: 130, left: 162 }} />
                    <Text style={{ bottom: 130, left: 175,fontFamily:'Oswald',fontWeight:'bold',color:'#5A5A5A' }}>{item.time}</Text>
                </View>
                <View style={{ flexDirection: 'row', top: 10 }}>
                    <Image source={item.wimage} style={{ bottom: 130, left: 158 }} />
                    <Text style={{ bottom: 127, left: 170,fontFamily:'Oswald',fontWeight:'bold',color:'#5A5A5A' }}>{item.period}</Text>
                </View>
                </View>


            </View>
        )
    }




    return (
        <View style={{ backgroundColor: 'white', height: '100%', width: '100%' }}>
            <StatusBar hidden={true} />
            <View  >
                <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ height: 80, }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Image source={images.back} style={styles.backbttn} />
                    </TouchableOpacity>
                    <Text style={styles.headertxt}>Campaign</Text>
                    <Image style={{left:360,top:5,height:30,width:30}} source={images.plus1} />
                </LinearGradient>
            </View>
            <View style={{}}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Search here..."
                    placeholderTextColor='#5A5A5A' />
                <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={styles.searchContainer}>
                    <Text style={styles.searchBttn}>Search</Text>
                </LinearGradient>
            </View>


            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: 'white', height: 40, alignItems: 'center', elevation: 4, bottom: 25 }}>
                    <TouchableOpacity >
                        <Text style={{ color: '#6906C3', fontWeight: 'bold', fontFamily: 'Oswald',fontSize:14 }}>Upcoming</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('CampaignOngoing')}>
                        <Text style={{ color: '#717171', fontWeight: 'bold', fontFamily: 'Oswald' }}>Ongoing</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('CampaignCompleted')}>
                        <Text style={{ color: '#717171', fontWeight: 'bold', fontFamily: 'Oswald' }}>Completed</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                <FlatList
                    data={UpcomingData}
                    renderItem={Upcoming}
                    ListFooterComponent={<View style={{ margin: 250 }} />}
                />
                {/* <Image source={images.nodata} style={{left:'28%',marginTop:100}}/>
                <Text style={{fontWeight:'bold', fontSize:24,textAlign:'center'}}>Nothing Found </Text>
                 <Text style={{fontWeight:'bold', fontSize:20,textAlign:'center'}}>Tap '+' to create new Campaign </Text> */}

            </View>
            

            <View>
                <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{height:50,width:'100%',bottom:220,position:'absolute'}}>
                    <View >
                        <TouchableOpacity onPress={() => navigation.navigate('AddNewCampaign')}>
                        <Text style={{fontWeight:'Oswald',color:'white',fontWeight:'bold',fontSize:16,textAlign:'center',top:10}}>New Campaign</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>

        </View>
    )
}

export default CampaignUpcoming;

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
    textInput: {
        backgroundColor: '#F7F8FD',
        height: 40,
        paddingLeft: 20,
        margin: 15,
        borderRadius: 10,
        fontWeight: 'bold'
    },
    searchBttn: {
        textAlign: 'center',
        margin: 3,
        color: 'white',
        fontWeight: 'bold',
    },
    searchContainer: {
        width: '30%',
        height: 30,
        left: 250,
        borderRadius: 5,
        bottom: 50
    },
    box: {
        width: '90%',
        height: 160,
        margin: 10,
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 2,
        left:10
        // flexDirection:'row'
    },

})