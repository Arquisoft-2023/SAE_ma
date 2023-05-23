import React from 'react';
import { DataTable } from 'react-native-paper';
import {StyleSheet,ScrollView} from 'react-native';

const DataTableComponent = ({ rows, columns }) => {
  return (
    <DataTable>
      <DataTable.Header style={styles.header}>
        {columns.map((column) => (
          <DataTable.Title key={column.key} style={{
            width: column.headerName === 'ID' ? 20 : 200,
            flex: 1,
            justifyContent:'center'
          }} textStyle={styles.titleText}>{column.headerName}</DataTable.Title>
        ))}
      </DataTable.Header>
      <ScrollView>
      {rows.map((row) => (
        <DataTable.Row key={row.id}>
          {columns.map((column) => (
            <DataTable.Cell key={column.key} style={{
              width: column.headerName === 'ID' ? 20 : 200,
              flex: 1,
              justifyContent:'center'
            }} textStyle={{}}>{row[column.field]}</DataTable.Cell>
          ))}
        </DataTable.Row>
      ))}
      </ScrollView>
    </DataTable>
  );
};

export default DataTableComponent;

const styles = StyleSheet.create({  
  header: {
    backgroundColor:'black'
  },
  titleText:{
    fontWeight:'bold',
    color: 'white',
    textAlign:'center'
  }
});
