import { motion } from "framer-motion";
import { Card } from "../ui";
import { mockActivity } from "../../data/mockDashboard";

const DOT = {
  anchor: "bg-th-blue shadow-[0_0_10px_rgba(59,130,246,0.6)]",
  verify: "bg-th-emerald shadow-[0_0_10px_rgba(16,185,129,0.55)]",
  upload: "bg-th-purple shadow-[0_0_10px_rgba(139,92,246,0.55)]",
  alert: "bg-rose-400 shadow-[0_0_10px_rgba(251,113,133,0.5)]",
  profile: "bg-th-cyan shadow-[0_0_10px_rgba(34,211,238,0.5)]",
};

function ActivityTimeline() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.22, duration: 0.45 }}
    >
      <h3 className="mb-4 font-display text-lg font-bold tracking-tight">Activity timeline</h3>
      <Card padding="compact">
        <ol className="relative space-y-0">
          {mockActivity.map((item, index) => (
            <li key={item.id} className="relative flex gap-3 pb-5 last:pb-0">
              {index < mockActivity.length - 1 ? (
                <span
                  className="absolute top-3 left-[0.4rem] h-[calc(100%-0.25rem)] w-px bg-white/10"
                  aria-hidden="true"
                />
              ) : null}
              <span
                className={`relative z-[1] mt-1.5 h-2 w-2 shrink-0 rounded-full ${DOT[item.type]}`}
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <span className="text-xs text-slate-500">{item.time}</span>
                </div>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-400">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </Card>
    </motion.section>
  );
}

export default ActivityTimeline;
