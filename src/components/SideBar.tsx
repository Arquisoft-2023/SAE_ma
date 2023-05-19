import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../views/Home';
import { PrimeraEscucha } from '../views/remisiones/PrimeraEscucha';
import { SolicitudRemision } from '../views/remisiones/SolicitudRemision';
import { Remision } from '../views/remisiones/Remision';

const Drawer = createDrawerNavigator();

const pruebaArray = [
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

const SideBar = () => {
  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator>
          {pruebaArray.map(({ label2, textl, component }) => (
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
