'use client';

import React, { useCallback } from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { SortColumn } from '@/types/dashboard';
import styles from '../styles/table.module.css';

interface TableHeaderProps {
  column: SortColumn;
  label: string;
}

export const TableHeader = React.memo(function TableHeader({
  column,
  label,
}: TableHeaderProps) {
  const { state, setSort } = useDashboard();
  const { sort } = state;

  const handleClick = useCallback(() => {
    setSort(column);
  }, [column, setSort]);

  const isActive = sort.column === column;
  const sortIcon = isActive
    ? sort.direction === 'asc'
      ? '↑'
      : '↓'
    : '⇅';

  return (
    <th className={styles.tableHeader} onClick={handleClick}>
      <div className={styles.headerContent}>
        <span>{label}</span>
        <span className={styles.sortIcon}>{sortIcon}</span>
      </div>
    </th>
  );
});

