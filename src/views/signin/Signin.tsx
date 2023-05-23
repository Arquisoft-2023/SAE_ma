import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { StyleSheet, View } from "react-native";
import { UsuariosRolesQueries } from "../../queries/gestionDeUsuarios/UsuariosRolesQueries";
import { SigninQueries } from "../../queries/signin/SigninQueries";
import { client } from "../../util/Client";

import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  Modal,
  Portal,
  Text,
  TextInput
} from "react-native-paper";

export default function Signin() {
  const [loadingCircle, setLoadingCircle] = useState(false);
  const [input, setInput] = useState("");
  const [signinMutation, { data, loading, error }] = useMutation(SigninQueries);

  const handleChange = (event) => {
    console.log(event.taget.value);
  };

  const handleOnTouch = () => {
    setLoadingCircle(true);
    try {
      signinMutation({
        variables: {
          usuarioUnSearch: input
        }
      })
        .then(({ data }) => {
          setLoadingCircle(false);
          console.log(data.signin);
          //alert("Signin Succesfully!");
        })
        .catch((error) => {
          setLoadingCircle(false);
          alert("Signin Failed");
        });
    } catch (error) {
      alert("Signin Failed");
    }
  };

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
              ENTRAR
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
    fontWeight: "bold",
    fontSize: 30,
    fontFamily: "monospace",
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
