import { gql } from '@apollo/client';

export const UsuariosRolesQueries = gql`
query MyQuery {
    leerUsuariosRoles {
      rolId
      usuarioUn
    }
    leerRoles {
      rol
      rolId
    }
  }`
;