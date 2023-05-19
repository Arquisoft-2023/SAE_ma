import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { PrimeraEscuchoApolloRequest } from '../../services/remisiones/PrimeraEscuchaApolloRequest';
import { ApolloProvider, useQuery } from '@apollo/client';
import { PrimeraEscuchaQueries } from '../../queries/remisiones/PrimeraEscuchaQueries';
import { client } from '../../util/Client';

export function SolicitudRemision(){

  const { data } = useQuery(PrimeraEscuchaQueries);
  const primerasEscuchasData = data?.obtenerPrimerasescuchas || [];

  return (
    <ApolloProvider client={client("remisiones/remisiones")}>
      <View style={styles.container}>
        {primerasEscuchasData.map((escucha:any) => (
          <View key={escucha.idPrimeraEscucha}>
            <Text>{escucha.fechaPrimeraEscucha}</Text>
            <Text>{escucha.observacion}</Text>
          </View>
        ))}
        <Text>SOlicitud</Text>
      </View>
    </ApolloProvider>
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