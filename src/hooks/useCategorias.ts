import { useQuery } from "@tanstack/react-query";
import { getCategorias } from '../services/categoriaService';

export const useCategorias = () => {
    return useQuery({
        queryKey: ['categorias'],
        queryFn: getCategorias,
        staleTime: 1000 * 60 * 5
    })
}