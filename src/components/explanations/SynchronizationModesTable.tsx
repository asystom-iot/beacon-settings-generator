import React from 'react';
import { Alert, List, Table } from 'antd';

export const SynchronizationModesTables: React.FunctionComponent = () => {
  const dataSourceFirstTable = [
    {
      key: '1',
      mode: 'Inactive',
      syncMode: '0000',
      flag: '-',
    },
    {
      key: '2',
      mode: 'Wake on Motion',
      syncMode: '0001',
      flag: '0: No visual cue if motion is detected. 1: Red led on the side of the device will blink if motion is detected',
    },
    {
      key: '3',
      mode: 'RFU',
      syncMode: '0002',
      flag: 'RFU',
    },
    {
      key: '4',
      mode: 'Wake on Scheduler',
      syncMode: '0003',
      flag: 'RFU',
    },
    {
      key: '5',
      mode: 'Wake on Analog',
      syncMode: '0004',
      flag: '0: Outside selected region, 1: Inside selected region',
    },
    {
      key: '6',
      mode: 'Wake on Contact',
      syncMode: '0005',
      flag: '0: Trigger on signal falling edge, 1: Trigger on signal rising edge',
    },
  ];

  const dataSourceSecondTable = [
    {
      key: '1',
      mode: 'Inactive',
      syncMode: '0000',
      wakeupThr: '-',
      specialParam: '-',
      syncDelay: '-',
      syncTimeout: '-',
    },
    {
      key: '2',
      mode: 'Wake on Motion',
      syncMode: '0001',
      wakeupThr: 'Value in mg',
      specialParam: '-',
      syncDelay: 'In seconds',
      syncTimeout: 'In seconds',
    },
    {
      key: '3',
      mode: 'RFU',
      syncMode: '0002',
      wakeupThr: '-',
      specialParam: '-',
      syncDelay: '-',
      syncTimeout: '-',
    },
    {
      key: '4',
      mode: 'Wake on Scheduler',
      syncMode: '0003',
      wakeupThr: '-',
      specialParam: '-',
      syncDelay: '-',
      syncTimeout: '-',
    },
    {
      key: '5',
      mode: 'Wake on Analog',
      syncMode: '0004',
      wakeupThr: '-',
      specialParam: 'Value in %*',
      syncDelay: 'In seconds',
      syncTimeout: '-',
    },
    {
      key: '6',
      mode: 'Wake on Contact',
      syncMode: '0005',
      wakeupThr: '-',
      specialParam: '-',
      syncDelay: 'In seconds',
      syncTimeout: '-',
    },
  ];

  const columnsFirstTable = [
    {
      title: 'Mode',
      dataIndex: 'mode',
      key: 'mode',
    },
    {
      title: 'Sync mode',
      dataIndex: 'syncMode',
      key: 'syncMode',
    },
    {
      title: 'flag interpretation',
      dataIndex: 'flag',
      key: 'flag',
    },
  ];

  const columnsSecondTable = [
    {
      title: 'Mode',
      dataIndex: 'mode',
      key: 'mode',
    },
    {
      title: 'Sync mode',
      dataIndex: 'syncMode',
      key: 'syncMode',
    },
    {
      title: 'wakeup threshold',
      dataIndex: 'wakeupThr',
      key: 'wakeupThr',
    },
    {
      title: 'special parameter',
      dataIndex: 'specialParam',
      key: 'specialParam',
    },
    {
      title: 'sync delay',
      dataIndex: 'syncDelay',
      key: 'syncDelay',
    },
    {
      title: 'sync timeout',
      dataIndex: 'syncTimeout',
      key: 'syncTimeout',
    },
  ];

  return (
    <div className='drawerContent'>
      <div style={{ marginBottom: '16px' }}>
        The next table specifies how flags are interpreted for each selected mode.
      </div>
      <Table
        bordered
        dataSource={dataSourceFirstTable}
        columns={columnsFirstTable}
        size='small'
        pagination={{ position: ['none', 'none'] }}
      />
      <div style={{ margin: '32px 0' }}>
        The following table will specify the signification of different fields depending on the
        chosen mode.
      </div>
      <Table
        bordered
        dataSource={dataSourceSecondTable}
        columns={columnsSecondTable}
        size='small'
        pagination={{ position: ['none', 'none'] }}
      />
      <div style={{ margin: '32px 0' }}>
        * <i>Wake on Analog</i> is the only case where the special parameter is currently relevant.
        It represents the allowed variation around the values delimited by the wakeup threshold.
      </div>
      <div style={{ marginBottom: '32px' }}>
        These settings allow choosing triggering conditions for signature measurements (vibration,
        sound, and surface temperature).
      </div>
      <List
        size='small'
        itemLayout='horizontal'>
        <List.Item>
          <List.Item.Meta title={'INACTIVE'} />
          No measurement
        </List.Item>
        <List.Item>
          <List.Item.Meta title={'WAKE-ON-SCHEDULER'} />
          Measurements are taken on a pure periodic basis; periodicity being controlled through the
          SCHEDULING parameters (see <i>"ACTIVATION AND SCHEDULING SETTINGS"</i> tab)
        </List.Item>
        <List.Item>
          <List.Item.Meta title={'WAKE-ON-MOTION'} />
          Measurements are taken when vibrations exceed a threshold during enough time. This mode is
          useful for machines with short operating cycles.
          <Alert
            message='Important'
            type='info'
            showIcon
            style={{ marginTop: '12px' }}
          />
          <div style={{ padding: '12px' }}>
            If your beacon has an external probe, make sure the main beacon is also mounted on the
            machine to be sensitive to its vibrations. Measurements are made by the external probe,
            but this is the main beacon vibration sensor that is used by the WAKE-ON-MOTION function
            to wake the device when it is sleeping.
          </div>
        </List.Item>
        <List.Item>
          <List.Item.Meta title={'WAKE-ON-ANALOG'} />
          Measurements are taken when specific conditions are reached on the 4- 20 mA input.
        </List.Item>
        <List.Item>
          <List.Item.Meta title={'WAKE-ON-CONTACT'} />
          Measurements are taken when specific conditions are reached on the contact input.
        </List.Item>
      </List>
    </div>
  );
};
