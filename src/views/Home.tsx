import React from "react";
import { ApolloProvider } from "@apollo/client";
import { Text, View } from "react-native";
import { client } from "../util/Client";
import { Prueba1 } from "./gestionUsuarios/prueba1";

const Home = () => {
  return (
    // <ApolloProvider client={client('gestionUsuarios/usuarios')}>
    //   <Prueba1 />
    // </ApolloProvider>
    <Text>Hola mundo</Text>
  );
};

export default Home;
