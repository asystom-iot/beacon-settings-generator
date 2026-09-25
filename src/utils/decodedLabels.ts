import {
  AdvancedSettingsFormDTO,
  GlobalPublicSettingsFormDTO,
  SelectableValue,
  WoeMode,
} from '../models/form';
import { SI_ORDERED } from '../models/settings';
import { getAdvancedSensorOrientations, getSensorTypes, getSpectrumTypes } from './formOptions';

export interface FieldLabel {
  label: string;
  unit?: string;
  formatValue?: (value: unknown) => string;
}

export interface SettingsSection {
  title: string;
  keys: string[];
}

/** Keeps only the given keys from settings, in the given order, dropping keys that aren't present */
export const pickSettings = (
  settings: Record<string, unknown>,
  keys: string[]
): Record<string, unknown> =>
  keys.reduce((picked, key) => {
    if (key in settings) {
      picked[key] = settings[key];
    }
    return picked;
  }, {} as Record<string, unknown>);

/** Builds a value -> label lookup from the same options used by the "Build hex string" selects */
const buildValueLabels = (options: SelectableValue[]): Record<string, string> =>
  options.reduce(
    (lookup, option) => ({ ...lookup, [String(option.value)]: option.label }),
    {} as Record<string, string>
  );

const SENSOR_TYPE_LABELS = buildValueLabels(getSensorTypes());
const SENSOR_ORIENTATION_LABELS = buildValueLabels(getAdvancedSensorOrientations());
const SPECTRUM_TYPE_LABELS = buildValueLabels(getSpectrumTypes());

const lookupOrRaw = (lookup: Record<string, string>) => (value: unknown) =>
  lookup[String(value)] ?? String(value);

/**
 * Field labels/units mirroring exactly what "Build hex string" shows for the given settings
 * (some labels depend on sensor_type / woe_mode, matching the conditional fields shown there).
 */
export const getAdvancedSettingsLabels = (
  settings: AdvancedSettingsFormDTO
): Record<string, FieldLabel> => {
  const labels: Record<string, FieldLabel> = {
    sensor_type: { label: 'Sensor type', formatValue: lookupOrRaw(SENSOR_TYPE_LABELS) },
    sensor_orientation: {
      label: 'Sensor orientation',
      formatValue: lookupOrRaw(SENSOR_ORIENTATION_LABELS),
    },
    custom_spectrum_type: {
      label: 'Spectrum type',
      formatValue: lookupOrRaw(SPECTRUM_TYPE_LABELS),
    },
    rpm_min: { label: 'RPM min', unit: 'rpm' },
    rpm_max: { label: 'RPM max', unit: 'rpm' },
    woe_mode: { label: 'Mode' },
    woe_flag: { label: 'Option' },
    radio_adr: { label: 'ADR Enabled' },
    radio_txack: { label: 'Txack Enabled' },
    radio_nw_private: { label: 'Private NW (0x12)' },
    radio_cr_base_lorawan: { label: 'Force CR4/5' },
    radio_dwell_time: { label: 'Dwell Time ON' },
    radio_retx_twice: { label: 'Retx enabled (x2)' },
    radio_force_lowest_dr: { label: 'Enable packet split' },
    radio_region_param: { label: 'LoRa Freq Param' },
    radio_linkchk: { label: 'LoRa LinkChk', unit: 's' },
    micro_freq_min: { label: 'Minimum frequency (Microphone)', unit: 'Hz' },
    micro_freq_max: { label: 'Maximum frequency (Microphone)', unit: 'Hz' },
    accelero_freq_min: { label: 'Minimum frequency (Accelerometer)', unit: 'Hz' },
    accelero_freq_max: { label: 'Maximum frequency (Accelerometer)', unit: 'Hz' },
  };

  switch (settings.woe_mode) {
    case WoeMode.motion:
      labels.woe_threshold = { label: 'Vibration wakeup threshold', unit: 'mg' };
      labels.woe_pretrig_threshold = { label: 'Delayed measurement', unit: 's' };
      labels.woe_posttrig_threshold = { label: 'End of cycle delay', unit: 's' };
      break;
    case WoeMode.analog:
      labels.woe_param = { label: 'Region upper limit', unit: 'mA' };
      labels.woe_threshold = { label: 'Region lower limit', unit: 'mA' };
      labels.woe_pretrig_threshold = { label: 'Delayed measurement', unit: 's' };
      break;
    case WoeMode.contact:
      labels.woe_pretrig_threshold = { label: 'Delayed measurement', unit: 's' };
      break;
    default:
      break;
  }

  return labels;
};

