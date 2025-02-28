import React from 'react';
import { Table } from 'antd';

export const PeriodicityTable: React.FunctionComponent = () => {
  const dataSourceFirstTable = [
    {
      key: '1',
      message: 'Ambient periodicity',
      size: '2 Bytes',
      defaultValue: '1e00',
      decimalValue: '30',
      realValue: '300s',
    },
    {
      key: '2',
      message: 'Measurement periodicity',
      size: '2 Bytes',
      defaultValue: '1e00',
      decimalValue: '30',
      realValue: '300s',
    },
    {
      key: '3',
      message: 'Introspection periodicity',
      size: '2 Bytes',
      defaultValue: '6801',
      decimalValue: '360',
      realValue: '3600s',
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
