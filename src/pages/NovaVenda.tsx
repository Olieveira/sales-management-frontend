import React from 'react';
import Header from '../layouts/Header';
import { FaCalendarAlt, FaClock, FaCommentDollar, FaCubes, FaDollarSign, FaFileInvoiceDollar, FaPlusCircle, FaSave, FaTruckLoading, FaUser, FaWindowClose } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVenda, Venda, createVenda } from '../services/vendasService';
import ProdutosList from '../components/ProdutosList';
import { Produto } from '../services/produtoService';
import { useProdutos } from '../hooks/useProdutos';
import { useStatus } from '../hooks/useStatus';
import { usePlataformas } from '../hooks/usePlataformas';
import { createItensVenda, ItemVenda } from '../services/itensVendaService';

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

    const navigate = useNavigate();

    useEffect(() => {
        console.log("Venda alterada:\n", venda);
    }, [venda])

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
                window.alert(`Erro ao buscar venda informada!`);
                navigate("/vendas/new");
            }
        };
        fetchVenda();
    }, []);

    const handleDeleteProduto = (idProduto: number) => {
        const newProdutos = produtos?.filter((produto) => produto.produto.idProduto !== idProduto);
        setProdutos(newProdutos);
    };

    const handleAddNewProduct = (produto: Produto) => {
        const quantidade = parseInt(prompt("Digite a quantidade do produto:", "1") || "0", 10);
        setProdutos([...produtos, { produto, quantidade }]);
        setSelectProduto(!selectProduto);
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

        console.log("Venda recebida do form para criação:\n", venda)

        if (venda.itensVenda?.length <= 0 || !venda.nomeComprador || !venda.total || !venda.criadoEm) {
            alert("Preencha todos os campos e adicione pelo menos um produto!");
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

            console.log("Venda response no Criar Venda:\n", vendaResponse)

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
                alert('Venda criada com sucesso!');
                navigate('/vendas');
            } else {
                console.error('Erro ao criar venda ou registro dos itens!');
                alert(`Erro ao criar venda ou registro dos itens!\n${vendaResponse.error || 'Erro desconhecido'}`);
            }

        } catch (error: any) {
            console.error('Erro ao criar venda ou registro dos itens:', error);
            alert(`Erro ao criar venda ou registro dos itens!\n${error.message || 'Erro desconhecido'}`);
        }
    };

    return (
        <div className='bg-gray-700 h-screen relative'>
            <Header />
            <div className='flex flex-col mt-6 justify-center items-center sm:p-4'>
                <form onSubmit={handleSubmit} className='bg-gray-900 rounded shadow-2xl w-full max-w-lg shadow-gray-900 relative flex flex-col justify-center items-center'>
                    <div className='flex justify-between items-center w-full bg-gray-800 rounded rounded-b-2xl px-5 py-2 shadow-gray-900 shadow-md'>

                        <h2 className='text-2xl text-amber-100 font-semibold'>Nova Venda</h2>

                        <span className='flex justify-center items-center rounded-full p-2 w-10 h-10 hover:w-11 hover:h-11 transition-all linear cursor-pointer  bg-red-200'>
                            <FaFileInvoiceDollar size={24} className='text-gray-900' />
                        </span>

                    </div>
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

                    <div className='mb-8 flex flex-row flex-wrap justify-center gap-4 items-center w-full'>
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
                    {selectProduto && (
                        <div className='fixed top-0 gap-5 flex flex-col justify-center items-center min-w-full min-h-full rounded-2xl bg-gray-800/90 z-10'>
                            <div className='flex justify-around items-center gap-5 pt-3'>
                                <FaCubes size={28} className='text-amber-100' />
                                <h3 className='text-amber-100 text-2xl'>Selecione o produto</h3>
                            </div>
                            <div className='p-4 w-4/5 overflow-x-scroll flex justify-start items-center rounded-2xl bg-amber-100'>
                                {todosProdutos && todosProdutos.length > 0 ? (
                                    <ProdutosList
                                        selectItem
                                        produtos={todosProdutos
                                            .filter(produto => produto.ativo && !produtos.some(p => p.produto.idProduto === produto.idProduto))
                                            .map(produto => ({ produto }))}
                                        onSelectItem={handleAddNewProduct}
                                    />
                                ) : (
                                    <div className='text-lg w-full text-gray-900 text-center flex justify-center items-center'>
                                        Nenhum produto encontrado!
                                    </div>
                                )}
                            </div>
                            <div onClick={() => setSelectProduto(!selectProduto)} className='cursor-pointer absolute px-1 p-0.5 rounded-sm bg-amber-100 top-3 right-3 animate-pulse'>
                                <FaWindowClose size={28} className='text-gray-800' />
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};
