import { gql } from "@apollo/client";

export const LogoutQuery = gql`
    mutation logout($usuarioUnSearch: String!) {
        signout(usuarioUn: $usuarioUnSearch) {
            token
            usuario
        }
    }
`;
