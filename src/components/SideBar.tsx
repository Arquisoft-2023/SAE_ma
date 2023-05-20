import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
import { PrimeraEscucha } from '../views/remisiones/PrimeraEscucha';
import { SolicitudRemision } from '../views/remisiones/SolicitudRemision';
import { Remision } from '../views/remisiones/Remision';
import { Text, StyleSheet, ScrollView } from 'react-native';
import MenuButtonItem from './MenuButtonItem';
import LogoSae from './LogoSAE';
import { Prueba1 } from '../views/gestionUsuarios/prueba1';
import { Prueba6 } from '../views/tutorias/prueba6';
import { Prueba5 } from '../views/tutorias/prubea5';
import { Prueba4 } from '../views/tutorias/prueba4';

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

const pruebaArrayTutorias = [
  {
    label2: "p4",
    textl: "p4",
    component: Prueba4,
  },
  {
    label2: "p5",
    textl: "p5",
    component: Prueba5,
  },
  {
    label2: "p6",
    textl: "p6",
    component: Prueba6,
  },
  {
    label2: "p9",
    textl: "p9",
    component: Prueba6,
  },
];

const pruebaArrayGestion = [
  {
    label2: "p1",
    textl: "p1",
    component: Prueba1,
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

          {pruebaArrayTutorias.map(({ label2, textl, component }) => (
            <Drawer.Screen 
            key={label2} 
            name={textl} 
            component={component} />
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
        {pruebaArrayTutorias.map(({ label2, textl }) => (
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
