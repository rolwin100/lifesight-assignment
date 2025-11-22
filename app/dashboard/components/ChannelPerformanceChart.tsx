'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useDashboard } from '../hooks/useDashboard';
import { aggregateByChannel } from '@/lib/utils/calculations';
import styles from '../styles/components.module.css';

// Dynamically import the chart to reduce initial bundle size
const ChartJSChart = dynamic(
  () => import('./ChartJSChart'),
  { ssr: false, loading: () => <div className={styles.chartLoading}>Loading chart...</div> }
);

export const ChannelPerformanceChart = React.memo(function ChannelPerformanceChart() {
  const { state } = useDashboard();
  const { filteredData } = state;

  const chartData = useMemo(() => {
    const channelAggregates = aggregateByChannel(filteredData);
    // Sort by spend descending and take top 10
    const sortedChannels = channelAggregates
      .sort((a, b) => b.spend - a.spend)
      .slice(0, 10);
    
    return sortedChannels.map((channel) => ({
      name: channel.channel,
      spend: Math.round(channel.spend),
      conversions: channel.conversions,
      ctr: ((channel.conversions / channel.impressions) * 100).toFixed(2),
    }));
  }, [filteredData]);

  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.chartTitle}>Performance Insights by Channel</h2>
      <div className={styles.chartWrapper}>
        <ChartJSChart data={chartData} />
      </div>
    </div>
  );
});

