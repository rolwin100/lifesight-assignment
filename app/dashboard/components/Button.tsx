'use client';

import React from 'react';
import styles from '../styles/components.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
  children: React.ReactNode;
}

export const Button = React.memo(function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const variantClass = styles[`button-${variant}`] || styles.buttonPrimary;
  return (
    <button
      className={`${styles.button} ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

