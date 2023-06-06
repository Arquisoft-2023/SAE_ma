import { gql } from "@apollo/client";

export const SigninQueries = gql`
    mutation signin($usuarioUnSearch: String!, $usuarioPassword: String!, $usuarioTokenType: String!) {
        signin(password: $usuarioPassword, tokentype: $usuarioTokenType, usuarioUn: $usuarioUnSearch) {
            ldapRes
            token
            usuarioUn
        }
    }
`;