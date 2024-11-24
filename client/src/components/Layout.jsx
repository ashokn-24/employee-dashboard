import { Outlet } from "react-router-dom";
import Nav from "./Nav";

const Layout = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Nav />
      <div className="container mx-auto p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
