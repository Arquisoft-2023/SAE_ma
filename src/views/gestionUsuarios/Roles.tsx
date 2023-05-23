import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useQuery } from "@apollo/client";
import DataTable from "../../components/DataTable";
import { client } from "../../util/Client";
import { RolesQueries } from "../../queries/gestionDeUsuarios/RolesQueries";

export function Roles() {
  const { data } = useQuery(RolesQueries);
  const rolesData = data?.leerRoles || [];


  const columns = [
    { key: 0, field: "rolId", headerName: "ID"},
    { key: 1, field: "rol", headerName: "ROL"},
  ];

  const [rows, setrows] = useState([]);

  const mapper = (data) => {
    let rows = [];
    for (let item of data) {
      rows.push({
        id: item.rolId,
        rolId: item.rolId,
        rol: item.rol,
      });
    }
    return rows;
  };

  /*
  const rows = rolesData
    .map((item) => {
      return {
        rolId: item.rolId,
        rol: item.rol,
      };
    })
  */

  const fetchData = () => {
    if (data) {
      setrows(mapper(data.leerRoles ));
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
