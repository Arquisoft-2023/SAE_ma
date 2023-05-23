import React, { Component, useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';
import DataTable from '../../components/DataTable';
import { Button } from 'react-native-paper';
import { RemisionQueries } from '../../queries/remisiones/RemisionQueries';
export function Remision(){

  const { data,refetch } = useQuery(RemisionQueries);
  const remisionData = data?.obtenerRemisiones || [];

  const columns = [
    {key: 0, field: 'idRemision', headerName: 'ID'},
    {key: 1, field: 'fechaEnvioRemision', headerName: 'FECHA DE REMISIÓN'},
    {key: 2, field: 'tipoRemision', headerName: 'TIPO DE REMISIÓN'},
    {key: 3, field: 'usuarioUnDocente', headerName: 'DOCENTE'},
    {key: 4, field: 'usuarioUnEstudiante', headerName: 'ESTUDIANTE'},
    {key: 5, field: 'programaCurricular', headerName: 'PROGRAMA'},
    {key: 6, field: 'justificacionSolicitud', headerName: 'JUSTIFICACIÓN'},
    {key: 7, field: 'primeraEscuchaRealizada', headerName: 'PRIMERA ESCUCHA'},
    {key: 8, field: 'observacionPrimeraEscucha', headerName: 'OBSERVACIÓN'},
    {key: 9, field: 'remisionEfectiva', headerName: 'ESTADO'},
  ];;

  const rows = remisionData.map((item) => {

    return {
      id: item.idRemision,
      idRemision: item.idRemision,
      fechaEnvioRemision: item.fechaEnvioRemision,
      tipoRemision: item.tipoRemision,
      usuarioUnDocente: item.usuarioUnDocente,
      usuarioUnEstudiante: item.usuarioUnEstudiante,
      programaCurricular: item. programaCurricular,
      justificacionSolicitud: item.justificacionSolicitud,
      primeraEscuchaRealizada: item.primeraEscuchaRealizada ? 'Realizada' : 'Pendiente',
      observacionPrimeraEscucha: item.observacionPrimeraEscucha,
      remisionEfectiva: item.remisionEfectiva ? 'Efectiva' : 'No Efectiva',
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