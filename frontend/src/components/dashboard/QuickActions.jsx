import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlineCloudArrowUp,
  HiOutlineShieldCheck,
  HiOutlineClock,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import { Card } from "../ui";
import { mockQuickActions } from "../../data/mockDashboard";

const ICONS = {
  upload: HiOutlineCloudArrowUp,
  verify: HiOutlineShieldCheck,
  history: HiOutlineClock,
  profile: HiOutlineUserCircle,
};

const TONE = {
  blue: "from-th-blue/30 to-th-blue/5 text-th-blue-bright",
  purple: "from-th-purple/30 to-th-purple/5 text-th-purple-bright",
  cyan: "from-th-cyan/25 to-th-cyan/5 text-th-cyan",
  emerald: "from-th-emerald/25 to-th-emerald/5 text-th-emerald",
};

function QuickActions() {
  return (
    <section>
      <h3 className="mb-4 font-display text-lg font-bold tracking-tight">Quick actions</h3>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {mockQuickActions.map((action, index) => {
          const Icon = ICONS[action.id];
          return (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + index * 0.05, duration: 0.4 }}
            >
              <Link to={action.to} className="block h-full">
                <Card hoverable padding="compact" className="h-full">
                  <div
                    className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${TONE[action.tone]}`}
                  >
                    <Icon size={18} />
                  </div>
                  <p className="text-sm font-semibold text-white">{action.title}</p>
                  <p className="mt-1 text-xs text-slate-400">{action.description}</p>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default QuickActions;
