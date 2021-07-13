import React from 'react';
import { StatusBar, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Constants from "expo-constants"
import AsyncStorage from '@react-native-async-storage/async-storage';

// config
import Colors from '../../config/Colors';

function AppBar(props) {

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            props.navigation.navigate('LoginScreen')
        } catch (error) {

        }
    }

    return (
        <View  >
            <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
            <Appbar style={{ marginTop: Constants.statusBarHeight, backgroundColor: Colors.primary, alignItems: "center", justifyContent: "center", }} >
                <Appbar.Action color={Colors.white} onPress={() => props.navigation.openDrawer()} icon="menu" />
                <View style={{ flex: 1, width: "80%", alignItems: "center", flexDirection: "row", justifyContent: "center" }} >
                    <Appbar.Content style={{ marginLeft: "28%" }} titleStyle={{ fontSize: RFPercentage(2.8) }} title="Reward Points" />
                </View>
                <Appbar.Action color={Colors.white} onPress={() => handleLogout()} icon="import" />
            </Appbar>
        </View>
    );
}



export default AppBar;