import React from 'react';
import { Alert, Card, List } from 'antd';
import { PeriodicityTable } from './SchedulingTable';

export const SchedulingExplanation: React.FC = () => {
  return (
    <Card
      size='small'
      title='Scheduling'
      style={{ width: '100%' }}>
      <List
        size='small'
        itemLayout='horizontal'>
        <List.Item>
          <List.Item.Meta title={'Ambient periodicity'} />
          This setting tells how often the system will evaluate features related to the general
          stack. Currently the general stack covers Battery level, Temperature and Humidity sensors.
          The value is expressed in 10*seconds. This means a value of 30 must be interpreted as 300s
          i.e 5 minutes.
        </List.Item>
        <List.Item>
          <List.Item.Meta title={'Measurement periodicity'} />
          This setting tells how often the system will schedule vibration & ultrasonic sensors to do
          predictive maintenance computations, i.e. to generate either a standard signature or a FFT
          zoom based on settings. The value is also expressed in 10*seconds.{' '}
        </List.Item>
        <List.Item>
          <List.Item.Meta title={'Introspection perdiodicity'} />
          As of v4.57, this setting tells how often the system will schedule LoRa linkcheck
          verification. The default value is expressed in 10*seconds. This means a value of 360 must
          be interpreted as 3600s i.e the linkckeck validation will be done by the system every
          hour.
          <Alert
            message='Important'
            type='info'
            showIcon
            style={{ marginTop: '12px' }}
          />
          <div style={{ padding: '12px' }}>
            This does not set the frequency at which the linkcheck is performed by the LoRaWAN
            module. It sets how often the system will probe the radio module registers for a
            linkcheck success. The parameter to set the frequency of linkcheck MAC commands is
            specified in the Advanced Settings tab, LoRaWAN section.
          </div>
        </List.Item>
      </List>
      <PeriodicityTable />
    </Card>
  );
};
