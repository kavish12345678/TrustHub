import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card } from "../ui";
import { mockUploads } from "../../data/mockDashboard";

const STATUS_CLASS = {
  Anchored: "bg-th-blue/15 text-th-blue-bright",
  Pending: "bg-amber-400/15 text-amber-300",
  Verified: "bg-th-emerald/15 text-th-emerald",
};

function RecentUploads() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.45 }}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-display text-lg font-bold tracking-tight">Recent uploads</h3>
        <Link to="/upload" className="text-sm font-medium text-th-blue-bright hover:text-white">
          Upload new
        </Link>
      </div>

      <Card padding="compact">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs tracking-wide text-slate-500 uppercase">
                <th className="pb-3 font-medium">Document</th>
                <th className="pb-3 font-medium">Hash</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">When</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockUploads.map((row) => (
                <tr key={row.id} className="text-slate-300">
                  <td className="py-3 pr-3">
                    <p className="font-medium text-white">{row.name}</p>
                    <p className="text-xs text-slate-500">{row.size}</p>
                  </td>
                  <td className="py-3 pr-3 font-mono text-xs text-th-cyan/90">{row.hash}</td>
                  <td className="py-3 pr-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_CLASS[row.status]}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 text-xs text-slate-500">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.section>
  );
}

export default RecentUploads;
