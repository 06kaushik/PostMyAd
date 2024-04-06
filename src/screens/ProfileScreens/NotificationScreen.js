import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Switch } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import images from "../../constant/Images";



const NotificationScreen = ({ navigation }) => {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (

        <View>
            <View >
                <LinearGradient colors={['rgba(225, 65, 195, 1)', 'rgba(185, 55, 250, 1)', 'rgba(105, 6, 195, 1)']} style={styles.linearStyle}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Image source={images.back} style={styles.back} />
                    </TouchableOpacity>
                    <Text style={styles.prfile}>Notifications</Text>
                </LinearGradient>
            </View>

            <View style={styles.container}>
                <View>
                    <Text style={styles.notitxt}>Order Confirmation</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        style={{ right: 20 }}

                    />
                </View>

                <View>
                    <Text style={styles.notitxt}>Order status Changed</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        style={{ right: 20 }}

                    />
                </View>

                <View>
                    <Text style={styles.notitxt}>Sound</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        style={{ right: 20 }}

                    />
                </View>

                <View>
                    <Text style={styles.notitxt}>Vibration</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        style={{ right: 20 }}

                    />
                </View>

                <View>
                    <Text style={styles.notitxt}>Push Notification</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        style={{ right: 20 }}

                    />
                </View>
            </View>


        </View>
    )
}

export default NotificationScreen;

const styles = StyleSheet.create({
    linearStyle: {
        flexDirection: 'row',
        height: 80,

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
    notitxt: {
        top: 25,
        left: 20,
        fontFamily: 'Calibri',
        fontWeight: '700',
        fontSize: 16,
        color: '#6F6F6F'

    },
    container: {
        top: 20,
        backgroundColor: 'white',
        elevation: 4,
        height: 280,
        width: '95%',
        left: 10,
        borderRadius: 15,
    }

})