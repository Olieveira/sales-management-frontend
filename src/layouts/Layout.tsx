import React from "react";
import Header from "./Header";
import { Nav } from "./Nav";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => (
  <div className="min-h-screen max-w-full flex flex-col bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950">
    <Header />
    <div className="flex flex-1 h-fit">
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  </div>
);

export default Layout;
