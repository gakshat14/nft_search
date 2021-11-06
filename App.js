import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './Pages/Home';
import { GlobalStateContext } from './Redux/GlobalStateContext';
import { Tokens } from './Pages/Token';
import { TokenTransfer } from './Pages/TokenTransferList';
import { NFT } from './Pages/NFT';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <GlobalStateContext>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Tokens" component={Tokens} />
            <Stack.Screen name="Token Transfers" component={TokenTransfer} />
            <Stack.Screen name="NFT Image" component={NFT} />
        </Stack.Navigator>
      </GlobalStateContext>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
