'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartJSChartProps {
  data: Array<{
    name: string;
    spend: number;
    conversions: number;
    ctr: string;
  }>;
}

export default function ChartJSChart({ data }: ChartJSChartProps) {
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#8b5cf6'];

  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: 'Spend ($)',
        data: data.map((item) => item.spend),
        backgroundColor: data.map((_, index) => colors[index % colors.length]),
        yAxisID: 'y',
      },
      {
        label: 'Conversions',
        data: data.map((item) => item.conversions),
        backgroundColor: '#10b981',
        yAxisID: 'y1',
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Spend ($)',
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Conversions',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

