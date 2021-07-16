import React, { useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Constants from "expo-constants"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Restart } from "fiction-expo-restart"

// config
import Colors from '../../config/Colors';

function AppBar(props) {

    const [currentUser, setCurrentUser] = useState(false)

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('points');
            Restart()
            props.navigation.navigate('LoginScreen')
        } catch (error) {

        }
    }

    const getCurrentUser = async () => {
        try {
            let user = await AsyncStorage.getItem('user');
            // console.log("use1: ", user)
            if (user) {
                user = JSON.parse(user);
                if (user.email) {
                    setCurrentUser(true)
                    return;
                }
            }
        }
        catch (error) {
            setCurrentUser(false)
        }
        setCurrentUser(false)
    }

    const handleSignUp = async () => {
        props.navigation.navigate('RegisterScreen')
        // let user = await AsyncStorage.getItem('user');
    }

    useEffect(() => {
        getCurrentUser();
    })

    return (
        <View  >
            <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
            <Appbar style={{ marginTop: Constants.statusBarHeight, backgroundColor: Colors.primary, alignItems: "center", justifyContent: "center", }} >
                <Appbar.Action color={Colors.white} onPress={() => props.navigation.openDrawer()} icon="menu" />
                <View style={{ flex: 1, width: "80%", marginLeft: currentUser ? null : "15%", alignItems: "center", flexDirection: "row", justifyContent: "center" }} >
                    <Appbar.Content style={{ marginLeft: currentUser ? "28%" : null }} titleStyle={{ fontSize: RFPercentage(2.8) }} title="Reward Points" />
                    {currentUser ? null :
                        <Appbar.Content style={{ position: "absolute", right: 5 }} onPress={() => handleSignUp()} titleStyle={{ fontSize: RFPercentage(2.8) }} title="Sign Up" />
                    }
                </View>
                {/* {currentUser ? */}
                <Appbar.Action color={Colors.white} onPress={() => handleLogout()} icon="import" />
                {/* } */}
            </Appbar>
        </View>
    );
}



export default AppBar;