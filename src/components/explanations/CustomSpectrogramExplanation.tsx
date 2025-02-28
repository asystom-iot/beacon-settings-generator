import React from 'react';
import { Button, Card, Drawer, List, Typography } from 'antd';
import { CustomSpectrogramTable } from './CustomSpectrogramTable';
import { CustomSpectrogramDrawer } from './CustomSpectrogramDrawer';

export const CustomSpectrogramExplanation: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card
        size='small'
        title='Custom Spectrogram'
        style={{ width: '100%' }}
        extra={
          <Button
            type='link'
            onClick={showDrawer}>
            More
          </Button>
        }>
        <div>
          The Custom spectrogram parameter is defined as follows:
          <div style={{ marginBottom: '12px' }}>
            • The first 4 bytes are a bitmask for{' '}
            <Typography.Text
              italic
              strong>
              Sensor enumeration{' '}
            </Typography.Text>
            (8 bits -{'>'} 0x0f) and
            <Typography.Text
              italic
              strong>
              {' '}
              Sensor orientation{' '}
            </Typography.Text>
            (24 bits -{'>'} 0x000000). Valid parameters for Sensor enumeration are :
          </div>
          <List
            size='small'
            bordered>
            <List.Item>Accelerometer = 0x3 </List.Item>
            <List.Item> Microphone = 0xc </List.Item>
          </List>
          <div style={{ margin: '12px 0' }}>
            <Typography.Text italic>
              Note: These values are not exclusive. The value 0xf means that both accelerometer and
              microphone sensors are active.
            </Typography.Text>
          </div>
          <div style={{ marginBottom: '12px' }}>Valid parameters for Sensor orientation are :</div>
          <List
            size='small'
            bordered>
            <List.Item>No preferred orientation = 0x0</List.Item>
            <List.Item>X axis preferred = 0x1</List.Item>
            <List.Item>Y axis preferred = 0x2</List.Item>
            <List.Item>Z axis preferred = 0x4</List.Item>
          </List>
          <div style={{ margin: '12px 0' }}>
            • The four 16-bit next values define the active range for each sensor type :
          </div>
        </div>
        <CustomSpectrogramTable />
      </Card>
      <Drawer
        width={830}
        title='Synchronization settings & modes'
        onClose={onClose}
        open={open}>
        <CustomSpectrogramDrawer />
      </Drawer>
    </>
  );
};
