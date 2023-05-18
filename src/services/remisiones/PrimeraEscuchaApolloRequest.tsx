import { useQuery } from "@apollo/client"
import { PrimeraEscuchaQueries } from "../../queries/remisiones/PrimeraEscuchaQueries"

export const PrimeraEscuchoApolloRequest = {
    primerasEscuchas: async () => {
        const { data } = await useQuery (PrimeraEscuchaQueries);
        return data.obtenerPrimerasEscuchas
    }
}