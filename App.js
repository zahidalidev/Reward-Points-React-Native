import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer"
import { NavigationContainer } from "@react-navigation/native"

// screens
import UserScreen from "./app/screens/UserScreen"

// components
import AppDrawer from './app/components/AppDrawer';

// config
import Colors from "./app/config/Colors"

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="UserScreen"
        drawerType={"front"}
        overlayColor="transparent"
        edgeWidth={100}
        drawerStyle={{
          backgroundColor: Colors.white,
          width: "75%"
        }}
        drawerContent={(props) => <AppDrawer {...props} />}
      >
        <Drawer.Screen name="UserScreen" component={UserScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
