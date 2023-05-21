import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';
import DataTable from '../../components/DataTable';
import { SolicitudRemisionQueries } from '../../queries/remisiones/SolicitudRemisionQueries';

export function SolicitudRemision(){

  const { data } = useQuery(SolicitudRemisionQueries);
  const solicitudesRemisionData = data?.obtenerSolicitudesremision || [];

  const columns = [
    {field: 'idSolicitudRemision', headerName: 'ID', align: "center"},
    {field: 'fechaSolicitudRemision', headerName: 'FECHA DE SOLICITUD', align: "center"},
    {field: 'tipoRemision', headerName: 'TIPO DE REMISIÓN', align: "center"},
    {field: 'usuarioUnDocente', headerName: 'DOCENTE', align: "center"},
    {field: 'usuarioUnEstudiante', headerName: 'ESTUDIANTE', align: "center"},
    {field: 'programaCurricular', headerName: 'PROGRAMA', align: "center"},
    {field: 'justificacion', headerName: 'JUSTIFICACIÓN', align: "center"},
    {field: 'estado', headerName: 'ESTADO', align: "center"},
  ];

  const rows = solicitudesRemisionData.map((item) => ({
    idSolicitudRemision: item.idSolicitudRemision, 
    fechaSolicitudRemision: item.fechaSolicitudRemision,
    tipoRemision: item.tipoRemision,
    usuarioUnDocente: item.usuarioUnDocente,
    usuarioUnEstudiante: item.usuarioUnEstudiante,
    programaCurricular: item.programaCurricular,
    justificacion: item.justificacion,
    estado: item.estado ? 'Remitido' : 'Pendiente',
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