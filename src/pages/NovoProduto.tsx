import React from 'react';
import { ProdutoForm } from '../components/produto/ProdutoForm';

interface CreateFormProps {
    id?: number;
}

export const CreateForm: React.FC<CreateFormProps> = ({ id }) => {
    return <ProdutoForm mode="create" id={id} />;
};
