import {
  ORIENTATION_VALUES,
  SensorType,
  SENSOR_TYPES,
  AdvancedSettingsFormDTO,
  WoeMode,
} from '../models/form';
import { ACCELERO_MAX_FREQ, MICRO_MAX_FREQ } from './formValidationRules';
import { FormInstance } from 'antd';
import { FLAGS } from './constants';

/**
 * CUSTOM SPECTROGRAM SETTINGS SECTION
 * Default values changed depending on sensor type
 * On sensor type change, set by default freq min and max
 * @param inputValue SensorType
 * @param form
 * @returns
 */

export const handleSensorTypeChange = (
  inputValue: SensorType,
  form: FormInstance<AdvancedSettingsFormDTO>
) => {
  form.setFields([
    { name: 'micro_freq_min', errors: [] },
    { name: 'micro_freq_max', errors: [] },
    { name: 'accelero_freq_min', errors: [] },
    { name: 'accelero_freq_max', errors: [] },
  ]);
  if (inputValue === SENSOR_TYPES.microphone) {
    form.setFieldsValue({
      accelero_freq_min: 0,
      accelero_freq_max: ACCELERO_MAX_FREQ,
      micro_freq_min: 0,
      micro_freq_max: MICRO_MAX_FREQ,
      sensor_orientation: ORIENTATION_VALUES.XYZ,
      custom_spectrum_type: '1', // set RMS by default
    });
    return;
  }

  form.setFieldsValue({
    micro_freq_min: 0,
    micro_freq_max: MICRO_MAX_FREQ,
    accelero_freq_min: 0,
    accelero_freq_max: ACCELERO_MAX_FREQ,
    sensor_orientation: ORIENTATION_VALUES.X,
  });
};

// WOE: Wake-On-Events, WOM: Wake-On-Motion, WOS: Wake-On-Scheduler, WOA: Wake-On-Analog, WOC: Wake-On-Controller

export const handleWoeModeChange = (e: string, form: FormInstance<AdvancedSettingsFormDTO>) => {
  switch (e) {
    case WoeMode.scheduler:
      form.setFieldsValue({
        woe_flag: FLAGS.wos[0].value as string,
        woe_threshold: 0,
        woe_posttrig_threshold: 0,
        woe_pretrig_threshold: 0,
        woe_param: 0,
      });
      break;
    case WoeMode.motion:
      form.setFieldsValue({
        woe_flag: FLAGS.wom[0].value as string,
        woe_threshold: 100,
        woe_posttrig_threshold: 0,
        woe_pretrig_threshold: 0,
        woe_param: 0,
      });
      break;
    case WoeMode.analog:
      form.setFieldsValue({
        woe_flag: FLAGS.woa[0].value as string,
        woe_threshold: 10,
        woe_param: 20,
        woe_posttrig_threshold: 0,
        woe_pretrig_threshold: 0,
      });
      break;
    case WoeMode.contact:
      form.setFieldsValue({
        woe_flag: FLAGS.woc[0].value as string,
        woe_pretrig_threshold: 0,
        woe_threshold: 0,
        woe_posttrig_threshold: 0,
        woe_param: 0,
      });
      break;
    default:
      break;
  }
};
