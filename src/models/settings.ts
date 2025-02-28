interface SettingProp {
  sizeC: number;
  valueOffset: number;
  isBitmask: boolean;
  max?: number;
  bitPos?: number;
  mask?: number;
  enabled?: boolean;
  selected?: string;
}

type SettingsModel = { [k: string]: SettingProp };

export const fft_model: SettingsModel = {
  handle: {
    sizeC: 2,
    valueOffset: 0,
    isBitmask: false,
  },
  activation: {
    sizeC: 2,
    valueOffset: 2,
    isBitmask: false,
  },
  steps: {
    sizeC: 2,
    valueOffset: 4,
    isBitmask: false,
  },
  algorithm: {
    sizeC: 2,
    valueOffset: 6,
    isBitmask: false,
  },
  fft_sensor_type: {
    sizeC: 2,
    valueOffset: 8,
    isBitmask: false,
  },
  fft_sensor_orientation: {
    sizeC: 2,
    valueOffset: 10,
    isBitmask: false,
  }, // X
  fft_freq_max: {
    sizeC: 8,
    valueOffset: 12,
    isBitmask: false,
    max: 2000,
  }, // param 1
  fft_freq_min: {
    sizeC: 8,
    valueOffset: 20,
    isBitmask: false,
    max: 1950,
  }, // param 2
  fft_compression: {
    sizeC: 8,
    valueOffset: 28,
    isBitmask: false,
  }, // param 3 / 50 bins 8 bits
  fft_spectr_type: {
    sizeC: 8,
    valueOffset: 36,
    isBitmask: false,
  }, // custom spectrum param 4 / spectrum type
  fft_cutoff: {
    sizeC: 8,
    valueOffset: 44,
    isBitmask: false,
  }, // custom spectrum param 5 / cutoff value
};

export type PrivateSettingsKeys =
  | string
  | 'micro_freq_max'
  | 'micro_freq_min'
  | 'accelero_freq_max'
  | 'accelero_freq_min'
  | 'rpm_max'
  | 'rpm_min'
  | 'threshold'
  | 'learning_steps'
  | 'custom_spectrum_type'
  | 'custom_spectrum_param';
export type PrivateSettingsModel = Record<PrivateSettingsKeys, SettingProp>;

export const private_settings_model: PrivateSettingsModel = {
  micro_freq_max: {
    isBitmask: false,
    sizeC: 4,
    valueOffset: 0,
    max: 655350,
  },
  micro_freq_min: {
    isBitmask: false,
    sizeC: 4,
    valueOffset: 4,
    max: 655350,
  },
  accelero_freq_max: {
    isBitmask: false,
    sizeC: 4,
    valueOffset: 8,
    max: 65535,
  },
  accelero_freq_min: {
    isBitmask: false,
    sizeC: 4,
    valueOffset: 12,
    max: 65535,
  },
  rpm_max: {
    isBitmask: false,
    sizeC: 4,
    valueOffset: 16,
    max: 65535,
  },
  rpm_min: {
    isBitmask: false,
    sizeC: 4,
    valueOffset: 20,
    max: 65535,
  },
  threshold: {
    isBitmask: false,
    sizeC: 4,
    valueOffset: 24,
    max: 65535,
  },
  learning_steps: {
    isBitmask: false,
    sizeC: 4,
    valueOffset: 28,
    max: 65535,
  },
  custom_spectrum_type: {
    isBitmask: false,
    sizeC: 4,
    valueOffset: 32,
    max: 65535,
  }, // shock_activity_threshold renamed
  custom_spectrum_param: {
    isBitmask: false,
    sizeC: 4,
    valueOffset: 36,
    max: 65535,
  }, // shock_inactivity_threshold renamed
};

export type WoeModesKeys =
  | string
  | 'woe_mode'
  | 'woe_flag'
  | 'woe_param'
  | 'woe_profile'
  | 'woe_threshold'
  | 'woe_pretrig_threshold'
  | 'woe_posttrig_threshold';
type WoeModesModel = Record<WoeModesKeys, SettingProp>;

export const woe_modes_model: WoeModesModel = {
  woe_mode: {
    isBitmask: true,
    sizeC: 8,
    bitPos: 0,
    mask: 0xf,
    valueOffset: 40,
    max: 15,
    selected: '',
  },
  woe_flag: {
    isBitmask: true,
    sizeC: 8,
    bitPos: 4,
    mask: 0x10,
    valueOffset: 40,
    max: 1,
    selected: '',
  },
  woe_param: {
    isBitmask: true,
    sizeC: 8,
    bitPos: 5,
    mask: 0xffe0,
    valueOffset: 40,
    max: 511,
  },
  woe_profile: {
    isBitmask: true,
    sizeC: 8,
    bitPos: 16,
    mask: 0x30000,
    valueOffset: 40,
    max: 3,
    selected: '',
  },
  woe_threshold: {
    isBitmask: true,
    sizeC: 8,
    bitPos: 18,
    mask: 0xfffc0000,
    valueOffset: 40,
    max: 16383,
  },
  woe_pretrig_threshold: {
    isBitmask: false,
    sizeC: 4,
    valueOffset: 48,
    max: 65535,
  },
  woe_posttrig_threshold: {
    isBitmask: false,
    sizeC: 4,
    valueOffset: 52,
    max: 65535,
  },
};

type RadioKeys =
  | 'radio_adr'
  | 'radio_txack'
  | 'radio_nw_private'
  | 'radio_cr_base_lorawan'
  | 'radio_dwell_time'
  | 'radio_retx_twice'
  | 'radio_force_lowest_dr'
  | 'radio_region_param'
  | 'radio_linkchk'
  | string;
