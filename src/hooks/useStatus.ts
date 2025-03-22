import { useQuery } from "@tanstack/react-query";
import { getStatus } from "../services/statusVendaService";

export const useStatus = () => {
    return useQuery({
        queryKey: ['statusVenda'],
        queryFn: getStatus,
        staleTime: 1000 * 60 * 5
    });
};