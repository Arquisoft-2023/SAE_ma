import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useQuery } from "@apollo/client";
import DataTable from "../../components/DataTable";
import { client } from "../../util/Client";

import { UsuariosRolesQueries } from "../../queries/gestionDeUsuarios/UsuariosRolesQueries";


export function UsuariosRoles() {
  const { data } = useQuery(UsuariosRolesQueries);
  const rolesData = data?.leerRoles || [];
  const usuariosRolesData = data?.leerUsuariosRoles || [];

  const columns = [
    { field: "rol", headerName: "ROL", align: "center" },
    { field: "usuarioUn", headerName: "USUARIO UN", align: "center" },
  ];

  const rows = usuariosRolesData
    .map((item) => {
      return {
        rol: rolesData.find((rol) => rol.rolId === item.rolId)?.rol,
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
