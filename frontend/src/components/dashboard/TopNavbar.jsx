import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  HiOutlineBars3,
  HiOutlineBell,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";
import { authService } from "../../services/authService";
import { mockNotifications } from "../../data/mockDashboard";

function TopNavbar({ title, onMenuClick }) {
  const user = authService.getCurrentUser();
  const [openNotifs, setOpenNotifs] = useState(false);
  const initials = user
    ? `${(user.firstName || "T")[0]}${(user.lastName || "H")[0]}`.toUpperCase()
    : "TH";

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#050816]/75 backdrop-blur-2xl backdrop-saturate-150">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition hover:bg-white/5 hover:text-white lg:hidden"
          onClick={onMenuClick}
          aria-label="Open sidebar"
        >
          <HiOutlineBars3 size={20} />
        </button>

        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium tracking-wide text-slate-500 uppercase">
            Workspace
          </p>
          <h1 className="truncate font-display text-lg font-bold tracking-tight text-white sm:text-xl">
            {title}
          </h1>
        </div>

        <div className="hidden max-w-xs flex-1 md:block lg:max-w-sm">
          <label className="relative block">
            <span className="sr-only">Search</span>
            <HiOutlineMagnifyingGlass
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-500"
              size={16}
            />
            <input
              type="search"
              placeholder="Search documents, hashes…"
              className="th-input w-full !min-h-10 border-white/10 bg-white/[0.03] pl-9 text-sm"
            />
          </label>
        </div>

        <div className="relative">
          <button
            type="button"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition hover:bg-white/5 hover:text-white"
            aria-label="Notifications"
            onClick={() => setOpenNotifs((v) => !v)}
          >
            <HiOutlineBell size={18} />
            <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-th-cyan shadow-[0_0_8px_#22d3ee]" />
          </button>

          <AnimatePresence>
            {openNotifs ? (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                className="absolute right-0 mt-2 w-72 overflow-hidden rounded-2xl border border-white/10 bg-[#0c1220]/95 shadow-2xl backdrop-blur-xl"
              >
                <div className="border-b border-white/10 px-4 py-3 text-sm font-semibold">
                  Notifications
                </div>
                <ul className="max-h-64 divide-y divide-white/5">
                  {mockNotifications.map((item) => (
                    <li key={item.id} className="px-4 py-3 text-sm">
                      <p className="text-slate-200">{item.text}</p>
                      <p className="mt-1 text-xs text-slate-500">{item.time} ago</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <Link
          to="/profile"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] py-1.5 pr-3 pl-1.5 transition hover:border-white/20 hover:bg-white/[0.05]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-th-blue to-th-purple text-xs font-bold">
            {initials}
          </span>
          <span className="hidden text-sm font-medium sm:inline">
            {user?.firstName || "Guest"}
          </span>
        </Link>
      </div>
    </header>
  );
}

export default TopNavbar;
