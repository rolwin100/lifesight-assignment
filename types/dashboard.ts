export interface MarketingRecord {
  id: number;
  channel: string;
  region: string;
  spend: number;
  impressions: number;
  conversions: number;
  clicks: number;
}

export interface RegionAggregate {
  region: string;
  spend: number;
  impressions: number;
  conversions: number;
  clicks: number;
  channels: MarketingRecord[];
}

export interface ChannelAggregate {
  channel: string;
  region: string;
  spend: number;
  impressions: number;
  conversions: number;
  clicks: number;
  recordCount: number;
}

export type SortColumn = 'region' | 'channel' | 'spend' | 'impressions' | 'conversions' | 'clicks' | 'ctr';
export type SortDirection = 'asc' | 'desc';

export interface SortState {
  column: SortColumn | null;
  direction: SortDirection;
}

export interface FilterState {
  channel: string;
}

export interface DashboardState {
  rawData: MarketingRecord[];
  filteredData: MarketingRecord[];
  regionAggregates: RegionAggregate[];
  expandedRegions: Set<string>;
  sort: SortState;
  filter: FilterState;
}

export interface DashboardContextType {
  state: DashboardState;
  setFilter: (filter: Partial<FilterState>) => void;
  setSort: (column: SortColumn) => void;
  toggleRegion: (region: string) => void;
  totals: {
    spend: number;
    impressions: number;
    conversions: number;
    clicks: number;
    ctr: number;
  };
}

