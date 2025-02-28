import React from 'react';
import { theme, Form, Select, Switch, Divider, Flex, FormInstance, Typography } from 'antd';
import { GlobalPublicSettingsFormDTO, PeriodName } from '../../models/form';
import { getNumberOptions, getSecondsOptions } from '../../utils';
import { SchedulingExplanation } from '../explanations/SchedulingExplanation';
import { PERIODICITY_RULE } from '../../utils/formValidationRules';

interface SubSectionSchedulingProps {
  form: FormInstance<GlobalPublicSettingsFormDTO>;
}

const { Text } = Typography;

export const SubSectionScheduling: React.FC<SubSectionSchedulingProps> = ({ form }) => {
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const defaultSync =
    form.getFieldValue('ambient_periodicity') === form.getFieldValue('prediction_periodicity');
  const [isSync, setIsSync] = React.useState(defaultSync);

  const HOURS = getNumberOptions(0, 7);
  const MINUTES = getNumberOptions(0, 60);
  const SECONDS = getSecondsOptions();

  /**
   * Sync ambient period values and prediction period values on switch change
   * @param setValue
   * @param getValues
   */

  const handleSwitch = () => {
    if (!isSync) {
      const currentAmbientHours = form.getFieldValue('ambient_hours');
      const currentAmbientMinutes = form.getFieldValue('ambient_minutes');
      const currentAmbientSeconds = form.getFieldValue('ambient_seconds');

      form.setFieldsValue({
        prediction_hours: currentAmbientHours,
        prediction_minutes: currentAmbientMinutes,
        prediction_seconds: currentAmbientSeconds,
      });
    }
    setIsSync(!isSync);
  };

  const handlePeriodChange = (currentValue: number, name: PeriodName, syncName: PeriodName) => {
    if (isSync) {
      form.setFieldValue(syncName, currentValue);
      return;
    }
    form.setFieldValue(name, currentValue);
  };

  return (
    <>
      <Divider
        orientation='left'
        orientationMargin='0'>
        <div style={{ fontWeight: 600 }}>Scheduling</div>
      </Divider>
      <div className='formSectionContainer'>
        <div style={{ flex: 1 }}>
          <div>
            {form
              .getFieldsError([
                'ambient_minutes',
                'ambient_hours',
                'ambient_seconds',
                'prediction_minutes',
                'prediction_hours',
                'prediction_seconds',
              ])
              .some((e) => e.errors.length > 0) && (
              <Text type='danger'>Both periods cannot be 00:00:00</Text>
            )}
          </div>
          {/* Ambient Period */}
          <Form.Item
            label='Ambient period'
            layout='vertical'
            style={{ flex: 1 }}>
            <Flex justify={'flex-start'}>
              {/* Hours */}
              <Form.Item
                name='ambient_hours'
                htmlFor='ambientHours'
                layout='horizontal'
                style={{ display: 'inline-block' }}
                rules={PERIODICITY_RULE}
                dependencies={[
                  'ambient_minutes',
                  'ambient_seconds',
                  'prediction_minutes',
                  'prediction_hours',
                  'prediction_seconds',
                ]}>
                <Select
                  id='ambientHours'
                  options={HOURS}
                  style={{ width: '65px' }}
                  onChange={(e) => handlePeriodChange(e, 'ambient_hours', 'prediction_hours')}
                />
              </Form.Item>
              <div
                className='customLabel'
                style={{
                  backgroundColor: colorBgLayout,
                }}>
                <div>h</div>
              </div>
              {/* Minutes */}
              <Form.Item
                name='ambient_minutes'
                htmlFor='ambientMinutes'
                layout='horizontal'
                style={{ display: 'inline-block' }}
                rules={PERIODICITY_RULE}
                dependencies={[
                  'ambient_hours',
                  'ambient_seconds',
                  'prediction_minutes',
                  'prediction_hours',
                  'prediction_seconds',
                ]}>
                <Select
                  id='ambientMinutes'
                  options={MINUTES}
                  style={{ width: '65px' }}
                  onChange={(e) => handlePeriodChange(e, 'ambient_minutes', 'prediction_minutes')}
                />
              </Form.Item>
              <div
                className='customLabel'
                style={{
                  backgroundColor: colorBgLayout,
                }}>
                <div>min</div>
              </div>
              {/* Seconds */}
              <Form.Item
                name='ambient_seconds'
                htmlFor='ambientSeconds'
                layout='horizontal'
                style={{ display: 'inline-block' }}
                rules={PERIODICITY_RULE}
                dependencies={[
                  'ambient_minutes',
                  'ambient_hours',
                  'prediction_minutes',
                  'prediction_hours',
                  'prediction_seconds',
                ]}>
                <Select
                  id='ambientSeconds'
                  options={SECONDS}
                  style={{ width: '65px' }}
                  onChange={(e) => handlePeriodChange(e, 'ambient_seconds', 'prediction_seconds')}
                />
              </Form.Item>
              <div
                className='customLabel'
                style={{
                  backgroundColor: colorBgLayout,
                }}>
                <div>s</div>
              </div>
            </Flex>
          </Form.Item>
          {/* Measurement Period */}
          <Form.Item
            label='Measurement period'
            layout='vertical'
            style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Form.Item
                name='prediction_hours'
                htmlFor='predictionHours'
                layout='horizontal'
                style={{ display: 'inline-block' }}
                rules={PERIODICITY_RULE}
                dependencies={[
                  'ambient_minutes',
                  'ambient_hours',
                  'ambient_seconds',
                  'prediction_minutes',
                  'prediction_seconds',
                ]}>
                <Select
                  id='predictionHours'
                  options={HOURS}
                  style={{ width: '65px' }}
                  onChange={(e) => handlePeriodChange(e, 'prediction_hours', 'ambient_hours')}
                  disabled={isSync}
                />
              </Form.Item>
              <div
                className='customLabel'
                style={{
                  backgroundColor: colorBgLayout,
                }}>
                <div>h</div>
              </div>
              <Form.Item
                name='prediction_minutes'
                htmlFor='predictionMinutes'
                layout='horizontal'
                style={{ display: 'inline-block' }}
                rules={PERIODICITY_RULE}
                dependencies={[
                  'ambient_minutes',
                  'ambient_hours',
                  'ambient_seconds',
                  'prediction_hours',
                  'prediction_seconds',
                ]}>
                <Select
                  id='predictionMinutes'
                  options={MINUTES}
                  style={{ width: '65px' }}
                  onChange={(e) => handlePeriodChange(e, 'prediction_minutes', 'ambient_minutes')}
                  disabled={isSync}
                />
              </Form.Item>
              <div
                className='customLabel'
                style={{
                  backgroundColor: colorBgLayout,
                }}>
                <div>min</div>
              </div>
              <Form.Item
                name='prediction_seconds'
                htmlFor='predictionSeconds'
                layout='horizontal'
                style={{ display: 'inline-block' }}
                rules={PERIODICITY_RULE}
                dependencies={[
                  'ambient_minutes',
                  'ambient_hours',
                  'ambient_seconds',
                  'prediction_minutes',
                  'prediction_hours',
                ]}>
                <Select
                  id='predictionSeconds'
                  options={SECONDS}
                  style={{ width: '65px' }}
                  onChange={(e) => handlePeriodChange(e, 'prediction_seconds', 'ambient_seconds')}
                  disabled={isSync}
                />
              </Form.Item>
              <div
                className='customLabel'
                style={{
                  backgroundColor: colorBgLayout,
                }}>
                <div>s</div>
              </div>
            </div>
          </Form.Item>
          <Form.Item
            label={'Sync'}
            htmlFor='sync'
            layout='vertical'>
            <Switch
              defaultChecked={isSync}
              onChange={() => handleSwitch()}
              id={'sync'}
            />
          </Form.Item>
          {/* Introspection Period */}
          <Form.Item
            label='Introspection period'
            layout='vertical'
            style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Form.Item
                htmlFor='introspectionHours'
                layout='horizontal'
                style={{ display: 'inline-block' }}
                name='introspection_hours'>
                <Select
                  id='introspectionHours'
                  options={HOURS}
                  style={{ width: '65px' }}
                />
              </Form.Item>
              <div
                className='customLabel'
                style={{
                  backgroundColor: colorBgLayout,
                }}>
                <div>h</div>
              </div>
              <Form.Item
                htmlFor='introspectionMinutes'
                layout='horizontal'
                style={{ display: 'inline-block' }}
                name='introspection_minutes'>
                <Select
                  id='introspectionMinutes'
                  options={MINUTES}
                  style={{ width: '65px' }}
                />
              </Form.Item>
              <div
                className='customLabel'
                style={{
                  backgroundColor: colorBgLayout,
                }}>
                <div>min</div>
              </div>
              <Form.Item
                htmlFor='introspectionSeconds'
                layout='horizontal'
                style={{ display: 'inline-block' }}
                name='introspection_seconds'>
                <Select
                  id='introspectionSeconds'
                  options={SECONDS}
                  style={{ width: '65px' }}
                />
              </Form.Item>
              <div
                className='customLabel'
                style={{
                  backgroundColor: colorBgLayout,
                }}>
                <div>s</div>
              </div>
            </div>
          </Form.Item>
        </div>
        <div
          className='explanationColumn'
          style={{
            backgroundColor: colorBgLayout,
          }}>
          <div className='explanationContent'>
            <SchedulingExplanation />
          </div>
        </div>
      </div>
    </>
  );
};
