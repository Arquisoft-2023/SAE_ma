import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

const DataTable = ({ rows, columns }) => {
  // Transformar objetos en arrays para las filas y columnas
  const transformedColumns = columns.map((column) => column.headerName);
  const transformedRows = rows.map((row) => Object.values(row));

  return (
    <View style={styles.container}>
      <Table>
        <Row
          data={transformedColumns}
          style={styles.tableHeader}
          textStyle={styles.columnHeader}
          keyExtractor={(item, index) => index.toString()}
        />
        <Rows
          data={transformedRows}
          style={styles.tableRow} // Agrega esta línea para asignar el estilo de las celdas
          keyExtractor={(item, index) => index.toString()}
        />
      </Table>
    </View>
  );
};

export default DataTable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 5,
    gap: 15
  },
  columnHeader: {
    color: 'white',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
  },
});
