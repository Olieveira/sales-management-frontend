import { useProdutos } from '../hooks/useProdutos';
import ProdutosList from '../components/ProdutosList';
import { Link } from 'react-router-dom';
import { FaPlusSquare } from 'react-icons/fa';
import { Loading } from '../components/Loading';
import { AnimatePresence, motion } from 'framer-motion';
import { NenhumRegistroFull } from '../components/NenhumRegistro';

export const Produtos = () => {
    const { data: produtos, isLoading, error } = useProdutos();

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
                {(!error && !isLoading && produtos && produtos.length > 0) && (
                    <div className='flex-col justify-center items-center p-4'>
                        <div className="flex flex-col items-center justify-center gap-5">
                            <div className='flex w-full justify-center items-center'>
                                <div className='grow text-center'>
                                    <motion.h2 className='text-3xl font-bold mt-4 mb-4 text-amber-100'
                                        initial={{ y: -100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -100, opacity: 0 }}
                                        transition={{ duration: 0.8, type: 'spring', delay: 0.2 }}
                                    >
                                        Produtos
                                    </motion.h2>
                                </div>
                                <div className='px-2'>
                                    <Link to={`/produtos/new`}>
                                        <FaPlusSquare size={36} className="text-amber-100 hover:text-green-200 transition-all duration-150 animate-bounce" />
                                    </Link>
                                </div>
                            </div>

                            {(produtos && produtos.length > 0) && (
                                <ProdutosList produtos={produtos.map(produto => ({ produto }))} card />
                            )}
                        </div>
                    </div>
                )}
                {(produtos && produtos?.length <= 0) && (
                    <NenhumRegistroFull pagina='produtos' />
                )}
            </motion.div>
        </AnimatePresence>
    )
}
