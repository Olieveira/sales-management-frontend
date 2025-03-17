import { useQuery } from "@tanstack/react-query";
import { getVendas } from "../services/vendasService";

export const useVendas = () => {
    return useQuery({
        queryKey: ['vendas'],
        queryFn: getVendas,
        staleTime: 1000 * 60 * 5,
    });
};