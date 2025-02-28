import React from 'react';
import { Table } from 'antd';

export const CustomSpectrogramTable: React.FunctionComponent = () => {
  const dataSourceFirstTable = [
    {
      key: '1',
      message: 'Upper bound for sound analysis',
      size: '2 Bytes',
      defaultValue: '401f',
      decimalValue: '8000',
      scaling: 'x10',
      realValue: '80000Hz',
    },
    {
      key: '2',
      message: 'Lower bound for sound analysis',
      size: '2 Bytes',
      defaultValue: '0000',
      decimalValue: '0',
      scaling: 'x10',
      realValue: '0Hz',
    },
    {
      key: '3',
      message: 'Upper bound for vibration analysis ',
      size: '2 Bytes',
      defaultValue: 'd007',
      decimalValue: '2000',
      scaling: '',
      realValue: '2000Hz',
    },
    {
      key: '4',
      message: 'Lower bound for vibration analysis',
      size: '2 Bytes',
      defaultValue: '0000',
      decimalValue: '0',
      scaling: '',
      realValue: '0Hz',
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
