import { gql } from '@apollo/client';

export const PrimeraEscuchaQueries = gql`
  query MyQuery {
    obtenerPrimerasescuchas {
      idPrimeraEscucha
      fechaPrimeraEscucha
      observacion
      realizada
    }
    obtenerRemisiones {
      idPrimeraEscucha
      usuarioUnEstudiante
    }
  }`
;