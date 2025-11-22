# Quick Start Guide

🌐 **Live Demo:** [https://visionary-banoffee-abcdd2.netlify.app/](https://visionary-banoffee-abcdd2.netlify.app/)

## Installation

```bash
# Clone or navigate to the project directory
cd lifesight

# Install dependencies
npm install
```

## Running the Application

### Development Mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
```

The static build will be in the `out` directory.

## Basic Usage

### Using the Dashboard

1. **View Data**: The dashboard loads with all regions collapsed
2. **Expand Regions**: Click on any region row to see its channels
3. **Filter**: Use the filter bar to search for specific channels
4. **Sort**: Click on any column header to sort by that column
5. **View Charts**: Scroll down to see performance charts by region and channel

### Using Reusable Table Components

#### Basic Table

```tsx
import { Table, type TableColumn } from '@/components/Table';

interface User {
  id: number;
  name: string;
  email: string;
}

const columns: TableColumn<User>[] = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
];

function UserTable({ users }: { users: User[] }) {
  return (
    <Table
      columns={columns}
      data={users}
      rowKey={(user) => user.id}
      renderRow={(user) => (
        <tr>
          <td>{user.name}</td>
          <td>{user.email}</td>
        </tr>
      )}
    />
  );
}
```

#### Sortable Table

```tsx
import { SortableTable, type SortableTableColumn } from '@/components/Table';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

function ProductTable({ products }: { products: Product[] }) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const columns: SortableTableColumn<Product>[] = [
    { key: 'name', label: 'Product Name', sortable: true },
    { key: 'price', label: 'Price', sortable: true },
    { key: 'stock', label: 'Stock', sortable: true },
  ];

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Sort data based on sortColumn and sortDirection
  const sortedData = [...products].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = a[sortColumn as keyof Product];
    const bValue = b[sortColumn as keyof Product];
    const comparison = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  return (
    <SortableTable
      columns={columns}
      data={sortedData}
      rowKey={(product) => product.id}
      renderRow={(product) => (
        <tr>
          <td>{product.name}</td>
          <td>${product.price.toFixed(2)}</td>
          <td>{product.stock}</td>
        </tr>
      )}
      sortColumn={sortColumn}
      sortDirection={sortDirection}
      onSort={handleSort}
    />
  );
}
```


### Adding a New Filter

1. Update `FilterState` in `types/dashboard.ts`:
```typescript
export interface FilterState {
  channel: string;
  region?: string; // Add new filter
}
```

2. Update `DashboardProvider` to handle the new filter:
```typescript
const [filter, setFilterState] = useState({ channel: '', region: '' });

const filteredData = useMemo(() => {
  let result = data;
  if (filter.channel) {
    result = result.filter((r) => r.channel.includes(filter.channel));
  }
  if (filter.region) {
    result = result.filter((r) => r.region.includes(filter.region));
  }
  return result;
}, [data, filter]);
```

### Adding a New Column

1. Update `SortColumn` type in `types/dashboard.ts`:
```typescript
export type SortColumn = 'region' | 'channel' | 'spend' | 'impressions' | 'conversions' | 'clicks' | 'ctr' | 'newColumn';
```

2. Add the column to `DataTable`:
```tsx
const columns: SortableTableColumn<RegionAggregate>[] = [
  // ... existing columns
  { key: 'newColumn', label: 'New Column', sortable: true },
];
```

3. Update sorting logic in `DashboardProvider` if needed.

### Customizing Styles

All styles are in CSS Modules:

- `app/dashboard/styles/dashboard.module.css` - Dashboard layout
- `app/dashboard/styles/table.module.css` - Table styles
- `app/dashboard/styles/components.module.css` - Component styles

Modify these files to customize the appearance.

## Troubleshooting

### Build Fails

1. Check TypeScript errors: `npm run build`
2. If needed, set `typescript.ignoreBuildErrors: true` in `next.config.ts`
3. Ensure all dependencies are installed: `npm install`

### Charts Not Loading

1. Ensure Chart.js is installed: `npm install chart.js react-chartjs-2`
2. Check browser console for errors
3. Verify data format matches expected structure

### Performance Issues

1. Check React DevTools Profiler for unnecessary re-renders
2. Verify memoization is working correctly
3. Check bundle size with `npm run build`

## Next Steps

- Read [COMPONENTS.md](./COMPONENTS.md) for detailed component documentation
- Read [API.md](./API.md) for API reference
- Read [PERFORMANCE.md](./PERFORMANCE.md) for optimization tips