/**
 * Groups advanced settings fields into the same sections shown in "Build hex string"
 * (Custom spectrogram, RPM settings, Synchronization modes, LoRaWAN).
 */
export const getAdvancedSettingsSections = (): SettingsSection[] => [
  {
    title: 'Custom spectrogram',
    keys: [
      'sensor_type',
      'sensor_orientation',
      'micro_freq_min',
      'micro_freq_max',
      'accelero_freq_min',
      'accelero_freq_max',
      'custom_spectrum_type',
    ],
  },
  {
    title: 'RPM settings',
    keys: ['rpm_min', 'rpm_max'],
  },
  {
    title: 'Synchronization modes',
    keys: [
      'woe_mode',
      'woe_flag',
      'woe_threshold',
      'woe_param',
      'woe_pretrig_threshold',
      'woe_posttrig_threshold',
    ],
  },
  {
    title: 'LoRaWAN',
    keys: [
      'radio_adr',
      'radio_txack',
      'radio_nw_private',
      'radio_cr_base_lorawan',
      'radio_dwell_time',
      'radio_retx_twice',
      'radio_force_lowest_dr',
      'radio_region_param',
      'radio_linkchk',
    ],
  },
  {
    title: 'Other settings',
    keys: ['threshold', 'learning_steps', 'custom_spectrum_param'],
  },
];

/** Field labels mirroring exactly what "Build hex string" shows for scheduling/activation settings */
export const getPublicSettingsLabels = (): Record<string, FieldLabel> => ({
  Humidity: { label: 'Humidity' },
  Temperature: { label: 'Temperature' },
  ambient_period: { label: 'Ambient period' },
  prediction_period: { label: 'Measurement period' },
  introspection_period: { label: 'Introspection period' },
});

/**
 * Groups scheduling/activation fields into the same sections shown in "Build hex string"
 * (Scheduling, Activation).
 */
export const getPublicSettingsSections = (): SettingsSection[] => [
  {
    title: 'Scheduling',
    keys: ['ambient_period', 'prediction_period', 'introspection_period'],
  },
  {
    title: 'Activation',
    keys: [...SI_ORDERED],
  },
];

const pad2 = (n: number): string => String(n).padStart(2, '0');

const formatPeriod = (hours: number, minutes: number, seconds: number): string =>
  `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`;

/**
 * Groups each period's hours/minutes/seconds into a single "hh:mm:ss" value on one row,
 * matching how "Build hex string" presents each period as a single field.
 */
export const groupSchedulingPeriods = (
  settings: GlobalPublicSettingsFormDTO
): Record<string, unknown> => {
  const {
    ambient_hours,
    ambient_minutes,
    ambient_seconds,
    ambient_periodicity,
    prediction_hours,
    prediction_minutes,
    prediction_seconds,
    prediction_periodicity,
    introspection_hours,
    introspection_minutes,
    introspection_seconds,
    introspection_periodicity,
    ...rest
  } = settings;

  return {
    ambient_period: formatPeriod(ambient_hours, ambient_minutes, ambient_seconds),
    prediction_period: formatPeriod(prediction_hours, prediction_minutes, prediction_seconds),
    introspection_period: formatPeriod(
      introspection_hours,
      introspection_minutes,
      introspection_seconds
    ),
    ...rest,
  };
};
