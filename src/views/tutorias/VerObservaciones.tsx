import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Button } from 'react-native-paper'
import { useLazyQuery } from '@apollo/client'
import dayjs, { Dayjs } from 'dayjs'
import React, {useState, useEffect} from 'react'

import DataTable from '../../components/DataTable'
import { obsQuery } from '../../queries/tutorias/TutoriasQueries'
import { acompanyamiento, rol } from '../../types/tutorial/Acompanyamiento.interface' 

interface myState {
  user: {
      userEmail: string
      userRol: rol
  }
}

export function VerObservaciones({param1,param2}){
  
  //const { param1, param2 } = route.params;
  const onGetUser = { userEmail: param1 , userRol:  rol[param2.charAt(0).toUpperCase() + param2.slice(1)]};
  const [user, setUser] = useState<myState["user"]>(onGetUser);

  if(onGetUser.userRol === rol.Bienestar) return (<Text>Acceso no valido...</Text>)  

  const [getUser, {data, refetch}] = useLazyQuery((user.userRol === rol.Docente? obsQuery.obtenerAcompanyamientoTutor : obsQuery.obtenerAcompanyamientoEstudiante), { fetchPolicy: "cache-and-network" });
  const [rows, setrows] = useState([])

  const columns = [
    {key: 0, field: 'correo', headerName: 'Correo', align: "center"},
    {key: 1, field: 'fecha', headerName: 'Fecha', align: "center"},
    {key: 2, field: 'descripcion', headerName: 'Descripción', align: "center"},
    // {key: 8, field: 'actionsEdit', headerName: 'Acciones', align: "center"},
  ];

  // Mapear datos
  const mapper = (data: acompanyamiento[]) => {
    let rows = []
    let cnt = 1
    for(let item of data){
        for(let observacion of item.listaObservacion){
            rows.push({
                // key: observacion.Id,
                correo: item.usuarioUnEstudiante || item.usuarioUnTutor,
                fecha: dayjs(observacion.fecha).format('MM-DD-YYYY'),
                descripcion: observacion.descripcion,
            })
            cnt++; 
        }
    }
    return rows
  }
  

const fetchData = () => {
  try{
      getUser({variables: (user.userRol === rol.Docente? {usuarioUnTutor: user.userEmail} :{usuarioUnEstudiante: user.userEmail})})
      if(data){
        setrows(mapper(user.userRol === rol.Docente? data.obtenerAcompanyamientoTutor :data.obtenerAcompanyamientoEstudiante))
      }
  } catch(error){
    console.log(error)
  }
}


useEffect(() => {
  fetchData();
},[data?.data]);

  return (
    <View style={styles.container}>
            <Button
        onPress={() => {fetchData()}}
      >
        <Text>Actualizar</Text>
      </Button>

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