import { FaSave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createProduto, updateProduto, getProduto, Produto } from '../services/produtoService';
import { useAlert } from '../components/AlertContext';
import { motion } from 'framer-motion';
import { useCategorias } from '../hooks/useCategorias';

interface ProdutoFormProps {
    id?: number;
    mode: 'create' | 'edit';
}

export const ProdutoForm: React.FC<ProdutoFormProps> = ({ id, mode }) => {
    const [formProduto, setFormProduto] = useState<Produto>({ idCategoria: 0 } as Produto);
    const [originalProduto, setOriginalProduto] = useState<Produto | undefined>();
    const { data: categorias } = useCategorias();
    const navigate = useNavigate();
    const showAlert = useAlert();

    useEffect(() => {
        if (mode === 'edit' && id !== undefined) {
            const fetchProduto = async () => {
                try {
                    const produtoData = await getProduto(id);
                    setFormProduto(produtoData);
                    setOriginalProduto(produtoData);
                } catch (error) {
                    navigate('/produtos');
                    showAlert('Erro ao buscar produto');
                }
            };
            fetchProduto();
        } else if (mode === 'create') {
            setFormProduto((prevProduto) => ({
                ...(prevProduto as Produto),
                ativo: true,
                criadoEm: new Date().toISOString().split('T')[0],
                inativoEm: new Date().toISOString().split('T')[0],
            }));
        }
    }, [id, mode]);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'idCategoria') {
            const id = Number(value);
            if (id > 0) {
                return setFormProduto((prev) => ({ ...prev, idCategoria: id }));
            } else {
                return showAlert('Erro ao alterar categoria!');
            }
        }
        setFormProduto((prevProduto) => ({
            ...(prevProduto as Produto),
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formProduto.nome) return showAlert('O campo nome é obrigatório!');
        if (formProduto.idCategoria <= 0) return showAlert('O campo categoria é obrigatório!');
        if (formProduto.ativo === undefined) return showAlert('O campo status é obrigatório!');

        if (mode === 'edit' && originalProduto && JSON.stringify(originalProduto) === JSON.stringify(formProduto)) {
            return showAlert('Nenhuma alteração realizada!');
        }

        const produtoAjustado = {
            ...formProduto,
            criadoEm: new Date(formProduto.criadoEm).toISOString().replace('T', ' '),
            estoqueUn: Number(formProduto.estoqueUn),
            idCategoria: Number(formProduto.idCategoria),
        };

        let resultado;
        if (mode === 'edit') {
            resultado = await updateProduto(Number(formProduto.idProduto), produtoAjustado);
        } else {
            resultado = await createProduto(produtoAjustado);
        }

        if (resultado && (resultado.success || !resultado.error)) {
            showAlert(`Produto ${resultado.idProduto || formProduto.idProduto} - ${resultado.nome || formProduto.nome} ${mode === 'edit' ? 'atualizado' : 'criado'} com sucesso!`);
            navigate('/produtos');
            setTimeout(() => window.location.reload(), 2500);
        } else {
            showAlert(`Erro ao ${mode === 'edit' ? 'atualizar' : 'criar'} o produto!\n${resultado.error || 'Erro desconhecido'}`);
        }
    };

    return (
        <motion.div className="min-h-screen flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
        >
            <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-lg w-full m-2 max-w-lg">
                <div className='relative w-full'>
                    <div>
                        <h2 className='text-3xl font-bold mb-6 text-amber-100 text-center'>{mode === 'edit' ? 'Editar Produto' : 'Novo Produto'}</h2>
                    </div>
                    {mode === 'edit' && (
                        <span className='absolute flex top-0 right-0 justify-center items-center text-center rounded-full p-1 w-8 h-8 hover:w-9 hover:h-9 transition-all linear cursor-pointer  bg-amber-100 text-gray-700 font-semibold text-2xl'>
                            {formProduto?.idProduto}
                        </span>
                    )}
                </div>
                <div className='mb-4'>
                    <label className='block text-amber-100 text-sm font-bold mb-2' htmlFor='nome'>Nome</label>
                    <input
                        type='text'
                        id='nome'
                        name='nome'
                        value={formProduto.nome || ''}
                        onChange={handleChange}
                        className='shadow appearance-none border border-amber-100 rounded w-full py-2 px-3 text-white bg-gray-950 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div className='flex flex-row flex-wrap sm:justify-between justify-center items-center gap-2 mb-4'>
                    <div>
                        <label className='block text-center sm:text-left text-amber-100 text-sm font-bold mb-2' htmlFor='unidade'>Unidade</label>
                        <input
                            type='text'
                            id='unidade'
                            name='unidade'
                            value={formProduto.unidade || ''}
                            onChange={handleChange}
                            className='shadow appearance-none border border-amber-100 rounded w-full py-2 px-3 text-white bg-gray-950 leading-tight focus:outline-none focus:shadow-outline'
                        />
                    </div>
                    <div>
                        <label className='block text-center sm:text-left text-amber-100 text-sm font-bold mb-2' htmlFor='idCategoria'>Categoria</label>
                        <select
                            id="idCategoria"
                            name="idCategoria"
                            value={formProduto.idCategoria || ''}
                            onChange={handleChange}
                            className="shadow cursor-pointer appearance-none border border-amber-100 rounded w-full py-2 px-3 text-white bg-gray-950 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Selecione uma categoria</option>
                            {categorias && categorias.length > 0 && categorias.map((categoria, i) => (
                                <option key={i + '-' + categoria.idCategoria} value={categoria.idCategoria}>{categoria.nome}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='mb-4'>
                    <div className='w-full flex justify-between items-center'>
                        <div className='w-1/2 mr-2'>
                            <label className='block text-amber-100 text-sm font-bold mb-2' htmlFor='preco'>Preço</label>
                            <input
                                type='number'
                                id='preco'
                                name='preco'
                                step='0.01'
                                value={formProduto.preco || ''}
                                onChange={handleChange}
                                className='shadow appearance-none border border-amber-100 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline'
                            />
                        </div>
                        <div className='w-1/2 ml-2'>
                            <label className='block text-amber-100 text-sm font-bold mb-2' htmlFor='estoqueUn'>Estoque</label>
                            <input
                                id='estoqueUn'
                                name='estoqueUn'
                                type='number'
                                value={formProduto.estoqueUn || ''}
                                onChange={handleChange}
                                className='shadow appearance-none border border-amber-100 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline'
                            />
                        </div>
                    </div>
                </div>
                <div className='mb-4'>
                    <label className='block text-amber-100 text-sm font-bold mb-2' htmlFor='descricao'>Descrição</label>
                    <textarea
                        id='descricao'
                        name='descricao'
                        value={formProduto.descricao || ''}
                        onChange={handleChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-amber-100 bg-gray-950 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div className='mb-4 flex flex-col justify-center items-center'>
                    <label className='block text-amber-100 text-sm font-bold mb-2' htmlFor='ativo'>Status do Produto</label>
                    <div className={`flex rounded-2xl bg-gray-800 w-1/2 h-full px transition-all duration-300 justify-center`}>
                        <div className='w-1/2'>
                            <button
                                type='button'
                                id='ativo'
                                name='ativo'
                                onClick={() => setFormProduto((prevProduto) => ({
                                    ...prevProduto,
                                    ativo: !prevProduto.ativo,
                                }))}
                                className={`cursor-pointer transition-all duration-300 shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 ${formProduto.ativo ? 'bg-green-200 -translate-x-14 rounded-l-2xl' : 'bg-red-300 translate-x-14 rounded-r-2xl'}`}
                            >
                                {formProduto.ativo ? 'Ativo' : 'Inativo'}
                            </button>
                        </div>
                    </div>
                </div>
                <div className='w-full flex justify-center items-center flex-wrap gap-2'>
                    <div className='mb-4'>
                        <label className='block text-amber-100 text-sm font-bold mb-2' htmlFor='criadoEm'>Criado em</label>
                        <input
                            type='date'
                            id='criadoEm'
                            name='criadoEm'
                            value={formProduto.criadoEm ? new Date(formProduto.criadoEm).toISOString().split('T')[0] : ''}
                            onChange={handleChange}
                            className='shadow appearance-none border border-amber-100 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline'
                        />
                    </div>
                    {!formProduto.ativo && (
                        <div className='mb-4'>
                            <label className='block text-amber-100 text-sm font-bold mb-2' htmlFor='inativoEm'>Inativo Em</label>
                            <input
                                type='date'
                                id='inativoEm'
                                name='inativoEm'
                                value={formProduto.inativoEm ? new Date(formProduto.inativoEm).toISOString().split('T')[0] : new Date(Date.now()).toISOString().split('T')[0]}
                                onChange={handleChange}
                                className='shadow appearance-none border border-amber-100 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline'
                            />
                        </div>
                    )}
                </div>
                <div className='flex items-center justify-between'>
                    <button
                        type='submit'
                        className='cursor-pointer bg-blue-900 hover:bg-blue-800 transition-all linear duration-75 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center'
                    >
                        <FaSave className='mr-2' /> {mode === 'edit' ? 'Salvar' : 'Criar'}
                    </button>
                </div>
            </form>
        </motion.div>
    );
};
