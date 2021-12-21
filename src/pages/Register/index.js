import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import Separator from '../../components/Separator';
import { NavigationContainer } from "@react-navigation/native";

import styles from "./styles";

const Register = ({ navigation }) => {

  const [state, setState] = useState({
    userName: '',
    userPhone: '',
    userEmail: '',
    userPassword: '',
  });

  const [userPasswordConfirm, setUserPasswordConfirm] = useState('');

  function saveUserData(userData) {
    return SecureStore.setItemAsync('userData', JSON.stringify(userData));
  }

  function handleRegister() {
    if (!state.userName || !state.userPhone || !state.userEmail || !state.userPassword || !userPasswordConfirm) {
      Alert.alert(
        'Erro ao tentar cadastrar usuário:',
        'Preencha todos os campos corretamente.'
      );
    } else {
      if (state.userPassword !== userPasswordConfirm) {
        Alert.alert(
          'Erro ao tentar cadastrar usuário:',
          'Senha não confere com a confirmação.'
        );
      } else {
        saveUserData({ name: state.userName, phone: state.userPhone, email: state.userEmail, password: state.userPassword });
        navigation.navigate('Login', { email: state.userEmail });
      }
    }
  }

  function handleChangeText(key, value) {
    setState({...state, [key]: value})
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Dados do usuário</Text>
      <TextInput
        style={styles.input}
        value={state.userName}
        onChangeText={(value)=> handleChangeText('userName', value)}
        placeholder="Nome"
      />
      <TextInput
        style={styles.input}
        value={state.userPhone}
        onChangeText={(value)=> handleChangeText('userPhone', value)}
        placeholder="Telefone"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={state.userEmail}
        onChangeText={(value)=> handleChangeText('userEmail', value)}
        placeholder="E-mail"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={state.userPassword}
        onChangeText={(value)=> handleChangeText('userPassword', value)}
        placeholder="Senha"
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        value={userPasswordConfirm}
        onChangeText={(value)=> setUserPasswordConfirm(value)}
        placeholder="Confirmar Senha"
        secureTextEntry={true}
      />

      <TouchableOpacity onPress={handleRegister} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>

      <Separator marginVertical={30}/>

      <Text style={styles.textSimple}>Atenção</Text>
      <Text style={styles.textSimple}>
        Informe um e-mail válido, pois em caso de recuperação de senha, ela será enviada para o e-mail cadastrado.
      </Text>
    </View>
  );
}

export default Register;