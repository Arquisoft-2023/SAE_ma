import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useQuery } from "@apollo/client";
import DataTable from "../../components/DataTable";
import { client } from "../../util/Client";

import { RolesQueries } from "../../queries/gestionDeUsuarios/RolesQueries";


export function Roles() {
  const { data } = useQuery(RolesQueries);
  const rolesData = data?.leerRoles || [];

  const columns = [
    { field: "rolId", headerName: "ID", align: "center" },
    { field: "rol", headerName: "ROL", align: "center" },
  ];

  const rows = rolesData
    .map((item) => {
      return {
        rolId: item.rolId,
        rol: item.rol,
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
