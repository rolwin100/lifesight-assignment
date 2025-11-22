'use client';

import { createContext } from 'react';
import { DashboardContextType } from '@/types/dashboard';

export const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

