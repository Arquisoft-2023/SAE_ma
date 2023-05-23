import * as ScreenOrientation from "expo-screen-orientation";
import React from "react";
import Signin from "./src/views/signin/Signin";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PaperProvider } from "react-native-paper";
import { client } from "./src/util/Client";
import { Prueba1 } from "./src/views/gestionUsuarios/prueba1";
import { Remision } from "./src/views/remisiones/Remision";

const Stack = createStackNavigator();

const client1 = new ApolloClient({
  uri: "http://34.95.254.3:3121/auth/signin",
  cache: new InMemoryCache()
});

const client2 = new ApolloClient({
  uri: "http://34.95.254.3:3121/remisiones/remisiones",
  cache: new InMemoryCache()
});

const client3 = new ApolloClient({
  uri: "http://34.95.254.3:3121/gestionUsuarios/usuarios",
  cache: new InMemoryCache()
});

const Screen1 = () => (
  <ApolloProvider client={client1}>
    <Signin />
  </ApolloProvider>
);

const Screen2 = () => (
  <ApolloProvider client={client2}>
    <Remision />
  </ApolloProvider>
);

const Screen3 = () => (
  <ApolloProvider client={client3}>
    <Prueba1 />
  </ApolloProvider>
);

export default function Root() {
  React.useEffect(() => {
    async function lockScreenOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    }

    lockScreenOrientation();
  }, []);

  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Screen3" component={Screen3} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}
