import * as React from 'react';
import { Divider, Form, FormInstance, Switch, theme } from 'antd';
import { GlobalPublicSettingsFormDTO } from '../../models/form';
import { ActivationExplanation } from '../explanations/ActivationExplanation';

interface SubSectionActivationProps {
  defaultValues: GlobalPublicSettingsFormDTO;
  form: FormInstance<GlobalPublicSettingsFormDTO>;
}

export const SubSectionActivation: React.FunctionComponent<SubSectionActivationProps> = ({
  defaultValues,
  form,
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
              onChange={(checked) => form.setFieldsValue({ Humidity: { enabled: checked } })}
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
              onChange={(checked) => form.setFieldsValue({ Temperature: { enabled: checked } })}
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
