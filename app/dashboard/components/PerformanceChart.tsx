'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useDashboard } from '../hooks/useDashboard';
import styles from '../styles/components.module.css';

// Dynamically import the chart to reduce initial bundle size
const ChartJSChart = dynamic(
  () => import('./ChartJSChart'),
  { ssr: false, loading: () => <div className={styles.chartLoading}>Loading chart...</div> }
);

export const PerformanceChart = React.memo(function PerformanceChart() {
  const { state } = useDashboard();
  const { regionAggregates } = state;

  const chartData = useMemo(() => {
    return regionAggregates.slice(0, 10).map((region) => ({
      name: region.region,
      spend: Math.round(region.spend),
      conversions: region.conversions,
      ctr: parseFloat((region.conversions / region.impressions) * 100).toFixed(2),
    }));
  }, [regionAggregates]);

  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.chartTitle}>Performance Insights by Region</h2>
      <div className={styles.chartWrapper}>
        <ChartJSChart data={chartData} />
      </div>
    </div>
  );
});
