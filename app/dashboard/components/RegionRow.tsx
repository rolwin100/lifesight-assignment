'use client';

import React, { useMemo, useCallback } from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { RegionAggregate } from '@/types/dashboard';
import { ChannelRow } from './ChannelRow';
import { calculateCTR } from '@/lib/utils/calculations';
import styles from '../styles/table.module.css';

interface RegionRowProps {
  region: RegionAggregate;
}

export const RegionRow = React.memo(function RegionRow({ region }: RegionRowProps) {
  const { state, toggleRegion } = useDashboard();
  const isExpanded = state.expandedRegions.has(region.region);

  const ctr = useMemo(
    () => calculateCTR(region.conversions, region.impressions),
    [region.conversions, region.impressions]
  );

  const handleClick = useCallback(() => {
    toggleRegion(region.region);
  }, [region.region, toggleRegion]);

  // Group channels within this region
  const channelGroups = useMemo(() => {
    const channelMap = new Map<string, typeof region.channels>();
    region.channels.forEach((record) => {
      const existing = channelMap.get(record.channel);
      if (existing) {
        existing.push(record);
      } else {
        channelMap.set(record.channel, [record]);
      }
    });
    return Array.from(channelMap.values());
  }, [region.channels]);

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
    <>
      <tr className={styles.regionRow} onClick={handleClick}>
        <td className={styles.regionCell}>
          <span className={styles.expandIcon}>{isExpanded ? '▼' : '▶'}</span>
          <strong>{region.region}</strong>
        </td>
        <td className={styles.tableCell}>{formatCurrency(region.spend)}</td>
        <td className={styles.tableCell}>{formatNumber(region.impressions)}</td>
        <td className={styles.tableCell}>{formatNumber(region.conversions)}</td>
        <td className={styles.tableCell}>{formatNumber(region.clicks)}</td>
        <td className={styles.tableCell}>{ctr.toFixed(2)}%</td>
      </tr>
      {isExpanded &&
        channelGroups.map((channelRecords, index) => (
          <ChannelRow
            key={`${region.region}-${channelRecords[0].channel}-${index}`}
            records={channelRecords}
            region={region.region}
          />
        ))}
    </>
  );
});

