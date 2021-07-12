import React from 'react';
import { StyleSheet, View } from 'react-native';

// components
import AppBar from "../components/common/AppBar"

// config
import Colors from '../config/Colors';

function UserScreen(props) {
    return (
        <View style={styles.container}>
            {/* appbar */}
            <AppBar {...props} />

            {/*  */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

    }
})

export default UserScreen;