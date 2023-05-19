import { View, Text } from 'react-native'
import React from 'react'
import { ApolloProvider} from '@apollo/client';
import { client } from '../util/Client';
import { PrimeraEscucha } from './remisiones/PrimeraEscucha';

const Home = () => {
  return (
    <ApolloProvider client={client('remisiones/remisiones')}>
      <PrimeraEscucha />
    </ApolloProvider>
  )
}

export default Home 