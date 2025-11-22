# Performance Optimization Guide

## Overview

This dashboard is optimized to handle large datasets (10,000+ records) while maintaining smooth user interactions and targeting a Lighthouse Performance Score >90.

## Optimization Techniques

### 1. React Memoization

#### useMemo

Used for expensive computations that shouldn't run on every render:

```tsx
// Filtered data - only recalculates when filter changes
const filteredData = useMemo(() => {
  if (!filter.channel) return data;
  return data.filter((record) =>
    record.channel.toLowerCase().includes(filter.channel.toLowerCase())
  );
}, [data, filter.channel]);

// Aggregated regions - only recalculates when filtered data changes
const regionAggregates = useMemo(() => {
  return aggregateByRegion(filteredData);
}, [filteredData]);

// Totals - only recalculates when filtered data changes
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
```

#### useCallback

Used for event handlers to prevent unnecessary re-renders:

```tsx
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
```

#### React.memo

Used to prevent unnecessary component re-renders:

```tsx
export const RegionRow = React.memo(function RegionRow({ region }: RegionRowProps) {
  // Component implementation
});

export const ChannelRow = React.memo(function ChannelRow({ records, region }: ChannelRowProps) {
  // Component implementation
});
```

### 2. Code Splitting

Dynamic imports for heavy components:

```tsx
// Chart components are loaded only when needed
const ChartJSChart = dynamic(
  () => import('./ChartJSChart'),
  { ssr: false, loading: () => <div>Loading chart...</div> }
);
```

### 3. Conditional Rendering

Only render nested rows when parent is expanded:

```tsx
{isExpanded &&
  channelGroups.map((channelRecords, index) => (
    <ChannelRow
      key={`${region.region}-${channelRecords[0].channel}-${index}`}
      records={channelRecords}
      region={region.region}
    />
  ))}
```

### 4. Debouncing

Debounced filter input to reduce computation:

```tsx
useEffect(() => {
  const timer = setTimeout(() => {
    setFilter({ channel: inputValue });
  }, 300);

  return () => clearTimeout(timer);
}, [inputValue, setFilter]);
```

### 5. Efficient Data Structures

Using Maps for O(1) lookups:

```tsx
const regionMap = new Map<string, RegionAggregate>();

data.forEach((record) => {
  const existing = regionMap.get(record.region);
  if (existing) {
    // Update existing
  } else {
    // Create new
  }
});
```

## Performance Metrics

### Target Metrics

- **Lighthouse Performance Score**: >90
- **First Contentful Paint (FCP)**: <1.8s
- **Largest Contentful Paint (LCP)**: <2.5s
- **Time to Interactive (TTI)**: <3.8s
- **Total Blocking Time (TBT)**: <200ms

### Bundle Size Optimization

- Code splitting with dynamic imports
- Tree shaking unused code
- Minimal dependencies (only Chart.js for charts)

## Best Practices

### 1. Avoid Unnecessary Re-renders

- Use `React.memo` for expensive components
- Use `useMemo` for expensive calculations
- Use `useCallback` for event handlers passed as props

### 2. Optimize List Rendering

- Use proper `key` props (unique, stable)
- Only render visible items when possible
- Use virtual scrolling for very large lists (if needed)

### 3. Minimize State Updates

- Batch state updates when possible
- Use functional updates for state that depends on previous state
- Avoid creating new objects/arrays in render

### 4. Lazy Load Heavy Components

- Use dynamic imports for charts
- Load data on demand when possible
- Use code splitting at route level

## Monitoring Performance

### React DevTools Profiler

Use React DevTools Profiler to identify:
- Components that re-render unnecessarily
- Expensive renders
- Components that could benefit from memoization

### Chrome DevTools Performance

Use Chrome DevTools to measure:
- JavaScript execution time
- Layout shifts
- Paint times
- Network requests

### Lighthouse

Run Lighthouse audits to check:
- Performance score
- Accessibility
- Best practices
- SEO

## Troubleshooting Performance Issues

### Slow Initial Load

1. Check bundle size
2. Enable code splitting
3. Lazy load heavy components
4. Optimize images (if any)

### Slow Interactions

1. Check for unnecessary re-renders
2. Add memoization where needed
3. Debounce expensive operations
4. Use Web Workers for heavy computations (if needed)

### Memory Issues

1. Clean up event listeners
2. Remove unused state
3. Avoid memory leaks in effects
4. Use proper cleanup in useEffect

## Future Optimizations

Potential improvements:

1. **Virtual Scrolling**: For tables with 1000+ visible rows
2. **Web Workers**: For heavy data processing
3. **IndexedDB**: For client-side data caching
4. **Service Workers**: For offline support and caching
5. **React Query**: For data fetching and caching (if API is added)

