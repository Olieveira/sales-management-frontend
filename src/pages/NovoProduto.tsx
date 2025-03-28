import React from 'react';
import Header from '../layouts/Header';
import { createProduto, Produto } from '../services/produtoService';
import { FaSave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProduto } from '../services/produtoService';

interface CreateFormProps {
    id?: number;
}

export const CreateForm: React.FC<CreateFormProps> = ({ id }) => {

    const [formProduto, setFormProduto] = useState<Produto>({} as Produto);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduto = async () => {
            try {
                if (id !== undefined) {
                    const produtoData = await getProduto(id);
                    setFormProduto(produtoData);
                } else {
                    setFormProduto((prevProduto) => ({
                        ...(prevProduto as Produto),
                        ativo: true,
                        criadoEm: new Date().toISOString().split('T')[0],
                        inativoEm: new Date().toISOString().split('T')[0],
                    }));
                }
            } catch (error) {
                navigate("/produtos/new");
                window.alert("Erro ao buscar produto.");
                console.error('Erro ao buscar produto.\n', error);
            }
        };
        fetchProduto();
    }, [id]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormProduto((prevProduto) => ({
            ...(prevProduto as Produto),
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formProduto.nome) {
            alert('O campo nome é obrigatório!');
            return;
        }
        if (formProduto.ativo === undefined) {
            alert('O campo status é obrigatório!');
            return;
        }

        const produtoAjustado = {
            ...formProduto,
            criadoEm: new Date(formProduto.criadoEm).toISOString().replace('T', ' '),
            estoqueUn: Number(formProduto.estoqueUn),
        };

        console.log("Produto ajustado antes da solicitação de criação:\n", produtoAjustado);

        const resultado = await createProduto(produtoAjustado);

        if (resultado && !resultado.error) {
            alert(`Produto ${produtoAjustado.idProduto} - ${produtoAjustado.nome} criado com sucesso!`);
            navigate('/produtos');
            window.location.reload();
        } else {
            console.error('Erro ao solicitar criação do produto.\n', resultado.error);
            alert(`Erro ao solicitar criação do produto!\n${resultado.error || 'Erro desconhecido'}`);
        }
    };

    return (
        <div className='bg-gray-700 h-screen'>
            <Header />
            <div className='flex flex-col mt-6 justify-center items-center p-4'>
                <form onSubmit={handleSubmit} className='bg-gray-900 p-6 rounded shadow-2xl w-full max-w-[28rem] shadow-gray-900'>
                    <div className='relative w-full'>
                        <div>
                            <h2 className='text-2xl text-amber-100 font-semibold mb-4'>Novo Produto</h2>
                        </div>

                        <div className='absolute -right-9 -top-9 animate-pulse ease-in-out duration-150 w-8 h-8 rounded-full cursor-pointer bg-green-200' />

                    </div>
                    <div className='mb-4'>
                        <label className='block text-amber-100 text-sm font-bold mb-2' htmlFor='nome'>
                            Nome
                        </label>
                        <input
                            type='text'
                            id='nome'
                            name='nome'
                            value={formProduto.nome}
                            onChange={handleChange}
                            className='shadow appearance-none border border-amber-100 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline'
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-amber-100 text-sm font-bold mb-2' htmlFor='unidade'>
                            Unidade de Medida
                        </label>
                        <input
                            type='text'
                            id='unidade'
                            name='unidade'
                            value={formProduto.unidade}
                            onChange={handleChange}
                            className='shadow appearance-none border border-amber-100 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline'
                        />
                    </div>

                    <div className='mb-4'>
                        <div className='w-full flex justify-between items-center'>
                            <div className='w-1/2 mr-2'>
                                <label className='block text-amber-100 text-sm font-bold mb-2' htmlFor='preco'>
                                    Preço
                                </label>
                                <input
                                    type='number'
                                    id='preco'
                                    name='preco'
                                    step='0.01'
                                    value={formProduto.preco}
                                    onChange={handleChange}
                                    className='shadow appearance-none border border-amber-100 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline'
                                />
                            </div>
                            <div className='w-1/2 ml-2'>
                                <label className='block text-amber-100 text-sm font-bold mb-2' htmlFor='estoqueUn'>
                                    Estoque
                                </label>
                                <input
                                    id='estoqueUn'
                                    name='estoqueUn'
                                    value={formProduto.estoqueUn}
                                    onChange={handleChange}
                                    className='shadow appearance-none border border-amber-100 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-amber-100 text-sm font-bold mb-2' htmlFor='descricao'>
                            Descrição
                        </label>
                        <textarea
                            id='descricao'
                            name='descricao'
                            value={formProduto.descricao}
                            onChange={handleChange}
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-amber-100 leading-tight focus:outline-none focus:shadow-outline'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-amber-100 text-sm font-bold mb-2' htmlFor='ativo'>
                            Status do Produto
                        </label>
                        <div className={`flex rounded-2xl bg-gray-800 w-1/2 h-full px transition-all duration-300 justify-center`}>
                            <div className='w-1/2'>
                                <button
                                    type='button'
                                    id='ativo'
                                    name='ativo'
                                    onClick={() => setFormProduto((prevProduto) => ({
                                        ...prevProduto,
                                        ativo: !prevProduto.ativo,
                                    }))}
                                    className={`cursor-pointer transition-all duration-300 shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 ${formProduto.ativo ? 'bg-green-200 -translate-x-14 rounded-l-2xl' : 'bg-red-300 translate-x-14 rounded-r-2xl'}`}
                                >
                                    {formProduto.ativo ? 'Ativo' : 'Inativo'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='w-full flex justify-between items-center'>
                        <div className='mb-4'>
                            <label className='block text-amber-100 text-sm font-bold mb-2' htmlFor='criadoEm'>
                                Criado em
                            </label>
                            <input
                                type='date'
                                id='criadoEm'
                                name='criadoEm'
                                value={formProduto.criadoEm ? new Date(formProduto.criadoEm).toISOString().split('T')[0] : '-'}
                                onChange={handleChange}
                                className='shadow appearance-none border border-amber-100 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline'
                            />
                        </div>

                        {!formProduto.ativo && (
                            <div className='mb-4'>
                                <label className='block text-amber-100 text-sm font-bold mb-2' htmlFor='inativoEm'>
                                    Inativo Em
                                </label>
                                <input
                                    type='date'
                                    id='inativoEm'
                                    name='inativoEm'
                                    value={formProduto.inativoEm ? new Date(formProduto.inativoEm).toISOString().split('T')[0] : new Date(Date.now()).toISOString().split('T')[0]}
                                    onChange={handleChange}
                                    className='shadow appearance-none border border-amber-100 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline'
                                />
                            </div>
                        )}
                    </div>

                    <div className='flex items-center justify-between'>
                        <button
                            type='submit'
                            className='cursor-pointer bg-blue-900 hover:bg-blue-800 transition-all linear duration-75 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center'
                        >
                            <FaSave className='mr-2' /> Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
