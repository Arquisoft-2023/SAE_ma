import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useQuery } from "@apollo/client";
import DataTable from "../../components/DataTable";
import { UsuariosRolesQueries } from "../../queries/gestionDeUsuarios/UsuariosRolesQueries";

export function UsuariosRoles() {
  const { data } = useQuery(UsuariosRolesQueries);
  const rolesData = data?.leerRoles || [];
  const usuariosRolesData = data?.leerUsuariosRoles || [];

  const columns = [
    { key: 0, field: "rol", headerName: "ROL"},
    { key: 1, field: "usuarioUn", headerName: "USUARIO UN"},
  ];

  const [rows, setrows] = useState([]);

  const mapper = (data) => {
    let rows = [];
    for (let item of data) {
      rows.push({
        id: item.usuarioUn,
        rol: rolesData.find((rol) => rol.rolId === item.rolId)?.rol,
        usuarioUn: item.usuarioUn,
      });
    }
    return rows;
  };

  /*
  const rows = usuariosRolesData
    .map((item) => {
      return {
        rol: rolesData.find((rol) => rol.rolId === item.rolId)?.rol,
        usuarioUn: item.usuarioUn,
      };
    })
*/

  const fetchData = () => {
    if (data) {
      data.leerUsuariosRoles;
      data.leerRoles;
      setrows(mapper(data.leerUsuariosRoles));
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
