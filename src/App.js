import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native';
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
import auth from '@react-native-firebase/auth';
import HomeScreen from './screens/HomeScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ChatScreen from './screens/ChatScreen';

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

  const [user, setUser] = useState('')
  useEffect(()=>{
    const unregister = auth().onAuthStateChanged(userExist =>{
      if (userExist) setUser(userExist)
      else setUser("")
    })

    return () => {
      unregister()
    }

  }, [])
// NAVIGATION //

// STACK //
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerTintColor: "pink"
      }}>
        {user ? 
        <>
        <Stack.Screen name="home" options={{headerRight: ()=><Button
        // name ="exit_to_app"
        title="sighout"
        // size={10}
        size= '10'
        color='pink'
        style={{marginRight:10}}
        onPress={() => auth().signOut()}
        />,
        title:"Friendly App"
      }}> 
      {props => <HomeScreen {...props} user = {user} />}
      </Stack.Screen>
      <Stack.Screen name="chat" options={({ route }) => ({ title: route.params.name })}>
        {props => <ChatScreen {...props} user = {user} />}
      </Stack.Screen>
      </>
        :
        <>
        <Stack.Screen name="login" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="signup" component={SignupScreen}  options={{headerShown:false}}/>
        </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// STACK //


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
