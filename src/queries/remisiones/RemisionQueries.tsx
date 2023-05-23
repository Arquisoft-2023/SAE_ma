import { gql } from '@apollo/client';

export const RemisionQueries = gql`
    query MyQuery {
        obtenerRemisiones {
            idRemision
            idPrimeraEscucha
            fechaEnvioRemision
            tipoRemision
            usuarioUnDocente
            usuarioUnEstudiante
            programaCurricular
            justificacionSolicitud
            primeraEscuchaRealizada
            observacionPrimeraEscucha
            remisionEfectiva
        }
    }`
;