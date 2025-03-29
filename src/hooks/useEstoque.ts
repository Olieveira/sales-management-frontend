import { useQuery } from "@tanstack/react-query";
import { getEstoque } from '../services/estoqueService'; 

export const useEstoque = () => {
    return useQuery({
        queryKey: ['estoque'],
        queryFn: getEstoque,
        staleTime: 1000 * 60 * 5,
    });
};
