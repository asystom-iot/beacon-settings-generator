import React from 'react';
import { Card } from 'antd';
import { ActivationTable } from './ActivationTable';

export const ActivationExplanation: React.FC = () => {
  return (
    <Card
      size='small'
      title='Activation Bitmask'
      style={{ width: '100%' }}>
      <div style={{ marginBottom: '12px' }}>
        This setting defines what features are active. To prevent disabling all features, battery
        indicator will always be scheduled at the general stack periodicity frequency.
      </div>
      <ActivationTable />
    </Card>
  );
};
