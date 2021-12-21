import React, {useState, useEffect} from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import styles from "./styles";

import Separator from '../../components/Separator';

const Login = ({navigation}) => {

  const [registeredState, setRegisteredState] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [haveAcount, setHaveAcount] = useState(false);

  async function getUserData() {
    let userData = await SecureStore.getItemAsync('userData');

    if(userData) {
      setEmail(JSON.parse(userData).email);
      setRegisteredState({...JSON.parse(userData)});
      setHaveAcount(true);
    } else {
      setHaveAcount(false);
    }
  }

  useEffect(()=>{

    getUserData();

    const unsubscribe = navigation.addListener('focus', ()=>{
      getUserData();
    });

    return () => {
      unsubscribe;
    };

  }, [navigation])

  function handleLogin() {
    if (email.length !== 0 && password.length !== 0) {
      if (email === registeredState.email && password === registeredState.password) {
        setPassword('');
        navigation.replace('Home', { name: registeredState.name });
      } else {
        Alert.alert(
          'Erro ao tentar efetuar o login:',
          'Informe o e-mail e a senha corretos'
        );
      }
    } else {
      Alert.alert(
        'Erro ao tentar efetuar o login:',
        'Preencha todos os campos!'
      );
    }
  }

  function handleRegister() {
    setEmail('');
    setPassword('');
    navigation.navigate('Register');
  }

  async function handleDeleteRegister() {
    await SecureStore.deleteItemAsync('userData');
  }

  return(
    <View style={styles.container}>
      <Text style={styles.titleText}>Secure Store App</Text>
      <TextInput
        style={styles.input}
        defaultValue={email}
        value={email}
        onChangeText={(value)=> setEmail(value)}
        placeholder="e-mail"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(value)=> setPassword(value)}
        placeholder="Senha"
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>

      <Separator marginVertical={10}/>

      {
        (!haveAcount) ? (
          <>
            <Text style={styles.textSimple}>
              É a primeira vez e ainda não se cadastrou?
            </Text>
            <TouchableOpacity onPress={handleRegister} style={styles.button}>
              <Text style={styles.buttonText}>Cadastre-se</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.textSimple}>
              Já possuo uma conta, porém ...
            </Text>
            <TouchableOpacity onPress={
              () => Alert.alert('Informação:', `A sua senha foi enviada para seu email de cadastro: ${registeredState.email} ${registeredState.password}`)
              
            } style={styles.button}>
              <Text style={styles.buttonText}>Esqueci minha senha</Text>
            </TouchableOpacity>
          </>
        )
      }

      <Separator marginVertical={30}/>
      <Text style={styles.textSimpleJustify}>
        Este aplicativo faz uso de armazenamento local com SecureStore e fará também com AsyncStorage.
      </Text>

      <TouchableOpacity onPress={handleDeleteRegister} style={styles.button}>
        <Text style={styles.buttonText}>Deletar Chave</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login;