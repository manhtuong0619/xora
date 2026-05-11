import { ScrollArea } from '@/components/ui/scroll-area';
import { PageShell } from '@/components/xora/layout/page-shell';
import { ProfileHero } from '@/components/xora/profile/profile-hero';
import { RecentConversations } from '@/components/xora/profile/recent-conversations';
import { SettingsSection } from '@/components/xora/profile/settings-section';
import { StatsGrid } from '@/components/xora/profile/stats-grid';
import { UsageChart } from '@/components/xora/profile/usage-chart';
import { WalletCard } from '@/components/xora/profile/wallet-card';

export default function ProfilePage() {
  return (
    <PageShell initialCollapsedSidebar>
      <ScrollArea className="flex-1 min-h-0">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-5 py-8">
          <ProfileHero />
          <StatsGrid />
          <WalletCard />
          <RecentConversations />
          <UsageChart />
          <SettingsSection />
        </div>
      </ScrollArea>
    </PageShell>
  );
}
