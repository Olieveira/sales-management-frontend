import React from 'react';
import Header from '../layouts/Header';
import { FaCalendarAlt, FaClock, FaCommentDollar, FaCopy, FaCubes, FaDollarSign, FaPlusCircle, FaSave, FaTrash, FaTruckLoading, FaUser, FaWindowClose } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVenda, updateVenda, Venda, deleteVenda } from '../services/vendasService';
import ProdutosList from '../components/ProdutosList';
import { Produto } from '../services/produtoService';
import { useProdutos } from '../hooks/useProdutos';

interface EditFormProps {
    id?: Number;
}

export const EditForm: React.FC<EditFormProps> = ({ id }) => {
    const [venda, setVenda] = useState<Venda>({} as Venda);
    const [vendaOriginal, setVendaOriginal] = useState<Venda>({} as Venda);
    const [produtos, setProdutos] = useState<Array<{ produto: Produto, quantidade?: number }>>([])
    const [produtosOriginal, setProdutosOriginal] = useState<Array<{ produto: Produto, quantidade?: number }>>([])
    const status = ['Pendente', 'Em andamento', 'Concluído', 'Cancelado', 'Atrasado', 'Retornado']
    const { data: todosProdutos } = useProdutos();

    const navigate = useNavigate();

    const handleDeleteProduto = (idProduto: number) => {
        const newProdutos = produtos?.filter((produto) => produto.produto.idProduto !== idProduto);
        setProdutos(newProdutos);
    }
    const [selectProduto, setSelectProduto] = useState(false);

    useEffect(() => {
        const fetchVenda = async () => {
            try {
                const vendaData = await getVenda(id as number);
                if (vendaData) {
                    setVenda(vendaData);
                    setVendaOriginal(vendaData);
                    setProdutos(vendaData.itensVenda.map((venda) => { return { produto: venda.produto, quantidade: venda.quantidade } }));
                    setProdutosOriginal(vendaData.itensVenda.map((venda) => { return { produto: venda.produto, quantidade: venda.quantidade } }));
                } else {
                    console.error("Venda data is undefined or null");
                }
            } catch (error) {
                window.alert(`Erro ao buscar venda:`);
                console.log("Erro ao buscar venda:\n", error)
                // navigate("/vendas");
            }
        };
        fetchVenda();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setVenda((prevVenda) => ({
            ...(prevVenda as Venda),
            [name]: value,
        }));
    };

    const handleSubmit = async () => {

        if (vendaOriginal === venda) {
            alert('Nenhuma alteração realizada!');
            return;
        };

        const resultado = await updateVenda(Number(venda?.idVenda), venda as Venda);
        if (resultado && resultado.success) {
            alert(`Venda ${venda?.idVenda} - ${venda?.nomeComprador} atualizado com sucesso!`);
            navigate('/vendas');
            window.location.reload();
        } else {
            console.error('Erro ao atualizar venda: ', venda?.nomeComprador);
            alert(`Erro ao atualizar venda ${venda?.nomeComprador}!\n${resultado.error || 'Erro desconhecido'}`);
        }
    };

    const handleDelete = async () => {
        if (window.confirm(`Tem certeza que deseja excluir a venda ${venda?.idVenda}?`)) {
            try {
                const resultado = await deleteVenda(Number(venda?.idVenda));
                if (resultado.success) {
                    alert(`Venda ${venda?.idVenda} excluída com sucesso!`);
                    navigate('/vendas');
                    window.location.reload();
                } else {
                    console.error('Erro ao excluir venda: ', venda?.idVenda);
                    alert(`Erro ao excluir venda ${venda?.idVenda}!`);
                }
            } catch (error) {
                console.error('Erro ao excluir venda');
                alert(`Erro ao excluir venda ${venda?.idVenda}!`);
            }
        }
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setVenda((prevVenda) => ({
            ...(prevVenda as Venda),
            [name]: value,
        }));
    };

    return (
        <div className='bg-gray-700 h-screen relative'>
            <Header />
            <div className='flex flex-col mt-6 justify-center items-center p-4'>
                <form onSubmit={handleSubmit} className='bg-gray-900 rounded shadow-2xl w-full max-w-lg shadow-gray-900 relative flex flex-col justify-center items-center'>
                    <div className='flex justify-between items-center w-full bg-gray-800 rounded rounded-b-2xl px-5 py-2 shadow-gray-900 shadow-md'>

                        <div onClick={handleDelete} className='bg-red-200 flex justify-center items-center rounded-full p-2 w-10 h-10 hover:w-11 hover:h-11 transition-all linear cursor-pointer'>
                            <FaTrash size={24} className='text-gray-900' />
                        </div>

                        <h2 className='text-2xl text-amber-100 font-semibold'>{String(venda?.idVenda)}</h2>

                        <span className='flex justify-center items-center rounded-full p-2 w-10 h-10 hover:w-11 hover:h-11 transition-all linear cursor-pointer  bg-red-200'>
                            <FaCopy size={24} className='text-gray-900' />
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
                            <div className='flex justify-center items-center gap-4 mb-3'>
                                <FaCommentDollar size={24} className='text-amber-100' />
                                <label className='block text-amber-100 text-lg font-semibold' htmlFor='plataforma'>
                                    Plataforma
                                </label>
                            </div>
                            <input
                                type='text'
                                id='plataforma'
                                name='plataforma'
                                value={venda?.plataforma}
                                onChange={handleChange}
                                className='text-center w-auto shadow appearance-none border border-amber-100 rounded py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline'
                            />
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
                                value={venda?.status}
                                onChange={handleSelectChange}
                                className='cursor-pointer text-center shadow appearance-none border text-amber-50 border-amber-100 rounded py-2 leading-tight px-3 focus:outline-none focus:shadow-outline bg-gray-900'
                            >
                                <option value=''>Selecione um status</option>
                                {status.map((status) => (
                                    <option value={status}>{status}</option>
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
                                {venda && venda.itensVenda && venda?.itensVenda.length > 0 ? (
                                    <ProdutosList list produtos={produtos} onDeleteFromList={handleDeleteProduto} />
                                ) : (<div>Sem produtos ou undefined!</div>)}
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
                            className='text-center w-3xs shadow appearance-none border border-amber-100 rounded py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline'
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
                        <div className='absolute gap-5 flex flex-col justify-center items-center w-full h-full rounded-2xl bg-gray-800/90 z-10'>
                            <div className='flex justify-around items-center gap-5'>
                                <FaCubes size={28} className='text-amber-100' />
                                <h3 className='text-amber-100 text-2xl'>Selecione o produto</h3>
                            </div>
                            <div className='w-full min-h-2/3 flex justify-start items-center rounded-2xl bg-amber-100'>
                                {todosProdutos && todosProdutos.length > 0 ? (
                                    <ProdutosList selectItem produtos={todosProdutos.map(produto => ({ produto }))} />
                                ) : (<div className='text-lg text-gray-900 text-center flex justify-center items-center'>
                                    Nenhum produto encontrado!
                                </div>)}
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
