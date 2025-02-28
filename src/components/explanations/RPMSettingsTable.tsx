import React from 'react';
import { Table } from 'antd';

export const RPMSettingsTable: React.FunctionComponent = () => {
  const dataSourceFirstTable = [
    {
      key: '1',
      message: 'RPM Max',
      size: '2 Bytes',
      defaultValue: '1c00',
      decimalValue: '28',
      scaling: 'x60',
      realValue: '1680 RPM',
    },
    {
      key: '2',
      message: 'RPM Min',
      size: '2 Bytes',
      defaultValue: '1600',
      decimalValue: '22',
      scaling: 'x60',
      realValue: '1320 RPM',
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
      title: 'Decimal value',
      dataIndex: 'decimalValue',
      key: 'decimalValue',
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
    <Table
      bordered
      dataSource={dataSourceFirstTable}
      columns={columnsFirstTable}
      size='small'
      pagination={{ position: ['none', 'none'] }}
    />
  );
};
