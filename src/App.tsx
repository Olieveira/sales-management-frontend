import { useProdutos } from './hooks/useProdutos';
import ProdutosList from './components/ProdutosList';
import Header from './layouts/Header';
import { useEffect } from 'react';

function App() {

  const { data: produtos, isLoading, error } = useProdutos();

  useEffect(() => {
    console.log(produtos);
  }, [produtos])

  if (isLoading) return <p>Carregando produtos...</p>;
  if (error) return <p>Erro ao carregar produtos.</p>

  return (
    <div>
      <Header />
      <div className='p-4'>
        <h2 className='text-xl font-bold mb-4'>Lista de Produtos</h2>
        {produtos && produtos.length > 0 ? (
          <ProdutosList produtos={produtos} />
        ) : (
          <p> Nenhum produto encontrado!</p>
        )}
      </div>
    </div>
  )
}

export default App;
