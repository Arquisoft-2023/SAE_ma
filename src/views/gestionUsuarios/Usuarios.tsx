import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useQuery } from "@apollo/client";
import { UsuariosQueries } from "../../queries/gestionDeUsuarios/UsuariosQueries";
import DataTable from "../../components/DataTable";
import { client } from "../../util/Client";

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
    { field: "estado", headerName: "ESTADO USUARIO", align: "center" },
    { field: "usuarioUn", headerName: "USUARIO UN", align: "center" },
    { field: "documento", headerName: "DOCUMENTO", align: "center" },
    {
      field: "tipoDocumento",
      headerName: "DOCUMENTO NACIONAL",
      align: "center",
    },
    { field: "nombres", headerName: "NOMBRES", align: "center" },
    { field: "apellidos", headerName: "APELLIDOS", align: "center" },
  ];

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
