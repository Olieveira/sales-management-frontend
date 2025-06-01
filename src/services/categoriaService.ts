import api from "../api/api"

export interface Categoria {
    idCategoria: number,
    nome: string
}

export const getCategorias = async (): Promise<Categoria[]> => {
    const response = await api.get('/categorias')
    return response.data
}

export const getCategoria = async (id: number): Promise<Categoria> => {
    const response = await api.get(`/categorias/${id}`)
    return response.data
}