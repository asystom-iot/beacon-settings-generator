import { Card } from 'antd';
import React from 'react';
import { RPMSettingsTable } from './RPMSettingsTable';

export const RPMSettingsEplaxation: React.FunctionComponent = () => {
  return (
    <>
      <Card
        size='small'
        title='RPM search window'
        style={{ width: '100%' }}>
        <div style={{ marginBottom: '12px' }}>
          RPM MAX and RPM MIN define a rotation speed search window. It shall include the expected
          RPM variation range for the machine being monitored. It is important to properly set the
          RPM search window; else balancing and alignment indicators do not provide valid values. By
          default, the range is setup for 1500 RPM machines (1320 – 1680 RPM) since 1500 RPM
          asynchronous motors are commonplace in the industry.
        </div>
        <RPMSettingsTable />
      </Card>
    </>
  );
};
