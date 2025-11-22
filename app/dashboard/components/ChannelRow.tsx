'use client';

import React, { useMemo } from 'react';
import { MarketingRecord } from '@/types/dashboard';
import { calculateCTR } from '@/lib/utils/calculations';
import styles from '../styles/table.module.css';

interface ChannelRowProps {
  records: MarketingRecord[];
  region: string;
}

export const ChannelRow = React.memo(function ChannelRow({
  records,
  region,
}: ChannelRowProps) {
  const aggregated = useMemo(() => {
    return records.reduce(
      (acc, record) => ({
        channel: record.channel,
        spend: acc.spend + record.spend,
        impressions: acc.impressions + record.impressions,
        conversions: acc.conversions + record.conversions,
        clicks: acc.clicks + record.clicks,
      }),
      {
        channel: records[0].channel,
        spend: 0,
        impressions: 0,
        conversions: 0,
        clicks: 0,
      }
    );
  }, [records]);

  const ctr = useMemo(
    () => calculateCTR(aggregated.conversions, aggregated.impressions),
    [aggregated.conversions, aggregated.impressions]
  );

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  return (
    <tr className={styles.channelRow}>
      <td className={styles.channelCell}>
        <span className={styles.channelIndent}>└─ {aggregated.channel}</span>
      </td>
      <td className={styles.tableCell}>{formatCurrency(aggregated.spend)}</td>
      <td className={styles.tableCell}>{formatNumber(aggregated.impressions)}</td>
      <td className={styles.tableCell}>{formatNumber(aggregated.conversions)}</td>
      <td className={styles.tableCell}>{formatNumber(aggregated.clicks)}</td>
      <td className={styles.tableCell}>{ctr.toFixed(2)}%</td>
    </tr>
  );
});

