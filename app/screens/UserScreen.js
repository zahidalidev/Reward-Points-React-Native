import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import QRCode from 'react-native-qrcode-svg';

// components
import AppBar from "../components/common/AppBar"

// config
import Colors from '../config/Colors';
import GenerateRandomId from '../components/utils/RandomId';

function UserScreen(props) {

    const [qrCodeValue, setQrCodeValue] = useState('0');
    const [points, setPoints] = useState([
        {
            id: 0,
            point: true
        },
        {
            id: 1,
            point: true
        },
        {
            id: 2,
            point: true
        },
        {
            id: 3,
            point: true
        },
        {
            id: 4,
            point: true
        },
        {
            id: 5,
            point: false
        },
        {
            id: 6,
            point: false
        },
        {
            id: 7,
            point: false
        },
        {
            id: 8,
            point: false
        },
        {
            id: 9,
            point: false
        },
    ])

    const getId = async () => {
        let id = await GenerateRandomId();
        console.log(id)
        setQrCodeValue(id)
    }

    useEffect(() => {
        getId()
    }, [])

    return (
        <View style={{ flex: 1 }} >

            {/* appbar */}
            <AppBar {...props} />

            {/* Main container */}
            <View style={styles.container}>
                <View style={{ width: "90%", alignItems: "center", justifyContent: "center" }} >

                    {/* point container */}
                    <View style={{ marginTop: RFPercentage(6), borderWidth: 1.5, borderColor: Colors.mediumGrey, borderRadius: 10, padding: RFPercentage(2), width: "100%", alignItems: "center", justifyContent: "center" }} >
                        <FlatList
                            data={points}
                            numColumns={5}
                            keyExtractor={(item) => item.id}
                            renderItem={(data) =>
                                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: data.item.point ? Colors.primary : null, margin: RFPercentage(1), width: "20%", borderRadius: RFPercentage(10), height: RFPercentage(5.5), width: RFPercentage(5.5), borderWidth: 1, borderColor: Colors.mediumGrey }} >
                                    <Text style={{ fontSize: RFPercentage(2.6), color: data.item.point ? Colors.white : Colors.primary, }} >{data.item.id + 1}</Text>
                                </View>
                            }
                        />
                    </View>

                    {/* QR Code Container */}
                    <View style={{ marginTop: RFPercentage(10) }} >
                        <QRCode
                            value={qrCodeValue}
                            size={RFPercentage(26)}
                        />
                    </View>

                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        backgroundColor: Colors.white,
    }
})

export default UserScreen;