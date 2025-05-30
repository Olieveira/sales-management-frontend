import React from 'react';
import { FaCalendarAlt, FaClock, FaCommentDollar, FaCubes, FaDollarSign, FaPlusCircle, FaSave, FaTruckLoading, FaUser, FaWindowClose } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVenda, Venda, createVenda } from '../services/vendasService';
import ProdutosList from '../components/ProdutosList';
import { Produto } from '../services/produtoService';
import { useProdutos } from '../hooks/useProdutos';
import { useStatus } from '../hooks/useStatus';
import { usePlataformas } from '../hooks/usePlataformas';
import { createItensVenda, ItemVenda } from '../services/itensVendaService';
import { useAlert, useSelectAlert } from '../components/AlertContext'
import { AnimatePresence, motion } from 'framer-motion';

interface CreateFormProps {
    id?: Number;
}

export const NewVendaForm: React.FC<CreateFormProps> = ({ id }) => {
    const [venda, setVenda] = useState<Venda>({} as Venda);
    const [vendaOriginal, setVendaOriginal] = useState<Venda>({} as Venda);
    const [produtos, setProdutos] = useState<Array<{ produto: Produto, quantidade?: number }>>([])
    const [selectProduto, setSelectProduto] = useState(false);
    const { data: todosProdutos } = useProdutos();
    const { data: status } = useStatus();
    const { data: plataformas } = usePlataformas();

    const startSelectAlert = useSelectAlert();
    const showAlert = useAlert();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVenda = async () => {
            try {
                if (id !== undefined) {
                    const vendaData = await getVenda(id as number);
                    if (vendaData) {
                        setVenda(vendaData);
                        setVendaOriginal(vendaData);
                        setProdutos(vendaData.itensVenda.map((venda) => { return { produto: venda.produto, quantidade: venda.quantidade } }));
                    }
                } else {
                    setVenda((prevVenda) => ({
                        ...(prevVenda as Venda),
                        idPlataforma: plataformas?.[0]?.idPlataforma || 1,
                        plataforma: plataformas?.[0]?.nome || 'Shopee',
                        idStatus: 1,
                        criadoEm: new Date().toISOString().split('T')[0],
                        total: 0,
                    }));
                }
            } catch (error) {
                showAlert(`Erro ao buscar venda informada!`);
                navigate("/vendas/new");
            }
        };
        fetchVenda();
    }, []);

    const handleDeleteProduto = (idProduto: number) => {
        const newProdutos = produtos?.filter((produto) => produto.produto.idProduto !== idProduto);
        setProdutos(newProdutos);
    };

    const handleAddNewProduct = async (produto: Produto) => {
        const quantidade = Number(await startSelectAlert("Informe a quantidade comprada:", 'number'))

        if (Number.isInteger(quantidade)) {
            setProdutos([...produtos, { produto, quantidade }])
            setSelectProduto(false)
        }

    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setVenda((prevVenda) => ({
            ...(prevVenda as Venda),
            [name]: value,
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name == 'status') {
            setVenda((prevVenda) => ({
                ...(prevVenda as Venda),
                ['idStatus']: Number(value),
                ['status']: status?.find((status) => status.idStatus == Number(value))?.status || 'Selecione um status!',
            }))
        } else if (name == 'plataforma') {
            setVenda((prevVenda) => ({
                ...(prevVenda as Venda),
                ['idPlataforma']: Number(value),
                ['plataforma']: plataformas?.find((plataforma) => plataforma.idPlataforma == Number(value))?.nome || 'Selecione uma plataforma!',
            }))
        } else {
            setVenda((prevVenda) => ({
                ...(prevVenda as Venda),
                [name]: value,
            }));
        };
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (venda.itensVenda?.length <= 0 || !venda.nomeComprador || !venda.total || !venda.criadoEm) {
            showAlert('Preencha todos os campos e adicione pelo menos um produto!');
            return;
        }

        if (id !== undefined && JSON.stringify(vendaOriginal) === JSON.stringify(venda)) {
            const confirm = window.confirm('Nenhuma alteração realizada, duplicar venda mesmo assim?');
            if (!confirm) return;
        }

        try {
            const vendaResponse = await createVenda({
                nomeComprador: venda.nomeComprador,
                idPlataforma: venda.idPlataforma,
                idStatus: venda.idStatus,
                total: venda.total,
                criadoEm: venda.criadoEm
            } as Venda);

            const itensVendaPromises = produtos.map((produto) =>
                createItensVenda({
                    idVenda: vendaResponse.idVenda,
                    idProduto: produto.produto.idProduto,
                    quantidade: produto.quantidade,
                    unidade: produto.produto.unidade,
                } as ItemVenda)
            );

            const itensVendaResponses = await Promise.all(itensVendaPromises);

            const itensVendaError = itensVendaResponses.some(response => response.error);
            if (itensVendaError) {
                throw new Error('Erro ao criar itens da venda!');
            }

            if (vendaResponse && !itensVendaError) {
                showAlert('Venda criada com sucesso!');
                navigate('/vendas');
                setTimeout(() => window.location.reload(), 2500)
            } else {
                console.error('Erro ao criar venda ou registro dos itens!');
                showAlert(`Erro ao criar venda ou registro dos itens!\n${vendaResponse.error || 'Erro desconhecido'}`);
            }

        } catch (error: any) {
            console.error('Erro ao criar venda ou registro dos itens:', error);
            showAlert(`Erro ao criar venda ou registro dos itens!\n${error.message || 'Erro desconhecido'}`);
        }
    };

    return (
        <motion.div className="min-h-screen flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <form onSubmit={handleSubmit} className="bg-gray-900 p-3 rounded-lg w-full max-w-2xl shadow-lg shadow-slate-300/10">
                <h2 className="text-3xl font-bold mb-6 text-amber-100 text-center">Nova Venda</h2>

                <div className={`sm:mb-8 mb-4 flex flex-col justify-center items-center`}>
                    <div className='flex justify-center items-center gap-4 p-1 my-2'>
                        <FaUser size={24} className='text-amber-100' />
                        <label className='block text-amber-100 text-lg font-semibold' htmlFor='nomeComprador'>
                            Comprador
                        </label>
                    </div>
                    <input
                        type='text'
                        id='nomeComprador'
                        name='nomeComprador'
                        value={venda?.nomeComprador}
                        onChange={handleChange}
                        className='shadow text-center appearance-none border border-amber-100 rounded w-52 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>

                <div className='mb-5 flex flex-row flex-wrap justify-center gap-4 items-center w-full'>
                    <div className='px-1'>
                        <div className='flex sm:flex-row-reverse flex-row justify-center items-center gap-4 mb-3'>
                            <FaCommentDollar size={24} className='text-amber-100' />
                            <label className='block text-amber-100 text-lg font-semibold' htmlFor='stapltus'>
                                Plataforma
                            </label>
                        </div>
                        <select
                            id='plataforma'
                            name='plataforma'
                            value={venda.idPlataforma}
                            onChange={handleSelectChange}
                            className='cursor-pointer text-center shadow appearance-none border text-amber-50 border-amber-100 rounded py-2 leading-tight px-3 focus:outline-none focus:shadow-outline bg-gray-900'
                        >
                            <option value='0'>Selecione uma plataforma</option>
                            {plataformas?.map((plataforma, i) => (
                                <option key={i} value={plataforma.idPlataforma}>{plataforma.nome}</option>
                            ))}
                        </select>
                    </div>
                    <div className='px-1'>
                        <div className='flex sm:flex-row-reverse flex-row justify-center items-center gap-4 mb-3'>
                            <FaClock size={24} className='text-amber-100' />
                            <label className='block text-amber-100 text-lg font-semibold' htmlFor='status'>
                                Status
                            </label>
                        </div>
                        <select
                            id='status'
                            name='status'
                            value={venda.idStatus}
                            onChange={handleSelectChange}
                            className='cursor-pointer text-center shadow appearance-none border text-amber-50 border-amber-100 rounded py-2 leading-tight px-3 focus:outline-none focus:shadow-outline bg-gray-900'
                        >
                            <option value='0'>Selecione um status</option>
                            {status?.map((status, i) => (
                                <option key={i} value={status.idStatus}>{status.status}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* produtos */}
                <div className='mb-4 flex flex-col justify-center items-center mx-6'>
                    <div className='flex flex-col justify-center items-center gap-y-3 bg-amber-100 rounded-2xl p-3 w-full'>
                        <div className='flex flex-row justify-center items-center gap-x-4 mb-2 cursor-pointer'>
                            <FaTruckLoading size={24} className='text-gray-900 pulse duration-150 ease-in-out' />
                            <h3 className='block text-gray-900 text-xl text-center font-bold'>Produtos</h3>
                        </div>

                        <div className='flex justify-center items-center mb-4'>
                            <ProdutosList list produtos={produtos} onDeleteFromList={handleDeleteProduto} onSelectItem={() => handleAddNewProduct} />
                        </div>

                        <div className='justify-center items-center animate-pulse ease-in-out duration-300'>
                            <FaPlusCircle size={26} onClick={() => setSelectProduto(!selectProduto)} className='cursor-pointer text-gray-800' />
                        </div>

                    </div>
                </div>

                <div className='mb-4 flex flex-col justify-center items-center'>
                    <div className='flex justify-center items-center gap-4 p-1 my-2'>
                        <FaDollarSign size={24} className='text-amber-100' />
                        <label className='block text-amber-100 text-lg font-semibold' htmlFor='total'>
                            Valor
                        </label>
                    </div>
                    <input
                        type='number'
                        id='total'
                        name='total'
                        step='0.01'
                        value={venda?.total}
                        onChange={handleChange}
                        className='max-w-36 text-center shadow appearance-none border border-amber-100 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>

                <div className='mb-8 w-full flex flex-col justify-center items-center'>
                    <div className='flex justify-center items-center gap-4 p-1 my-2'>
                        <FaCalendarAlt size={22} className='text-amber-100' />
                        <label className='block text-amber-100 text-base font-semibold' htmlFor='criadoEm'>
                            Criado em
                        </label>
                    </div>
                    <input
                        type='date'
                        id='criadoEm'
                        name='criadoEm'
                        value={venda?.criadoEm ? new Date(venda.criadoEm).toISOString().split('T')[0] : '-'}
                        onChange={handleChange}
                        className='text-center w-3xs shadow appearance-none border border-amber-100 rounded py-2 px-3 text-white flex justify-center items-center leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>

                <div className='flex items-center justify-between m-3'>
                    <button
                        type='submit'
                        className='cursor-pointer bg-blue-900 hover:bg-blue-800 transition-all linear duration-75 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center'
                    >
                        <FaSave className='mr-2' /> Salvar
                    </button>
                </div>

                <AnimatePresence>
                    {selectProduto && (
                        <motion.div className="fixed inset-0 flex flex-col justify-center items-center min-w-full min-h-full bg-gray-950/95 z-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="flex justify-around items-center gap-5 mb-4">
                                <FaCubes size={28} className="text-amber-100" />
                                <h3 className="text-amber-100 text-2xl font-bold drop-shadow">Selecione o produto</h3>
                            </div>
                            <div className="p-6 w-full max-w-2xl max-h-[60vh] overflow-y-auto flex justify-start items-center rounded-2xl bg-gray-900 shadow-2xl border-2 border-amber-100">
                                {todosProdutos && todosProdutos.length > 0 ? (
                                    <ProdutosList
                                        selectItem
                                        produtos={todosProdutos
                                            .filter(produto => produto.ativo && !produtos.some(p => p.produto.idProduto === produto.idProduto))
                                            .map(produto => ({ produto }))}
                                        onSelectItem={handleAddNewProduct}
                                    />
                                ) : (
                                    <div className="text-lg w-full text-amber-100 text-center flex justify-center items-center">
                                        Nenhum produto encontrado!
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => setSelectProduto(!selectProduto)}
                                className="absolute top-6 right-6 px-2 py-1 cursor-pointer transition text-red-300 shadow-lg animate-pulse"
                                aria-label="Fechar seleção de produto"
                            >
                                <FaWindowClose size={28} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>

        </motion.div>
    );
};
