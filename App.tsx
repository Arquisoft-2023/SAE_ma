import * as ScreenOrientation from "expo-screen-orientation";
import Home from "./src/views/Home";
import LogoSae from "./src/components/LogoSAE";
import MenuButtonItem from "./src/components/MenuButtonItem";
import React from "react";
import Signin from "./src/views/signin/Signin";
import ZustandComp from "./src/components/ZustandComp";
import userStore from "./src/storage/asyncstorage";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, PaperProvider } from "react-native-paper";
import { useStore } from "zustand";
import { Roles } from "./src/views/gestionUsuarios/Roles";
import { Usuarios } from "./src/views/gestionUsuarios/Usuarios";
import { UsuariosRoles } from "./src/views/gestionUsuarios/UsuariosRoles";
import { PrimeraEscucha } from "./src/views/remisiones/PrimeraEscucha";
import { Remision } from "./src/views/remisiones/Remision";
import { SolicitudRemision } from "./src/views/remisiones/SolicitudRemision";
import { VerObservaciones } from "./src/views/tutorias/VerObservaciones";
import { VerTutoria1 } from "./src/views/tutorias/VerTutoria1";
import { VerTutoria2 } from "./src/views/tutorias/VerTutoria2";

import {
  DrawerContentScrollView,
  createDrawerNavigator
} from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

export default function Root() {
  const { usuarioUn, usuarioRol } = useStore(userStore);
  const user = { user: usuarioUn, rol: usuarioRol };

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
      <Usuarios />
    </ApolloProvider>
  );

  const Screen6 = () => (
    <ApolloProvider client={client4}>
      <VerObservaciones param1={user.user} param2={user.rol} />
    </ApolloProvider>
  );

  const Screen7 = () => (
    <ApolloProvider client={client4}>
      <VerTutoria1 param1={user.user} param2={user.rol} />
    </ApolloProvider>
  );

  const Screen8 = () => (
    <ApolloProvider client={client4}>
      <VerTutoria2 param1={user.user} param2={user.rol} />
    </ApolloProvider>
  );

  const Screen9 = () => (
    <ApolloProvider client={client3}>
      <Roles />
    </ApolloProvider>
  );

  const Screen10 = () => (
    <ApolloProvider client={client3}>
      <UsuariosRoles />
    </ApolloProvider>
  );

  const ArrayRemisiones = [
    {
      label2: "Solicitudes de Remision",
      textl: "Solicitudes de Remision",
      component: Screen3
    },
    {
      label2: "Primeras Escuchas",
      textl: "Primeras Escuchas",
      component: Screen4
    },
    {
      label2: "Remisiones",
      textl: "Remisiones",
      component: Screen2
    }
  ];

  const ArrayGestion = [
    {
      label2: "Usuarios",
      textl: "Usuarios",
      component: Screen5
    },
    {
      label2: "Roles",
      textl: "Roles",
      component: Screen9
    },
    {
      label2: "Usuarios y Roles",
      textl: "Usuarios y Roles",
      component: Screen10
    }
  ];

  const ArrayTutorias2 = [
    {
      label2: "Ver Tutorias",
      textl: "Ver Tutorias",
      component: Screen8
    },
    {
      label2: "Ver Observaciones",
      textl: "Ver Observaciones",
      component: Screen6
    }
  ];

  const ArrayTutorias1 = [
    {
      label2: "Ver Tutorias",
      textl: "Ver Tutorias",
      component: Screen7
    }
  ];

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
            initialRouteName="Signin"
            drawerContent={(props) => <MenuItems {...props} />}
          >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Signin" component={Screen1} />
            {ArrayRemisiones.map(({ label2, textl, component }) => (
              <Drawer.Screen key={label2} name={textl} component={component} />
            ))}

            {ArrayGestion.map(({ label2, textl, component }) => (
              <Drawer.Screen key={label2} name={textl} component={component} />
            ))}

            {(user.rol == "bienestar" ? ArrayTutorias1 : ArrayTutorias2).map(
              ({ label2, textl, component }) => (
                <Drawer.Screen
                  key={label2}
                  name={textl}
                  component={component}
                />
              )
            )}
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}

