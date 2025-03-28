import api from "../api/api";

export interface plataformaVenda {
    idPlataforma: number;
    nome: string;
    linkHome?: string;
}

export const getPlataformas = async (): Promise<plataformaVenda[]> => {
    const response = await api.get('/plataformas');
    return response.data;
}