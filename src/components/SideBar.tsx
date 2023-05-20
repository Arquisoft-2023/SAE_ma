import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
import { PrimeraEscucha } from '../views/remisiones/PrimeraEscucha';
import { SolicitudRemision } from '../views/remisiones/SolicitudRemision';
import { Remision } from '../views/remisiones/Remision';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MenuButtonItem from './MenuButtonItem';
import LogoSae from './LogoSAE';
import { Prueba1 } from '../views/gestionUsuarios/prueba1';
import { Prueba2 } from '../views/gestionUsuarios/prueba2';
import { Prueba3 } from '../views/gestionUsuarios/prueba3';
import { VerTutoria1 } from '../views/tutorias/VerTutoria1';
import { VerTutoria2 } from '../views/tutorias/VerTutoria2';
import { VerObservaciones } from '../views/tutorias/VerObservaciones';

const Drawer = createDrawerNavigator();

const pruebaArrayRemisiones = [
  {
    label2: "Solicitudes de Remision",
    textl: "Solicitudes de Remision",
    component: SolicitudRemision,
  },
  {
    label2: "Primeras Escuchas",
    textl: "Primeras Escuchas",
    component: PrimeraEscucha,
  },
  {
    label2: "Remisiones",
    textl: "Remisiones",
    component: Remision,
  },
];

// TUTORIAS
const user = {email: "javergara", rol: "docente"}
const ArrayTutorias2 = [
  {
    label2: "Ver Tutorias",
    textl: "Ver Tutorias",
    component: VerTutoria2,
  },
  {
      label2: "Ver Observaciones",
      textl: "Ver Observaciones",
      component: VerObservaciones,
  }
];

const ArrayTutorias1 = [
  {
    label2: "Ver Tutorias",
    textl: "Ver Tutorias",
    component: VerTutoria1,
  }
];
//

const pruebaArrayGestion = [
  {
    label2: "p1",
    textl: "p1",
    component: Prueba1,
  },
  {
    label2: "p2",
    textl: "p2",
    component: Prueba2,
  },
  {
    label2: "p3",
    textl: "p3",
    component: Prueba3,
  },
  {
    label2: "p8",
    textl: "p8",
    component: Prueba3,
  },
];

const SideBar = () => {
  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator
        drawerContent={( props ) => <MenuItems { ...props } /> }
        >

          {pruebaArrayRemisiones.map(({ label2, textl, component }) => (
            <Drawer.Screen 
            key={label2} 
            name={textl} 
            component={component} />
          ))}

          {(user.rol == "bienestar"? ArrayTutorias1: ArrayTutorias2).map(({ label2, textl, component }) => (
            <Drawer.Screen 
            key={label2} 
            name={textl} 
            component={component} 
            initialParams={{ param1: user.email, param2: user.rol }}
            />
          ))}

          {pruebaArrayGestion.map(({ label2, textl, component }) => (
            <Drawer.Screen 
            key={label2} 
            name={textl} 
            component={component} />
          ))}

        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
};

export default SideBar;

const MenuItems = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <DrawerContentScrollView>
        <LogoSae />

        <Text style={styles.subtitles}>Remisiones</Text>
        {pruebaArrayRemisiones.map(({ label2, textl }) => (
          <MenuButtonItem
            key={label2}
            text={textl}
            onPress={() => navigation.navigate(textl)}
          />
        ))}

        <Text style={styles.subtitles}>Tutorias</Text>
        {(user.rol == "bienestar" ? ArrayTutorias1: ArrayTutorias2).map(({ label2, textl }) => (
          <MenuButtonItem
            key={label2}
            text={textl}
            onPress={() => navigation.navigate(textl)}
          />
        ))}

        <Text style={styles.subtitles}>Gestion de Usuarios</Text>
        {pruebaArrayGestion.map(({ label2, textl }) => (
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
