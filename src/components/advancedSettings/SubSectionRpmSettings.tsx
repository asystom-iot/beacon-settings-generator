import * as React from 'react';
import { Input, theme, Form, Divider } from 'antd';
import { RPMSettingsEplaxation } from '../explanations/RPMSettingsExplanation';
import { RPM_MAX_RULE, RPM_MIN_RULE } from '../../utils/formValidationRules';

export const SubSectionRpmSettings: React.FunctionComponent = () => {
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  return (
    <>
      <Divider
        orientation='left'
        orientationMargin='0'>
        <div style={{ fontWeight: 600 }}>RPM settings</div>
      </Divider>
      <div className='formSectionContainer'>
        <div style={{ flex: 1 }}>
          {/* RPM min */}
          <Form.Item
            name='rpm_min'
            label={'RPM min'}
            htmlFor='rpmMin'
            dependencies={['rpm_max']}
            rules={RPM_MIN_RULE}>
            <Input
              id='rpmMin'
              required
              type={'number'}
              addonAfter={'rpm'}
            />
          </Form.Item>
          {/* RPM max */}
          <Form.Item
            name='rpm_max'
            label={'RPM max'}
            htmlFor='rpmMax'
            dependencies={['rpm_min']}
            rules={RPM_MAX_RULE}>
            <Input
              id='rpmMax'
              type={'number'}
              addonAfter={'rpm'}
            />
          </Form.Item>
        </div>
        <div
          className='explanationColumn'
          style={{
            backgroundColor: colorBgLayout,
          }}>
          <div className='explanationContent'>
            <RPMSettingsEplaxation />
          </div>
        </div>
      </div>
    </>
  );
};
