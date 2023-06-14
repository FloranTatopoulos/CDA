import React , { useState, useEffect } from "react";
import { View,  StyleSheet, Text } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
    AsyncStorage.getItem('username')
      .then((username) => {
        if (username) {
          setUsername(username);
        }
      })
      .catch((error) => {
        console.log('Erreur lors de la récupération du nom d\'utilisateur :', error);
      });
      AsyncStorage.getItem('email')
      .then((email) => {
        if (email) {
          setEmail(email);
        }
      })
      .catch((error) => {
        console.log('Erreur lors de la récupération du mail :', error);
      });
    }, []);
    
    return (
        <View style={styles.container} >
            <View style ={styles.cardProfile}>
                <Text style={styles.username}>Nom d'utilisateur : {username}</Text>
                <Text style={styles.email}>Adresse email : {email}</Text>    
            </View> 
    </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop:50,
        backgroundColor:'white',
      },
      cardProfile:{
        marginTop:20,
        width: 350,
        height: 500,
        borderRadius:30,
        backgroundColor: 'rgb(200,200,200)',
        alignItems: 'center',
    },
    username:{
        marginTop:30,
        fontSize:30,
    },
    email:{
        marginTop:30,
        fontSize:30,
    }
});

export default Profile;