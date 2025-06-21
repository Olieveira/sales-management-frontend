import React from "react";
import Header from "./Header";
import { Nav } from "./Nav";
import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AlertProvider } from "../components/AlertContext";

const Layout: React.FC = () => {

  return (
    <AlertProvider>
      <div className="min-h-screen max-w-full flex flex-col bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950">
        <Header />
        <AnimatePresence>
          <Nav />
        </AnimatePresence>
        <div className="flex flex-1 h-fit">
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </AlertProvider>
  );
};

export default Layout;
