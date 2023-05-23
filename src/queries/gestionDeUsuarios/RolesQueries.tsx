import { gql } from '@apollo/client';

export const RolesQueries = gql`
query MyQuery {
    leerRoles {
      rol
      rolId
    }
  }`
;