type RadioModel = Record<RadioKeys, SettingProp>;

export const radio_model: RadioModel = {
  radio_adr: {
    enabled: true,
    isBitmask: true,
    sizeC: 4,
    bitPos: 0,
    mask: 0x1,
    valueOffset: 56,
    max: 1,
  },
  radio_txack: {
    enabled: true,
    isBitmask: true,
    sizeC: 4,
    bitPos: 1,
    mask: 0x2,
    valueOffset: 56,
    max: 1,
  },
  radio_nw_private: {
    enabled: false,
    isBitmask: true,
    sizeC: 4,
    bitPos: 2,
    mask: 0x4,
    valueOffset: 56,
    max: 1,
  },
  radio_cr_base_lorawan: {
    enabled: true,
    isBitmask: true,
    sizeC: 4,
    bitPos: 3,
    mask: 0x8,
    valueOffset: 56,
    max: 1,
  },
  radio_dwell_time: {
    enabled: false,
    isBitmask: true,
    sizeC: 4,
    bitPos: 4,
    mask: 0x10,
    valueOffset: 56,
    max: 1,
  },
  radio_retx_twice: {
    enabled: true,
    isBitmask: true,
    sizeC: 4,
    bitPos: 5,
    mask: 0x20,
    valueOffset: 56,
    max: 1,
  },
  radio_force_lowest_dr: {
    // enable_packet_split
    enabled: false,
    isBitmask: true,
    sizeC: 4,
    bitPos: 6,
    mask: 0x40,
    valueOffset: 56,
    max: 1,
  },
  radio_region_param: {
    isBitmask: false,
    sizeC: 4,
    valueOffset: 60,
    max: 65535,
  },
  radio_linkchk: {
    isBitmask: false,
    sizeC: 4,
    valueOffset: 64,
    max: 65535,
  },
};

export const scheduling_settings_model = {
  ambient: {
    periodicity: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
  prediction: {
    periodicity: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
  introspection: {
    periodicity: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
};

export const settingsIndicators = {
  Battery: { enabled: true, bitPos: 0 },
  Humidity: { enabled: true, bitPos: 2 },
  Temperature: { enabled: true, bitPos: 14 },
  Signature: { enabled: true, bitPos: 11 },
  Mileage: { enabled: true, bitPos: 4 },
  MachineDrift: { enabled: false, bitPos: 9 },
  WakeOnMotion: { enabled: false, bitPos: 8 },
  MachineR0: { enabled: false, bitPos: 5 },
  MachineR1: { enabled: false, bitPos: 6 },
  SonicDetection: { enabled: false, bitPos: 3 },
  Pt100: { enabled: false, bitPos: 16 },
  TC: { enabled: false, bitPos: 17 },
  CurrentLoop: { enabled: false, bitPos: 1 },
  Pressure: { enabled: false, bitPos: 7 },
  ShockDetection: { enabled: false, bitPos: 10 },
  SonicE: { enabled: false, bitPos: 13 },
  VibraE: { enabled: false, bitPos: 15 },
  AmbientAggr: { enabled: false, bitPos: 18 },
  Wav: { enabled: false, bitPos: 19 },
  LoraLink: { enabled: false, bitPos: 20 },
};

export const SVP_ORDERED = [
  'micro_freq_max',
  'micro_freq_min',
  'accelero_freq_max',
  'accelero_freq_min',
  'rpm_max',
  'rpm_min',
  'threshold',
  'learning_steps',
  'custom_spectrum_type',
  'custom_spectrum_param',
  'woe_mode',
  'woe_flag',
  'woe_param',
  'woe_profile',
  'woe_threshold',
  'woe_pretrig_threshold',
  'woe_posttrig_threshold',
  'radio_adr',
  'radio_txack',
  'radio_nw_private',
  'radio_cr_base_lorawan',
  'radio_dwell_time',
  'radio_retx_twice',
  'radio_force_lowest_dr',
  'radio_region_param',
  'radio_linkchk',
];

export const WOE_AVAIL_MODES = [
  'Inactive',
  'Wake-On-Motion',
  'RESERVED',
  'Wake-On-Scheduler',
  'Wake-On-Analog',
  'Wake-On-Contact',
];
export const WOE_POWER_PROFILES = ['LowPower', 'MidPower1', 'MidPower2', 'HighPower'];
export const WOE_CONTACT_PROFILES = ['PullNone', 'PullDown', 'PullUp'];

export const FLAG_MODE_WOM = ['No LED', 'Red LED'];
export const FLAG_MODE_WOS = ['Reserved', 'Standard'];
export const FLAG_MODE_WOA = ['OUTSIDE Region', 'INSIDE Region'];
export const FLAG_MODE_WOC = ['Edge ↓', 'Edge ↑'];

export const SV_ORDERED = ['ambient', 'prediction', 'introspection'];

export const SI_ORDERED = [
  'Battery',
  'Humidity',
  'Temperature',
  'Signature',
  'Mileage',
  'MachineDrift',
  'WakeOnMotion',
  'MachineR0',
  'MachineR1',
  'SonicDetection',
  'Pt100',
  'TC',
  'CurrentLoop',
  'Pressure',
  'ShockDetection',
  'SonicE',
  'VibraE',
  'AmbientAggr',
  'Wav',
  'LoraLink',
];

export type SIOrderedKeys =
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
