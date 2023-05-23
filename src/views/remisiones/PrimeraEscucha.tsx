import React, { Component, useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';
import { PrimeraEscuchaQueries } from '../../queries/remisiones/PrimeraEscuchaQueries';
import DataTable from '../../components/DataTable';
import { Button } from 'react-native-paper';

export function PrimeraEscucha(){

  const { data,refetch } = useQuery(PrimeraEscuchaQueries);
  const primerasEscuchasData = data?.obtenerPrimerasescuchas || [];
  const remisiones = data?.obtenerRemisiones || [];

  const columns = [
    {key: 0, field: 'idPrimeraEscucha', headerName: 'ID'},
    {key: 1, field: 'fechaPrimeraEscucha', headerName: 'FECHA PRIMERA ESCUCHA'},
    {key: 2, field: 'usuarioUnEstudiante', headerName: 'ESTUDIANTE'},
    {key: 3, field: 'observacion', headerName: 'OBSERVACIÓN'},
    {key: 4, field: 'realizada', headerName: 'ESTADO'}
  ];

  const rows = primerasEscuchasData.map((item) => {

    const matchingItem = remisiones.find((character) => character.idPrimeraEscucha === item.idPrimeraEscucha);
    const usuarioUnEstudiante = matchingItem ? matchingItem.usuarioUnEstudiante : '';

    return {
      id: item.idPrimeraEscucha,
      idPrimeraEscucha: item.idPrimeraEscucha, 
      fechaPrimeraEscucha: item.fechaPrimeraEscucha,
      usuarioUnEstudiante: usuarioUnEstudiante,
      observacion: item.observacion,
      realizada: item.realizada ? 'Realizada' : 'Pendiente'
    }

  })

  return (
    <>
    <View style={{}}>
      <Button
      icon='reload'
      mode='contained'
      style={{
        width: 50,
        backgroundColor: 'black'
      }}
      onPress={()=>{
        refetch()
      }}
      >
      </Button>
    </View>
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.contentContainer}>
        <DataTable rows={rows} columns={columns}/>
      </ScrollView>
    </View>
    </>
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