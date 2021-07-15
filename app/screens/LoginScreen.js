import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants'
import { RFPercentage } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppTextInput from '../components/common/AppTextInput';
import AppTextButton from '../components/common/AppTextButton';
import AccountText from '../components/common/AccountText';

import colors from '../config/Colors';

import { addUserId, getUserById, loginUser } from '../services/UserServices';
import GenerateRandomId from '../components/utils/RandomId';

function LoginScreen(props) {
    const [indicator, setIndicator] = useState(false);
    const [feilds, setFeilds] = useState([
        {
            id: 0,
            placeHolder: "Email",
            value: '',
            secure: false
        },
        {
            id: 1,
            placeHolder: "Password",
            value: '',
            secure: true
        },
    ]);

    const handleChange = (text, id) => {
        const tempFeilds = [...feilds];
        tempFeilds[id].value = text;
        setFeilds(tempFeilds);
    }

    const handleSubmit = async () => {
        const email = feilds[0].value.trim().toLowerCase();
        const password = feilds[1].value;
        try {
            setIndicator(true)

            const res = await loginUser(email, password);
            if (!res) {
                setIndicator(false)
                alert("Email or Password is incorrect")
                return;
            }
            await AsyncStorage.setItem('user', JSON.stringify(res));
            setIndicator(false)

            if (res.role === 'staff') {
                props.navigation.navigate('StaffScreen')
            } else {
                props.navigation.navigate('UserScreen')
            }

        } catch (error) {
            console.log("login error: ", error);
            setIndicator(false)
            alert("Email or Password is incorrect")
        }
    }

    // get user from AsyncStorage to confirm login or logout
    let validateCurrentUser = async () => {
        // await AsyncStorage.removeItem('user');
        // await AsyncStorage.removeItem('points');
        try {
            let res = await AsyncStorage.getItem('user');
            res = JSON.parse(res)
            console.log("res: ", res)
            if (res) {
                if (res.role === 'staff') {
                    props.navigation.navigate('StaffScreen')
                } else {
                    props.navigation.navigate('UserScreen')
                }
                return;
            }
            props.navigation.navigate('LoginScreen');
        } catch (error) {
            console.log("auto login: ", error)
        }
    }

    useEffect(() => {
        validateCurrentUser();
    }, [props.route.params]);

    const handleSkip = async () => {
        try {
            setIndicator(true)
            let user = await GenerateRandomId();
            id = user.id
            let res = await getUserById(id)
            console.log("Uodated: ", res)
            if (res) {
                await AsyncStorage.removeItem('user');
                await AsyncStorage.setItem('user', JSON.stringify(res));
                setIndicator(false)
            } else {
                // console.log("user: ski: ", user)
                if (!user.update) {
                    await addUserId({ id: id, points: 0, update: true })
                    await AsyncStorage.setItem('user', JSON.stringify({ id: id, points: 0, update: true }));
                }
            }
            props.navigation.navigate('UserScreen');
        } catch (error) {
            console.log("skip error: ", error)
            setIndicator(false)
        }
        setIndicator(false)
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" backgroundColor={colors.primary} />

            {/* Kitchen buddy top container */}
            <View style={{ backgroundColor: colors.primary, width: "100%", flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                <View style={{ width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }} >
                    <Text style={{ marginBottom: RFPercentage(5), fontSize: RFPercentage(5), color: colors.white }} >
                        Reward Points
                    </Text>
                </View>
            </View>

            {indicator
                ? <View style={{ marginTop: -RFPercentage(7), borderTopRightRadius: RFPercentage(8), borderTopLeftRadius: RFPercentage(8), backgroundColor: colors.lightGrey, width: "100%", flex: 1.8, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                    <ActivityIndicator color={colors.primary} size={RFPercentage(6)} />
                </View>
                : <>
                    {/* Bottom Contaienr */}
                    <View style={{ marginTop: -RFPercentage(7), borderTopRightRadius: RFPercentage(8), borderTopLeftRadius: RFPercentage(8), backgroundColor: colors.lightGrey, width: "100%", flex: 1.8, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >

                        <View style={{ marginTop: RFPercentage(6.5), width: "85%", alignItems: "center" }} >
                            <Text style={{ color: colors.primary, fontSize: Platform.OS === "ios" ? RFPercentage(3.5) : RFPercentage(5.5) }} >Login</Text>
                        </View>

                        {/* Text feilds */}
                        {feilds.map((item, i) =>
                            <View key={i} style={{ marginTop: i == 0 ? RFPercentage(10) : RFPercentage(4), width: "85%" }} >
                                <AppTextInput
                                    placeHolder={item.placeHolder}
                                    width="100%"
                                    value={item.value}
                                    onChange={(text) => handleChange(text, item.id)}
                                    secure={item.secure}
                                />
                            </View>
                        )}

                        {/* Login button */}
                        <View style={styles.loginButton} >
                            <AppTextButton
                                name="LOGIN"
                                borderRadius={RFPercentage(1.3)}
                                onSubmit={() => handleSubmit()}
                                backgroundColor={colors.primary}
                                width="100%"
                                height={RFPercentage(5.5)}
                            />
                            <TouchableOpacity onPress={() => handleSkip()} style={{ marginRight: RFPercentage(1), marginTop: RFPercentage(1) }}>
                                <Text style={{ fontSize: RFPercentage(2.6), color: colors.secondary, fontWeight: "bold" }} >Skip</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    {/* Login text */}
                    <AccountText navigate={props.navigation.navigate} description="Dont't have an account? " buttnText="Sign Up" location="RegisterScreen" />
                </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: colors.lightGrey,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    },
    loginButton: { marginTop: RFPercentage(5), width: "85%", flex: 1, alignItems: "flex-end" }
})

export default LoginScreen;