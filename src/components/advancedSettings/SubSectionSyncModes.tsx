import * as React from 'react';
import { Input, Select, Form, theme, FormInstance, Divider } from 'antd';
import { AdvancedSettingsFormDTO } from '../../models/form';
import { SynchronizationModesExplanation } from '../explanations/SynchronizationModesExplanation';
import {
  END_OF_CYCLE_RULE,
  DELAYED_MEASUREMENT_RULE,
  VIB_WAKEUP_RULE,
  WOA_REGION_UPPER_RULE,
  WOA_REGION_LOWER_RULE,
} from '../../utils/formValidationRules';
import { FLAGS, handleWoeModeChange, SYNC_MODES } from '../../utils';

interface SubSectionSyncModesProps {
  form: FormInstance<AdvancedSettingsFormDTO>;
}

export const SubSectionSyncModes: React.FunctionComponent<SubSectionSyncModesProps> = ({
  form,
}) => {
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const watchWoeMode = Form.useWatch('woe_mode');

  const SYNC_MODE_OPTIONS = SYNC_MODES.filter((option) => option.value !== 'RESERVED');
  const FLAG_OPTIONS = FLAGS.wos.filter((option) => option.value === 'Standard');

  return (
    <>
      <Divider
        orientation='left'
        orientationMargin='0'>
        <div style={{ fontWeight: 600 }}>Synchronization modes</div>
      </Divider>
      <div className='formSectionContainer'>
        <div style={{ flex: 1 }}>
          <Form.Item
            label='Mode'
            htmlFor='syncModes'
            name='woe_mode'>
            <Select
              id='syncModes'
              options={SYNC_MODE_OPTIONS}
              onChange={(e) => e && handleWoeModeChange(e, form)}
              aria-label='syncModes'
              placeholder={'Choose synchronization mode'}
              style={{ width: '100%' }}
            />
          </Form.Item>
          {/* Wake-On-Motion mode */}
          {watchWoeMode === SYNC_MODES[1].value && (
            <>
              <Form.Item
                name='woe_flag'
                label={'Option'}
                htmlFor='womOptionFlag'
                preserve>
                <Select
                  options={FLAGS.wom}
                  id='womOptionFlag'
                  style={{ width: '100%' }}
                />
              </Form.Item>
              {/* Vibration wakeup threshold */}
              <Form.Item
                name='woe_threshold'
                label={'Vibration wakeup threshold'}
                htmlFor='womVibThresh'
                rules={VIB_WAKEUP_RULE}
                preserve>
                <Input
                  id='womVibThresh'
                  type={'number'}
                  addonAfter={'mg'}
                  required
                />
              </Form.Item>
              {/* Delayed measurement */}
              <Form.Item
                name='woe_pretrig_threshold'
                label={'Delayed measurement'}
                htmlFor='womDelayMeas'
                rules={DELAYED_MEASUREMENT_RULE}
                preserve>
                <Input
                  id='womDelayMeas'
                  type={'number'}
                  width={16}
                  addonAfter={'s'}
                  required
                />
              </Form.Item>
              {/* End of cycle delay */}
              <Form.Item
                name='woe_posttrig_threshold'
                label={'End of cycle delay'}
                htmlFor='womEndCycle'
                rules={END_OF_CYCLE_RULE}
                preserve>
                <Input
                  id='womEndCycle'
                  type={'number'}
                  width={16}
                  addonAfter={'s'}
                  required
                />
              </Form.Item>
            </>
          )}
          {/* Wake-On-Scheduler mode */}
          {watchWoeMode === SYNC_MODES[3].value && (
            <>
              <Form.Item
                name='woe_flag'
                label={'Option'}
                htmlFor='woeFlag'
                preserve>
                <Select
                  id='woeFlag'
                  options={FLAG_OPTIONS}
                />
              </Form.Item>
            </>
          )}
          {/* Wake-On-Analog mode */}
          {watchWoeMode === SYNC_MODES[4].value && (
            <>
              <Form.Item
                name='woe_flag'
                label={'Option'}
                htmlFor='woaMode'
                preserve>
                <Select
                  id='woaMode'
                  options={FLAGS.woa}
                />
              </Form.Item>
              {/* Region upper limit */}
              <Form.Item
                name='woe_param'
                label={'Region upper limit'}
                htmlFor='woaUpperLimit'
                rules={WOA_REGION_UPPER_RULE}
                dependencies={['woe_threshold']}
                preserve>
                <Input
                  id='woaUpperLimit'
                  type={'number'}
                  width={16}
                  addonAfter={'mA'}
                  min={0}
                />
              </Form.Item>
              {/* Region lower limit */}
              <Form.Item
                name='woe_threshold'
                label={'Region lower limit'}
                htmlFor='woaLowerLimit'
                rules={WOA_REGION_LOWER_RULE}
                dependencies={['woe_param']}
                preserve>
                <Input
                  id='woaLowerLimit'
                  type={'number'}
                  addonAfter={'mA'}
                  min={0}
                />
              </Form.Item>
              {/* Delayed measurement */}
              <Form.Item
                label={'Delayed measurement'}
                htmlFor='woaDelayMeas'
                name='woe_pretrig_threshold'
                rules={DELAYED_MEASUREMENT_RULE}
                preserve>
                <Input
                  id='woaDelayMeas'
                  type={'number'}
                  min={0}
                  addonAfter={'s'}
                  required
                />
              </Form.Item>
            </>
          )}
          {/* Conditonal rendering of elements for Wake-On-Contact mode */}
          {watchWoeMode === SYNC_MODES[5].value && (
            <>
              <Form.Item
                label={'Option'}
                name='woe_flag'
                htmlFor='wocMode'
                preserve>
                <Select
                  id='wocMode'
                  options={FLAGS.woc}
                />
              </Form.Item>
              <Form.Item
                htmlFor='wocDelayMeas'
                label='Delayed measurement'
                name='woe_pretrig_threshold'
                rules={DELAYED_MEASUREMENT_RULE}
                preserve>
                <Input
                  id='wocDelayMeas'
                  type={'number'}
                  min={0}
                  addonAfter={'s'}
                  required
                />
              </Form.Item>
            </>
          )}
        </div>
        <div
          className='explanationColumn'
          style={{
            backgroundColor: colorBgLayout,
          }}>
          <div className='explanationContent'>
            <SynchronizationModesExplanation />
          </div>
        </div>
      </div>
    </>
  );
};
