import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Produtos } from "./pages/Produtos";
import { Home } from "./pages/Home";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/produtos" element={<Produtos />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
};