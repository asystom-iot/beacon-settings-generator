import * as React from 'react';
import { Divider, Form, Switch, theme } from 'antd';
import { GlobalPublicSettingsFormDTO } from '../../models/form';
import { ActivationExplanation } from '../explanations/ActivationExplanation';

interface SubSectionActivationProps {
  defaultValues: GlobalPublicSettingsFormDTO;
}

export const SubSectionActivation: React.FunctionComponent<SubSectionActivationProps> = ({
  defaultValues,
}) => {
  const {
    token: { colorBgLayout },
  } = theme.useToken();
  return (
    <>
      <Divider
        orientation='left'
        orientationMargin='0'>
        <div style={{ fontWeight: 600 }}>Activation</div>
      </Divider>
      <div className='formSectionContainer'>
        <div style={{ flex: 1 }}>
          {/* Humidity */}
          <Form.Item
            label={'Humidity'}
            htmlFor={'humidity'}
            name='Humidity.enabled'
            labelCol={{ span: 18 }}>
            <Switch
              id={'humidity'}
              defaultChecked={defaultValues.Humidity.enabled}
            />
          </Form.Item>
          <Form.Item
            label={'Temperature'}
            htmlFor={'temperature'}
            name='Temperature.enabled'
            labelCol={{ span: 18 }}>
            <Switch
              id={'temperature'}
              defaultChecked={defaultValues.Temperature.enabled}
            />
          </Form.Item>
          <Form.Item
            label={'Machine Drift'}
            htmlFor={'machineDrift'}
            name='MachineDrift.enabled'
            labelCol={{ span: 18 }}>
            <Switch
              id={'machineDrift'}
              defaultChecked={defaultValues.MachineDrift.enabled}
            />
          </Form.Item>
          <Form.Item
            label={'PT100'}
            htmlFor={'pt100'}
            name='Pt100.enabled'
            labelCol={{ span: 18 }}>
            <Switch
              id={'pt100'}
              defaultChecked={defaultValues.Pt100.enabled}
            />
          </Form.Item>
          <Form.Item
            label={'TC'}
            htmlFor={'tc'}
            name='TC.enabled'
            labelCol={{ span: 18 }}>
            <Switch
              id={'tc'}
              defaultChecked={defaultValues.TC.enabled}
            />
          </Form.Item>
          <Form.Item
            label={'Current Loop'}
            htmlFor={'currentLoop'}
            name='CurrentLoop.enabled'
            labelCol={{ span: 18 }}>
            <Switch
              id={'currentLoop'}
              defaultChecked={defaultValues.CurrentLoop.enabled}
            />
          </Form.Item>
        </div>
        <div
          className='explanationColumn'
          style={{
            backgroundColor: colorBgLayout,
          }}>
          <div className='explanationContent'>
            <ActivationExplanation />
          </div>
        </div>
      </div>
    </>
  );
};
