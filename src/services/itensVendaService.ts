import api from "../api/api";

export interface ItemVenda {
    idVenda: number,
    idProduto: Number,
    quantidade: number,
    unidade: string,
};

export const getItensVenda = async (): Promise<ItemVenda[]> => {
    const response = await api.get('/itensVenda');
    return response.data;
};
export const getItensByVenda = async (idVenda: number): Promise<ItemVenda[]> => {
    const response = await api.get(`/itensVenda/venda/${idVenda}`);
    return response.data;
};
export const deleteItensVenda = async (idVenda: number, idProduto: number): Promise<{ success: boolean }> => {
    try {
        const response = await api.delete(`/itensVenda`, {
            data: { idVenda, idProduto }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao excluir itens de vendas:\n', error);
        throw error;
    }
};
export const updateItensVenda = async (itemVenda: ItemVenda) => {
    const response = await api.put('/itensVenda', itemVenda);
    return response.data;
};
export const createItensVenda = async (itensVenda: ItemVenda) => {
    const response = await api.post('/itensVenda', itensVenda);
    return response.data;
};