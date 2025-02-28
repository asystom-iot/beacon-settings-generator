import React from 'react';
import { Table } from 'antd';

export const AdvancedSettingsTable: React.FunctionComponent = () => {
  const dataSourceFirstTable = [
    {
      key: '1',
      message: 'Custom Spectrogram settings',
      size: '12 Bytes',
      defaultValue: '0c000000401f0000d0070000',
      scaling: '-',
      realValue: '-',
    },
    {
      key: '2',
      message: 'RPM Max',
      size: '2 Bytes',
      defaultValue: '1c00',
      scaling: 'x60',
      realValue: '1680 RPM',
    },
    {
      key: '3',
      message: 'RPM Min',
      size: '2 Bytes',
      defaultValue: '1600',
      scaling: 'x60',
      realValue: '1320 RPM',
    },
    {
      key: '4',
      message: 'RFU2',
      size: '8 Bytes',
      defaultValue: '0500320000000000',
      scaling: '-',
      realValue: '-',
    },
    {
      key: '5',
      message: 'Synchronization settings',
      size: '4 Bytes',
      defaultValue: 'b3009101',
      scaling: '-',
      realValue: '-',
    },
    {
      key: '6',
      message: 'Synchronization delay',
      size: '2 Bytes',
      defaultValue: '0000',
      scaling: '-',
      realValue: '-',
    },
    {
      key: '7',
      message: 'Synchronization timeout',
      size: '2 Bytes',
      defaultValue: '0000',
      scaling: '-',
      realValue: '-',
    },
    {
      key: '8',
      message: 'Radio Settings',
      size: '6 Bytes',
      defaultValue: '2b000700100e',
      scaling: '-',
      realValue: '-',
    },
  ];

  const columnsFirstTable = [
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Default value (hex LE)',
      dataIndex: 'defaultValue',
      key: 'defaultValue',
    },
    {
      title: 'Scaling',
      dataIndex: 'scaling',
      key: 'scaling',
    },
    {
      title: 'Real value',
      dataIndex: 'realValue',
      key: 'realValue',
    },
  ];

  return (
    <>
      <div style={{ marginBottom: '16px' }}>
        In the example, the value is
        0f000000401f0000d00700001c0016000500320000000000b3009101000000002b000700100
      </div>
      <Table
        bordered
        dataSource={dataSourceFirstTable}
        columns={columnsFirstTable}
        size='small'
        pagination={{ position: ['none', 'none'] }}
      />
    </>
  );
};
