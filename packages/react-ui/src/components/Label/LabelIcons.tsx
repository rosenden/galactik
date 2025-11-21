import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
}

export const ImageIcon: React.FC<IconProps> = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="12" height="12" rx="1" stroke={color} strokeWidth="1.5" fill="none"/>
    <circle cx="6" cy="6" r="1.5" fill={color}/>
    <path d="M14 11L10.5 7.5L8 10L6 8L2 12V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V11Z" fill={color}/>
  </svg>
);

export const WarningIcon: React.FC<IconProps> = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.134 2.5a1 1 0 011.732 0l5.196 9a1 1 0 01-.866 1.5H2.804a1 1 0 01-.866-1.5l5.196-9z" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M8 6v3" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="8" cy="11" r="0.5" fill={color}/>
  </svg>
);

export const ErrorIcon: React.FC<IconProps> = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M10 6L6 10M6 6l4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const SuccessIcon: React.FC<IconProps> = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M5.5 8l1.5 1.5L11 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const InfoIcon: React.FC<IconProps> = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M8 7v4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="8" cy="5" r="0.5" fill={color}/>
  </svg>
);
