import { List } from 'antd';
import React from 'react';

export const CustomSpectrogramDrawer = () => {
  return (
    <div className='drawerContent'>
      <div>
        Spectrum types available for microphone and accelerometer :
        <List
          size='small'
          itemLayout='horizontal'>
          <List.Item>
            <List.Item.Meta title={'RMS'} />
            Produces a spectrum for which each band is represented by the RMS value in g
            (accelerometer) / dB (microphone).
          </List.Item>
        </List>
        For accelerometer only :
        <List
          size='small'
          itemLayout='horizontal'>
          <List.Item>
            <List.Item.Meta title={'PEAK'} />
            Produces a spectrum for which each band is represented by the PEAK value in g
            (accelerometer) / dB (microphone).
          </List.Item>
          <List.Item>
            <List.Item.Meta title={'VELOCITY RMS'} />
            Produces a spectrum for which each band is represented by the RMS value of the vibration
            velocity in mm/s.
          </List.Item>
          <List.Item>
            <List.Item.Meta title={'VELOCITY PEAK'} />
            Produces a spectrum for which each band is represented by the PEAK value of the
            vibration velocity in mm/s.
          </List.Item>
        </List>
      </div>
    </div>
  );
};
