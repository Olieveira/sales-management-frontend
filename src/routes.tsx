import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Produtos } from "./pages/Produtos";
import { Home } from "./pages/Home";
import { EditForm } from "./pages/EditarProduto";
import { useParams } from "react-router-dom";
import { CreateForm } from "./pages/NovoProduto";

const EditFormWrapper = () => {
    const { id } = useParams<{ id: string }>();
    return <EditForm id={Number(id)} />;
};
const CreateFormWrapper = () => {
    const { id } = useParams<{ id: string }>();
    return <CreateForm id={Number(id)} />;
};

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/produtos/edit/:id" element={<EditFormWrapper />} />
                <Route path="/produtos/new" element={<CreateForm />} />
                <Route path="/produtos/new/:id" element={<CreateFormWrapper />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
};