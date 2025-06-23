import { useQuery } from "@tanstack/react-query"
import { getEtapasVendas } from "../services/etapasProcessosVendasService"

export const useEtapasProcessosVendas = () => {
    return useQuery({
        queryKey: ['etapasVendasProcessos'],
        queryFn: getEtapasVendas
    })
}