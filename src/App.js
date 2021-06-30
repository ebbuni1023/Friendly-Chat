/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import SignupScreen from './screens/SignupScreen';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'pink',
    // accent: '#f1c40f',
  },
};

const App = () => {
  return (
    <>
      <PaperProvider theme={theme}>
      <StatusBar barStyle="dark-content" backgroundColor="pink" />
      <View style = {styles.container}>
        <SignupScreen/>
      </View>
      </PaperProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container : {
    flex: 1,
    // backgroundColor: 'white',
  }
});

export default App;
