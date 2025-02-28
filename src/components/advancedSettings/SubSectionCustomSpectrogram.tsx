import * as React from 'react';

import { Input, Select, Radio, Form, theme, Divider, FormInstance } from 'antd';
import { handleSensorTypeChange } from '../../utils/formEvents';
import { AdvancedSettingsFormDTO, SENSOR_TYPES } from '../../models/form';

import {
  ACCELERO_FREQ_MAX_RULE,
  ACCELERO_FREQ_MIN_RULE,
  MICRO_FREQ_MIN_RULE,
} from '../../utils/formValidationRules';
import {
  getSensorTypes,
  getAdvancedSensorOrientations,
  getSpectrumTypes,
} from '../../utils/formOptions';
import { CustomSpectrogramExplanation } from '../explanations/CustomSpectrogramExplanation';
import {
  MICRO_FREQ_MAX_RULE,
  ACCELERO_MAX_FREQ,
  MICRO_MAX_FREQ,
  MIN_INTERVAL_ACCEL,
  MIN_INTERVAL_MICRO,
} from '../../utils/formValidationRules';

interface SubSectionCustomSpectrogramProps {
  form: FormInstance<AdvancedSettingsFormDTO>;
}

export const SubSectionCustomSpectrogram: React.FunctionComponent<
  SubSectionCustomSpectrogramProps
> = ({ form }) => {
  const SENSOR_TYPE_OPTIONS = getSensorTypes();
  const ORIENTATION_OPTIONS = getAdvancedSensorOrientations();
  const SPECTRUM_TYPE_ACC_OPTIONS = getSpectrumTypes();
  const SPECTRUM_TYPE_MICRO_OPTIONS = getSpectrumTypes().filter(
    (spectrum) => spectrum.label === 'RMS'
  );

  const watchSensorType = Form.useWatch('sensor_type');

  const {
    token: { colorBgLayout },
  } = theme.useToken();

  return (
    <>
      <Divider
        orientation='left'
        orientationMargin='0'>
        <div style={{ fontWeight: 600 }}>Custom spectrogram</div>
      </Divider>
      <div className='formSectionContainer'>
        <div style={{ flex: 1 }}>
          {/* Sensor type */}
          <Form.Item
            label='Sensor type'
            name='sensor_type'
            htmlFor='customSpecSensorType'
            labelCol={{ span: 8 }}>
            <Radio.Group
              block
              optionType='button'
              onChange={(e) => handleSensorTypeChange(e.target.value, form)}
              options={SENSOR_TYPE_OPTIONS}
              id='customSpecSensorType'
            />
          </Form.Item>
          {/* Sensor orientation*/}
          {watchSensorType !== SENSOR_TYPES.microphone && (
            <Form.Item
              label={'Sensor orientation'}
              name='sensor_orientation'
              htmlFor='customSpecSensorOrientation'
              labelCol={{ span: 8 }}>
              <Select
                options={ORIENTATION_OPTIONS}
                id='customSpecSensorOrientation'
              />
            </Form.Item>
          )}
          {/* Accelerometer */}
          {watchSensorType === SENSOR_TYPES.accelerometer && (
            <>
              {/* Accelerometer min freq */}
              <Form.Item
                name='accelero_freq_min'
                labelCol={{ span: 14 }}
                label='Minimum frequency'
                htmlFor='accFreqMin'
                rules={ACCELERO_FREQ_MIN_RULE}
                dependencies={['accelero_freq_max']}>
                <Input
                  id='accFreqMin'
                  min={0}
                  max={ACCELERO_MAX_FREQ - MIN_INTERVAL_ACCEL}
                  addonAfter={'Hz'}
                  type={'number'}
                  required
                />
              </Form.Item>
              {/*Accelerometer max freq */}
              <Form.Item
                name='accelero_freq_max'
                label={'Maximum frequency'}
                tooltip={`Max ${ACCELERO_MAX_FREQ}Hz`}
                labelCol={{ span: 14 }}
                rules={ACCELERO_FREQ_MAX_RULE}
                dependencies={['accelero_freq_min']}>
                <Input
                  id='accfreqMax'
                  min={0}
                  max={ACCELERO_MAX_FREQ}
                  addonAfter={'Hz'}
                  type={'number'}
                  width={16}
                  required
                />
              </Form.Item>
            </>
          )}
          {/* Microphone */}
          {watchSensorType === SENSOR_TYPES.microphone && (
            <>
              {/* Microphone min freq */}
              <Form.Item
                name='micro_freq_min'
                label={'Minimum frequency'}
                htmlFor='micFreqMin'
                required
                labelCol={{ span: 14 }}
                rules={MICRO_FREQ_MIN_RULE}
                dependencies={['micro_freq_max']}>
                <Input
                  id='micFreqMin'
                  type={'number'}
                  width={16}
                  addonAfter={'Hz'}
                  min={0}
                  max={MICRO_MAX_FREQ - MIN_INTERVAL_MICRO}
                  required
                />
              </Form.Item>
              {/*Microphone max freq */}
              <Form.Item
                name='micro_freq_max'
                label={'Maximum frequency'}
                htmlFor='micfreqMax'
                labelCol={{ span: 14 }}
                tooltip={`Max ${MICRO_MAX_FREQ}Hz`}
                rules={MICRO_FREQ_MAX_RULE}
                dependencies={['micro_freq_min']}>
                <Input
                  id='micfreqMax'
                  type={'number'}
                  addonAfter={'Hz'}
                  required
                  min={0}
                  max={MICRO_MAX_FREQ}
                />
              </Form.Item>
            </>
          )}
          {/* Spectrum types */}
          <Form.Item
            name='custom_spectrum_type'
            label={'Spectrum type'}
            htmlFor='specTypeMic'
            labelCol={{ span: 14 }}>
            <Select
              options={
                watchSensorType === SENSOR_TYPES.microphone
                  ? SPECTRUM_TYPE_MICRO_OPTIONS
                  : SPECTRUM_TYPE_ACC_OPTIONS
              }
              placeholder={'Choose spectrum type'}
              id='specTypeMic'
            />
          </Form.Item>
        </div>
        <div
          className='explanationColumn'
          style={{
            backgroundColor: colorBgLayout,
          }}>
          <div className='explanationContent'>
            <CustomSpectrogramExplanation />
          </div>
        </div>
      </div>
    </>
  );
};
