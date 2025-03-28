import { useQuery } from "@tanstack/react-query";
import { getItensVenda } from "../services/itensVendaService";

export const useItensVenda = () => {
    return useQuery({
        queryKey: ['itemvenda'],
        queryFn: getItensVenda,
        staleTime: 1000 * 60 * 5,
    });
};