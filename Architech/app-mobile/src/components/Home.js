import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const styles = StyleSheet.create({
        container: {
          backgroundColor :'white', flex:1
        },
        container2: {
            paddingTop: 40,backgroundColor:'rgb(220,220,220)',
            height:"95%",width:"90%",
            marginLeft:"auto", marginRight:"auto",
            borderRadius:15, alignItems: 'center',
        },
    
        logo: {
          width: 210, height: 210,
          marginTop:30,
        },
        title:{
          fontSize:18, color:'white',
        },
        cardTitle:{
            width: 270, height: 100,
            borderRadius:20, backgroundColor: 'rgb(150,150,150)',
            alignItems: 'center', justifyContent:'center'
        },
        cardAuth:{
            marginTop:50,
            width: 270,height: 220,
            borderRadius:30, backgroundColor: 'rgb(150,150,150)',
            alignItems: 'center',justifyContent:'center'
        },
        buttonLogin: {
          alignItems: 'center', justifyContent: 'center',
          height:50, width:200,
          borderRadius: 10, backgroundColor: 'rgb(220,220,220)',
        },
        buttonRegister: {
          marginTop:20, alignItems: 'center',
          justifyContent: 'center', 
          height:50, width: 200,
          borderRadius: 10, backgroundColor: 'rgb(220,220,220)',
        },
        text:{
          fontSize: 16, lineHeight: 21,
          letterSpacing: 0.25,
        }
      });
    
      const navigation = useNavigation();
    
      return (
        <View style={styles.container}>
            <View style={styles.container2}>
            <View style ={styles.cardTitle}>
                <Text style={styles.title}>
                Bienvenue sur ArchiTech !</Text>
            </View>
            <Image
                style={styles.logo}
                source={require('../../assets/Logo_Unique.png')}
            />
            <View style ={styles.cardAuth}>
                <Pressable style={styles.buttonLogin} onPress={() =>
                   navigation.replace('Login')}>
                <Text style={styles.text}>Se Connecter</Text>
                </Pressable>
                <Pressable style={styles.buttonRegister} onPress={() => 
                  navigation.navigate('Register')}>
                <Text style={styles.text}>S'inscrire</Text>
                </Pressable>
            </View>
            </View>
        </View>
      );
}

export default Home;