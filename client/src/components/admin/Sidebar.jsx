import { NavLink } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>

      <NavLink
        to="/admin"
        className="flex items-center gap-2 text-gray-300 hover:text-white"
      >
        <LayoutDashboard size={18} />
        Dashboard
      </NavLink>
    </aside>
  );
};

export default Sidebar;
