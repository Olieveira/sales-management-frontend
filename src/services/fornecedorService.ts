import api from "../api/api";

export interface Fornecedor {
    idFornecedor: number,
    nome: string,
    contato?: string,
    link?: string
};

export const getFornecedor = async (): Promise<Fornecedor[]> => {
    const response = await api.get('/fornecedores');
    return response.data
}