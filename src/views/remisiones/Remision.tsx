import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { PrimeraEscuchaQueries } from '../../queries/remisiones/PrimeraEscuchaQueries';

export function Remision(){

  const { data } = useQuery(PrimeraEscuchaQueries);
  const primerasEscuchasData = data?.obtenerPrimerasescuchas || [];



  return (
    <View style={styles.container}>
      {primerasEscuchasData.map((escucha:any) => (
        <View key={escucha.idPrimeraEscucha}>
          <Text>{escucha.fechaPrimeraEscucha}</Text>
          <Text>{escucha.observacion}</Text>
        </View>
      ))}
      <Text>Remision</Text>
    </View>
  );
}

const styles = StyleSheet.create({  
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});