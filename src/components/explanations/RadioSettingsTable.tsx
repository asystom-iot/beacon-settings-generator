import React from 'react';
import { Table } from 'antd';

export const RadioSettingsTable: React.FunctionComponent = () => {
  const dataSourceFirstTable = [
    {
      key: '1',
      bit: 'ADR Active',
      size: '1 bit',
      value: '1',
      comment: 'Activates ADR',
    },
    {
      key: '2',
      bit: 'Tx Ack',
      size: '1 bit',
      value: '1',
      comment: 'Activates uplink acknowledgement',
    },
    {
      key: '3',
      bit: 'Private Network',
      size: '1 bit',
      value: '0',
      comment: 'If "0", sets the syncWord to 0x34 If "1" -> 0x12',
    },
    {
      key: '4',
      bit: 'Coding Rate Flag',
      size: '1 bit',
      value: '1',
      comment: '0 = 4/5, 1 = 4/8',
    },
    {
      key: '5',
      bit: 'Dwell time active',
      size: '1 bit',
      value: '0',
      comment: 'Enables dwell time (Region Specific)',
    },
    {
      key: '6',
      bit: 'Retx Twice',
      size: '1 bit',
      value: '1',
      comment: 'Forces double retransmission for ACK packets',
    },
    {
      key: '7',
      bit: 'Packet Split Active',
      size: '1 bit',
      value: '0',
      comment: 'Activates packet split feature for low data rates',
    },
    {
      key: '8',
      bit: 'RFU',
      size: '9 bits',
      value: '0',
      comment: 'Unused',
    },
    {
      key: '9',
      bit: 'Special Freq Param',
      size: '2 bytes',
      value: '0700',
      comment: 'Used only in applicable regions to force FSB (eg.US915). Not read otherwise',
    },
    {
      key: '10',
      bit: 'Linkcheck Period',
      size: '2 bytes',
      value: '100e',
      comment:
        'In seconds from 0 to 65535. Set the frequency of lickcheck MAC commands. Must be set accordingly with Introspection Periodicity parameter. 100e(LE) equals 3600 seconds.',
    },
  ];

  const columnsFirstTable = [
    {
      title: 'Bit',
      dataIndex: 'bit',
      key: 'bit',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
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
