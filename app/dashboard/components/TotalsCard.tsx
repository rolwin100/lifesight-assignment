'use client';

import React from 'react';
import { useDashboard } from '../hooks/useDashboard';
import styles from '../styles/components.module.css';

export const TotalsCard = React.memo(function TotalsCard() {
  const { totals } = useDashboard();

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
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
    <div className={styles.totalsCard}>
      <h2 className={styles.totalsTitle}>Performance Totals</h2>
      <div className={styles.totalsGrid}>
        <div className={styles.totalItem}>
          <div className={styles.totalLabel}>Total Spend</div>
          <div className={styles.totalValue}>{formatCurrency(totals.spend)}</div>
        </div>
        <div className={styles.totalItem}>
          <div className={styles.totalLabel}>Total Impressions</div>
          <div className={styles.totalValue}>{formatNumber(totals.impressions)}</div>
        </div>
        <div className={styles.totalItem}>
          <div className={styles.totalLabel}>Total Conversions</div>
          <div className={styles.totalValue}>{formatNumber(totals.conversions)}</div>
        </div>
        <div className={styles.totalItem}>
          <div className={styles.totalLabel}>Total Clicks</div>
          <div className={styles.totalValue}>{formatNumber(totals.clicks)}</div>
        </div>
        <div className={styles.totalItem}>
          <div className={styles.totalLabel}>Overall CTR</div>
          <div className={styles.totalValue}>{formatNumber(totals.ctr)}%</div>
        </div>
      </div>
    </div>
  );
});

