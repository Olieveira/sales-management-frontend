import { useEstoque } from '../hooks/useEstoque';
import { Loading } from '../components/Loading';
import { EstoqueList } from '../components/EstoqueList';
import { AnimatePresence, motion } from 'framer-motion';
import { NenhumRegistroFull } from '../components/NenhumRegistro';
import { useEffect, useState } from 'react';
import { useAlert } from '../components/AlertContext';
import { useSelectAlert } from '../components/AlertContext';
import { createEstoque, deleteEstoque, Estoque as EstoqueType, getEstoqueById, Estoque as TypeEstoque, updateEstoque } from '../services/estoqueService';
import { FaWindowClose } from 'react-icons/fa';
import { useFornecedor } from '../hooks/useFornecedor';
import { useNavigate } from 'react-router-dom';
import { Fornecedor } from '../services/fornecedorService';

interface EstoqueProps {
    id?: number
}

export const Estoque: React.FC<EstoqueProps> = ({ id }) => {
    const [selectedOrigItem, setSelectedOrigItem] = useState<TypeEstoque | null>(null);
    const [selectedItem, setSelectedItem] = useState<TypeEstoque | null>(null);
    const [selectedItemMode, setSelectedItemMode] = useState<string>('edit');

    const { data: fornecedores } = useFornecedor();
    const { data: estoque, isLoading, error } = useEstoque();
    const showAlert = useAlert();
    const startSelectAlert = useSelectAlert();
    const navigate = useNavigate();

    useEffect(() => {
        if (id !== undefined) {
            // novo material
            if (id === 0) {
                setSelectedItemMode("create");
                const fornecedor = { nome: "", contato: "", link: "" } as Fornecedor
                setSelectedItem({
                    nome: "",
                    quantidade: 0,
                    unidade: "",
                    estoqueMin: 0,
                    criadoEm: new Date(Date.now()).toISOString().split('T')[0],
                    fornecedor: {
                        nome: fornecedor.nome,
                        contato: fornecedor.contato,
                        link: fornecedor.link
                    },

                } as TypeEstoque);
                // duplicar material
            } else if (id > 0) {
                setSelectedItemMode("create");
                getEstoqueById(id).then((estoque) => {
                    setSelectedItem(estoque);
                    setSelectedOrigItem(estoque);
                }).catch((error) => {
                    console.error("Erro ao encontrar material para duplicar!\n", error);
                });
            } else {
                navigate('/estoque');
            }
        }
    }, [id])

    const handleSubmitEdit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedItem === selectedOrigItem) {
            showAlert("Nenhuma alteração realizada!");
            return;
        }

        if (!selectedItem?.nome || selectedItem.quantidade == null || selectedItem.unidade === "" ||
            selectedItem.estoqueMin == null || !selectedItem.criadoEm || !selectedItem.fornecedor.nome) {
            showAlert("Preencha todos os campos!");
            return;
        }

        try {
            await updateEstoque(selectedItem.idMaterial, selectedItem);
            showAlert("Material atualizado com sucesso!")
        } catch (error) {
            console.log("Erro ao atualizar material!\n", error)
            showAlert("Erro ao atualizar material!")
        }

        navigate("/estoque");
        window.location.reload();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setSelectedItem((prev) => ({
            ...(prev as TypeEstoque),
            [name]: [value],
        }));
    };

    const handleSubmitCreate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedItem?.nome || selectedItem.quantidade == null || selectedItem.unidade === "" ||
            selectedItem.estoqueMin == null || !selectedItem.criadoEm || !selectedItem.fornecedor.nome) {
            showAlert("Preencha todos os campos!");
            return;
        }

        try {
            await createEstoque(selectedItem);
            showAlert("Material criado com sucesso!");
        } catch (error) {
            console.error("Erro ao criar material!\n", error);
            showAlert("Erro ao criar material!");
        }

        navigate("/estoque");
        window.location.reload();
    }

    const handleFornecedorChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'name') {
            const fornecedor = fornecedores?.find((fornecedor) => fornecedor.nome === value);
            if (!fornecedor) return;

            setSelectedItem((prev) => {
                if (!prev) return prev;
                return {
                    ...prev,
                    idFornecedor: fornecedor.idFornecedor || 0,
                    fornecedor: {
                        nome: fornecedor.nome,
                        contato: fornecedor.contato || "",
                        link: fornecedor.link || ""
                    },
                };
            });

        } else {
            setSelectedItem((prev) => {
                if (!prev) return prev;
                return {
                    ...prev,
                    fornecedor: {
                        ...prev.fornecedor,
                        [name]: value,
                    },
                };
            });
        }
    };

    const handleEditClick = (item: EstoqueType) => {
        setSelectedItemMode('edit');
        setSelectedItem(item);
    };

    const handleDelete = async (idMaterial: number, nome: string) => {
        if (await startSelectAlert(`Tem certeza que deseja excluir o material (${nome})?`, 'boolean')) {
            try {
                const result = await deleteEstoque(idMaterial);
                if (result.success) {
                    showAlert(`Material (${nome}) excluído com sucesso!`)
                    setTimeout(() => window.location.reload(), 3000)
                } else {
                    console.error('Erro ao excluir material')
                    showAlert(`Erro ao excluir o material (${nome}), certifique-se que o mesmo não possui vínculos com produtos.`)
                }
            } catch (error) {
                console.error('Erro ao excluir material')
                showAlert(`Erro ao excluir o material (${nome}), certifique-se que o mesmo não possui vínculos com produtos.`)
            }
        }
    }
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
                                <EstoqueList estoque={estoque}
                                    handleDelete={handleDelete}
                                    handleEditClick={handleEditClick}
                                />
                            )}
                        </div>
                    </div>
                )}

                {/* Nenhum material cadastrado */}
                {(estoque && estoque.length <= 0 && id == undefined) && (
                    <NenhumRegistroFull pagina='estoque' />
                )}

                {/* Form CRUD */}
                <AnimatePresence>
                    {selectedItem && (
                        <motion.div className="fixed z-20 inset-0 bg-black/70 bg-opacity-50 flex justify-center items-center px-5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: 'easeInOut', type: 'spring' }}
                        >
                            <FaWindowClose size={28}
                                className='cursor-pointer fixed top-5 w-auto bg-red-200 p-0.5 rounded-full text-gray-800'
                                onClick={() => {
                                    setSelectedItem(null);
                                    navigate('/estoque');
                                }}
                            />
                            <div className="bg-gray-700 rounded-lg shadow-md p-5 w-full max-w-lg h-fit mx-3 max-h-11/12 overflow-y-auto">
                                <h3 className="text-amber-100 text-lg font-bold mb-4">{selectedItemMode == 'edit' ? 'Editar' : 'Criar'} Item</h3>
                                <form onSubmit={selectedItemMode == 'edit' ? handleSubmitEdit : handleSubmitCreate}>
                                    <div className="mb-4">
                                        <label className="block text-amber-100 text-sm font-bold mb-2">Produto</label>
                                        <input
                                            type="text"
                                            id="nome"
                                            name="nome"
                                            value={selectedItem.nome}
                                            className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                                            onChange={(e) =>
                                                setSelectedItem({ ...selectedItem, nome: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-amber-100 text-sm font-bold mb-2">Quantidade</label>
                                        <input
                                            type="number"
                                            value={selectedItem.quantidade}
                                            className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                                            onChange={(e) =>
                                                setSelectedItem({ ...selectedItem, quantidade: parseInt(e.target.value) })
                                            }
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-amber-100 text-sm font-bold mb-2">Unidade</label>
                                        <input
                                            type="text"
                                            value={selectedItem.unidade}
                                            className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                                            onChange={(e) =>
                                                setSelectedItem({ ...selectedItem, unidade: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-amber-100 text-sm font-bold mb-2">Estoque Min.</label>
                                        <input
                                            type="number"
                                            value={selectedItem.estoqueMin}
                                            className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                                            onChange={(e) =>
                                                setSelectedItem({ ...selectedItem, estoqueMin: parseInt(e.target.value) })
                                            }
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-amber-100 text-sm font-bold mb-2">Criado em</label>
                                        <input
                                            type="date"
                                            id="criadoEm"
                                            name="criadoEm"
                                            value={new Date(selectedItem.criadoEm).toISOString().split('T')[0]}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                                        />
                                    </div>
                                    <div className="mb-4 border-t border-gray-600 pt-4">
                                        <div className="mb-4">
                                            <label className="block text-amber-100 text-sm font-bold mb-2">Fornecedor</label>
                                            <select
                                                name="name"
                                                className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded cursor-pointer"
                                                value={selectedItem.fornecedor.nome}
                                                onChange={handleFornecedorChange}
                                            >
                                                <option value="0">Selecione um fornecedor</option>
                                                {fornecedores?.map((fornecedor) => (
                                                    <option key={fornecedor.idFornecedor} value={fornecedor.nome}>
                                                        {fornecedor.nome}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-amber-100 text-sm font-bold mb-2">Contato</label>
                                            <input
                                                name="contato"
                                                type="text"
                                                value={selectedItem.fornecedor.contato}
                                                className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                                                onChange={handleFornecedorChange}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-amber-100 text-sm font-bold mb-2">Link</label>
                                            <input
                                                name="link"
                                                type="text"
                                                value={selectedItem.fornecedor.link}
                                                className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                                                onChange={handleFornecedorChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded mr-2"
                                            onClick={() => {
                                                setSelectedItem(null);
                                                navigate('/estoque');
                                            }}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded"
                                        >
                                            {selectedItemMode == 'edit' ? 'Salvar' : 'Criar'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    )
                    }
                </AnimatePresence>

            </motion.div>
        </AnimatePresence>
    );
};

export default Estoque;
