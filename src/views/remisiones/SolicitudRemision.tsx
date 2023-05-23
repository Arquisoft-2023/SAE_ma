import React, { Component, useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';
import DataTable from '../../components/DataTable';
import { Button } from 'react-native-paper';
import { SolicitudRemisionQueries } from '../../queries/remisiones/SolicitudRemisionQueries';

export function SolicitudRemision(){

  const { data,refetch } = useQuery(SolicitudRemisionQueries);
  const solicitudesRemisionData = data?.obtenerSolicitudesremision || [];

  const columns = [
    {key: 0, field: 'idSolicitudRemision', headerName: 'ID'},
    {key: 1,field: 'fechaSolicitudRemision', headerName: 'FECHA DE SOLICITUD'},
    {key: 2,field: 'tipoRemision', headerName: 'TIPO DE REMISIÓN'},
    {key: 3,field: 'usuarioUnDocente', headerName: 'DOCENTE'},
    {key: 4,field: 'usuarioUnEstudiante', headerName: 'ESTUDIANTE'},
    {key: 5,field: 'programaCurricular', headerName: 'PROGRAMA'},
    {key: 6,field: 'justificacion', headerName: 'JUSTIFICACIÓN'},
    {key: 7,field: 'estado', headerName: 'ESTADO'},
  ];

  const rows = solicitudesRemisionData.map((item) => {

    return {
      id: item.idSolicitudRemision,
      idSolicitudRemision: item.idSolicitudRemision, 
      fechaSolicitudRemision: item.fechaSolicitudRemision,
      tipoRemision: item.tipoRemision,
      usuarioUnDocente: item.usuarioUnDocente,
      usuarioUnEstudiante: item.usuarioUnEstudiante,
      programaCurricular: item.programaCurricular,
      justificacion: item.justificacion,
      estado: item.estado ? 'Remitido' : 'Pendiente',
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