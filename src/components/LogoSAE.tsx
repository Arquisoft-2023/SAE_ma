import { Text, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import * as Font from 'expo-font';

const LogoSae = () => {
  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        karmella: require('../assets/fonts/karmella.regular.otf'),
      });
    };

    loadFont();
  }, []);

  return (
    <View>
      <Text style={styles.logo}>SAE</Text>
    </View>
  );
};

export default LogoSae;

const styles = StyleSheet.create({
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    //fontFamily: 'karmella',
  },
});
