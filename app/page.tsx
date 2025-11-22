'use client';

import React, { useMemo } from 'react';
import { DashboardProvider } from './dashboard/context/DashboardProvider';
import { DataTable } from './dashboard/components/DataTable';
import { FilterBar } from './dashboard/components/FilterBar';
import { TotalsCard } from './dashboard/components/TotalsCard';
import { PerformanceChart } from './dashboard/components/PerformanceChart';
import { ChannelPerformanceChart } from './dashboard/components/ChannelPerformanceChart';
import marketingData from './marketing_dashboard_data.json';
import { MarketingRecord } from '@/types/dashboard';
import styles from './dashboard/styles/dashboard.module.css';

export default function DashboardPage() {
  const data = useMemo(() => marketingData as MarketingRecord[], []);

  return (
    <DashboardProvider data={data}>
      <div className={styles.dashboard}>
        <div className={styles.dashboardContainer}>
          <header className={styles.dashboardHeader}>
            <h1 className={styles.dashboardTitle}>Marketing Dashboard</h1>
            <p className={styles.dashboardSubtitle}>
              Performance analytics and insights across regions and channels
            </p>
          </header>

          <div className={styles.dashboardContent}>
            <TotalsCard />
            <FilterBar />
            <DataTable />
            <PerformanceChart />
            <ChannelPerformanceChart />
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
}

