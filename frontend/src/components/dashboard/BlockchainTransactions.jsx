import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import { Card } from "../ui";
import { mockTransactions } from "../../data/mockDashboard";

function BlockchainTransactions() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.28, duration: 0.45 }}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-display text-lg font-bold tracking-tight">
          Recent blockchain transactions
        </h3>
        <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-slate-400">
          Sepolia mock
        </span>
      </div>

      <Card padding="compact">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs tracking-wide text-slate-500 uppercase">
                <th className="pb-3 font-medium">Tx hash</th>
                <th className="pb-3 font-medium">Action</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Block</th>
                <th className="pb-3 font-medium">Gas</th>
                <th className="pb-3 font-medium">When</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockTransactions.map((tx) => (
                <tr key={tx.id} className="text-slate-300">
                  <td className="py-3 pr-3">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-th-cyan transition hover:text-white"
                    >
                      {tx.hash}
                      <FiExternalLink size={12} />
                    </button>
                  </td>
                  <td className="py-3 pr-3 text-white">{tx.action}</td>
                  <td className="py-3 pr-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        tx.status === "Confirmed"
                          ? "bg-th-emerald/15 text-th-emerald"
                          : "bg-amber-400/15 text-amber-300"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-3 pr-3 font-mono text-xs text-slate-400">{tx.block}</td>
                  <td className="py-3 pr-3 text-xs">{tx.gas}</td>
                  <td className="py-3 text-xs text-slate-500">{tx.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.section>
  );
}

export default BlockchainTransactions;
