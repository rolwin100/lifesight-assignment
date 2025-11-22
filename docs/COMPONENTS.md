# Component Documentation

## Table Components

### Table

Basic reusable table component without sorting.

**Location:** `components/common/Table.tsx`

**Import:**
```tsx
import { Table, type TableColumn } from '@/components/common/Table';
// or
import { Table, type TableColumn } from '@/components/common';
```

**Props:**
```typescript
interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: (row: T, index: number) => string | number;
  renderRow: (row: T, index: number) => React.ReactNode;
  emptyMessage?: string;
  className?: string;
  headerClassName?: string;
}
```

**Example:**
```tsx
import { Table, type TableColumn } from '@/components/common';

const columns: TableColumn<User>[] = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
];

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
```

### SortableTable

Table component with built-in sorting functionality.

**Location:** `components/common/SortableTable.tsx`

**Import:**
```tsx
import { SortableTable, type SortableTableColumn } from '@/components/common/SortableTable';
// or
import { SortableTable, type SortableTableColumn } from '@/components/common';
```

**Props:**
```typescript
interface SortableTableProps<T> {
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
```

**Example:**
```tsx
import { SortableTable, type SortableTableColumn } from '@/components/common';
import { useState } from 'react';

const [sortColumn, setSortColumn] = useState<string | null>(null);
const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

const handleSort = (column: string) => {
  if (sortColumn === column) {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  } else {
    setSortColumn(column);
    setSortDirection('asc');
  }
};

<SortableTable
  columns={columns}
  data={data}
  rowKey={(row) => row.id}
  renderRow={(row) => <CustomRow data={row} />}
  sortColumn={sortColumn}
  sortDirection={sortDirection}
  onSort={handleSort}
/>
```

### SortableTableHeader

Reusable sortable table header component.

**Props:**
```typescript
interface SortableTableHeaderProps {
  column: string;
  label: string;
  sortable?: boolean;
  sortColumn?: string | null;
  sortDirection?: 'asc' | 'desc';
  onSort?: (column: string) => void;
  className?: string;
}
```

## Chart Components

### PerformanceChart

Displays performance metrics by region using Chart.js.

**Features:**
- Bar chart with dual Y-axes
- Shows Spend and Conversions
- Top 10 regions by default
- Responsive design

**Usage:**
```tsx
<PerformanceChart />
```

### ChannelPerformanceChart

Displays performance metrics by channel using Chart.js.

**Features:**
- Bar chart with dual Y-axes
- Shows Spend and Conversions
- Top 10 channels sorted by spend
- Respects filter state

**Usage:**
```tsx
<ChannelPerformanceChart />
```

## Data Display Components

### TotalsCard

Displays aggregated totals from the filtered data.

**Shows:**
- Total Spend
- Total Impressions
- Total Conversions
- Total Clicks
- Overall CTR

**Usage:**
```tsx
<TotalsCard />
```

### FilterBar

Provides filtering functionality for the dashboard.

**Features:**
- Channel filter input
- Debounced search (300ms)
- Updates totals and charts automatically

**Usage:**
```tsx
<FilterBar />
```

## Row Components

### RegionRow

Expandable row component for region data.

**Features:**
- Click to expand/collapse
- Shows aggregated region metrics
- Displays nested ChannelRow components when expanded

**Props:**
```typescript
interface RegionRowProps {
  region: RegionAggregate;
}
```

### ChannelRow

Row component for channel data (nested under regions).

**Features:**
- Indented display
- Shows aggregated channel metrics
- Only rendered when parent region is expanded

**Props:**
```typescript
interface ChannelRowProps {
  records: MarketingRecord[];
  region: string;
}
```

## Utility Components

### Button

Custom button component.

**Props:**
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
  children: React.ReactNode;
}
```

**Example:**
```tsx
<Button variant="primary" onClick={handleClick}>
  Click Me
</Button>
```

### Input

Custom input component.

**Props:**
```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
```

**Example:**
```tsx
<Input
  label="Search"
  type="text"
  placeholder="Enter search term"
  value={value}
  onChange={handleChange}
/>
```

### Select

Custom select/dropdown component.

**Props:**
```typescript
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}
```

**Example:**
```tsx
<Select
  label="Choose Option"
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ]}
  value={selectedValue}
  onChange={handleChange}
/>
```

