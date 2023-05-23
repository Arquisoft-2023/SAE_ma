import { gql } from "@apollo/client";

export const GestionDeUsuariosQueries = gql`
  query MyQuery {
    leerUsuarios {
      apellidos
      documento
      estado
      tipoDocumento
      nombres
      usuarioUn
    }
  }
`;