const MenuItems = ({ navigation }) => {
  const { clearUser, usuarioUn, usuarioRol } = useStore(userStore);
  const user = { user: usuarioUn, rol: usuarioRol };

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
      <Usuarios />
    </ApolloProvider>
  );

  const Screen6 = () => (
    <ApolloProvider client={client4}>
      <VerObservaciones param1={user.user} param2={user.rol} />
    </ApolloProvider>
  );

  const Screen7 = () => (
    <ApolloProvider client={client4}>
      <VerTutoria1 param1={user.user} param2={user.rol} />
    </ApolloProvider>
  );

  const Screen8 = () => (
    <ApolloProvider client={client4}>
      <VerTutoria2 param1={user.user} param2={user.rol} />
    </ApolloProvider>
  );

  const Screen9 = () => (
    <ApolloProvider client={client3}>
      <Roles />
    </ApolloProvider>
  );

  const Screen10 = () => (
    <ApolloProvider client={client3}>
      <UsuariosRoles />
    </ApolloProvider>
  );

  const ArrayRemisiones = [
    {
      label2: "Solicitudes de Remision",
      textl: "Solicitudes de Remision",
      component: Screen3
    },
    {
      label2: "Primeras Escuchas",
      textl: "Primeras Escuchas",
      component: Screen4
    },
    {
      label2: "Remisiones",
      textl: "Remisiones",
      component: Screen2
    }
  ];

  const ArrayGestion = [
    {
      label2: "Usuarios",
      textl: "Usuarios",
      component: Screen5
    },
    {
      label2: "Roles",
      textl: "Roles",
      component: Screen9
    },
    {
      label2: "Usuarios y Roles",
      textl: "Usuarios y Roles",
      component: Screen10
    }
  ];

  const ArrayTutorias2 = [
    {
      label2: "Ver Tutorias",
      textl: "Ver Tutorias",
      component: Screen8
    },
    {
      label2: "Ver Observaciones",
      textl: "Ver Observaciones",
      component: Screen6
    }
  ];

  const ArrayTutorias1 = [
    {
      label2: "Ver Tutorias",
      textl: "Ver Tutorias",
      component: Screen7
    }
  ];

  const handleLogout = () => {
    clearUser();
    navigation.navigate("Signin");
  };

  return (
    <ScrollView style={styles.container}>
      <DrawerContentScrollView>
        <LogoSae />

        <MenuButtonItem
          text="Home"
          onPress={() => navigation.navigate("Home")}
        />

        <Text style={styles.subtitles}>Remisiones</Text>
        {ArrayRemisiones.map(({ label2, textl }) => (
          <MenuButtonItem
            key={label2}
            text={textl}
            onPress={() => navigation.navigate(textl)}
          />
        ))}

        <Text style={styles.subtitles}>Tutorías</Text>
        {(user.rol == "bienestar" ? ArrayTutorias1 : ArrayTutorias2).map(
          ({ label2, textl }) => (
            <MenuButtonItem
              key={label2}
              text={textl}
              onPress={() => navigation.navigate(textl)}
            />
          )
        )}

        <Text style={styles.subtitles}>Gestión</Text>
        {ArrayGestion.map(({ label2, textl }) => (
          <MenuButtonItem
            key={label2}
            text={textl}
            onPress={() => navigation.navigate(textl)}
          />
        ))}

        <Button
          mode="contained"
          icon="logout"
          style={styles.buttonLogout}
          onPress={handleLogout}
        >
          Salir
        </Button>
      </DrawerContentScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  subtitles: {
    marginTop: 25,
    marginBottom: 10,
    fontWeight: "bold"
  },
  buttonLogout: {
    marginTop: 30,
    marginBottom: 50,
    backgroundColor: "#380303",
    borderRadius: 10
  }
});
