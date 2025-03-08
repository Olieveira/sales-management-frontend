import { useQuery } from "@tanstack/react-query";
import { getProdutos } from "../services/produtoService";

export const useProdutos = () => {
    return useQuery({
        queryKey: ['produtos'],
        queryFn: getProdutos,
        staleTime: 1000 * 60 * 5,
    });
};