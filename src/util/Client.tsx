import { ApolloClient, InMemoryCache} from '@apollo/client';

export const config = {
    REACT_APP_API_URL: 'http://34.95.254.3',
    REACT_APP_API_PORT: 3121
}

export const client = (URL:string) => new ApolloClient({
    uri: `${config.REACT_APP_API_URL}:${config.REACT_APP_API_PORT}/${URL}`,
    cache: new InMemoryCache()
  });