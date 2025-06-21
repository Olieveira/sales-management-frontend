import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaWarehouse, FaBoxes, FaAngleDoubleUp, FaAngleDoubleDown } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface MenuItem {
    label: string;
    path: string;
    icon: React.ReactNode;
}

export function Nav() {
    const location = useLocation();
    const [activePath, setActivePath] = useState<string>(location.pathname);
    const [expanded, setExpanded] = useState<boolean>(true)
    const [screenWidth, setScreenWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [])

    useEffect(() => {
        setActivePath(location.pathname)
        setExpanded(window.innerHeight > 640)
    }, [location.pathname]);

    const menuItems: MenuItem[] = [
        { label: 'Home', path: '/', icon: <FaHome /> },
        { label: 'Produtos', path: '/produtos', icon: <FaBoxes /> },
        { label: 'Vendas', path: '/vendas', icon: <FaShoppingCart /> },
        { label: 'Estoque', path: '/estoque', icon: <FaWarehouse /> },
    ];

    return (
        <AnimatePresence>
            <motion.nav
                initial={{ x: -100, width: 48 }}
                animate={{ x: 0, width: expanded ? 176 : 48 }}
                exit={{ x: -100, width: 48 }}
                transition={{ duration: 0.8, ease: 'easeInOut', type: 'spring' }}
                className={`fixed flex flex-col z-20 ${(!expanded || screenWidth < 640) && 'top-20'} py-6 shadow-md shadow-slate-500/30 ${expanded ? 'sm:rounded-br-none' : 'sm:rounded-br-2xl'} sm:rounded-tr-none rounded-tr-2xl rounded-br-2xl bg-gray-900/95 items-center justify-center border-r border-gray-800 ${expanded ? screenWidth > 640 ? 'h-dvh' : 'h-fit' : 'h-5'}`}>

                {expanded && (
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'easeInOut', type: 'spring' }}
                    >
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
                                            <span className='p-1'>{link.label}</span>
                                        </Link>
                                    ))}
                                </div>
                            </li>
                        </ul>
                        <hr className="w-3/4 border-gray-700 mt-4" />
                    </motion.div>
                )}
                <motion.div
                    onClick={() => { setExpanded((prev) => !prev) }}
                    className={`rounded-full bg-gray-800 p-1 cursor-pointer ${expanded && 'mt-5'}`}>
                    {expanded ? <FaAngleDoubleUp className='text-gray-400 text-lg' /> : <FaAngleDoubleDown className='text-gray-400 text-lg' />}
                </motion.div>
            </motion.nav>
        </AnimatePresence>
    )
}