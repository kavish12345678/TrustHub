import { NavLink, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlineHome,
  HiOutlineCloudArrowUp,
  HiOutlineShieldCheck,
  HiOutlineClock,
  HiOutlineUserCircle,
  HiOutlineCog6Tooth,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi2";
import { authService } from "../../services/authService";
import { useToast } from "../ui";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Overview", Icon: HiOutlineHome },
  { to: "/upload", label: "Upload", Icon: HiOutlineCloudArrowUp },
  { to: "/verify", label: "Verify", Icon: HiOutlineShieldCheck },
  { to: "/history", label: "History", Icon: HiOutlineClock },
  { to: "/profile", label: "Profile", Icon: HiOutlineUserCircle },
];

function Sidebar({ open, collapsed, onClose, onToggleCollapse }) {
  const navigate = useNavigate();
  const toast = useToast();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    toast.info("You have been signed out.", "Logged out");
    navigate("/login", { replace: true });
  };

  const linkClass = ({ isActive }) =>
    [
      "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition duration-200",
      isActive
        ? "bg-gradient-to-r from-th-blue/25 to-th-purple/20 text-white shadow-[inset_0_0_0_1px_rgba(99,102,241,0.35)]"
        : "text-slate-400 hover:bg-white/[0.04] hover:text-white",
      collapsed ? "justify-center px-2" : "",
    ].join(" ");

  return (
    <aside
      className={[
        "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/10 bg-[#070b16]/95 backdrop-blur-2xl transition-transform duration-300 lg:translate-x-0",
        collapsed ? "lg:w-[4.5rem]" : "lg:w-64",
        open ? "translate-x-0" : "-translate-x-full",
      ].join(" ")}
    >
      <div
        className={`flex h-16 items-center border-b border-white/10 px-4 ${
          collapsed ? "lg:justify-center lg:px-2" : "justify-between"
        }`}
      >
        <Link to="/dashboard" className="flex items-center gap-2.5" onClick={onClose}>
          <span className="h-8 w-8 shrink-0 rounded-lg bg-gradient-to-br from-th-blue to-th-purple shadow-[0_0_20px_rgba(99,102,241,0.4)]" />
          {!collapsed ? (
            <span className="font-display text-lg font-extrabold tracking-tight">TrustHub</span>
          ) : null}
        </Link>
        {!collapsed ? (
          <button
            type="button"
            className="hidden rounded-lg p-1.5 text-slate-400 transition hover:bg-white/5 hover:text-white lg:inline-flex"
            onClick={onToggleCollapse}
            aria-label="Collapse sidebar"
          >
            <HiOutlineChevronDoubleLeft size={18} />
          </button>
        ) : (
          <button
            type="button"
            className="absolute top-4 -right-3 hidden h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-[#0c1220] text-slate-300 lg:inline-flex"
            onClick={onToggleCollapse}
            aria-label="Expand sidebar"
          >
            <HiOutlineChevronDoubleRight size={12} />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Dashboard">
        {NAV_ITEMS.map(({ to, label, Icon }) => (
          <NavLink key={to} to={to} className={linkClass} onClick={onClose} title={label}>
            <Icon size={18} className="shrink-0" />
            {!collapsed ? <span>{label}</span> : null}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 p-3">
        {!collapsed && user ? (
          <div className="mb-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
            <p className="truncate text-sm font-semibold text-white">
              {user.firstName} {user.lastName}
            </p>
            <p className="truncate text-xs text-slate-500">{user.email}</p>
          </div>
        ) : null}

        <button
          type="button"
          className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition hover:bg-white/[0.04] hover:text-white ${
            collapsed ? "justify-center px-2" : ""
          }`}
          title="Settings"
        >
          <HiOutlineCog6Tooth size={18} />
          {!collapsed ? <span>Settings</span> : null}
        </button>

        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-rose-300/90 transition hover:bg-rose-500/10 hover:text-rose-200 ${
            collapsed ? "justify-center px-2" : ""
          }`}
          title="Log out"
        >
          <HiOutlineArrowLeftOnRectangle size={18} />
          {!collapsed ? <span>Log out</span> : null}
        </motion.button>
      </div>
    </aside>
  );
}

export default Sidebar;
