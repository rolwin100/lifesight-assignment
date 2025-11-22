'use client';

import React, { useMemo } from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { RegionRow } from './RegionRow';
import { TableHeader } from './TableHeader';
import styles from '../styles/table.module.css';

export const DataTable = React.memo(function DataTable() {
  const { state } = useDashboard();
  const { regionAggregates } = state;

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <TableHeader column="region" label="Region / Channel" />
            <TableHeader column="spend" label="Spend" />
            <TableHeader column="impressions" label="Impressions" />
            <TableHeader column="conversions" label="Conversions" />
            <TableHeader column="clicks" label="Clicks" />
            <TableHeader column="ctr" label="CTR (%)" />
          </tr>
        </thead>
        <tbody>
          {regionAggregates.length === 0 ? (
            <tr>
              <td colSpan={6} className={styles.emptyCell}>
                No data available
              </td>
            </tr>
          ) : (
            regionAggregates.map((region) => (
              <RegionRow key={region.region} region={region} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
});

