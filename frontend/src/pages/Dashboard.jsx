import DashboardLayout from "../layouts/DashboardLayout";
import {
  WelcomeSection,
  QuickActions,
  StatCards,
  RecentUploads,
  VerificationHistory,
  ActivityTimeline,
  StorageUsage,
  BlockchainTransactions,
} from "../components/dashboard";

function Dashboard() {
  return (
    <DashboardLayout title="Overview">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 lg:gap-8">
        <WelcomeSection />
        <StatCards />
        <QuickActions />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-8">
          <RecentUploads />
          <VerificationHistory />
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-8">
          <StorageUsage />
          <ActivityTimeline />
        </div>

        <BlockchainTransactions />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
