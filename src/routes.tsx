import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Produtos } from "./pages/Produtos";
import { Home } from "./pages/Home";
import { EditForm } from "./pages/EditarProduto";
import { EditForm as EditVenda } from "./pages/EditarVenda";
import { useParams } from "react-router-dom";
import { CreateForm } from "./pages/NovoProduto";
import { Vendas } from "./pages/Vendas";
import { NewVendaForm } from "./pages/NovaVenda";

const ProdutoWrapper = () => {
    const { id } = useParams<{ id: string }>();
    return <EditForm id={Number(id)} />;
};
const VendaWrapper = () => {
    const { id } = useParams<{ id: string }>();
    return <EditVenda id={Number(id)} />;
};
const CreateFormWrapper = () => {
    const { id } = useParams<{ id: string }>();
    return <CreateForm id={Number(id)} />;
};
const NewVendaWrapper = () => {
    const { id } = useParams<{ id: string }>();
    return <NewVendaForm id={Number(id)} />;
}

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/produtos/edit/:id" element={<ProdutoWrapper />} />
                <Route path="/produtos/new" element={<CreateForm />} />
                <Route path="/produtos/new/:id" element={<CreateFormWrapper />} />
                <Route path="/vendas" element={<Vendas />} />
                <Route path="/vendas/edit" element={<Vendas />} />
                <Route path="/vendas/edit/:id" element={<VendaWrapper />} />
                <Route path="/vendas/new" element={<NewVendaForm />} />
                <Route path="/vendas/new/:id" element={<NewVendaWrapper />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
};