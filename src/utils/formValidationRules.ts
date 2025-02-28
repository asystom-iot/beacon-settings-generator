import { Rule } from 'antd/es/form';
import { SENSOR_TYPES } from '../models/form';
import { radio_model, woe_modes_model } from '../models/settings';
import { SYNC_MODES } from './constants';

/** RPM settings */

export const RPM_MIN_RULE: Rule[] = [
  { required: true, message: 'RPM min required' },
  { pattern: /^(?!0{2,}).*$/, message: 'Input cannot contain "00".' },
  ({ getFieldValue }) => ({
    validator(_, value) {
      const maxValue = getFieldValue('rpm_max');
      if (maxValue !== undefined && parseInt(value, 10) >= parseInt(maxValue, 10)) {
        return Promise.reject(new Error('Minimum RPM must be inferior to maximum RPM'));
      }
      return Promise.resolve();
    },
  }),
];

export const RPM_MAX_RULE: Rule[] = [
  { required: true, message: 'RPM max required' },
  ({ getFieldValue }) => ({
    validator(_, value) {
      const minValue = getFieldValue('rpm_min');
      if (minValue !== undefined && parseInt(value, 10) <= parseInt(minValue, 10)) {
        return Promise.reject(new Error('Maximum RPM must be superior to minimum RPM'));
      }
      return Promise.resolve();
    },
  }),
];

/** Synchronization modes */

const WOA_PARAMETER_LIMIT = 30;

export const WOE_MODE_RULE: Rule[] = [{ required: true, message: 'Mode is required' }];

// woe_threshold Wake-On-Motion
export const VIB_WAKEUP_RULE: Rule[] = [
  { required: true, message: 'Vibration wakeup threshold is required' },
  { pattern: /^(?!0{2,}).*$/, message: 'Input cannot contain "00".' },
  ({ getFieldValue }) => ({
    validator(_, value) {
      const maxValue = woe_modes_model.woe_threshold.max!;
      // Wake-On-Motion
      if (getFieldValue('woe_mode') === SYNC_MODES[1].value) {
        if (parseInt(value, 10) > maxValue) {
          return Promise.reject(
            new Error(`Vibration wakeup threshold must be inferior to ${maxValue}`)
          );
        }
      }
      return Promise.resolve();
    },
  }),
];

// woe_pretrig_threshold Wake-On-Analog
export const DELAYED_MEASUREMENT_RULE: Rule[] = [
  { required: true, message: 'Delayed measurement is required' },
  { pattern: /^(?!0{2,}).*$/, message: 'Input cannot contain "00".' },
  ({ getFieldValue }) => ({
    validator(_, value) {
      const maxValue = woe_modes_model.woe_pretrig_threshold.max!;
      // Wake-On-Analog
      if (getFieldValue('woe_mode') === SYNC_MODES[4].value) {
        if (parseInt(value, 10) > maxValue) {
          return Promise.reject(new Error(`Delayed measurement must be inferior to ${maxValue}`));
        }
      }
      return Promise.resolve();
    },
  }),
];

// woe_posttrig_threshold Wake-On-Motion
export const END_OF_CYCLE_RULE: Rule[] = [
  { required: true, message: 'End of cycle delay is required' },
  { pattern: /^(?!0{2,}).*$/, message: 'Input cannot contain "00".' },
  ({ getFieldValue }) => ({
    validator(_, value) {
      const maxValue = woe_modes_model.woe_posttrig_threshold.max!;
      if (getFieldValue('woe_mode') === SYNC_MODES[1].value) {
        if (parseInt(value, 10) > maxValue) {
          return Promise.reject(new Error(`End of cycle delay must be inferior to ${maxValue}`));
        }
      }
      return Promise.resolve();
    },
  }),
];

// woe_threshold Wake-On-Analog
export const WOA_REGION_LOWER_RULE: Rule[] = [
  { required: true, message: 'Region lower limit is required' },
  { pattern: /^(?!0{2,}).*$/, message: 'Input cannot contain "00".' },
  ({ getFieldValue }) => ({
    validator(_, value) {
      const upperLimit = getFieldValue('woe_param');
      // Wake-on-Analog
      if (getFieldValue('woe_mode') === SYNC_MODES[4].value) {
        if (upperLimit !== undefined && parseInt(value, 10) >= parseInt(upperLimit, 10)) {
          return Promise.reject(
            new Error('Region lower limit must be inferior to region upper limit')
          );
        }

        if (parseInt(value, 10) > WOA_PARAMETER_LIMIT) {
          return Promise.reject(
            new Error(`Region lower limit must be inferior to ${WOA_PARAMETER_LIMIT}mA`)
          );
        }
      }
      return Promise.resolve();
    },
  }),
];

// woe_param Wake-On-Analog
export const WOA_REGION_UPPER_RULE: Rule[] = [
  { required: true, message: 'Region upper limit is required' },
  ({ getFieldValue }) => ({
    validator(_, value) {
      // Wake-On-Analog
      if (getFieldValue('woe_mode') === SYNC_MODES[4].value) {
        if (parseInt(value, 10) > WOA_PARAMETER_LIMIT) {
          return Promise.reject(
            new Error(`Region upper limit must be inferior to ${WOA_PARAMETER_LIMIT}mA`)
          );
        }

        const lowerLimit = getFieldValue('woe_threshold');
        if (lowerLimit !== undefined && parseInt(lowerLimit, 10) >= parseInt(value, 10)) {
          return Promise.reject(
            new Error('Region upper limit must be superior to region lower limit')
          );
        }
      }
      return Promise.resolve();
    },
  }),
];

/** Scheduling settings */

