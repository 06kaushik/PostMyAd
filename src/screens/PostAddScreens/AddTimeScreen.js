import React from "react";
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, ScrollView, Switch, StyleSheet, Modal, Pressable } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import images from "../../constant/Images";
import HeaderData from "../../Data/PostAddData/SelectTimeHeaderData";
import TimeSlot from "../../Data/PostAddData/TimeData";



const AddTimeScreen = ({ navigation }) => {

    const Headerdata = ({ item }) => {
        return (
            <View style={{ left: 20, top: 10 }}>
                <View>
                    <Text style={{ fontFamily: 'Oswald', fontWeight: 'bold', fontSize: 16, color: '#525252' }}>{item.address}</Text>
                </View>
                <View>
                    <Text style={{ fontFamily: 'Oswald', fontWeight: '400', fontSize: 12, color: '#6F6F6F' }}>{item.subaddress}</Text>
                </View>

                <View style={{ top: 15, }}>
                    <View style={{ flexDirection: 'row', margin: 10 }}>
                        <Image source={item.cimage} style={{ right: 10 }} />
                        <Text style={{ fontFamily: 'Oswald', fontWeight: 'bold', fontSize: 14, color: '#6F6F6F', left: 10 }}>{item.day}</Text>
                        <Image source={item.eimage} style={{ left: 25, top: 5 }} />

                    </View>
                    <View style={{ flexDirection: 'row', margin: 10 }}>
                        <Image source={item.timage} style={{ right: 8 }} />
                        <Text style={{ fontFamily: 'Oswald', fontWeight: 'bold', fontSize: 14, color: '#6F6F6F', left: 15 }}>{item.time}</Text>
                        <Image source={item.eimage} style={{ left: 37, top: 2 }} />

                    </View>
                    <View style={{ flexDirection: 'row', margin: 10 }}>
                        <Image source={item.wimage} style={{ right: 10 }} />
                        <Text style={{ fontFamily: 'Oswald', fontWeight: 'bold', fontSize: 14, color: '#FF7F37', left: 10 }}>{item.status}</Text>
                        <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ left: 150, borderRadius: 10, width: '35%', height: 25 }}>
                            <Text style={{ textAlign: 'center', top: 1, color: 'white', fontWeight: 'bold', fontFamily: 'Oswald', }}>Full Screen</Text>
                        </LinearGradient>
                    </View>
                </View>
                <View>
                    <Image source={item.banerimage} style={{ width: 138, height: 120, left: 236, borderRadius: 6, bottom: 150 }} />
                </View>
            </View>
        )
    }

    const Slot = ({ item }) => {
        return (

            <View style={{ flex: 1, marginBottom: 5, marginTop: 5, }}>
                <Text style={{ marginTop: 15, left: 20, }}>{item.time}</Text>
            </View>
        )
    }


    return (
        <View>
            <View >
                <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={styles.linearStyle}>
                    <TouchableOpacity onPress={() => navigation.navigate('BillBoardAdmin')}>
                        <Image source={images.back} style={styles.back} />
                    </TouchableOpacity>
                    <Text style={styles.prfile}>Select Time</Text>
                </LinearGradient>
            </View>

            <View style={{ backgroundColor: 'white', height: 200, elevation: 4 }}>
                <FlatList
                    data={HeaderData}
                    renderItem={Headerdata}
                />
            </View>
            <ScrollView>

                <View style={{ top: 20, backgroundColor: 'white', elevation: 4 }}>

                    <Text style={{ fontFamily: 'Oswald', fontWeight: 'bold', fontSize: 16, color: '#3C3C3C', top: 10, left: 20 }}>Select Time Slot</Text>
                    <Text style={{ fontFamily: 'Oswald', fontWeight: 'bold', fontSize: 14, color: '#525252', top: 35, left: 20 }}>Morning</Text>

                    <FlatList
                        data={TimeSlot}
                        renderItem={Slot}
                        numColumns={3}
                        style={{ top: 25, }}
                    />


                    {/* 
                    <Text style={{ fontFamily: 'Oswald', fontWeight: 'bold', fontSize: 14, color: '#525252', top: 55, left: 20 }}>Afternoon</Text>
                    <FlatList
                        data={TimeSlot}
                        renderItem={Slot}
                        numColumns={3}
                        style={{ top: 45, }}
                    />

                    <Text style={{ fontFamily: 'Oswald', fontWeight: 'bold', fontSize: 14, color: '#525252', top: 55, left: 20 }}>Evening</Text>
                    <FlatList
                        data={TimeSlot}
                        renderItem={Slot}
                        numColumns={3}
                        style={{ top: 45, }}

                    />

                   <View style={{marginBottom:500}}>
                    <Text style={{ fontFamily: 'Oswald', fontWeight: 'bold', fontSize: 14, color: '#525252', top: 55, left: 20 }}>Night</Text>
                    <FlatList
                        data={TimeSlot}
                        renderItem={Slot}
                        numColumns={3}
                        style={{ top: 45, }}
                        // ListFooterComponent={<View style={{ margin: 400 }} />}
                    />
                    </View>
 */}
                </View>
            </ScrollView>


            <View>
                <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{height:50,top:215,position:'absolute',width:'100%'}}>
                    <View >
                        <TouchableOpacity onPress={() => navigation.navigate('AddContentScreen')}>
                        <Text style={{fontWeight:'Oswald',color:'white',fontWeight:'bold',fontSize:16,textAlign:'center',top:10}}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>


        </View>
    )
}

export default AddTimeScreen;

const styles = StyleSheet.create({
    linearStyle: {
        flexDirection: 'row',
        height: 70,

    },
    back: {
        left: 20,
        top: 40

    },
    prfile: {
        left: 33,
        top: 38,
        fontFamily: 'Oswald',
        fontWeight: 'bold',
        fontSize: 14,
        color: 'white'

    },
})