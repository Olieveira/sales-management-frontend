import { useEstoque } from '../hooks/useEstoque';
import Header from '../layouts/Header';
import { Link } from 'react-router-dom';
import { FaPlusSquare } from 'react-icons/fa';
import { Loading } from '../components/Loading';
import { EstoqueList } from '../components/EstoqueList';

export const Estoque = () => {
    const { data: estoque, isLoading, error } = useEstoque();

    if (isLoading) return (
        <div>
            <Header />
            <Loading texto={'Estoque'} />
        </div>
    );
    if (error) return (
        <div>
            <Header />
            <Loading texto={'Estoque'} error />
        </div>
    );

    return (
        <div className='bg-gray-700 h-screen'>
            <Header />
            <div className='flex-col justify-center items-center pb-7'>
                <div className="flex flex-col items-center justify-center">
                    <div className='flex w-full justify-center items-center'>
                        <div className='px-2'>
                            <Link to={`/estoque/new`}>
                                <FaPlusSquare size={36} className="text-amber-100 hover:text-green-200 transition-all duration-150" />
                            </Link>
                        </div>
                        <div className='grow text-center'>
                            <h2 className='text-3xl font-bold mt-4 mb-4 text-amber-100'>Estoque</h2>
                        </div>
                    </div>
                    {estoque && estoque.length > 0 && (
                        <EstoqueList estoque={estoque} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Estoque;
