import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View , StyleSheet} from 'react-native';
import Home from './src/components/Home';
import Welcome from './src/components/Welcome';
import Login from './src/components/Login';
import Register from './src/components/Register';
import Profile from './src/components/Profile';
import Blog from './src/components/Blog';

const Stack = createStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerMode: 'screen',
          headerTintColor: 'black',
          headerStyle: { backgroundColor: 'white'},
        }}
      >
        <Stack.Screen
          name="Accueil"
          component={Home}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            title: `Bienvenue`,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Connexion',
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            title: `Inscription`,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Mon profil',
          }}
        />
        <Stack.Screen
          name="Blog"
          component={Blog}
          options={{
            title: 'Blog',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
  
}
