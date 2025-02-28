import React from 'react';
import { Card, List } from 'antd';
import { ActivationTable } from './ActivationTable';

export const ActivationExplanation: React.FC = () => {
  return (
    <Card
      size='small'
      title='Activation Bitmask'
      style={{ width: '100%' }}>
      <div>
        This setting defines what features are active. The bitmask is defined by offsetting the
        active bit by the index of the features below:
      </div>
      <List size='small'>
        <List.Item>BATTERY_LEVEL = 0</List.Item>
        <List.Item>HUMIDITY = 2</List.Item>
        <List.Item>PRESSURE = 6</List.Item>
        <List.Item>WAKE_ON_EVENT = 8</List.Item>
        <List.Item>SIGNATURE = 11</List.Item>
        <List.Item>TEMPERATURE = 14</List.Item>
        <List.Item>AMBIENT_AGGREGATOR = 18</List.Item>
        <List.Item>LORA_LINK = 20</List.Item>
      </List>
      <div style={{ marginBottom: '12px' }}>
        This means that for the 05411400 value (LE) we have all the above features active. To
        prevent disabling all features, battery indicator will always be scheduled at the general
        stack periodicity frequency (see next parameter) Toggling bits offset by any other value
        than the ones above will not have an effect of the current software.
      </div>
      <ActivationTable />
    </Card>
  );
};
