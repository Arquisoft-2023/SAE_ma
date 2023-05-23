import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useQuery } from '@apollo/client'
import dayjs, { Dayjs } from 'dayjs'
import React, {useState, useEffect} from 'react'

import DataTable from '../../components/DataTable'
import { acompanyamientoQuery } from '../../queries/tutorias/TutoriasQueries'
import { acompanyamiento, rol } from '../../types/tutorial/Acompanyamiento.interface' 
import { Button } from 'react-native-paper'

interface myState {
  user: {
      userEmail: string
      userRol: rol
  }
}

export function VerTutoria1({param1,param2}){

 // const { param1, param2 } = route.params;
  const onGetUser = { userEmail: param1 , userRol:  rol[param2.charAt(0).toUpperCase() + param2.slice(1)]};
  const [user, setUser] = useState<myState["user"]>(onGetUser);

  if(onGetUser.userRol !== rol.Bienestar) return (<Text>Acceso no valido...</Text>)  

  const { data,refetch } = useQuery(acompanyamientoQuery.obtenerAcompanyamiento);
  const [rows, setrows] = useState([])

  const columns = [
    {key: 0, field: 'usuarioUnTutor', headerName: 'Tutor'},
    {key: 1, field: 'usuarioUnEstudiante', headerName: 'Estudiante'},
    {key: 2, field: 'estado', headerName: 'Estado'},
    {key: 3, field: 'fecha', headerName: 'Fecha'},
    {key: 4, field: 'lugar', headerName: 'Lugar'},
    {key: 5, field: 'objetivo', headerName: 'Objetivo'},
    {key: 6, field: 'acuerdo', headerName: 'Acuerdo'},
    {key: 7, field: 'observacionesTutor', headerName: 'Observaciones Tutor'},
    {key: 8, field: 'observacionesEstudiante', headerName: 'Observaciones Estudiante'},
];  

  // Mapear datos
  const mapper = (data: acompanyamiento[]) => {
    let rows = []
    let cnt = 1
    for(let item of data){
        for(let tutoria of item.listaTutoria){
            rows.push({
                id: tutoria.Id,
                usuarioUnTutor: item.usuarioUnTutor,
                usuarioUnEstudiante: item.usuarioUnEstudiante,
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
    if(data){
        setrows(mapper(data.obtenerAcompanyamiento))
    }
}

useEffect(() => {
  fetchData();
},[data]);

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