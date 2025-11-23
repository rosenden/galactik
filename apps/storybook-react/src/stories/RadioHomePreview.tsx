import React from 'react';
import { Radio } from 'react-ui/components/Radio';

export const RadioHomePreview = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <Radio checked={false} label="Radio" />
    <Radio checked label="Checked" />
    <Radio checked={false} disabled label="Disabled" />
  </div>
);
