import React, { useEffect } from "react";
import userStore from "../storage/asyncstorage";
import { useFonts } from "expo-font";
import { StyleSheet, Text, View } from "react-native";
import { useStore } from "zustand";

const LogoSae = () => {
  const { clearUser, usuarioUn, usuarioRol } = useStore(userStore);
  const [fontLoaded] = useFonts({
    Karmella: require("../assets/fonts/Karmella-Regular.ttf")
  });
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
    textAlign: "center",
    fontFamily: "Karmella"
  },
  rolUsuario: {
    fontSize: 8,
    marginBottom: 40,
    textAlign: "center",
    fontStyle: "italic"
  }
});
