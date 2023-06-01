import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, Pressable, Text,  Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthService from '../axios/auth.axios';
import isEmail  from 'validator/lib/isEmail';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  
  const navigation = useNavigation();

  const handleRegister = () => {
    if (!username || !email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      setLoading(false);
      return;
    }
    if (username.length < 3 || username.length > 20) {
      Alert.alert(
        "Erreur",
        "Le nom d'utilisateur doit comporter entre 3 et 20 caractères"
      );
      
      setLoading(false);
      return;
    }
    if (!isEmail(email)) {
      Alert.alert("Erreur", "L'e-mail n'est pas valide");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      Alert.alert(
        "Erreur",
        "Le mot de passe doit comporter minimum 6 caractères"
      );
      setLoading(false);
      return;
    }

    AuthService.register(username,email, password)
      .then(() => {
        setUsername("");
        setEmail("");
        setPassword("");
        navigation.replace("Blog");        
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
  
    }
  return (
    <View style={styles.container}>
        <Image
            style={styles.logo}
            source={require('../../assets/Logo_Unique.png')}
        />
      <View style ={styles.cardAuth}>
          <TextInput
            style={styles.input}
            placeholder="Nom complet"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            placeholder="Adresse e-mail"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
      <Pressable style={styles.buttonRegister} onPress={handleRegister}>
      <Text>S'inscrire</Text></Pressable>
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
    height: 350,
    borderRadius:30,
    backgroundColor: 'rgb(200,200,200)',
    alignItems: 'center',
    justifyContent:'center'
},
  buttonRegister: {
    marginTop:50,
    alignItems: 'center',
    justifyContent: 'center',
    height:50,
    width:150,
    borderRadius: 10,
    backgroundColor: 'rgb(240,240,240)',
  },
});

export default Register;