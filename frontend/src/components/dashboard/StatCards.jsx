import { motion } from "framer-motion";
import {
  HiOutlineDocumentText,
  HiOutlineShieldCheck,
  HiOutlineClock,
  HiOutlineCubeTransparent,
} from "react-icons/hi2";
import { Card } from "../ui";
import { mockStats } from "../../data/mockDashboard";

const ICONS = {
  docs: HiOutlineDocumentText,
  verified: HiOutlineShieldCheck,
  pending: HiOutlineClock,
  onchain: HiOutlineCubeTransparent,
};

const TONE = {
  blue: "text-th-blue-bright bg-th-blue/15",
  emerald: "text-th-emerald bg-th-emerald/15",
  purple: "text-th-purple-bright bg-th-purple/15",
  cyan: "text-th-cyan bg-th-cyan/15",
};

function StatCards() {
  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {mockStats.map((stat, index) => {
        const Icon = ICONS[stat.id];
        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + index * 0.06, duration: 0.45 }}
          >
            <Card padding="compact" className="h-full">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                    {stat.label}
                  </p>
                  <p className="mt-2 font-display text-3xl font-bold tracking-tight text-white">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{stat.delta}</p>
                </div>
                <span
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${TONE[stat.tone]}`}
                >
                  <Icon size={18} />
                </span>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </section>
  );
}

export default StatCards;
