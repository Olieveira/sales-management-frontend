import { useQuery } from "@tanstack/react-query"
import { getVendasProcessos } from "../services/vendasProcessosService"

export const useVendasProcessos = () => {
    return useQuery({
        queryKey: ['vendasProcessos'],
        queryFn: getVendasProcessos,
        staleTime: 1000 * 60 * 5
    })
}