import React from 'react';
import { ProdutoForm } from '../components/ProdutoForm';

export const EditForm: React.FC<{ id: number }> = ({ id }) => {
    return <ProdutoForm mode="edit" id={id} />;
};
