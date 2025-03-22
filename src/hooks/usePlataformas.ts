import { useQuery } from "@tanstack/react-query";
import { getPlataformas } from "../services/plataformasVendaService";

export const usePlataformas = () => {
    return useQuery({
        queryKey: ['plataformaVenda'],
        queryFn: getPlataformas,
        staleTime: 1000 * 60 * 5
    });
};