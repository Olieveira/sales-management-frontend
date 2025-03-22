import { useVendas } from '../hooks/useVendas';
import Header from '../layouts/Header';
import { Link } from 'react-router-dom';
import { FaPlusSquare } from 'react-icons/fa';
import { Loading } from '../components/Loading';
import { VendasList } from '../components/VendasList';
import { useEffect } from 'react';

export const Vendas = () => {
    const { data: vendas, isLoading, error } = useVendas();

    useEffect(() => {
        console.log("Recebido venda na página vendas:\n", vendas)
        console.log("Comprimento do array recebido: ", vendas?.length)
    }, [vendas]);

    if (isLoading) return (
        <div>
            <Header />
            <Loading texto={'Vendas'} />
        </div>
    );
    if (error) return (
        <div>
            <Header />
            <Loading texto={'Vendas'} error />
        </div>
    );

    return (
        <div className='bg-gray-700 h-screen'>
            <Header />
            <div className='flex-col justify-center items-center pb-7'>
                <div className="flex flex-col items-center justify-center">
                    <div className='flex w-full justify-center items-center'>
                        <div className='px-2'>
                            <Link to={`#`}>
                                <FaPlusSquare size={36} className="text-amber-100 hover:text-green-200 transition-all duration-150" />
                            </Link>
                        </div>
                        <div className='grow text-center'>
                            <h2 className='text-3xl font-bold mt-4 mb-4 text-amber-100'>Vendas</h2>
                        </div>
                    </div>
                    {vendas && vendas.length > 0 && (
                        <VendasList vendas={vendas} />
                    )}
                </div>
            </div>
        </div>
    )
}
