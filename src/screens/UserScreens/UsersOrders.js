import React from "react";
import { View, Text,StyleSheet} from 'react-native'


const UserOrders = () => {

    return (
        <View style={{ flex: 1 }}>
            <View style={{justifyContent:'center',flex:1}}>
                <Text style={{color:'black',fontSize:30,fontFamily:'Oswald-Bold',alignSelf:'center'}}>No Orders To Show</Text>
            </View>
        </View>
    )
}
export default UserOrders

const styles = StyleSheet.create({

})