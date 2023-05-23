import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useQuery } from "@apollo/client";
import { UsuariosQueries } from "../../queries/gestionDeUsuarios/UsuariosQueries";
import DataTable from "../../components/DataTable";

function definirEstadoUsuario(estadoUsuario: Boolean) {
  if (estadoUsuario == true) {
    return "Usuario Activo";
  } else {
    return "Usuario Inactivo";
  }
}

function definirTipoDocumento(tipoDelDocumento: Boolean) {
  if (tipoDelDocumento == true) {
    return "Documento Nacional";
  } else {
    return "Documento Extranjero";
  }
}

function leerBooleans(respuestaUsuario: String) {
  if (respuestaUsuario == "true") {
    return true;
  } else {
    return false;
  }
}

export function Usuarios() {
  const { data } = useQuery(UsuariosQueries);
  const usuariosData = data?.leerUsuarios || [];

  const columns = [
    { key: 0, field: "estado", headerName: "ESTADO USUARIO" },
    { key: 1, field: "usuarioUn", headerName: "USUARIO UN" },
    { key: 2, field: "documento", headerName: "DOCUMENTO" },
    {
      key: 3,
      field: "tipoDocumento",
      headerName: "DOCUMENTO NACIONAL",
    },
    { key: 4, field: "nombres", headerName: "NOMBRES" },
    { key: 5, field: "apellidos", headerName: "APELLIDOS" },
  ];

  const [rows, setrows] = useState([]);

  const mapper = (data) => {
    let rows = [];
    for (let item of data) {
      rows.push({
        estado: definirEstadoUsuario(item.estado),
        apellidos: item.apellidos,
        documento: item.documento,
        nombres: item.nombres,
        tipoDocumento: definirTipoDocumento(item.tipoDocumento),
        usuarioUn: item.usuarioUn,
      });
    }
    return rows;
  };
  /*
  const rows = usuariosData
    .map((item) => {
      return {
        estado: definirEstadoUsuario(item.estado),
        apellidos: item.apellidos,
        documento: item.documento,
        nombres: item.nombres,
        tipoDocumento: definirTipoDocumento(item.tipoDocumento),
        usuarioUn: item.usuarioUn,
      };
    })
    .map((row, index) => ({ ...row, key: index.toString() }));
    */

  const fetchData = () => {
    if (data) {
      setrows(mapper(data.leerUsuarios));
    }
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.contentContainer}>
        <DataTable rows={rows} columns={columns} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
