import { useVendas } from '../hooks/useVendas';
import { Link } from 'react-router-dom';
import { FaPlusSquare } from 'react-icons/fa';
import { Loading } from '../components/Loading';
import { VendasList } from '../components/VendasList';
import { AnimatePresence, motion } from 'framer-motion';

export const Vendas = () => {
    const { data: vendas, isLoading, error } = useVendas();

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
                            <Loading key={'loading'} texto={'vendas'} />
                        )}
                        {/* Error */}
                        {error && (
                            <Loading key={'error'} texto={'vendas'} error />
                        )}
                    </div>
                )}

                {/* Conteúdo */}
                {(!error && !isLoading) && (
                    <div className='flex-col justify-center items-center pb-7'>
                        <div className="flex flex-col items-center justify-center gap-5">
                            <div className='flex w-full justify-center items-center'>
                                <div className='grow text-center'>
                                    <motion.h2 className='text-3xl font-bold mt-4 mb-4 text-amber-100'
                                        initial={{ y: -100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -100, opacity: 0 }}
                                        transition={{ duration: 0.8, type: 'spring', delay: 0.2 }}
                                    >
                                        Vendas
                                    </motion.h2>
                                </div>
                                <div className='px-2'>
                                    <Link to={`/vendas/new`}>
                                        <FaPlusSquare size={36} className="text-amber-100 hover:text-green-200 transition-all duration-150 animate-bounce" />
                                    </Link>
                                </div>
                            </div>
                            {vendas && vendas.length > 0 && (
                                <VendasList vendas={vendas} />
                            )}
                        </div>
                    </div>
                )}
            </motion.div >
        </AnimatePresence>
    )
}
