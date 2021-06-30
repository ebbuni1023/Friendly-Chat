import React, {useState, useEffect} from 'react'
import { View, Text } from 'react-native'
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore'


export default function ChatScreen({user, route}) {
    const [messages, setMessages] = useState([]);
    const {uid} = route.params;

    const getAllMessages = async ()=>{
        const docid  = uid > user.uid ? user.uid+ "-" + uid : uid+"-"+user.uid 
        const querySnap = await firestore().collection('chatroom')
        .doc(docid)
        .collection('messages')
        .orderBy('createdAt',"desc")
        .get()
       const allmsg = querySnap.docs.map(docSnap=>{
            return {
                ...docSnap.data(),
                createdAt:docSnap.data().createdAt.toDate()
            }
        })
        setMessages(allmsg)
     }
     useEffect(() => {
        //  getAllMessages()
        const docid  = uid > user.uid ? user.uid+ "-" + uid : uid+"-"+user.uid 
        const messageRef = firestore().collection('chatroom')
        .doc(docid)
        .collection('messages')
        .orderBy('createdAt',"desc")

        messageRef.onSnapshot((querySnap) => {
            const allmsg = querySnap.docs.map(docSnap => {
                const data = docSnap.data()
                if(data.createdAt){
                    return {
                        ...docSnap.data(),
                        createdAt:docSnap.data().createdAt.toDate()
                    }                    
                }else {
                    return {
                        ...docSnap.data(),
                        createdAt:new Date()
                    }
                }
            })
            setMessages(allmsg)
        })

     }, [])

      const onSend = (messageArray) => {
        const msg = messageArray[0]
        const mymsg = {
            ...msg,
            sentBy: user.uid,
            sentTo: uid,
            createdAt: new Date()
        }
      setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
      const docid  = uid > user.uid ? user.uid+ "-" + uid : uid+"-"+user.uid 

      firestore().collection('chatroom')
      .doc(docid)
      .collection('messages')
      .add({...mymsg,createdAt:firestore.FieldValue.serverTimestamp()})

    }
    

    return (
        <View style = {{flex: 1, backgroundColor:"white"}}>
            <GiftedChat
                messages={messages}
                onSend={text => onSend(text)}
                user={{
                    _id: user.uid,
                }}
                renderBubble={(props) => {
                    return <Bubble
                    {...props}
                    wrapperStyle={{
                        right:{
                            backgroundColor:"pink",
                        },
                        left:{
                            backgroundColor:"white",
                        }
                    }}
                    />
                }}
                renderInputToolbar={(props) => {
                    return <InputToolbar {...props} 
                    containerStyle={{borderTopWidth: 1.5, borderTopColor: 'pink'}}
                    textInputStyle={{color:"black"}} 
                    />
                }}
                />
        </View>
    )
}
