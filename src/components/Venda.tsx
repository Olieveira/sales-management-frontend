import { Link, useNavigate } from "react-router-dom";
import { FaCube, FaUser, FaFlag, FaCalendar, FaCoins, FaShoppingCart, FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import { deleteVenda, Venda } from "../services/vendasService";
import ProdutosList from "./ProdutosList";
import { useEffect, useState } from "react";
import { Produto } from "../services/produtoService";

interface VendaCardProps {
    venda: Venda;
    deleteProdutosBtn?: boolean;
}

export const VendaCard: React.FC<VendaCardProps> = ({ venda, deleteProdutosBtn }) => {

    const [produtos, setProdutos] = useState<Array<{ produto: Produto, quantidade?: number }>>()
    const [expanded, setExpanded] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        const produtos = venda.itensVenda.map((produto) => {
            return { produto: produto.produto, quantidade: produto.quantidade }
        });
        setProdutos(produtos);
    }, [])

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

    const handleDeleteProduto = (idProduto: number) => {
        const newProdutos = produtos?.filter((produto) => produto.produto.idProduto !== idProduto);
        setProdutos(newProdutos);
    }

    return (
        <div className={`rounded-2xl w-full mx-2 sm:mx-0 sm:w-96 min-h-72 bg-gray-800 flex flex-col justify-between items-center shadow-lg shadow-gray-700`}>

            <div className="w-full rounded-t-2xl flex h-12 justify-around items-center p-2 bg-amber-100">
                <div className="h-full flex items-center justify-center">
                    <FaCube size={24} className="text-gray-600" />
                </div>
                <h2 className="text-lg text-center font-semibold text-gray-600 px-2 shrink leading-tight">{venda.plataforma}</h2>
                <h3 className="text-lg text-center font-semibold text-gray-600">{venda.idVenda}</h3>
            </div>


            <div className="flex flex-col justify-center items-center gap-4 mt-4 p-1 w-full">
                <div className="h-full flex items-center justify-center p-2 gap-4">
                    <FaShoppingCart size={24} className="text-amber-100" />
                    <h3 className="text-xl font-thin text-amber-100">Produtos {`(${venda.itensVenda.length})`}</h3>
                </div>
                <div className={`flex ${venda.itensVenda.length > 1 ? 'justify-between' : 'justify-center'} text-center rounded-2xl p-2 w-full min-h-14 bg-amber-100`}>
                    <div className="flex justify-center items-center">
                        {produtos && (
                            venda.itensVenda[0] && venda.itensVenda.length > 0 ? (
                                expanded ? (
                                    <ProdutosList list produtos={produtos} onDeleteFromList={deleteProdutosBtn ? handleDeleteProduto : undefined} />
                                ) : (
                                    <ProdutosList list produtos={[produtos[0]]} onDeleteFromList={deleteProdutosBtn ? handleDeleteProduto : undefined} />
                                )) : (
                                <div className="mr-3">
                                    Nenhum produto encontrado!
                                </div>
                            )
                        )}
                    </div>
                    {venda.itensVenda.length > 1 && (
                        <div onClick={() => { setExpanded(!expanded) }} className="cursor-pointer rounded-full w-10 bg-amber-200 flex justify-center items-center py-2 px-1">
                            {!expanded ? (
                                <FaArrowCircleDown size={24} className="text-gray-800 transform transition-transform duration-300 ease-in-out" />
                            ) : (
                                <FaArrowCircleUp size={24} className="text-gray-800 transform transition-transform duration-300 ease-in-out" />
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-row w-full my-4">
                <div className="w-1/2 flex flex-col justify-center items-center text-center">
                    <FaUser size={24} className="text-amber-100" />
                    <div className="h-8 flex justify-center items-center mt-2 p-2 rounded-2xl bg-amber-100 text-md font-extralight">
                        <p>{venda.nomeComprador}</p>
                    </div>
                </div>
                <div className="w-1/2 flex flex-col justify-center items-center text-center">
                    <FaFlag size={24} className="text-amber-100" />
                    <div className="h-8 flex justify-center items-center mt-2 p-2 px-3 rounded-2xl bg-amber-100 text-md font-extralight">
                        <p>{venda.status}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center text-center my-4 w-full">
                <div className="flex justify-center p-2 ml-3 gap-2">
                    <FaCalendar size={24} className="text-amber-100" />
                    <p className="text-md px-1 text-amber-100 font-thin">Data de criação</p>
                </div>
                <div className="min-h-7 w-36 flex-col justify-center items-center mt-2 p-1 rounded-2xl bg-amber-100 text-md font-extralight">
                    <p>{new Date(venda.criadoEm).toLocaleString('pt-BR', { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center text-center mt-4 w-full">
                <div className="flex justify-center items-center gap-2">
                    <FaCoins size={24} className="text-amber-100" />
                    <p className="text-md px-1 text-amber-100 font-thin">Total</p>
                </div>
                <div className="w-full h-9 flex justify-center items-center mt-2 p-2 rounded-t-2xl bg-amber-100">
                    <p className="text-md font-semibold">R$ {Number(venda.total).toFixed(2)}</p>
                </div>
            </div>

            <div className="w-full rounded-b-2xl flex h-12 justify-around items-center bg-amber-100">
                <Link to={`/vendas/edit/${venda.idVenda}`} className="cursor-pointer w-1/2 flex justify-center items-center bg-amber-200 text-gray-800 font-bold rounded-bl-2xl m-1 p-2">
                    Editar
                </Link>
                <div onClick={handleDelete} className={`cursor-pointer w-1/2 flex justify-center items-center bg-red-200 transition-all duration-150 ease-in-out hover:bg-red-200 rounded-br-2xl m-1 p-2`}>
                    <p className="text-md font-semibold text-gray-800">Excluir</p>
                </div>
            </div>
        </div >
    );
};

