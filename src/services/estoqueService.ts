import api from "../api/api";

export interface Estoque {
    id_material: number,
    nome: string,
    quantidade: number,
    unidade: string,
    estoqueMin: number,
    id_fornecedor: number,
    criadoEm: string,
    fornecedor: {
        nome: string,
        contato: string,
        link: string
    }
};

export const getEstoque = async (): Promise<Estoque[]> => {
    const response = await api.get('/estoque');
    console.log("Dados de estoque recebidos no front:\n", response.data)
    return response.data;
}