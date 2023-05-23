import { gql } from '@apollo/client';

export const acompanyamientoQuery = {
    obtenerAcompanyamiento: gql`
        query {
            obtenerAcompanyamiento {
                    usuarioUnEstudiante
                    usuarioUnTutor
                    esTutor
                    Id
                    listaTutoria {
                        Id
                        acuerdo
                        estado
                        fecha
                        lugar
                        objetivo
                        observacionesEstudiante
                        observacionesTutor
                    }
            }
        }
    `,
}

export const tutorialQuery = {
    obtenerAcompanyamientoEstudiante: gql`
        query ($usuarioUnEstudiante: String!) {
            obtenerAcompanyamientoEstudiante(usuarioUnEstudiante: $usuarioUnEstudiante) {
                esTutor
                usuarioUnTutor
                listaTutoria {
                    Id
                    acuerdo
                    estado
                    fecha
                    lugar
                    objetivo
                    observacionesEstudiante
                    observacionesTutor
                }
            }
        }
    `,
    obtenerAcompanyamientoTutor: gql`
        query ($usuarioUnTutor: String!){
            obtenerAcompanyamientoTutor(usuarioUnTutor: $usuarioUnTutor) {
            esTutor
            usuarioUnEstudiante
            listaTutoria {
                    Id
                    acuerdo
                    estado
                    fecha
                    lugar
                    objetivo
                    observacionesEstudiante
                    observacionesTutor
                }
            }
        }
    `,
}

export const obsQuery  = {
    obtenerAcompanyamientoEstudiante: gql`
        query  ($usuarioUnEstudiante: String!) {
            obtenerAcompanyamientoEstudiante(usuarioUnEstudiante: $usuarioUnEstudiante) {
            esTutor
            usuarioUnTutor
            listaObservacion {
                    fecha
                    descripcion
                    Id
                }
            }
        }
    `,
    obtenerAcompanyamientoTutor: gql`
        query ($usuarioUnTutor: String!) {
            obtenerAcompanyamientoTutor(usuarioUnTutor: $usuarioUnTutor) {
            esTutor
            usuarioUnEstudiante
            listaObservacion {
                    Id
                    descripcion
                    fecha
                }
            }
        }
    `,
}