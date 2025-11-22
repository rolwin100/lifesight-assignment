'use client';

import React, { useCallback } from 'react';
import styles from './table.module.css';

export interface SortableTableHeaderProps {
  column: string;
  label: string;
  sortable?: boolean;
  sortColumn?: string | null;
  sortDirection?: 'asc' | 'desc';
  onSort?: (column: string) => void;
  className?: string;
}

export const SortableTableHeader = React.memo(function SortableTableHeader({
  column,
  label,
  sortable = true,
  sortColumn,
  sortDirection,
  onSort,
  className = '',
}: SortableTableHeaderProps) {
  const handleClick = useCallback(() => {
    if (sortable && onSort) {
      onSort(column);
    }
  }, [column, sortable, onSort]);

  const isActive = sortColumn === column;
  const sortIcon = isActive
    ? sortDirection === 'asc'
      ? '↑'
      : '↓'
    : '⇅';

  return (
    <th
      className={`${styles.tableHeader} ${className}`}
      onClick={sortable ? handleClick : undefined}
      style={{ cursor: sortable ? 'pointer' : 'default' }}
    >
      <div className={styles.headerContent}>
        <span>{label}</span>
        {sortable && <span className={styles.sortIcon}>{sortIcon}</span>}
      </div>
    </th>
  );
});

