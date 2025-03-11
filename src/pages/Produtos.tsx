import { useProdutos } from '../hooks/useProdutos';
import ProdutosList from '../components/ProdutosList';
import Header from '../layouts/Header';
import { Link } from 'react-router-dom';
import { FaPlusSquare } from 'react-icons/fa';
import { Loading } from '../components/Loading';

export const Produtos = () => {
    const { data: produtos, isLoading, error } = useProdutos();
    if (isLoading) return (
        <div>
            <Header />
            <Loading texto={'produtos'} />
        </div>
    );
    if (error) return (
        <div>
            <Header />
            <Loading texto={'produtos'} error />
        </div>
    );

    return (
        <div className='bg-gray-700 h-screen'>
            <Header />
            <div className='flex-col justify-center items-center p-4'>
                <div className="flex flex-col items-center justify-center">
                    <div className='flex w-full justify-center items-center'>
                        <div className='px-2'>
                            <Link to={`/produtos/c`}>
                                <FaPlusSquare size={36} className="text-amber-100 hover:text-green-200 transition-all duration-150" />
                            </Link>
                        </div>
                        <div className='grow text-center'>
                            <h2 className='text-3xl font-bold mt-4 mb-4 text-amber-100'>Lista de Produtos</h2>
                        </div>
                    </div>
                    {produtos && produtos.length > 0 ? (
                        <ProdutosList produtos={produtos} />
                    ) : (
                        <p> Nenhum produto encontrado!</p>
                    )}
                </div>
            </div>
        </div>
    )
}
