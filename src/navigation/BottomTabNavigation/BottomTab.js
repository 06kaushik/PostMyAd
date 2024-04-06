import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddInScreen from '../../screens/AddInScreen';
import CampaignScreen from '../../screens/CampaignScreen';
import GalleryScreen from '../../screens/GalleryScreen';
import HomeScreen from '../../screens/HomeScreen';
import LinearGradient from 'react-native-linear-gradient';
import ProfileScreen from '../../screens/ProfileScreens/ProfileScreen';
import UploadFromPhone from '../../screens/PostAddScreens/UploadFromPhoneScreen';
import TopNavigator from '../TopNavigator/TopNavigator';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import GalleryTopNavigator from '../TopNavigator/GalleryTopNavigation';

const Tab = createBottomTabNavigator();

// const CustomTab = ({ children, onpress }) => (
//     <TouchableOpacity
//         style={{ top: -30, justifyContent: 'center', alignItems: 'center' }}
//         onPress={onpress}>
//         <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ width: 50, height: 50, borderRadius: 35, elevation: 4 }}>
//             {children}
//         </LinearGradient>

//     </TouchableOpacity>

// )

const BottomTab = ({route,navigation}) => {
    const [drawer,setDrawer] = useState('')
    return (
        
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: { height: 64, backgroundColor: '#d723cd' },
           
            tabBarActiveTintColor:'white',
            tabBarInactiveTintColor:'white',
            tabBarLabelStyle:{fontSize:12,fontFamily:'Oswald-Bold',bottom:8},
            tabBarIconStyle: { display: "none" }

        }}   
        >
            <Tab.Screen name='Home' component={HomeScreen} options={{
                tabBarLabel: ({ color,size,focused }) => {
                    return focused ? (
                    <View  style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        height: 60,
                        width: 55,
                        alignItems: 'center',
                        padding: 10,
                        marginBottom: 2,
                        borderRadius: 10,
                        borderWidth: 0.4,
                        borderColor: '#F5F6FF',
                      }}>
                        <Image source={require('../../assets/home.png')}
                           color={color}
                           size={size}
                        />
                        <Image color={color}
                        size={size}
                        source={require('../../assets/dot.png')}
                        style={{marginTop:7}} />
                        {/* <Text style={{ color: 'white', fontSize: 12, fontFamily: 'Oswald-Bold' }}>Home</Text> */}
                    </View>
                    ):(
                        <View style={{alignItems: 'center',marginBottom:10}}>
                            <Image
                  color={color}
                  size={size}
                  source={require('../../assets/home.png')}
                />
                <Text style={{color: 'white', fontSize: 12, fontFamily: 'Oswald-Bold'}}>Home</Text>
                        </View>
                    )
                }
                
            }} />
            <Tab.Screen name='Gallery' component={GalleryTopNavigator} options={{
                 tabBarLabel: ({ color,size,focused }) => {
                    return focused ? (
                    <View  style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        height: 60,
                        width: 55,
                        alignItems: 'center',
                        padding: 10,
                        marginBottom: 2,
                        borderRadius: 10,
                        borderWidth: 0.4,
                        borderColor: '#F5F6FF',
                      }}>
                        <Image source={require('../../assets/gallery.png')}
                           color={color}
                           size={size}
                        />
                        <Image color={color}
                        size={size}
                        source={require('../../assets/dot.png')}
                        style={{marginTop:7}} />
                        {/* <Text style={{ color: 'white', fontSize: 12, fontFamily: 'Oswald-Bold' }}>Home</Text> */}
                    </View>
                    ):(
                        <View style={{alignItems: 'center',marginBottom:10}}>
                            <Image
                  color={color}
                  size={size}
                  source={require('../../assets/gallery.png')}
                />
                <Text style={{color: 'white', fontSize: 12, fontFamily: 'Oswald-Bold'}}>Gallery</Text>
                        </View>
                    )
                }
                
            }} />
              <Tab.Screen name='BillBoards' component={AddInScreen} options={{
               tabBarLabel: ({ color,size,focused }) => {
                return focused ? (
                <View  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    height: 60,
                    width: 55,
                    alignItems: 'center',
                    padding: 10,
                    marginBottom: 2,
                    borderRadius: 10,
                    borderWidth: 0.4,
                    borderColor: '#F5F6FF',
                  }}>
                    <Image source={require('../../assets/board.png')}
                       color={color}
                       size={size}
                    />
                    <Image color={color}
                    size={size}
                    source={require('../../assets/dot.png')}
                    style={{marginTop:7}} />
                    {/* <Text style={{ color: 'white', fontSize: 12, fontFamily: 'Oswald-Bold' }}>Home</Text> */}
                </View>
                ):(
                    <View style={{alignItems: 'center',marginBottom:10}}>
                        <Image
              color={color}
              size={size}
              source={require('../../assets/board.png')}
            />
            <Text style={{color: 'white', fontSize: 12, fontFamily: 'Oswald-Bold'}}>BillBoards</Text>
                    </View>
                )
            }
            
            }} />
            <Tab.Screen name='Campaign' component={TopNavigator} options={{ 
                tabBarLabel: ({ color,size,focused }) => {
                    return focused ? (
                    <View  style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        height: 60,
                        width: 55,
                        alignItems: 'center',
                        padding: 10,
                        marginBottom: 2,
                        borderRadius: 10,
                        borderWidth: 0.4,
                        borderColor: '#F5F6FF',
                      }}>
                        <Image source={require('../../assets/campaign.png')}
                           color={color}
                           size={size}
                        />
                        <Image color={color}
                        size={size}
                        source={require('../../assets/dot.png')}
                        style={{marginTop:7}} />
                        {/* <Text style={{ color: 'white', fontSize: 12, fontFamily: 'Oswald-Bold' }}>Home</Text> */}
                    </View>
                    ):(
                        <View style={{alignItems: 'center',marginBottom:10}}>
                            <Image
                  color={color}
                  size={size}
                  source={require('../../assets/campaign.png')}
                />
                <Text style={{color: 'white', fontSize: 12, fontFamily: 'Oswald-Bold'}}>Campaign</Text>
                        </View>
                    )
                }
                
            }} />
            <Tab.Screen name='Menu' component={HomeScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                         <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer)} >
                         <AntDesign name='menufold' size={25} color='white' />
                            
                        {/* <Image  source={require('../../assets/menu.png')}
                            resizeMode='contain'
                            style={{ width: 25, height: 25, tintColor: 'white',left:3 }}
                        /> */}
                        
                        {/* <Text style={{ color: 'white', fontSize: 12, fontFamily: 'Oswald-Bold' }}>Menu</Text> */}
                        </TouchableOpacity>
                    </View>
                )
                // tabBarLabel: ({ color,size,focused }) => {
                //     return focused ? (
                //     <View  style={{
                //         backgroundColor: 'rgba(255, 255, 255, 0.1)',
                //         height: 60,
                //         width: 55,
                //         alignItems: 'center',
                //         padding: 10,
                //         marginBottom: 2,
                //         borderRadius: 10,
                //         borderWidth: 0.4,
                //         borderColor: '#F5F6FF',
                //       }}>
                //       <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer)} >
                //          <AntDesign name='menufold' size={25} color='white' />
                //          </TouchableOpacity>
                            
                //         <Image color={color}
                //         size={size}
                //         source={require('../../assets/dot.png')}
                //         style={{marginTop:7}} />
                //         {/* <Text style={{ color: 'white', fontSize: 12, fontFamily: 'Oswald-Bold' }}>Home</Text> */}
                //     </View>
                //     ):(
                //         <View style={{alignItems: 'center',marginBottom:10}}>
                //              <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer)} >
                //          <AntDesign name='menufold' size={25} color='white' />
                //          </TouchableOpacity>
                // <Text style={{color: 'white', fontSize: 12, fontFamily: 'Oswald-Bold'}}>Menu</Text>
                //         </View>
                //     )
                // }
            }} />
        </Tab.Navigator>
       
    )
}

export default BottomTab;