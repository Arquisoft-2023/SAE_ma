import React, { useContext, useState } from "react";
import userStore from "../../storage/asyncstorage";
import { ApolloClient, InMemoryCache, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StyleSheet, View } from "react-native";
import { useStore } from "zustand";
import { UsuariosRolesQueries } from "../../queries/gestionDeUsuarios/UsuariosRolesQueries";
import { SigninQueries } from "../../queries/signin/SigninQueries";

import {
  ActivityIndicator,
  Button,
  Card,
  Text,
  TextInput
} from "react-native-paper";

export default function Signin() {
  const [loadingCircle, setLoadingCircle] = useState(false);
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [signinMutation, { data, loading, error }] = useMutation(SigninQueries);
  const { setUser, usuarioUn, usuarioRol } = useStore(userStore);
  const navigation = useNavigation();

  const clientGestion = new ApolloClient({
    uri: "http://35.247.192.77:5000/gestionUsuarios/usuarios",
    cache: new InMemoryCache()
  });

  const handleChange = (event) => {
    console.log(event.taget.value);
  };

  const handleOnTouch = () => {
    setLoadingCircle(true);
    console.log("Global state before: ", usuarioUn, usuarioRol);
    try {
      signinMutation({
        variables: {
          usuarioUnSearch: input,
          usuarioPassword: password,
          usuarioTokenType: "movil"
        }
      })
        .then(({ data }) => {
          setLoadingCircle(false);
          console.log(data.signin);
          clientGestion
            .query({
              query: UsuariosRolesQueries
            })
            .then((result) => {
              if (result.data) {
                try {
                  const leerRolesData = result.data.leerRoles;
                  const leerUsuariosRolesData = result.data.leerUsuariosRoles;
                  const usuarioUn = data.signin.usuarioUn;
                  const usuario = leerUsuariosRolesData.find(
                    (usuario) => usuario.usuarioUn === usuarioUn
                  );
                  const rol = leerRolesData.find(
                    (rol) => rol.rolId === usuario.rolId
                  );

                  if (usuario && rol) {
                    setUser(usuario.usuarioUn, rol.rol);
                    console.log("Global state after: ", usuarioUn, usuarioRol);
                    setLoadingCircle(false);
                    navigation.navigate("Home");
                  } else {
                    alert("Signin Failed");
                  }
                } catch (error) {
                  alert("Signin Failed");
                }
              }
            });
        })
        .catch((error) => {
          setLoadingCircle(false);
          alert("Signin Failed");
        });
    } catch (error) {
      alert("Signin Failed");
    }
  };

  const [fontLoaded] = useFonts({
    Karmella: require("../../assets/fonts/Karmella-Regular.ttf")
  });

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text variant="titleLarge" style={styles.title}>
          SAE
        </Text>
        <Card.Content style={styles.content}>
          <TextInput
            label="Usuario UN"
            onChangeText={(inputUser) => setInput(inputUser)}
            mode="outlined"
            underlineColor="black"
            activeUnderlineColor="black"
            activeOutlineColor="black"
            textColor="black"
          />
          <TextInput
            label="Contraseña"
            onChangeText={(inputPassword) => setPassword(inputPassword)}
            mode="outlined"
            underlineColor="black"
            activeUnderlineColor="black"
            activeOutlineColor="black"
            textColor="black"
          />
        </Card.Content>
        <Card.Actions style={styles.actions}>
          {loadingCircle ? (
            <ActivityIndicator animating={true} color={"black"} />
          ) : (
            <Button
              buttonColor="black"
              textColor="white"
              onPress={handleOnTouch}
              disabled={input ? false : true}
            >
              Entrar
            </Button>
          )}
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Karmella",
    padding: 10
  },
  card: {
    backgroundColor: "#fff",
    width: 300,
    height: 250,
    alignItems: "center",
    justifyContent: "center"
  },
  content: {
    width: 300
  },
  actions: {
    marginTop: 8,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
});
