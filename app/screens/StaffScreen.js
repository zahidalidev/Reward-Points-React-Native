import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { BarCodeScanner } from 'expo-barcode-scanner';

// components
import AppBar from "../components/common/AppBar"

// config
import Colors from '../config/Colors';
import { getUserById, updateUser } from '../services/UserServices';
import AppTextButton from '../components/common/AppTextButton';

function StaffScreen(props) {

    const [qrCodePoints, setQrCodePoints] = useState(0);
    const [showScanner, setShowScanner] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = async ({ type, data }) => {
        try {
            let user = await getUserById(data);
            if (!user) {
                alert("User not found")
                console.log("qr id scan user error1: ", user)
                return;
            }
            setUserId(user.id);
            setQrCodePoints(parseInt(user.points))
        } catch (error) {
            console.log("qr id scan user error: ", error)
            alert("User not found")
        }
        setShowScanner(false)
    };

    const updatePoints = async () => {
        try {
            let res = await updateUser(userId, { points: qrCodePoints })
            if (res) {
                alert("Points are updated");
            } else {
                alert("point updation error");
            }
        } catch (error) {
            alert("point updation error");
            console.log("point updation error: ", error)
        }
    }

    const handleIncrement = () => {
        if (qrCodePoints < 10) {
            setQrCodePoints(qrCodePoints + 1)
        }
    }

    const handleDecrement = () => {
        if (qrCodePoints > 1) {
            setQrCodePoints(qrCodePoints - 1)
        }
    }


    return (
        <View style={{ flex: 1 }} >
            {/* appbar */}
            <AppBar {...props} />


            {/* Main container */}
            <View style={styles.container}>
                {/* QR Code scanner container */}

                {showScanner ?
                    <BarCodeScanner
                        onBarCodeScanned={handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    /> :
                    <>
                        <TouchableOpacity onPress={() => setShowScanner(true)} activeOpacity={0.7} style={{ alignItems: "center", justifyContent: 'center', borderRadius: 10, borderColor: Colors.lightPrimary, borderWidth: 1.5, marginTop: RFPercentage(6), width: RFPercentage(30), height: RFPercentage(30) }} >
                            <Text style={{ fontSize: RFPercentage(3), color: Colors.mediumGrey, fontWeight: "bold" }} >SCAN QR CODE</Text>
                        </TouchableOpacity>

                        {/* QR Code Container */}
                        <View style={{ width: "100%", marginTop: RFPercentage(6) }} >
                            <View style={{ marginLeft: "15%", flexDirection: "row", justifyContent: 'flex-start', alignItems: 'flex-end', width: "70%" }} >
                                <Text style={{ width: "20%", fontSize: RFPercentage(3.4) }} >ID:</Text>
                                <TextInput
                                    value={userId}
                                    style={{ justifyContent: "center", alignItems: 'center', width: "80%", borderBottomColor: Colors.mediumGrey, borderBottomWidth: 1, padding: RFPercentage(1), fontSize: RFPercentage(2.5) }}
                                    placeholder="User ID"
                                />
                            </View>
                            <View style={{ marginTop: RFPercentage(3), marginLeft: "15%", flexDirection: "row", justifyContent: 'flex-start', alignItems: 'flex-end', width: "70%" }} >
                                <Text style={{ width: "30%", fontSize: RFPercentage(3.4) }} >Points:</Text>
                                <View style={{ flexDirection: "row", alignItems: "center" }} >
                                    <TouchableOpacity onPress={() => handleIncrement()} style={{ padding: RFPercentage(1), paddingTop: RFPercentage(0.3), paddingBottom: RFPercentage(0.3), borderWidth: 1, borderColor: Colors.lightPrimary }} ><Text style={{ fontSize: RFPercentage(3) }} >+</Text></TouchableOpacity>
                                    <Text style={{ fontSize: RFPercentage(2.7), marginLeft: RFPercentage(1.4), marginRight: RFPercentage(1.4) }} >{qrCodePoints}</Text>
                                    <TouchableOpacity onPress={() => handleDecrement()} style={{ padding: RFPercentage(1.3), paddingTop: RFPercentage(0.3), paddingBottom: RFPercentage(0.3), borderWidth: 1, borderColor: Colors.lightPrimary }} ><Text style={{ fontSize: RFPercentage(3) }} >-</Text></TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ width: "100%", alignItems: 'center', justifyContent: "center", marginTop: RFPercentage(8) }} >
                                <AppTextButton
                                    onSubmit={() => updatePoints()}
                                    name="Update Points"
                                    backgroundColor={Colors.primary}
                                    width="70%"
                                    borderRadius={RFPercentage(1.6)}
                                />
                            </View>
                        </View>
                    </>
                }

            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        backgroundColor: Colors.white
    }
})

export default StaffScreen;