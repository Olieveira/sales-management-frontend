import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <div className='h-screen flex justify-center items-center overflow-hidden'>
            <div className='grid grid-cols-2 gap-4 w-75 items-center justify-center'>

                <Link to="/produtos" className="shadow-2xl shadow-gray-600  duration-100 cursor-pointer hover:rounded-4xl hover:w-36 hover:h-36 w-32 h-32 rounded-2xl border-4 border-fuchsia-200 bg-fuchsia-300 flex justify-center items-center">
                    <h2 className='font-bold text-gray-700 text-lg'>Produtos</h2>
                </Link>

                <Link to="/vendas" className="shadow-2xl shadow-gray-600 transition-all duration-100 cursor-pointer hover:rounded-4xl hover:w-36 hover:h-36 w-32 h-32 rounded-2xl border-4 border-blue-200 bg-blue-300 flex justify-center items-center">
                    <h2 className='font-bold text-gray-700 text-lg'>Vendas</h2>
                </Link>

                <Link to="/estoque" className="shadow-2xl shadow-gray-600 transition-all duration-100 cursor-pointer hover:rounded-4xl hover:w-36 hover:h-36 w-32 h-32 rounded-2xl border-4 border-green-200 bg-green-300 flex justify-center items-center">
                    <h2 className='font-bold text-gray-700 text-lg'>Estoque</h2>
                </Link>

                <Link to="/" className="shadow-2xl shadow-gray-600 transition-all duration-100 cursor-pointer hover:rounded-4xl hover:w-36 hover:h-36 w-32 h-32 rounded-2xl border-4 border-amber-200 bg-amber-300 flex justify-center items-center">
                    <h2 className='font-bold text-gray-700 text-lg'>Fabricação</h2>
                </Link>

                <div className='absolute bg-[url(./assets/logo.png)] h-full flex justify-items-start items-start w-full bg-repeat bg-contain bg-center left-0 top-1 blur-sm -z-10 opacity-85' />

            </div>
        </div>
    );
};