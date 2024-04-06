import React from "react";
import { Text, View, Image, StyleSheet,TouchableOpacity, } from 'react-native'
import images from "../../constant/Images";
import LinearGradient from 'react-native-linear-gradient';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DepositScreen from "../../screens/Wallet/DepositScreen";
import WithdrawScreen from "../../screens/Wallet/WithdrawScreen";


const Tab = createMaterialTopTabNavigator();

const WalletTopNavigator = ({navigation}) => {
    return(
        <>
         <View style={{backgroundColor:'white',}}>
                <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={{ height: 65 }}>

                    <View style={{  }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                            <Image source={images.back} style={{ left: 20,top:28 }} />
                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign:'center',top:10 }}>Wallet</Text>
                       
                    </View>
                </LinearGradient>

                <View style={{}}>
                    {/* <Text>helj</Text> */}

                </View>
            </View>
          
           
            <Tab.Navigator screenOptions={{
                tabBarLabelStyle: { fontWeight: 'bold',top:6,color:'white' },
                tabBarActiveTintColor: '#6906C3',
                tabBarInactiveTintColor: 'black',
                tabBarStyle: { elevation: 4,height:57,backgroundColor:'#B937FA',width:328,left:16,borderRadius:15,},
                
            }} 
            style={{top:250,}}
            
            
            >
                <Tab.Screen name="Deposit" component={DepositScreen}  />
                <Tab.Screen name="Withdraw" component={WithdrawScreen} />


            </Tab.Navigator>
           
            
        </>
    )


}

export default WalletTopNavigator;