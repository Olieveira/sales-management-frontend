import api from "../api/api";

export interface Produto {
    idProduto: number;
    nome: string;
    descricao?: string;
    unidade: string;
    estoqueUn: number;
    preco: number;
    criadoEm: string;
}

export const getProdutos = async (): Promise<Produto[]> => {
    const response = await api.get('/produtos');
    return response.data;
};

export const createProduto = async (produto: Omit<Produto, 'id' | 'criadoEm'>) => {
    const response = await api.post('/produtos', produto);
    return response.data;
};