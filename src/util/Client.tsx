import { ApolloClient, InMemoryCache} from '@apollo/client';

export const config = {
    REACT_APP_API_URL: 'http://35.247.192.77',
    REACT_APP_API_PORT: 5000
}

export const client = (URL:string) => new ApolloClient({
    uri: `${config.REACT_APP_API_URL}:${config.REACT_APP_API_PORT}/${URL}`,
    cache: new InMemoryCache()
  });