import React from 'react';
import { ApolloProvider} from '@apollo/client';
import { client } from './src/util/Client';
import SideBar from './src/components/SideBar';

export default function Root() {
  return (
    <>
    <ApolloProvider client={client("remisiones/remisiones")}>
      <SideBar />
    </ApolloProvider>
    </>
  );
}   
  
