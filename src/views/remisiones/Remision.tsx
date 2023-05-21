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
    {field: 'idRemision', headerName: 'ID', align: "center"},
    {field: 'fechaEnvioRemision', headerName: 'FECHA DE REMISIÓN', align: "center"},
    {field: 'tipoRemision', headerName: 'TIPO DE REMISIÓN', align: "center"},
    {field: 'usuarioUnDocente', headerName: 'DOCENTE', align: "center"},
    {field: 'usuarioUnEstudiante', headerName: 'ESTUDIANTE', align: "center"},
    {field: 'programaCurricular', headerName: 'PROGRAMA', align: "center"},
    {field: 'justificacionSolicitud', headerName: 'JUSTIFICACIÓN', align: "center"},
    {field: 'primeraEscuchaRealizada', headerName: 'PRIMERA ESCUCHA', align: "center"},
    {field: 'observacionPrimeraEscucha', headerName: 'OBSERVACIÓN', align: "center"},
    {field: 'remisionEfectiva', headerName: 'ESTADO', align: "center"},
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