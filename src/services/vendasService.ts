import api from "../api/api";
import { Produto } from "./produtoService";

export interface Venda {
    idVenda: number,
    nomeComprador: string,
    idPlataforma: number,
    plataforma: string,
    idStatus: number,
    status: string,
    total: number,
    criadoEm: string,
    itensVenda: [{
        idProduto: number,
        quantidade: number,
        unidade: string,
        produto: Produto
    }],
};

export const getVendas = async (): Promise<Venda[]> => {
    const response = await api.get('/vendas');
    return response.data;
};

export const getVenda = async (idVenda: number): Promise<Venda> => {
    const response = await api.get(`/vendas/${idVenda}`);
    return response.data;
};

export const deleteVenda = async (idVenda: number): Promise<{ success: boolean }> => {
    try {
        await api.delete(`/vendas/${idVenda}`);
        return { success: true };
    } catch (error) {
        console.error('Error deleting venda:', error);
        return { success: false };
    }
};

export const updateVenda = async (idVenda: number, venda: Partial<Omit<Venda, 'idVenda' | 'criadoEm'>>) => {
    const response = await api.put(`/vendas/${idVenda}`, venda);
    return response.data;
};

export const createVenda = async (venda: Omit<Venda, 'idVenda' | 'criadoEm'>) => {
    const response = await api.post('/vendas', venda);
    return response.data;
}