import { useEstoque } from '../hooks/useEstoque';
import { Loading } from '../components/Loading';
import { EstoqueList } from '../components/EstoqueList';

interface EstoqueProps {
    id?: number
}

export const Estoque: React.FC<EstoqueProps> = ({ id }) => {
    const { data: estoque, isLoading, error } = useEstoque();

    if (isLoading) return (
        <div className="bg-gray-950 min-h-screen flex items-center justify-center">
            <Loading texto={'Estoque'} />
        </div>
    );
    if (error) return (
        <div className="bg-gray-950 min-h-screen flex items-center justify-center">
            <Loading texto={'Estoque'} error />
        </div>
    );

    return (
        <div className='min-h-screen'>
            <div className='flex-col justify-center items-center pb-2'>
                <div className="flex flex-col items-center justify-center">
                    <div className='flex w-full justify-center items-center'>
                        <div className='grow text-center'>
                            <h2 className='text-3xl font-bold mt-4 mb-4 text-amber-100'>Estoque</h2>
                        </div>
                    </div>
                    {estoque && estoque.length > 0 && (
                        <EstoqueList estoque={estoque} id={id} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Estoque;
