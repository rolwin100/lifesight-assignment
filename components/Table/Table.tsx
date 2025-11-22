'use client';

import React from 'react';
import styles from './table.module.css';

export interface TableColumn<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  className?: string;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: (row: T, index: number) => string | number;
  renderRow: (row: T, index: number) => React.ReactNode;
  emptyMessage?: string;
  className?: string;
  headerClassName?: string;
}

export function Table<T>({
  columns,
  data,
  rowKey,
  renderRow,
  emptyMessage = 'No data available',
  className = '',
  headerClassName = '',
}: TableProps<T>) {
  return (
    <div className={`${styles.tableWrapper} ${className}`}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`${styles.tableHeader} ${column.className || ''} ${headerClassName}`}
              >
                {column.label}
              </th>
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

