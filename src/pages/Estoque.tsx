import { useEstoque } from '../hooks/useEstoque';
import { Loading } from '../components/Loading';
import { EstoqueList } from '../components/EstoqueList';
import { AnimatePresence, motion } from 'framer-motion';

interface EstoqueProps {
    id?: number
}

export const Estoque: React.FC<EstoqueProps> = ({ id }) => {
    const { data: estoque, isLoading, error } = useEstoque();

    return (
        <AnimatePresence>
            <motion.div className='min-h-screen'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {/* Loading e erro */}
                {(isLoading || error) && (
                    <div className='h-screen w-full flex flex-row flex-wrap'>
                        {/* Loading */}
                        {isLoading && (
                            <Loading key={'loading'} texto={'produtos'} />
                        )}
                        {/* Error */}
                        {error && (
                            <Loading key={'error'} texto={'produtos'} error />
                        )}
                    </div>
                )}
                {/* Conteúdo  */}
                {(!error && !isLoading) && (
                    <div className='flex-col justify-center items-center pb-2'>
                        <div className="flex flex-col items-center justify-center">
                            <div className='flex w-full justify-center items-center'>
                                <div className='grow text-center'>
                                    <motion.h2 className='text-3xl font-bold mt-4 mb-4 text-amber-100'
                                        initial={{ y: -100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -100, opacity: 0 }}
                                        transition={{ duration: 0.8, type: 'spring', delay: 0.2 }}>
                                        Estoque
                                    </motion.h2>
                                </div>
                            </div>
                            {estoque && estoque.length > 0 && (
                                <EstoqueList estoque={estoque} id={id} />
                            )}
                        </div>
                    </div>
                )}

            </motion.div>
        </AnimatePresence>
    );
};

export default Estoque;
