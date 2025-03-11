import api from "../api/api";

export interface Produto {
    idProduto: number;
    nome: string;
    descricao?: string;
    unidade: string;
    estoqueUn: number;
    preco: number;
    criadoEm: string;
    ativo: boolean;
    inativoEm?: string;
}

export const getProdutos = async (): Promise<Produto[]> => {
    const response = await api.get('/produtos');
    return response.data;
};

export const getProduto = async (idProduto: number): Promise<Produto> => {
    const response = await api.get(`/produtos/${idProduto}`);
    return response.data;
};

export const createProduto = async (produto: Omit<Produto, 'idProduto' | 'criadoEm'>) => {
    const response = await api.post('/produtos/c', produto);
    return response.data;
};

export const updateProduto = async (idProduto: number, produto: Partial<Omit<Produto, 'idProduto' | 'criadoEm'>>) => {
    const response = await api.put(`/produtos/edit/${idProduto}`, produto);
    return response.data;
};

export const inativarProduto = async (idProduto: number) => {
    const response = await api.put(`/produtos/inativar/${idProduto}`, {
        ativo: false,
        inativoEm: new Date().toISOString()
    });

    return response.data;
};

export const ativarProduto = async (idProduto: number) => {
    const response = await api.put(`/produtos/ativar/${idProduto}`, {
        ativo: true,
        inativoEm: null
    });

    return response.data;
};