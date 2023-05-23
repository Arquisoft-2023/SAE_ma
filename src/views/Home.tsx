import React from "react";
import userStore from "./../storage/asyncstorage";
import { StyleSheet, Text, View } from "react-native";
import { Card, Title } from "react-native-paper";
import { useStore } from "zustand";

const Home = () => {
  const { setUser, usuarioUn, usuarioRol } = useStore(userStore);
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>
            Bienvenido(a)! <Text style={styles.userName}>{usuarioUn}</Text> al
            Sistema de Atención Estudiantil SAE
          </Title>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    padding: 16,
    width: 500,
    backgroundColor: "transparent",
    elevation: 0,
    shadowColor: "transparent"
  },
  userName: {
    fontWeight: "bold"
  },
  title: {
    textAlign: "center"
  }
});
export default Home;
