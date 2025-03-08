import api from "../api/api";

export interface Venda {
    id: number,
    nomeComprador: String,
    idPlataforma: number,
    idStatus: number,
    total: number,
    criadoEm: string
};

export const getVendas = async (): Promise<Venda[]> => {
    const response = await api.get('/vendas');
    return response.data;
};

export const createVenda = async (venda: Omit<Venda, 'id' | 'criadoEm'>) => {
    const response = await api.post('/venda', venda);
    return response.data;
}