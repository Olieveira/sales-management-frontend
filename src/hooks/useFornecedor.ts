import { useQuery } from "@tanstack/react-query";
import { getFornecedor } from "../services/fornecedorService";

export const useFornecedor = () => {
    return useQuery({
        queryKey: ['fornecedor'],
        queryFn: getFornecedor,
        staleTime: 1000 * 60 * 5
    })
}