'use client';

import React, { useMemo, useCallback, useState } from 'react';
import { DashboardContext } from './DashboardContext';
import {
  MarketingRecord,
  DashboardState,
  DashboardContextType,
  SortColumn,
} from '@/types/dashboard';
import { aggregateByRegion, calculateChannelTotals, calculateCTR } from '@/lib/utils/calculations';

interface DashboardProviderProps {
  children: React.ReactNode;
  data: MarketingRecord[];
}

export function DashboardProvider({ children, data }: DashboardProviderProps) {
  const [expandedRegions, setExpandedRegions] = useState<Set<string>>(new Set());
  const [filter, setFilterState] = useState({ channel: '' });
  const [sort, setSortState] = useState<{ column: SortColumn | null; direction: 'asc' | 'desc' }>({
    column: null,
    direction: 'asc',
  });

  // Filter data by channel
  const filteredData = useMemo(() => {
    if (!filter.channel) return data;
    return data.filter((record) =>
      record.channel.toLowerCase().includes(filter.channel.toLowerCase())
    );
  }, [data, filter.channel]);

  // Aggregate by region
  const regionAggregates = useMemo(() => {
    const aggregates = aggregateByRegion(filteredData);
    return aggregates;
  }, [filteredData]);

  // Sort region aggregates
  const sortedRegions = useMemo(() => {
    if (!sort.column) return regionAggregates;

    const sorted = [...regionAggregates].sort((a, b) => {
      let aValue: number;
      let bValue: number;

      switch (sort.column) {
        case 'region':
          return sort.direction === 'asc'
            ? a.region.localeCompare(b.region)
            : b.region.localeCompare(a.region);
        case 'spend':
          aValue = a.spend;
          bValue = b.spend;
          break;
        case 'impressions':
          aValue = a.impressions;
          bValue = b.impressions;
          break;
        case 'conversions':
          aValue = a.conversions;
          bValue = b.conversions;
          break;
        case 'clicks':
          aValue = a.clicks;
          bValue = b.clicks;
          break;
        case 'ctr':
          aValue = calculateCTR(a.conversions, a.impressions);
          bValue = calculateCTR(b.conversions, b.impressions);
          break;
        default:
          return 0;
      }

      if (sort.column !== 'region') {
        return sort.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });

    return sorted;
  }, [regionAggregates, sort]);


  // Calculate totals from filtered data
  const totals = useMemo(() => {
    const channelTotals = calculateChannelTotals(filteredData);
    return {
      spend: channelTotals.spend,
      impressions: channelTotals.impressions,
      conversions: channelTotals.conversions,
      clicks: channelTotals.clicks,
      ctr: calculateCTR(channelTotals.conversions, channelTotals.impressions),
    };
  }, [filteredData]);

  const toggleRegion = useCallback((region: string) => {
    setExpandedRegions((prev) => {
      const next = new Set(prev);
      if (next.has(region)) {
        next.delete(region);
      } else {
        next.add(region);
      }
      return next;
    });
  }, []);

  const setFilter = useCallback((newFilter: Partial<{ channel: string }>) => {
    setFilterState((prev) => ({ ...prev, ...newFilter }));
  }, []);

  const setSort = useCallback((column: SortColumn) => {
    setSortState((prev) => ({
      column,
      direction: prev.column === column && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  const state: DashboardState = {
    rawData: data,
    filteredData,
    regionAggregates: sortedRegions,
    expandedRegions,
    sort,
    filter,
  };

  const contextValue: DashboardContextType = {
    state,
    setFilter,
    setSort,
    toggleRegion,
    totals,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
}

