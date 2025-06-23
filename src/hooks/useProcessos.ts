import { useQuery } from "@tanstack/react-query"
import { getAll } from "../services/processoService"

export const useProcessos = () => {
    return useQuery({
        queryKey: ['processo'],
        queryFn: getAll
    })
}