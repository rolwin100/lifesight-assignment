'use client';

import React from 'react';
import { SortableTableHeader } from './SortableTableHeader';
import styles from './table.module.css';

export interface SortableTableColumn<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  className?: string;
}

export interface SortableTableProps<T> {
  columns: SortableTableColumn<T>[];
  data: T[];
  rowKey: (row: T, index: number) => string | number;
  renderRow: (row: T, index: number) => React.ReactNode;
  sortColumn?: string | null;
  sortDirection?: 'asc' | 'desc';
  onSort?: (column: string) => void;
  emptyMessage?: string;
  className?: string;
}

export function SortableTable<T>({
  columns,
  data,
  rowKey,
  renderRow,
  sortColumn,
  sortDirection = 'asc',
  onSort,
  emptyMessage = 'No data available',
  className = '',
}: SortableTableProps<T>) {
  return (
    <div className={`${styles.tableWrapper} ${className}`}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <SortableTableHeader
                key={column.key}
                column={column.key}
                label={column.label}
                sortable={column.sortable !== false}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={onSort}
                className={column.className}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={styles.emptyCell}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <React.Fragment key={rowKey(row, index)}>
                {renderRow(row, index)}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

