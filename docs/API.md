# API Reference

## Types

### MarketingRecord

```typescript
interface MarketingRecord {
  id: number;
  channel: string;
  region: string;
  spend: number;
  impressions: number;
  conversions: number;
  clicks: number;
}
```

### RegionAggregate

```typescript
interface RegionAggregate {
  region: string;
  spend: number;
  impressions: number;
  conversions: number;
  clicks: number;
  channels: MarketingRecord[];
}
```

### ChannelAggregate

```typescript
interface ChannelAggregate {
  channel: string;
  spend: number;
  impressions: number;
  conversions: number;
  clicks: number;
}
```

### DashboardState

```typescript
interface DashboardState {
  rawData: MarketingRecord[];
  filteredData: MarketingRecord[];
  regionAggregates: RegionAggregate[];
  expandedRegions: Set<string>;
  sort: SortState;
  filter: FilterState;
}
```

### SortState

```typescript
interface SortState {
  column: SortColumn | null;
  direction: SortDirection;
}
```

### FilterState

```typescript
interface FilterState {
  channel: string;
}
```

## Context API

### DashboardContext

Provides access to dashboard state and actions.

**Usage:**
```tsx
const { state, setFilter, setSort, toggleRegion, totals } = useDashboard();
```

**Methods:**

#### setFilter

Updates the filter state.

```typescript
setFilter: (filter: Partial<FilterState>) => void;
```

**Example:**
```tsx
setFilter({ channel: 'Facebook' });
```

#### setSort

Updates the sort state.

```typescript
setSort: (column: SortColumn) => void;
```

**Example:**
```tsx
setSort('spend');
```

#### toggleRegion

Toggles the expansion state of a region.

```typescript
toggleRegion: (region: string) => void;
```

**Example:**
```tsx
toggleRegion('North America');
```

## Utility Functions

### calculateCTR

Calculates Click-Through Rate percentage.

```typescript
function calculateCTR(conversions: number, impressions: number): number;
```

**Example:**
```tsx
const ctr = calculateCTR(100, 10000); // Returns 1.0
```

### aggregateByRegion

Aggregates marketing records by region.

```typescript
function aggregateByRegion(data: MarketingRecord[]): RegionAggregate[];
```

**Example:**
```tsx
const regions = aggregateByRegion(marketingData);
```

### aggregateByChannel

Aggregates marketing records by channel.

```typescript
function aggregateByChannel(data: MarketingRecord[]): ChannelAggregate[];
```

**Example:**
```tsx
const channels = aggregateByChannel(marketingData);
```

### calculateChannelTotals

Calculates total metrics across all records.

```typescript
function calculateChannelTotals(records: MarketingRecord[]): {
  spend: number;
  impressions: number;
  conversions: number;
  clicks: number;
};
```

**Example:**
```tsx
const totals = calculateChannelTotals(marketingData);
// Returns: { spend: 100000, impressions: 5000000, conversions: 5000, clicks: 50000 }
```

## Hooks

### useDashboard

Custom hook to access dashboard context.

```typescript
function useDashboard(): DashboardContextType;
```

**Returns:**
- `state`: Current dashboard state
- `setFilter`: Function to update filters
- `setSort`: Function to update sort
- `toggleRegion`: Function to toggle region expansion
- `totals`: Calculated totals object

**Example:**
```tsx
function MyComponent() {
  const { state, totals } = useDashboard();
  
  return (
    <div>
      <p>Total Spend: {totals.spend}</p>
      <p>Regions: {state.regionAggregates.length}</p>
    </div>
  );
}
```

## Constants

### SortColumn

Type for sortable columns.

```typescript
type SortColumn = 'region' | 'channel' | 'spend' | 'impressions' | 'conversions' | 'clicks' | 'ctr';
```

### SortDirection

Type for sort direction.

```typescript
type SortDirection = 'asc' | 'desc';
```

