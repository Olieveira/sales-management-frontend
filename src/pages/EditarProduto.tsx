import React from 'react';
import Header from '../layouts/Header';
import { getProduto, Produto } from '../services/produtoService';
import { FaSave } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProduto } from '../services/produtoService';

interface EditFormProps {
    id?: Number;
}

export const EditForm: React.FC<EditFormProps> = ({ id }) => {
    const [produto, setProduto] = useState<Produto>({
        idProduto: 0,
        nome: '',
        unidade: '',
        preco: 0,
        estoqueUn: 0,
        descricao: '',
        ativo: true,
        criadoEm: new Date().toISOString().split('T')[0],
        inativoEm: ''
    });
    const [originalProduto, setOriginalProduto] = useState<Produto>();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduto = async () => {
            try {
                if (id !== undefined) {
                    const produtoData = await getProduto(id as number);
                    setProduto(produtoData);
                    setOriginalProduto(produtoData);
                }
            } catch (error) {
                navigate("/produtos");
                window.alert("Erro ao buscar produto");
            }
        };
        fetchProduto();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduto((prevProduto) => ({
            ...(prevProduto as Produto),
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (originalProduto === produto) {
            alert('Nenhuma alteração realizada!');
            return;
        };

        const resultado = await updateProduto(Number(produto?.idProduto), produto as Produto);
        if (resultado && resultado.success) {
            alert(`Produto ${produto?.idProduto} - ${produto?.nome} atualizado com sucesso!`);
            navigate('/produtos');
            window.location.reload();
        } else {
            console.error('Erro ao atualizar o produto: ', produto?.nome);
            alert(`Erro ao atualizar o produto ${produto?.nome}!\n${resultado.error || 'Erro desconhecido'}`);
        }
    };

    return (
        <div className='bg-gray-700 h-screen'>
            <Header />
            <div className='flex flex-col mt-6 justify-center items-center p-4'>
                <form onSubmit={handleSubmit} className='bg-gray-900 p-6 rounded shadow-2xl w-full max-w-lg shadow-gray-900'>
                    <div className='flex justify-between items-center w-full'>
                        <h2 className='text-2xl text-amber-100 font-semibold mb-4'>Editar Produto</h2>
                        <span className='flex justify-center items-center text-center rounded-full p-1 w-8 h-8 hover:w-9 hover:h-9 transition-all linear cursor-pointer  bg-amber-100 text-gray-700 font-semibold text-2xl'>{produto?.idProduto}</span>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-amber-100 text-sm font-bold mb-2' htmlFor='nome'>
                            Nome
                        </label>
                        <input
                            type='text'
                            id='nome'
                            name='nome'
                            value={produto?.nome}
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
                            value={produto?.unidade}
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
                                    value={produto?.preco}
                                    onChange={handleChange}
                                    className='shadow appearance-none border border-amber-100 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline'
                                />
                            </div>
                            <div className='w-1/2 ml-2'>
                                <label className='block text-amber-100 text-sm font-bold mb-2' htmlFor='estoqueUn'>
                                    Estoque
                                </label>
                                <input
                                    type='number'
                                    id='estoqueUn'
                                    name='estoqueUn'
                                    value={produto?.estoqueUn}
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
                            value={produto?.descricao}
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
                                    onClick={() => setProduto((prevProduto) => ({
                                        ...prevProduto as Produto,
                                        ativo: !prevProduto?.ativo,
                                    }))}
                                    className={`cursor-pointer transition-all duration-300 shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 ${produto?.ativo ? 'bg-green-200 -translate-x-14 rounded-l-2xl' : 'bg-red-300 translate-x-14 rounded-r-2xl'}`}
                                >
                                    {produto?.ativo ? 'Ativo' : 'Inativo'}
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
                                value={produto?.criadoEm ? new Date(produto.criadoEm).toISOString().split('T')[0] : '-'}
                                onChange={handleChange}
                                className='shadow appearance-none border border-amber-100 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline'
                            />
                        </div>
                        {!produto?.ativo && (
                            <div className='mb-4'>
                                <label className='block text-amber-100 text-sm font-bold mb-2' htmlFor='inativoEm'>
                                    Inativo Em
                                </label>
                                <input
                                    type='date'
                                    id='inativoEm'
                                    name='inativoEm'
                                    value={produto?.inativoEm ? new Date(produto?.inativoEm).toISOString().split('T')[0] : new Date(Date.now()).toISOString().split('T')[0]}
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
