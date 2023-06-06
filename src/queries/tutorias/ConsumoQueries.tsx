import { gql } from '@apollo/client';

export const ConsumoQueries = gql`
    query MyQuery {
        obtenerLugares1c {
            id
            establishmentName
            description
            location
            opening
            closing
            capacity
        }
    }`
;