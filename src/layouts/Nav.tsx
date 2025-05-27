import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaWarehouse, FaBoxes, FaAngleDoubleUp, FaAngleDoubleDown } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';

interface MenuItem {
    label: string;
    path: string;
    icon: React.ReactNode;
}

export function Nav() {
    const location = useLocation();
    const [activePath, setActivePath] = useState<string>(location.pathname);
    const [expanded, setExpanded] = useState<boolean>(true)

    useEffect(() => {
        setActivePath(location.pathname);
        setExpanded(false)
    }, [location.pathname]);

    const menuItems: MenuItem[] = [
        { label: 'Home', path: '/', icon: <FaHome /> },
        { label: 'Produtos', path: '/produtos', icon: <FaBoxes /> },
        { label: 'Vendas', path: '/vendas', icon: <FaShoppingCart /> },
        { label: 'Estoque', path: '/estoque', icon: <FaWarehouse /> },
    ];

    return (
        <nav className={`absolute flex flex-col top-20 ${expanded ? 'min-w-20 sm:w-44 h-auto' : 'min-w-12 h-5'} z-20 shadow-md shadow-slate-500/30 rounded-br-2xl bg-gray-900/95 items-center justify-center py-6 border-r border-gray-800`}>
            {expanded && (
                <>
                    <span className="text-white text-base font-semibold mb-6 tracking-wide">Acessos</span>
                    <hr className="w-3/4 border-gray-700 mb-6" />
                    <ul className="flex sm:flex-col flex-row gap-2 w-full px-4">
                        <li>
                            <div className="flex flex-col gap-2 w-full">
                                {menuItems.map((link, i) => (
                                    <Link
                                        key={link.label + '-' + i}
                                        to={link.path}
                                        className={`flex items-center gap-2 py-2 px-3 rounded-md text-gray-200 hover:bg-gray-800 hover:text-white transition font-medium text-center ${(link.path === '/' ? activePath === '/' : activePath.startsWith(link.path))
                                            ? 'bg-gray-800 text-amber-300 font-bold'
                                            : ''
                                            }`}
                                    >
                                        {link.icon}
                                        <span className="hidden sm:inline">{link.label}</span>
                                    </Link>
                                ))}
                            </div>
                        </li>
                    </ul>

                    <hr className="w-3/4 border-gray-700 mt-4" />
                </>
            )}

            <div
                onClick={() => { setExpanded((prev) => !prev) }}
                className={`rounded-full bg-gray-800 p-1 cursor-pointer ${expanded && 'mt-5'}`}>
                {expanded ? <FaAngleDoubleUp className='text-gray-400 text-lg' /> : <FaAngleDoubleDown className='text-gray-400 text-lg' />}
            </div>
        </nav>
    )
}