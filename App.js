import React from 'react';
import { ApolloProvider} from '@apollo/client';
import { client } from './src/util/Client';
import { PrimeraEscucha } from './src/views/remisiones/PrimeraEscucha';

export default function Root() {
  return (
    <>
    <ApolloProvider client={client('remisiones/remisiones')}>
      <PrimeraEscucha />
    </ApolloProvider>
    </>
  );
}   
  
