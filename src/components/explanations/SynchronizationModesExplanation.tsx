import React from 'react';
import { Button, Card, Drawer, List, Table } from 'antd';
import { SynchronizationModesTables } from './SynchronizationModesTable';

export const SynchronizationModesExplanation: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const columnThirdTable = [
    {
      title: 'Hex (LE)',
      dataIndex: 'hex',
      key: 'hex',
    },
    {
      title: 'Binary Form',
      dataIndex: 'binary',
      key: 'binary',
    },
    {
      title: 'wakeup threshold',
      dataIndex: 'wakeupThr',
      key: 'wakeupThr',
    },
    {
      title: 'Prof',
      dataIndex: 'prof',
      key: 'prof',
    },
    {
      title: 'Special',
      dataIndex: 'special',
      key: 'special',
    },
    {
      title: 'Flag',
      dataIndex: 'flag',
      key: 'flag',
    },
    {
      title: 'mode',
      dataIndex: 'mode',
      key: 'mode',
    },
  ];

  const dataSourceThirdTable = [
    {
      key: '1',
      hex: 'b3009101',
      binary: '00000001100100010000000010110011',
      wakeupThr: '00000001100100',
      prof: '01',
      special: '00000000101',
      flag: '1',
      mode: '0011',
    },
  ];

  return (
    <>
      <Card
        size='small'
        title=' Wake-On-Events'
        style={{ width: '100%' }}
        extra={
          <Button
            type='link'
            onClick={showDrawer}>
            More
          </Button>
        }>
        <div style={{ marginBottom: '16px' }}>
          The synchronization settings block is a 32-bit Little Endian field composed of three
          publicly available elements.
        </div>
        <List
          bordered
          size='small'
          itemLayout='horizontal'>
          <List.Item>
            <List.Item.Meta title={'Wakeup threshold | 14 bits'} />
            Defines the vibration threshold in mg above which the machine is assumed to be
            running.The value is expressed in mg and comprised between 0 and 1 g. Default value is
            100 mg.
          </List.Item>
          <List.Item>
            <List.Item.Meta title={'Wakeup profile | 2 bits'} />
            Corresponds to the power profile to be used for wakeup. This feature is experimental and
            shall not be changed. If improperly set, il will result in noticeable battery
            consumption.
          </List.Item>
          <List.Item>
            <List.Item.Meta title={'Special parameters | 11 bits'} />
            This field’s meaning depends on the used mode. currently it only applies to Wake on
            Analog mode.
          </List.Item>
          <List.Item>
            <List.Item.Meta title={'Flag | 1 bit'} />
            Defines a boolean value switching between different modes (see table below)
          </List.Item>
          <List.Item>
            <List.Item.Meta title={'Mode | 4 bits'} />
            Sets the Beacon into one of the above mentioned modes.
          </List.Item>
        </List>
        <div style={{ margin: '16px 0' }}>
          In practice, the interpretation of a payload presented in the above table as “b3009101”
          would go as follows:
        </div>
        <Table
          bordered
          dataSource={dataSourceThirdTable}
          columns={columnThirdTable}
          size='small'
          pagination={{ position: ['none', 'none'] }}
        />
      </Card>
      <Drawer
        width={830}
        title='Synchronization settings & modes'
        onClose={onClose}
        open={open}>
        <SynchronizationModesTables />
      </Drawer>
    </>
  );
};
