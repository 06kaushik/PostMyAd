import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DrawerActions, useNavigation, useIsFocused } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import UserDashBoard from '../../screens/UserScreens/DashboardScreen';
import UserBillBoard from '../../screens/UserScreens/UserBillBoard';
import UserAddIt from '../../screens/UserScreens/UserAdIt';
import UserOrders from '../../screens/UserScreens/UsersOrders';
import ProfileScreen from '../../screens/ProfileScreens/ProfileScreen';
import UserOrderTopNavigator from '../UserTopNavigator/UserOrderTopNav';
import UserProfileMainScreen from '../../screens/UserScreens/UserProfileScreen/UserProfileMainScreen';
import LinearGradient from 'react-native-linear-gradient';




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

const MyModalBackgroundScreen = () => {
    return null;
};


const UserBottomTab = ({ route, navigation }) => {
    const [drawer, setDrawer] = useState('')
    const Placeholder = () => <View />
    const isFocused = useIsFocused();



    React.useEffect(() => {


    }, [isFocused]);



    return (

        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: { height: 64, backgroundColor: 'rgba(183,54,248,255)', position: 'absolute', bottom: 25, left: 20, right: 20, elevation: 0, borderRadius: 15 },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'white',
            tabBarLabelStyle: { fontSize: 12, fontFamily: 'Oswald-Bold', bottom: 8 },
            tabBarIconStyle: { display: "none" }


        }}
        >
            <Tab.Screen name='Home' component={UserDashBoard} options={{
                tabBarLabel: ({ color, size, focused }) => {
                    return focused ? (
                        <View style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            height: 60,
                            width: 55,
                            alignItems: 'center',
                            padding: 10,
                            marginBottom: 2,
                            borderRadius: 10,
                            borderWidth: 0.4,
                            borderColor: '#F5F6FF',
                            right: 15

                        }}>
                            <Image source={require('../../assets/home.png')}
                                color={color}
                                size={size}
                            />
                            <Image color={color}
                                size={size}
                                source={require('../../assets/dot.png')}
                                style={{ marginTop: 7 }} />
                            {/* <Text style={{ color: 'white', fontSize: 12, fontFamily: 'Oswald-Bold' }}>Home</Text> */}
                        </View>
                    ) : (
                        <View style={{ alignItems: 'center', marginBottom: 10, right: 15 }}>
                            <Image
                                color={color}
                                size={size}
                                source={require('../../assets/home.png')}
                            />
                            <Text style={{ color: 'white', fontSize: 12, fontFamily: 'Oswald-Bold', }}>Home</Text>
                        </View>
                    )
                }

            }} />
            <Tab.Screen name='Billboards' component={UserBillBoard} initialParams={{ VenueName: route?.params }} options={{
                tabBarLabel: ({ color, size, focused }) => {
                    return focused ? (
                        <View style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            height: 60,
                            width: 55,
                            alignItems: 'center',
                            padding: 10,
                            marginBottom: 2,
                            borderRadius: 10,
                            borderWidth: 0.4,
                            borderColor: '#F5F6FF',
                            right:40
                        }}>
                            <Image source={require('../../assets/board.png')}
                                color={color}
                                size={size}
                            />
                            <Image color={color}
                                size={size}
                                source={require('../../assets/dot.png')}
                                style={{ marginTop: 7 }} />
                            {/* <Text style={{ color: 'white', fontSize: 12, fontFamily: 'Oswald-Bold' }}>Home</Text> */}
                        </View>
                    ) : (
                        <View style={{ alignItems: 'center', marginBottom: 10, right: 40 }}>
                            <Image
                                color={color}
                                size={size}
                                source={require('../../assets/board.png')}
                            />
                            <Text style={{ color: 'white', fontSize: 12, fontFamily: 'Oswald-Bold' }}>Billboards</Text>
                        </View>
                    )
                }

            }} />

            <Tab.Screen name='Orders' component={UserOrderTopNavigator} options={{
                tabBarLabel: ({ color, size, focused }) => {
                    return focused ? (
                        <View style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            height: 60,
                            width: 55,
                            alignItems: 'center',
                            padding: 10,
                            marginBottom: 2,
                            borderRadius: 10,
                            borderWidth: 0.4,
                            borderColor: '#F5F6FF',
                            right: 45
                        }}>
                            <Image source={require('../../assets/campaign.png')}
                                color={color}
                                size={size}
                            />
                            <Image color={color}
                                size={size}
                                source={require('../../assets/dot.png')}
                                style={{ marginTop: 7 }} />
                            {/* <Text style={{ color: 'white', fontSize: 12, fontFamily: 'Oswald-Bold' }}>Home</Text> */}
                        </View>
                    ) : (
                        <View style={{ alignItems: 'center', marginBottom: 10, right: 45 }}>
                            <Image
                                color={color}
                                size={size}
                                source={require('../../assets/campaign.png')}
                            />
                            <Text style={{ color: 'white', fontSize: 12, fontFamily: 'Oswald-Bold' }}>Orders</Text>
                        </View>
                    )
                }

            }} />
            {/* <Tab.Screen name='Menu' component={MyModalBackgroundScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer)} >
                            <AntDesign name='menufold' size={25} color='white' />
                        </TouchableOpacity>
                    </View>
                )
                
            }} /> */}

            <Tab.Screen name='Menu' component={MyModalBackgroundScreen}
            options={{
                tabBarLabel: ({}) => {
                    return null;
                },
                tabBarButton: () => {
                    return(
                        <View style={{ alignItems: 'center', justifyContent: 'center', right:20}}>
                        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer)} >
                            <AntDesign name='menufold' size={25} color='white' />
                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontSize: 12, fontFamily: 'Oswald-Bold',bottom:2 }}>Menu</Text>
                    </View>

                    )
                }
            }}
            />
        </Tab.Navigator> 

    )
}

export default UserBottomTab;