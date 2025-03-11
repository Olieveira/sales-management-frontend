import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Produtos } from "./pages/Produtos";
import { Home } from "./pages/Home";
import { EditForm } from "./pages/editarProduto";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/produtos/edit/:id" element={<EditForm />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
};