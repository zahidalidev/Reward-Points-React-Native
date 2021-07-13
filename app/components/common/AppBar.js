import React, { useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Constants from "expo-constants"
import AsyncStorage from '@react-native-async-storage/async-storage';

// config
import Colors from '../../config/Colors';

function AppBar(props) {

    const [currentUser, setCurrentUser] = useState(false)

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            props.navigation.navigate('LoginScreen')
        } catch (error) {

        }
    }

    const getCurrentUser = async () => {
        try {
            let user = await AsyncStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                if (user.email) {
                    setCurrentUser(true)
                    true;
                }
            }
        }
        catch (error) {
            setCurrentUser(false)
        }
        setCurrentUser(false)
    }

    useEffect(() => {
        getCurrentUser();
    }, [])

    return (
        <View  >
            <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
            <Appbar style={{ marginTop: Constants.statusBarHeight, backgroundColor: Colors.primary, alignItems: "center", justifyContent: "center", }} >
                <Appbar.Action color={Colors.white} onPress={() => props.navigation.openDrawer()} icon="menu" />
                <View style={{ flex: 1, width: "80%", alignItems: "center", flexDirection: "row", justifyContent: "center" }} >
                    <Appbar.Content style={{ marginLeft: currentUser ? "28%" : "26%" }} titleStyle={{ fontSize: RFPercentage(2.8) }} title="Reward Points" />
                </View>
                {
                    currentUser ?
                        <Appbar.Action color={Colors.white} onPress={() => handleLogout()} icon="import" /> : null
                }
            </Appbar>
        </View>
    );
}



export default AppBar;