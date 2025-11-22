'use client';

import React, { useMemo } from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { RegionRow } from './RegionRow';
import { SortableTable, SortableTableColumn } from '@/components/Table';
import { RegionAggregate } from '@/types/dashboard';

export const DataTable = React.memo(function DataTable() {
  const { state, setSort } = useDashboard();
  const { regionAggregates, sort } = state;

  const columns: SortableTableColumn<RegionAggregate>[] = useMemo(
    () => [
      { key: 'region', label: 'Region / Channel', sortable: true },
      { key: 'spend', label: 'Spend', sortable: true },
      { key: 'impressions', label: 'Impressions', sortable: true },
      { key: 'conversions', label: 'Conversions', sortable: true },
      { key: 'clicks', label: 'Clicks', sortable: true },
      { key: 'ctr', label: 'CTR (%)', sortable: true },
    ],
    []
  );

  const handleSort = React.useCallback(
    (column: string) => {
      setSort(column as any);
    },
    [setSort]
  );

  return (
    <SortableTable
      columns={columns}
      data={regionAggregates}
      rowKey={(row) => row.region}
      renderRow={(region) => <RegionRow region={region} />}
      sortColumn={sort.column}
      sortDirection={sort.direction}
      onSort={handleSort}
      emptyMessage="No data available"
    />
  );
});

