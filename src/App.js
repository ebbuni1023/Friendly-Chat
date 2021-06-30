
import React from 'react';
import 'react-native-gesture-handler';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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
import LoginScreen from './screens/LoginScreen';

// THEME //
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'pink',
    // accent: '#f1c40f',
  },
};
// THEME //

// NAVIGATION //
const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="signup" component={SignupScreen}  options={{headerShown:false}}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
// NAVIGATION //


const App = () => {
  return (
    <>
      <PaperProvider theme={theme}>
      <StatusBar barStyle="dark-content" backgroundColor="pink" />
      <View style = {styles.container}>
        <Navigation/>
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
