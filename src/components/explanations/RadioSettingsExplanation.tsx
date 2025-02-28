import { Card } from 'antd';
import React from 'react';
import { RadioSettingsTable } from './RadioSettingsTable';

export const RadioSettingsEplaxation: React.FunctionComponent = () => {
  return (
    <>
      <Card
        size='small'
        title='Radio settings'
        style={{ width: '100%' }}>
        <div style={{ marginBottom: '16px' }}>
          In the example, the value is “2b000700100e”. It is composed of a 16-bit mask (2b00)
          followed by two 16-bit values for Special frequency parameters and linkcheck period.
        </div>
        <RadioSettingsTable />
      </Card>
    </>
  );
};
