import React from 'react';
import { Table } from 'antd';

export const ActivationTable: React.FunctionComponent = () => {
  const dataSourceFirstTable = [
    {
      key: '1',
      message: 'Activation Bitmask',
      size: '4 Bytes',
      defaultValue: '05411400',
      decimalValue: '-',
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
