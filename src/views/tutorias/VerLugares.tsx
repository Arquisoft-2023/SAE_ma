import React, { Component, useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';
import { ConsumoQueries } from '../../queries/tutorias/ConsumoQueries';
import DataTable from '../../components/DataTable';
import { Button } from 'react-native-paper';

export function Lugares(){

  const { data,refetch } = useQuery(ConsumoQueries);
  const lugaresData = data?.obtenerLugares1c || [];

  const columns = [
    {key: 0, field: 'establishmentName', headerName: 'NOMBRE'},
    {key: 1, field: 'description', headerName: 'DESCRIPCION'},
    {key: 2, field: 'location', headerName: 'DIRECCION'},
    {key: 3, field: 'opening', headerName: 'APERTURA'},
    {key: 4, field: 'closing', headerName: 'CIERRE'},
    {key: 5, field: 'capacity', headerName: 'CAPACIDAD'}
  ];

  const rows = lugaresData.map((item) => {

    return {
      id: item.id,
      establishmentName: item.establishmentName,
      description: item.description,
      location: item.location,
      opening: item.opening,
      closing: item.closing,
      capacity: item.capacity
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