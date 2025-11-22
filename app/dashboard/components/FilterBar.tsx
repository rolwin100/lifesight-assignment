'use client';

import React, { useCallback, useState, useEffect } from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { Input } from './Input';
import styles from '../styles/components.module.css';

export const FilterBar = React.memo(function FilterBar() {
  const { setFilter, state } = useDashboard();
  const [inputValue, setInputValue] = useState(state.filter.channel);

  // Debounce filter input
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilter({ channel: inputValue });
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, setFilter]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  return (
    <div className={styles.filterBar}>
      <Input
        label="Filter by Channel"
        type="text"
        placeholder="Search channels..."
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
});

