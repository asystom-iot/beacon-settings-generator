export interface SelectableValue {
  label: string;
  value: string | number;
  description?: string;
}

export interface TimeProps {
  periodicity: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface IndicatorValueProps {
  enabled: boolean;
  bitPos: number;
}

/** General settings (scheduling and activation) */
export type PublicFormDTO = {
  ambient_periodicity: number;
  ambient_hours: number;
  ambient_minutes: number;
  ambient_seconds: number;
  prediction_periodicity: number;
  prediction_hours: number;
  prediction_minutes: number;
  prediction_seconds: number;
  introspection_periodicity: number;
  introspection_hours: number;
  introspection_minutes: number;
  introspection_seconds: number;
};

export interface IndicatorProps {
  Battery: IndicatorValueProps;
  Humidity: IndicatorValueProps;
  Temperature: IndicatorValueProps;
  Signature: IndicatorValueProps;
  Mileage: IndicatorValueProps;
  MachineDrift: IndicatorValueProps;
  WakeOnMotion: IndicatorValueProps;
  MachineR0: IndicatorValueProps;
  MachineR1: IndicatorValueProps;
  SonicDetection: IndicatorValueProps;
  Pt100: IndicatorValueProps;
  TC: IndicatorValueProps;
  CurrentLoop: IndicatorValueProps;
  Pressure: IndicatorValueProps;
  ShockDetection: IndicatorValueProps;
  SonicE: IndicatorValueProps;
  VibraE: IndicatorValueProps;
  AmbientAggr: IndicatorValueProps;
  Wav: IndicatorValueProps;
  LoraLink: IndicatorValueProps;
}

export interface GlobalPublicSettingsFormDTO extends PublicFormDTO {
  Battery: IndicatorValueProps;
  Humidity: IndicatorValueProps;
  Temperature: IndicatorValueProps;
  Signature: IndicatorValueProps;
  Mileage: IndicatorValueProps;
  MachineDrift: IndicatorValueProps;
  WakeOnMotion: IndicatorValueProps;
  MachineR0: IndicatorValueProps;
  MachineR1: IndicatorValueProps;
  SonicDetection: IndicatorValueProps;
  Pt100: IndicatorValueProps;
  TC: IndicatorValueProps;
  CurrentLoop: IndicatorValueProps;
  Pressure: IndicatorValueProps;
  ShockDetection: IndicatorValueProps;
  SonicE: IndicatorValueProps;
  VibraE: IndicatorValueProps;
  AmbientAggr: IndicatorValueProps;
  Wav: IndicatorValueProps;
  LoraLink: IndicatorValueProps;
}

export interface PublicSettingsProps {
  public: PublicFormDTO;
  activation: IndicatorProps;
}

/**
 * Signature settings
 * NOTE: Input values must be string
 */

export type AdvancedSettingsFormDTO = {
  woe_mode: string;
  woe_flag: string;
  woe_param: number;
  woe_profile: string;
  woe_threshold: number;
  woe_pretrig_threshold: number;
  woe_posttrig_threshold: number;
  rpm_max: number;
  rpm_min: number;
  threshold: number;
  learning_steps: number;
  sensor_type: SensorType;
  sensor_orientation: Orientation;
  accelero_freq_min: number;
  accelero_freq_max: number;
  micro_freq_min: number;
  micro_freq_max: number;
  custom_spectrum_type: string;
  custom_spectrum_param: number;
  radio_adr: boolean;
  radio_txack: boolean;
  radio_nw_private: boolean;
  radio_cr_base_lorawan: boolean;
  radio_dwell_time: boolean;
  radio_retx_twice: boolean;
  radio_force_lowest_dr: boolean; // enable_packet_split
  radio_region_param: number;
  radio_linkchk: number;
};

export type P = keyof AdvancedSettingsFormDTO;

/** Scheduling time options */
export type PeriodName =
  | 'ambient_minutes'
  | 'ambient_hours'
  | 'ambient_periodicity'
  | 'ambient_seconds'
  | 'prediction_minutes'
  | 'prediction_hours'
  | 'prediction_periodicity'
  | 'prediction_seconds';

export type ActivationParameter =
  | 'Battery'
  | 'Humidity'
  | 'Temperature'
  | 'Signature'
  | 'Mileage'
  | 'MachineDrift'
  | 'WakeOnMotion'
  | 'MachineR0'
  | 'MachineR1'
  | 'SonicDetection'
  | 'Pt100'
  | 'TC'
  | 'CurrentLoop'
  | 'Pressure'
  | 'ShockDetection'
  | 'SonicE'
  | 'VibraE'
  | 'AmbientAggr'
  | 'Wav'
  | 'LoraLink';

export type PublicSettingsTimeKey = 'periodicity' | 'hours' | 'minutes' | 'seconds';
export type PublicSettingKey = 'ambient' | 'prediction' | 'introspection';

export const ORIENTATION_VALUES = {
  X: '010000',
  Y: '020000',
  Z: '040000',
  XYZ: '000000',
} as const;

type EnumValues<T> = T[keyof T];
export type Orientation = EnumValues<typeof ORIENTATION_VALUES>;

export const SENSOR_TYPES = {
  microphone: '12',
  accelerometer: '3',
} as const;

export type SensorType = EnumValues<typeof SENSOR_TYPES>;

/** Wake on events modes */
export enum WoeMode {
  inactive = 'Inactive',
  motion = 'Wake-On-Motion',
  reserved = 'RESERVED',
  scheduler = 'Wake-On-Scheduler',
  analog = 'Wake-On-Analog',
  contact = 'Wake-On-Contact',
}
