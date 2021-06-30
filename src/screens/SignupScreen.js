import React, {useState} from 'react'
import { View, Text, Image, StyleSheet,KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function SignupScreen({navigation}) {
    // USESTATE //
    const [email, setEmail] = useState('');
    const [name,setName] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    const [showNext, setShowNext] = useState(false);
    // RETURN //
    return (
        <KeyboardAvoidingView behavior="position">
        <View>
            {/* TOP PART */}
            <View style={styles.box1}>
                <Text style={styles.text} >Welcome to Friendly Chat App</Text>
                <Image style={styles.img} source = {require('../assets/logo.jpg')} />
            </View>
            {/* TOP PART */}

            {/* TEXT PART */}
            <View style={styles.box2}>
                {!showNext &&
                <> 
                <TextInput 
                label="Email"
                value={email}
                onChangeText={(text)=>setEmail(text)}
                mode="outlined"
                />

                <TextInput 
                label="Password"
                value={password}
                onChangeText={(text)=>setPassword(text)}
                secureTextEntry={true}
                mode="outlined"
                />
                </>
                }


                {showNext ?
                <>
                <TextInput 
                label="Name"
                value={name}
                onChangeText={(text)=>setName(text)}
                mode="outlined"
                />

                <Button
                mode="contained"
                onPress ={()=>setShowNext(true)}
                >select profile pic</Button>

                <Button
                mode="contained"
                onPress ={()=>setShowNext(true)}
                >SignUp</Button>
                </>
                :
                <Button
                mode="contained"
                onPress ={()=>setShowNext(true)}
                >Next</Button>
                }

                <TouchableOpacity onPress={() => navigation.goBack()}><Text style={{textAlign:"center"}}>Already have have an account?</Text></TouchableOpacity>

            </View>
            {/* TEXT PART */}
            
        </View>
        </KeyboardAvoidingView>
    
    )
}


const styles = StyleSheet.create({
    text : {
      fontSize: 22,
      color: "pink",
      margin: 10,
    },

    img: {
        width: 200,
        height: 200
    },

    box1: {
        alignItems: 'center',
    },

    box2: {
        paddingHorizontal: 40,
        justifyContent: "space-evenly",
        height:"50%",
    }
  });