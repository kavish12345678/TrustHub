import { motion } from "framer-motion";
import { Card } from "../ui";
import { mockStorage } from "../../data/mockDashboard";

function StorageUsage() {
  const percent = Math.round((mockStorage.usedGb / mockStorage.totalGb) * 100);

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.24, duration: 0.45 }}
    >
      <h3 className="mb-4 font-display text-lg font-bold tracking-tight">Storage usage</h3>
      <Card padding="compact">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="font-display text-2xl font-bold text-white">
              {mockStorage.usedGb}{" "}
              <span className="text-base font-medium text-slate-500">/ {mockStorage.totalGb} GB</span>
            </p>
            <p className="mt-1 text-xs text-slate-400">{percent}% of plan used</p>
          </div>
          <span className="rounded-full bg-th-blue/15 px-2.5 py-0.5 text-xs font-semibold text-th-blue-bright">
            Free plan
          </span>
        </div>

        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-th-blue via-th-purple to-th-cyan"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          />
        </div>

        <ul className="mt-5 space-y-2.5">
          {mockStorage.breakdown.map((item) => (
            <li key={item.label} className="flex items-center justify-between gap-3 text-sm">
              <span className="inline-flex items-center gap-2 text-slate-300">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                  aria-hidden="true"
                />
                {item.label}
              </span>
              <span className="font-medium text-slate-400">{item.value}%</span>
            </li>
          ))}
        </ul>
      </Card>
    </motion.section>
  );
}

export default StorageUsage;
