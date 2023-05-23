import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useLazyQuery } from '@apollo/client'
import dayjs, { Dayjs } from 'dayjs'
import React, {useState, useEffect} from 'react'

import DataTable from '../../components/DataTable'
import { tutorialQuery } from '../../queries/tutorias/TutoriasQueries'
import { acompanyamiento, rol } from '../../types/tutorial/Acompanyamiento.interface' 

interface myState {
  user: {
      userEmail: string
      userRol: rol
  }
}

export function VerTutoria2({param1,param2}){
  
  //const { param1, param2 } = route.params;
  const onGetUser = { userEmail: param1 , userRol:  rol[param2.charAt(0).toUpperCase() + param2.slice(1)]};
  const [user, setUser] = useState<myState["user"]>(onGetUser);

  if(onGetUser.userRol === rol.Bienestar) return (<Text>Acceso no valido...</Text>)  

  const [getUser, data] = useLazyQuery((user.userRol === rol.Docente? tutorialQuery.obtenerAcompanyamientoTutor : tutorialQuery.obtenerAcompanyamientoEstudiante));
  const [rows, setrows] = useState([])

  const columns = [
    {key: 0, field: 'correo', headerName: 'Correo', align: "center"},
    {key: 1, field: 'estado', headerName: 'Estado', align: "center"},
    {key: 2, field: 'fecha', headerName: 'Fecha', align: "center"},
    {key: 3, field: 'lugar', headerName: 'Lugar', align: "center"},
    {key: 4, field: 'objetivo', headerName: 'Objetivo', align: "center"},
    {key: 5, field: 'acuerdo', headerName: 'Acuerdo', align: "center"},
    {key: 6, field: 'observacionesTutor', headerName: 'Observaciones Tutor', align: "center"},
    {key: 7, field: 'observacionesEstudiante', headerName: 'Observaciones Estudiante', align: "center"},
    // {key: 7, field: 'Id', headerName: 'Id', align: "center", hidden: true},
  ];

  // Mapear datos
  const mapper = (data: acompanyamiento[]) => {
    let rows = []
    let cnt = 1
    for(let item of data){
        for(let tutoria of item.listaTutoria){
            rows.push({
                // key: tutoria.Id,
                correo: item.usuarioUnEstudiante || item.usuarioUnTutor,
                estado: tutoria.estado,
                fecha: dayjs(tutoria.fecha).format('MM-DD-YYYY'),
                lugar: tutoria.lugar,
                objetivo: tutoria.objetivo,
                acuerdo: tutoria.acuerdo,
                observacionesTutor: tutoria.observacionesTutor,
                observacionesEstudiante: tutoria.observacionesEstudiante,
            })
            cnt++; 
        }
    }
    return rows
}

const fetchData = () => {
  try{
      getUser({variables: (user.userRol === rol.Docente? {usuarioUnTutor: user.userEmail} :{usuarioUnEstudiante: user.userEmail})})
      if(data.data){
        setrows(mapper(user.userRol === rol.Docente? data.data.obtenerAcompanyamientoTutor :data.data.obtenerAcompanyamientoEstudiante))
      }
  } catch(error){
    console.log(error)
  }
}

useEffect(() => {
  fetchData();
},[data.data]);

console.log(rows)
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