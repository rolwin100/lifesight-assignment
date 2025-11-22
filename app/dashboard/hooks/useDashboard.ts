'use client';

import { useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import { DashboardContextType } from '@/types/dashboard';

export function useDashboard(): DashboardContextType {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
}

