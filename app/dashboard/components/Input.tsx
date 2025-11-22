'use client';

import React from 'react';
import styles from '../styles/components.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = React.memo(function Input({
  label,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className={styles.inputWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input className={`${styles.input} ${className}`} {...props} />
    </div>
  );
});

