import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';
import { PrimeraEscuchaQueries } from '../../queries/remisiones/PrimeraEscuchaQueries';
import DataTable from '../../components/DataTable';

export function PrimeraEscucha(){

  const { data } = useQuery(PrimeraEscuchaQueries);
  const primerasEscuchasData = data?.obtenerPrimerasescuchas || [];
  const remisiones = data?.obtenerRemisiones || [];

  const columns = [
    {field: 'idPrimeraEscucha', headerName: 'ID', ancho: 40},
    {field: 'fechaPrimeraEscucha', headerName: 'FECHA PRIMERA ESCUCHA', ancho: 100},
    {field: 'usuarioUnEstudiante', headerName: 'ESTUDIANTE', ancho: 40},
    {field: 'observacion', headerName: 'OBSERVACIÓN', ancho: 150},
    {field: 'realizada', headerName: 'ESTADO', ancho: 40}
  ];

  const rows = primerasEscuchasData.map((item) => {

    const matchingItem = remisiones.find((character) => character.idPrimeraEscucha === item.idPrimeraEscucha);
    const usuarioUnEstudiante = matchingItem ? matchingItem.usuarioUnEstudiante : '';

    return {
      idPrimeraEscucha: item.idPrimeraEscucha, 
      fechaPrimeraEscucha: item.fechaPrimeraEscucha,
      usuarioUnEstudiante: usuarioUnEstudiante,
      observacion: item.observacion,
      realizada: item.realizada ? 'Realizada' : 'Pendiente'
    }

  })

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.contentContainer}>
        <DataTable rows={rows} columns={columns}/>
      </ScrollView>
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
    contentContainer: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
});