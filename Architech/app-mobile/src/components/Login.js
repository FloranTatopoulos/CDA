import React from "react";
import { useState, useRef } from 'react';
import { View, TextInput, Pressable, StyleSheet, Text, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthService from "../axios/auth.axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleLogin = async () => {

    if (!username || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      setLoading(false);
      return;
    }
    try{
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('password', password);
      AuthService.login(username, password)
      .then(() => {
        setUsername("");
        setPassword("");
        navigation.replace("Welcome");        
      })
    .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          console(error)
        Alert.alert("Erreur", resMessage);
      });
    } catch (error) {
      Alert.alert("Erreur", "Une erreur s'est produite lors du stockage des donnÃ©es.");
    }
  };


  return (
    <View style={styles.container} >
        <Image
            style={styles.logo}
            source={require('../../assets/Logo_Unique.png')}
        />
      <View style ={styles.cardAuth}>
        <TextInput
          style={styles.input}
          placeholder="Nom d'utilisateur"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      <Pressable style={styles.buttonLogin} onPress={handleLogin}>
      <Text>Se Connecter</Text></Pressable>
      {message === 404 ?
       <Text> Utilisateur introuvable</Text>
        : message === 401 ? 
        <Text> Utilisateur ou mot de passe incorrect</Text> : null }
      </View> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop:50,
    backgroundColor:'white',
  },
  logo :{
    width:210,
    height:210,    
  },
  input: {
    height: 50,
    backgroundColor:'white',
    borderRadius:10,
    width:"80%",
    marginTop:10,
    marginBottom:10,
    fontSize:15,
    textAlign: 'center',
  },
  cardAuth:{
    marginTop:20,
    width: 270,
    height: 300,
    borderRadius:30,
    backgroundColor: 'rgb(200,200,200)',
    alignItems: 'center',
    justifyContent:'center'
},
  buttonLogin: {
    marginTop:50,
    alignItems: 'center',
    justifyContent: 'center',
    height:50,
    width:150,
    borderRadius: 10,
    backgroundColor: 'rgb(240,240,240)',
  },
});

export default Login;