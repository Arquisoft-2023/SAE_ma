import { gql } from '@apollo/client';

export const UsuariosQueries = gql`
query MyQuery {
  leerUsuarios {
    apellidos
    documento
    estado
    tipoDocumento
    nombres
    usuarioUn
  }
}`
;