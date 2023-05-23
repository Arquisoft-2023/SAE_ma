import { gql } from "@apollo/client";

export const SigninQueries = gql`
  mutation signin ($usuarioUnSearch: String!) {
    signin(item: { usuarioUn: $usuarioUnSearch }) {
      usuarioUn
      token
      estado
    }
  }
`;
