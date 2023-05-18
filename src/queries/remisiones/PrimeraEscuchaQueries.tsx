import { gql } from '@apollo/client';

export const PrimeraEscuchaQueries = gql`
  query MyQuery {
    obtenerPrimerasescuchas {
      fechaPrimeraEscucha
      idPrimeraEscucha
      observacion
      realizada
    }
  }`
;