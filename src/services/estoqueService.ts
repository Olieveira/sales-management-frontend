import api from "../api/api";

export interface Estoque {
    idMaterial: number,
    nome: string,
    quantidade: number,
    unidade: string,
    estoqueMin: number,
    idFornecedor: number,
    criadoEm: string,
    fornecedor: {
        nome: string,
        contato: string,
        link: string
    }
};

export const getEstoque = async (): Promise<Estoque[]> => {
    const response = await api.get('/estoque');
    return response.data;
}
export const getEstoqueById = async (id: number): Promise<Estoque> => {
    const response = await api.get(`/estoque/${id}`);
    return response.data;
}