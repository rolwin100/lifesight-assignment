# Marketing Dashboard - Performance Optimization

A high-performance React + TypeScript marketing dashboard built with Next.js 16, featuring drill-down data visualization, real-time filtering, sorting, and performance insights.

🌐 **Live Demo:** [https://visionary-banoffee-abcdd2.netlify.app/](https://visionary-banoffee-abcdd2.netlify.app/)

## 🎯 Features

- **Drill-Down Table Structure**: Hierarchical view with regions that expand to show channels
- **Real-Time Filtering**: Filter data by channel with debounced search
- **Column Sorting**: Sort by any column (region, spend, impressions, conversions, clicks, CTR)
- **Performance Charts**: Interactive charts showing performance by region and channel
- **Dynamic Totals**: Automatically calculated totals (spend, impressions, conversions, clicks, CTR)
- **Performance Optimized**: Built with React hooks (useMemo, useCallback) and React.memo for optimal rendering
- **Custom UI Components**: All components built from scratch without CSS libraries
- **TypeScript**: Full type safety throughout the application
- **Static Export**: Can be built as a static site for easy deployment

## 📋 Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# or
yarn install

# or
pnpm install
```

### Development

```bash
# Start development server
npm run dev

# or
yarn dev

# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
# Create production build
npm run build

# or
yarn build

# or
pnpm build
```

The static build will be generated in the `out` directory.

### Start Production Server

```bash
npm run start

# or
yarn start

# or
pnpm start
```

## 📁 Project Structure

```
lifesight/
├── app/
│   ├── dashboard/
│   │   ├── components/          # Dashboard components
│   │   │   ├── DataTable.tsx    # Main data table with drill-down
│   │   │   ├── RegionRow.tsx    # Expandable region row
│   │   │   ├── ChannelRow.tsx   # Channel row (nested)
│   │   │   ├── Table.tsx        # Reusable table component
│   │   │   ├── SortableTable.tsx # Reusable sortable table
│   │   │   ├── PerformanceChart.tsx # Region performance chart
│   │   │   ├── ChannelPerformanceChart.tsx # Channel performance chart
│   │   │   ├── TotalsCard.tsx   # Totals display
│   │   │   ├── FilterBar.tsx    # Filter controls
│   │   │   └── ...
│   │   ├── context/             # State management
│   │   │   ├── DashboardContext.tsx
│   │   │   └── DashboardProvider.tsx
│   │   ├── hooks/               # Custom hooks
│   │   │   └── useDashboard.ts
│   │   └── styles/              # CSS modules
│   │       ├── dashboard.module.css
│   │       ├── table.module.css
│   │       └── components.module.css
│   ├── page.tsx                 # Main dashboard page
│   └── marketing_dashboard_data.json # Data file (10,000 records)
├── components/
│   └── common/                  # Reusable components
│       ├── Table.tsx            # Basic table component
│       ├── SortableTable.tsx    # Sortable table component
│       ├── SortableTableHeader.tsx # Sortable header
│       ├── table.module.css     # Table styles
│       └── index.ts             # Exports
├── lib/
│   └── utils/
│       └── calculations.ts      # Utility functions
├── types/
│   └── dashboard.ts             # TypeScript type definitions
├── next.config.ts               # Next.js configuration
├── package.json
└── README.md
```

## 🏗️ Architecture

### State Management

The application uses **React Context API** for state management:

- **DashboardProvider**: Manages global dashboard state
- **DashboardContext**: Provides state and actions to components
- **useDashboard**: Custom hook for accessing dashboard context

### Performance Optimizations

1. **Memoization**:
   - `useMemo` for expensive computations (filtering, sorting, aggregations)
   - `useCallback` for event handlers
   - `React.memo` for component memoization

2. **Code Splitting**:
   - Dynamic imports for chart components
   - Lazy loading of heavy dependencies

3. **Efficient Rendering**:
   - Proper React keys for list items
   - Conditional rendering of nested rows (only when expanded)
   - Debounced filter input

### Data Flow

```
Raw Data (JSON)
    ↓
DashboardProvider (Context)
    ↓
Filter → Aggregate → Sort
    ↓
Components (Table, Charts, Totals)
```

## 📊 Components

### DataTable

Main table component with drill-down functionality.

**Features:**
- Hierarchical display (regions → channels)
- Expandable/collapsible rows
- Sortable columns
- Responsive design

**Usage:**
```tsx
<DataTable />
```

### Performance Charts

Two chart components using Chart.js:

1. **PerformanceChart**: Shows performance by region
2. **ChannelPerformanceChart**: Shows performance by channel

**Features:**
- Dual Y-axes (Spend and Conversions)
- Color-coded bars
- Interactive tooltips
- Responsive design

### Reusable Table Components

#### Table

Basic reusable table component.

```tsx
<Table
  columns={columns}
  data={data}
  rowKey={(row) => row.id}
  renderRow={(row) => <CustomRow data={row} />}
  emptyMessage="No data"
/>
```

#### SortableTable

Table with built-in sorting functionality.

```tsx
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

## 🔧 Configuration

### Next.js Config

The project is configured for static export:

```typescript
{
  output: 'export',
  distDir: 'out',
  typescript: {
    ignoreBuildErrors: true, // Optional: disable TS errors during build
  }
}
```

### TypeScript

- Strict mode enabled
- Path aliases configured (`@/*`)
- Full type coverage

## 📈 Performance Metrics

The dashboard is optimized for:

- **Lighthouse Performance Score**: Target >90
- **Large Dataset Handling**: Efficiently handles 10,000+ records
- **Fast Rendering**: Optimized with React hooks and memoization
- **Small Bundle Size**: Code splitting and dynamic imports

## 🎨 Styling

All components use **CSS Modules** for scoped styling:

- `dashboard.module.css`: Dashboard layout styles
- `table.module.css`: Table-specific styles
- `components.module.css`: Shared component styles

**No CSS frameworks** are used - all UI is custom-built.

## 📝 Data Format

The dashboard expects data in the following format:

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

## 🚀 Deployment

### Live Demo

The dashboard is live and accessible at:
**https://visionary-banoffee-abcdd2.netlify.app/**

### Static Export

The project can be deployed as a static site:

```bash
npm run build
```

Output will be in the `out` directory, ready for deployment to:
- Vercel
- Netlify (currently deployed)
- GitHub Pages
- Any static hosting service

### Environment Variables

No environment variables required for basic functionality.

## 🛠️ Development

### Adding New Features

1. **New Component**: Create in `app/dashboard/components/`
2. **New Type**: Add to `types/dashboard.ts`
3. **New Utility**: Add to `lib/utils/`

### Code Style

- TypeScript strict mode
- React functional components with hooks
- CSS Modules for styling
- Memoization for performance

## 📚 API Reference

### DashboardProvider Props

```typescript
interface DashboardProviderProps {
  children: React.ReactNode;
  data: MarketingRecord[];
}
```

### DashboardContext

```typescript
interface DashboardContextType {
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
```

## 🐛 Troubleshooting

### Build Errors

If you encounter TypeScript errors during build, you can:
1. Fix the errors, or
2. Set `typescript.ignoreBuildErrors: true` in `next.config.ts`

### Performance Issues

- Ensure you're using the production build
- Check browser DevTools Performance tab
- Verify memoization is working correctly

## 📄 License

This project is part of a technical assessment.

## 👥 Contributing

This is a technical assessment project. For questions or issues, please refer to the project requirements.

## 🙏 Acknowledgments

- Next.js team for the excellent framework
- Chart.js for charting capabilities
- React team for the amazing library
