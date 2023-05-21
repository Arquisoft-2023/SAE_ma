import { gql } from '@apollo/client';

export const SolicitudRemisionQueries = gql`
    query MyQuery {
        obtenerSolicitudesremision {
            idSolicitudRemision
            fechaSolicitudRemision
            tipoRemision
            usuarioUnDocente
            usuarioUnEstudiante
            programaCurricular
            justificacion
            estado
        }
    }`
;