import { View, Text } from 'react-native'
import React from 'react'
import { ApolloProvider} from '@apollo/client';
import { client } from '../util/Client';
import { Prueba1 } from './gestionUsuarios/Usuarios'


const Home = () => {
  return (
    <ApolloProvider client={client('gestionUsuarios/usuarios')}>
      <Prueba1 />
    </ApolloProvider>
  )
}

export default Home 