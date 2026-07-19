import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card } from "../ui";
import { mockVerifications } from "../../data/mockDashboard";

function VerificationHistory() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.45 }}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-display text-lg font-bold tracking-tight">Verification history</h3>
        <Link to="/history" className="text-sm font-medium text-th-blue-bright hover:text-white">
          View all
        </Link>
      </div>

      <Card padding="compact">
        <ul className="divide-y divide-white/5">
          {mockVerifications.map((item) => (
            <li
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-2 py-3 first:pt-0 last:pb-0"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">{item.name}</p>
                <p className="text-xs text-slate-500">
                  {item.network} · {item.date}
                </p>
              </div>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  item.result === "Match"
                    ? "bg-th-emerald/15 text-th-emerald"
                    : "bg-rose-500/15 text-rose-300"
                }`}
              >
                {item.result}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </motion.section>
  );
}

export default VerificationHistory;