export const PERIODICITY_RULE: Rule[] = [
  ({ getFieldValue }) => ({
    validator() {
      if (
        getFieldValue('ambient_hours') === 0 &&
        getFieldValue('ambient_minutes') === 0 &&
        getFieldValue('ambient_seconds') === 0 &&
        getFieldValue('prediction_hours') === 0 &&
        getFieldValue('prediction_minutes') === 0 &&
        getFieldValue('prediction_seconds') === 0
      ) {
        return Promise.reject(new Error());
      }
      return Promise.resolve();
    },
  }),
];

/** Custom spectrogram */
export const MICRO_MAX_FREQ = 80000;
export const ACCELERO_MAX_FREQ = 2000;
export const MIN_INTERVAL_ACCEL = 10;
export const MIN_INTERVAL_MICRO = 50;
export const MAX_CUTOFF_VALUE = 1000;

export const MICRO_FREQ_MAX_RULE: Rule[] = [
  { required: true, message: 'Maximum frequency is required' },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (getFieldValue('sensor_type') === SENSOR_TYPES.microphone) {
        if (parseInt(value, 10) > MICRO_MAX_FREQ) {
          return Promise.reject(new Error(`Maximum frequency must be <= ${MICRO_MAX_FREQ}Hz`));
        }
        const minFreq = getFieldValue('micro_freq_min');

        if (parseInt(value, 10) <= parseInt(minFreq, 10)) {
          return Promise.reject(
            new Error('Maximum frequency must be superior to minimum frequency')
          );
        }

        if (parseInt(value, 10) < MIN_INTERVAL_MICRO) {
          return Promise.reject(new Error(`Maximum frequency must be >= ${MIN_INTERVAL_MICRO}Hz`));
        }
        return Promise.resolve();
      }
    },
  }),
];

export const MICRO_FREQ_MIN_RULE: Rule[] = [
  { required: true, message: 'Minimum frequency is required' },
  { pattern: /^(?!0{2,}).*$/, message: 'Input cannot contain "00".' },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (getFieldValue('sensor_type') === SENSOR_TYPES.microphone) {
        if (parseInt(value, 10) > MICRO_MAX_FREQ - MIN_INTERVAL_MICRO) {
          return Promise.reject(
            new Error(`Minimum frequency must be <= ${MICRO_MAX_FREQ - MIN_INTERVAL_MICRO}Hz`)
          );
        }
        const maxFreq = getFieldValue('micro_freq_max');

        if (parseInt(value, 10) >= parseInt(maxFreq, 10)) {
          return Promise.reject(
            new Error('Minimum frequency must be inferior to maximum frequency')
          );
        }

        return Promise.resolve();
      }
    },
  }),
];

export const ACCELERO_FREQ_MAX_RULE: Rule[] = [
  { required: true, message: 'Maximum frequency is required' },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (getFieldValue('sensor_type') === SENSOR_TYPES.accelerometer) {
        if (parseInt(value, 10) > ACCELERO_MAX_FREQ) {
          return Promise.reject(new Error(`Maximum frequency must be <= ${ACCELERO_MAX_FREQ}Hz`));
        }
        const minFreq = getFieldValue('accelero_freq_min');

        if (parseInt(value, 10) <= parseInt(minFreq, 10)) {
          return Promise.reject(
            new Error('Maximum frequency must be superior to minimum frequency')
          );
        }

        if (parseInt(value, 10) < MIN_INTERVAL_ACCEL) {
          return Promise.reject(new Error(`Maximum frequency must be >= ${MIN_INTERVAL_ACCEL}Hz`));
        }
        return Promise.resolve();
      }
    },
  }),
];

export const ACCELERO_FREQ_MIN_RULE: Rule[] = [
  { required: true, message: 'Minimum frequency is required' },
  { pattern: /^(?!0{2,}).*$/, message: 'Input cannot contain "00".' },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (getFieldValue('sensor_type') === SENSOR_TYPES.accelerometer) {
        if (parseInt(value, 10) > ACCELERO_MAX_FREQ - MIN_INTERVAL_ACCEL) {
          return Promise.reject(
            new Error(`Minimum frequency must be <= ${ACCELERO_MAX_FREQ - MIN_INTERVAL_ACCEL}Hz`)
          );
        }
        const maxFreq = getFieldValue('accelero_freq_max');

        if (parseInt(value, 10) >= parseInt(maxFreq, 10)) {
          return Promise.reject(
            new Error('Minimum frequency must be inferior to maximum frequency')
          );
        }

        return Promise.resolve();
      }
    },
  }),
];

/** Radio */
export const LORA_FREQ_PARAM_RULE: Rule[] = [
  { required: true, message: 'LoRa Frequency Param is required' },
  { pattern: /^(?!0{2,}).*$/, message: 'Input cannot contain "00".' },
  () => ({
    validator(_, value) {
      const maxValue = radio_model.radio_region_param.max!;
      if (parseInt(value, 10) > maxValue) {
        return Promise.reject(new Error(`LoRa Frequency Param must be inferior to ${maxValue}`));
      }
      return Promise.resolve();
    },
  }),
];

export const LORA_LINK_CHECK_RULE: Rule[] = [
  { required: true, message: 'Mode is required' },
  { pattern: /^(?!0{2,}).*$/, message: 'Input cannot contain "00".' },
  () => ({
    validator(_, value) {
      const maxValue = radio_model.radio_linkchk.max!;
      if (parseInt(value, 10) > maxValue) {
        return Promise.reject(new Error(`Mode must be inferior to ${maxValue}`));
      }
      return Promise.resolve();
    },
  }),
];
