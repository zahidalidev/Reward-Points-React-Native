import React from 'react';
import { LogBox } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer"
import { NavigationContainer } from "@react-navigation/native"

// screens
import UserScreen from "./app/screens/UserScreen"
import StaffScreen from "./app/screens/StaffScreen"
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';

// components
import AppDrawer from './app/components/AppDrawer';

// config
import Colors from "./app/config/Colors"

LogBox.ignoreLogs(['Setting a timer'])

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="LoginScreen"
        drawerType={"front"}
        overlayColor="transparent"
        edgeWidth={100}
        drawerStyle={{
          backgroundColor: Colors.white,
          width: "75%"
        }}
        drawerContent={(props) => <AppDrawer {...props} />}
      >
        <Drawer.Screen name="LoginScreen" component={LoginScreen} />
        <Drawer.Screen name="RegisterScreen" component={RegisterScreen} />
        <Drawer.Screen name="UserScreen" component={UserScreen} />
        <Drawer.Screen name="StaffScreen" component={StaffScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
