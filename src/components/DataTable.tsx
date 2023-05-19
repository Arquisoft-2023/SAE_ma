import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';

const DataTable = ({ rows, columns }) => {

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      {columns.map((column) => (
        <Text style={styles.tableCell} key={column.field}>
          {item[column.field]}
        </Text>
      ))}
    </View>
  );

  return (
    <View>
      <View style={styles.tableHeader}>
        {columns.map((column) => (
          <Text style={styles.columnHeader} key={column.field}>
            {column.headerName}
          </Text>
        ))}
      </View>
      <FlatList
        data={rows}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default DataTable;

const styles = StyleSheet.create({
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 5,
    gap: 15
  },
  columnHeader: {
    flex: 1,
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
