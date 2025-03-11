import React from 'react';
import Header from '../layouts/Header';
import { getProduto, Produto } from '../services/produtoService';
import { FaSave } from 'react-icons/fa';
import { useEffect, useState } from 'react';

interface EditFormProps {
    id?: Number;
}

export const EditForm: React.FC<EditFormProps> = ({ id }) => {
    const [produto, setProduto] = useState<Produto>();

    const [formData, setFormData] = React.useState({
        nome: "",
        preco: 0,
        descricao: ""
    });

    useEffect(() => {
        const fetchProduto = async () => {
            if (id !== undefined) {
                const produtoData = await getProduto(id as number);
                setProduto(produtoData);
                setFormData({
                    nome: produtoData.nome,
                    preco: produtoData.preco,
                    descricao: produtoData.descricao || "",
                });
            }
        };
        fetchProduto();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Lógica para salvar as alterações do produto
    };

    return (
        <div className='bg-gray-700 h-screen'>
            <Header />
            <div className='flex flex-col justify-center items-center p-4'>
                <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow-md w-full max-w-lg'>
                    <h2 className='text-2xl mb-4'>Editar Produto</h2>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nome'>
                            Nome
                        </label>
                        <input
                            type='text'
                            id='nome'
                            name='nome'
                            value={formData.nome}
                            onChange={handleChange}
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='preco'>
                            Preço
                        </label>
                        <input
                            type='number'
                            id='preco'
                            name='preco'
                            value={formData.preco}
                            onChange={handleChange}
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='descricao'>
                            Descrição
                        </label>
                        <textarea
                            id='descricao'
                            name='descricao'
                            value={formData.descricao}
                            onChange={handleChange}
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <button
                            type='submit'
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center'
                        >
                            <FaSave className='mr-2' /> Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
