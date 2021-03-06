import React, {useState} from 'react'
import { View, Text, Image, StyleSheet,KeyboardAvoidingView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


export default function SignupScreen({navigation}) {
    // USESTATE //
    const [email, setEmail] = useState('');
    const [name,setName] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    const [showNext, setShowNext] = useState(false)
    const [loading, setLoading] = useState(false)
    if(loading){
        return <ActivityIndicator size="large" color="#00ff00"/>
    }

    // USER SIGN IN //
    const userSignup = async ()=>{
        setLoading(true)
        if(!email || !password || !image || !name) {
            alert("Please add your picture")
            return
        }
        try {
            const result = await auth().createUserWithEmailAndPassword(email, password)
                firestore().collection('users').doc(result.user.uid).set({
                name:name,
                email: result.user.email,
                uid:result.user.uid,
                pic: image
            })
            setLoading(false)
        }catch(err){
            alert("something went wrong")
        }
    }

    // PROFILE IMAGE // 
    const pickImageAndUpload = ()=>{
        launchImageLibrary({quality:0.5},(fileobj)=>{
            
         const uploadTask =  storage().ref().child(`/userprofile/${Date.now()}`).putFile(fileobj.assets[0].uri)
                uploadTask.on('state_changed', 
                 (snapshot) => {
  
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if(progress==100) alert('image uploaded')
                    
                }, 
                (error) => {
                    alert("error uploading image")
                }, 
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    setImage(downloadURL)
                    });
                }
                );
        })
    }
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
                onPress ={()=>pickImageAndUpload()}
                >select profile pic</Button>

                <Button
                mode="contained"
                disabled={image?false:true}
                onPress ={()=>userSignup()}
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