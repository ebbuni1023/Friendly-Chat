import React, {useState, useEffect} from 'react'
import { View, Text, Image, FlatList, StyleSheet,TouchableOpacity } from 'react-native'
import firestore from '@react-native-firebase/firestore'

export default function HomeScreen({user, navigation}) {
    console.log(user);
    // SHOW ALL USERS // 
    const [users, setUsers] = useState(null)
    const getUsers = async () => {
        const querySnap = await firestore().collection('users').where('uid','!=',user.uid).get()
        const allusers = querySnap.docs.map(docSnap=>docSnap.data())
        // console.log(allusers);
        setUsers(allusers)
    }

    useEffect(() => {
        getUsers()
    }, [])

    // SHOW ALL USERS // 

    const RenderCard = ({item}) => {
        return (
            <TouchableOpacity onPress= {()=>navigation.navigate('chat', {name: item.name, uid:item.uid})}>

                <View style = {styles.mycard}>
                    <Image source={{uri:item.pic}} style = {styles.img}/>
                    <View style={styles.text}>
                        <Text style={styles.text1}>
                            {item.name}
                        </Text>
                        <Text>
                            {item.email}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>

        )
    }
    return (
        <View>
            <FlatList 
                data={users}
                renderItem={({item})=> {return <RenderCard item={item} />}}
                keyExtractor={(item)=> item.uid}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    img : {
        width: 60, 
        height: 60, 
        borderRadius:30, 
        backgroundColor:'pink',
      // backgroundColor: 'white',
    },
    text:{
        fontSize: 18,
        marginLeft: 15,
    },

    mycard:{
        flexDirection: 'row',
        margin: 3,
        padding: 4,
        backgroundColor:"pink",
        borderBottomWidth: 2,
        borderBottomColor:'purple'
    }
  });