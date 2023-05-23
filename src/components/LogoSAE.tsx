import * as Font from "expo-font";
import React, { useEffect } from "react";
import userStore from "../storage/asyncstorage";
import { StyleSheet, Text, View } from "react-native";
import { useStore } from "zustand";

const LogoSae = () => {
  const { clearUser, usuarioUn, usuarioRol } = useStore(userStore);
  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        karmella: require("../assets/fonts/karmella.regular.otf")
      });
    };

    loadFont();
  }, []);

  return (
    <View>
      <Text style={styles.logo}>SAE</Text>
      <Text style={styles.rolUsuario}>
        {!usuarioRol ? "Undefined" : usuarioRol}
      </Text>
    </View>
  );
};

export default LogoSae;

const styles = StyleSheet.create({
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center"
    //fontFamily: 'karmella',
  },
  rolUsuario: {
    fontSize: 8,
    marginBottom: 40,
    textAlign: "center",
    fontStyle: "italic"
  }
});
