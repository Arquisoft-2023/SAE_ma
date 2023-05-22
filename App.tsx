import React from 'react';
import { ApolloProvider} from '@apollo/client';
import { client } from './src/util/Client';
import SideBar from './src/components/SideBar';
import * as ScreenOrientation from 'expo-screen-orientation';
import { PaperProvider } from 'react-native-paper';



export default function Root() {

  React.useEffect(() => {
    async function lockScreenOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }

    lockScreenOrientation();
  }, []);

  return (
    <>
    <PaperProvider>
      <ApolloProvider client={client("remisiones/remisiones")}>
        <SideBar />
      </ApolloProvider>
    </PaperProvider>
    </>
  );
}   
  
