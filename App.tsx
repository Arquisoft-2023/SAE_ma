import * as ScreenOrientation from "expo-screen-orientation";
import React from "react";
import Signin from "./src/views/signin/Signin";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PaperProvider } from "react-native-paper";
import { Prueba1 } from "./src/views/gestionUsuarios/prueba1";
import { Remision } from "./src/views/remisiones/Remision";
import { DrawerContentScrollView, createDrawerNavigator } from "@react-navigation/drawer";
import { SolicitudRemision } from "./src/views/remisiones/SolicitudRemision";
import { PrimeraEscucha } from "./src/views/remisiones/PrimeraEscucha";
import { ScrollView } from "react-native-gesture-handler";
import LogoSae from "./src/components/LogoSAE";
import MenuButtonItem from "./src/components/MenuButtonItem";
import {StyleSheet, Text} from 'react-native';

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

const client4 = new ApolloClient({
  uri: "http://34.95.254.3:3121/tutorias/acompanyamiento",
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
  <ApolloProvider client={client2}>
    <SolicitudRemision />
  </ApolloProvider>
);

const Screen4 = () => (
  <ApolloProvider client={client2}>
    <PrimeraEscucha />
  </ApolloProvider>
);

const Screen5 = () => (
  <ApolloProvider client={client3}>
    <Prueba1 />
  </ApolloProvider>
);

const Screen6 = () => (
  <ApolloProvider client={client4}>
    <Prueba1 />
  </ApolloProvider>
);



const Drawer = createDrawerNavigator();

const ArrayRemisiones = [
  {
    label2: "Solicitudes de Remision",
    textl: "Solicitudes de Remision",
    component: Screen3,
  },
  {
    label2: "Primeras Escuchas",
    textl: "Primeras Escuchas",
    component: Screen4,
  },
  {
    label2: "Remisiones",
    textl: "Remisiones",
    component: Screen2,
  },
];

const ArrayGestion = [
  {
    label2: "Usuario",
    textl: "Usuario",
    component: Screen5,
  },
];

const ArrayTutorias = [
  {
    label2: "Tutorias",
    textl: "prueba Tutorias",
    component: Screen6,
  },
];


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
        <Drawer.Navigator
        drawerContent={( props ) => <MenuItems { ...props } /> }
        >
          {ArrayRemisiones.map(({ label2, textl, component }) => (
            <Drawer.Screen 
            key={label2} 
            name={textl} 
            component={component} />
          ))}

          {ArrayGestion.map(({ label2, textl, component }) => (
            <Drawer.Screen 
            key={label2} 
            name={textl} 
            component={component} />
          ))}
          
        </Drawer.Navigator>
      </NavigationContainer>
      </PaperProvider>
    </>
  );
}

const MenuItems = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <DrawerContentScrollView>
        <LogoSae />

        <Text style={styles.subtitles}>Remisiones</Text>
        {ArrayRemisiones.map(({ label2, textl }) => (
          <MenuButtonItem
            key={label2}
            text={textl}
            onPress={() => navigation.navigate(textl)}
          />
        ))}

        <Text style={styles.subtitles}>Gestion</Text>
        {ArrayGestion.map(({ label2, textl }) => (
          <MenuButtonItem
            key={label2}
            text={textl}
            onPress={() => navigation.navigate(textl)}
          />
        ))}
      </DrawerContentScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  subtitles: {
    marginTop: 25, 
    marginBottom: 10, 
    fontWeight: 'bold',

  },
})
