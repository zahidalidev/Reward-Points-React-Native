import React from 'react';
import { StatusBar, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { RFPercentage } from 'react-native-responsive-fontsize';

// config
import Colors from '../../config/Colors';

function AppBar(props) {
    return (
        <View>
            <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
            <Appbar style={{ backgroundColor: Colors.primary, alignItems: "center", justifyContent: "center", }} >
                <Appbar.Action color={Colors.white} onPress={() => props.navigation.openDrawer()} icon="menu" />
                <View style={{ flex: 1, width: "80%", alignItems: "center", flexDirection: "row", justifyContent: "center" }} >
                    <Appbar.Content style={{ marginLeft: "26%" }} titleStyle={{ fontSize: RFPercentage(2.8) }} title="Reward Points" />
                </View>
            </Appbar>
        </View>
    );
}



export default AppBar;