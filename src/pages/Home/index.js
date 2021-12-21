import React from "react";
import { View, Text } from 'react-native';

import styles from "./styles";

const Home = ({ navigation, route }) => {
  return(
    <View style={styles.container}>
      <Text>Tela Home {route.params?.email}</Text>
      <Text>Olá {route.params?.name}, seja bem-vindo!</Text>
    </View>
  );
}

export default Home;