import React from 'react';
import { Button, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FEF3B4' }}>
      <StatusBar style='auto' backgroundColor='#AD6200'/>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Login'
          screenOptions={{
            headerStyle: { backgroundColor: '#E37D00' },
            headerTintColor: '#FFF',
          }}
        >
          <Stack.Screen 
            name='Login'
            component={Login}
            options={{
              title: 'Login',
              headerTitleStyle: { fontWeight: 'bold', textAlign: 'center' }
            }}
          />
          <Stack.Screen 
            name='Register'
            component={Register}
            options={{ title: 'Cadastre-se' }}
          />
          <Stack.Screen 
            name='Home'
            component={Home}
            options={({ navigation }) => ({
              title: 'Home',
              headerRight: () => (
                <Button
                  onPress={()=> {
                    Alert.alert(
                      'Atenção!',
                      'Deseja sair do aplicativo?',
                      [
                        {
                          text: 'Sim',
                          onPress: ()=> navigation.replace('Login')
                        },
                        {
                          text: 'Não',
                          onPress: ()=> console.log('Cancel Pressed'),
                          style: 'cancel'
                        }
                      ],
                      { cancelable: false }
                    );
                  }}
                  title='Sair'
                  style={{ padding: 80 }}
                  color='#D26900'
                />
              ),
              headerTitleStyle: { fontWeight: 'bold', textAlign: 'center' }
            })}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default Navigator;