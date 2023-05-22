import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { PrimeraEscuchaQueries } from '../../queries/remisiones/PrimeraEscuchaQueries';
import { RemisionQueries } from '../../queries/remisiones/RemisionQueries';
import { ScrollView } from 'react-native-gesture-handler';
import DataTable from '../../components/DataTable';

export function Remision(){

  const { data } = useQuery(RemisionQueries);
  const remisionesData = data?.obtenerRemisiones || [];

  const columns = [
    {field: 'idRemision', headerName: 'ID', ancho: 30},
    {field: 'fechaEnvioRemision', headerName: 'FECHA DE REMISIÓN', ancho: 100},
    {field: 'tipoRemision', headerName: 'TIPO DE REMISIÓN', ancho: 100},
    {field: 'usuarioUnDocente', headerName: 'DOCENTE', ancho: 100},
    {field: 'usuarioUnEstudiante', headerName: 'ESTUDIANTE', ancho: 100},
    {field: 'programaCurricular', headerName: 'PROGRAMA', ancho: 100},
    {field: 'justificacionSolicitud', headerName: 'JUSTIFICACIÓN', ancho: 100},
    {field: 'primeraEscuchaRealizada', headerName: 'PRIMERA ESCUCHA', ancho: 100},
    {field: 'observacionPrimeraEscucha', headerName: 'OBSERVACIÓN', ancho: 100},
    {field: 'remisionEfectiva', headerName: 'ESTADO', ancho: 100},
  ];

  const rows = remisionesData.map((item) => ({
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
}))

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