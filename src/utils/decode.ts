import {
  Orientation,
  SensorType,
  AdvancedSettingsFormDTO,
  GlobalPublicSettingsFormDTO,
  IndicatorProps,
  PublicFormDTO,
  WoeMode,
} from '../models/form';
import {
  FLAG_MODE_WOA,
  FLAG_MODE_WOC,
  FLAG_MODE_WOM,
  FLAG_MODE_WOS,
  private_settings_model,
  radio_model,
  scheduling_settings_model,
  settingsIndicators,
  SI_ORDERED,
  SIOrderedKeys,
  WOE_AVAIL_MODES,
  woe_modes_model,
  WOE_POWER_PROFILES,
} from '../models/settings';
import { OP_CODES, PRIVATE_SETTINGS_LENGTH, PUBLIC_SETTINGS_LENGTH } from './constants';

const getAvailableFlagMode = (woeMode: WoeMode): string[] => {
  switch (woeMode) {
    case WoeMode.motion: {
      return FLAG_MODE_WOM;
    }
    case WoeMode.scheduler: {
      return FLAG_MODE_WOS;
    }
    case WoeMode.analog: {
      return FLAG_MODE_WOA;
    }
    case WoeMode.contact: {
      return FLAG_MODE_WOC;
    }
    default: {
      return FLAG_MODE_WOM;
    }
  }
};

/** PRIVATE SETTINGS / Decode type and orientation of sensor */
export const decodeSensorPrivateSettings = (settingsValue: string) => {
  const privateSettings = {} as any;
  privateSettings.sensor_type = decodeToUint32(
    settingsValue.substring(0, 2)
  ).toString() as SensorType; // sensor uses 1B === 2 chars
  privateSettings.sensor_orientation = settingsValue.substring(2, 8) as Orientation; // orientation uses 3B === 6 chars
  return privateSettings;
};

/** Decode micro_freq_max | micro_freq_min | accelero_freq_max | accelero_freq_min | rpm_max | rpm_min | threshold | learning_steps | custom_spectrum_type | custom_spectrum_param */
export const decodeBasicSettings = (settingValue: string) => {
  let privateSettings = {} as any;
  for (const [setting, value] of Object.entries({
    ...private_settings_model,
  })) {
    let tmp = decodeToUint32(
      settingValue.substring(value.valueOffset, value.valueOffset + value.sizeC)
    );
    if (setting.match(/^rpm_/g)) {
      tmp *= 60; // Convert RPM as remote sends Hz
    }
    if (setting.match(/^micro_freq/g)) {
      tmp *= 10; // Convert Sonic as remote sends Hz
    }
    privateSettings[setting as keyof AdvancedSettingsFormDTO] =
      setting === 'custom_spectrum_type' ? tmp.toString() : tmp;
  }
  return privateSettings;
};

/** Decode Wake on events settings */
export const decodeWoe = (settingValue: string) => {
  let WOE_AVAILABLE_FLAGS = FLAG_MODE_WOM;
  let woeSettings = {} as any;
  for (const [settingWoe, valueWoe] of Object.entries(woe_modes_model)) {
    const offset = valueWoe.valueOffset - woe_modes_model['woe_mode'].valueOffset;
    const value = decodeToUint32(settingValue.substring(offset, offset + valueWoe.sizeC));

    if (valueWoe.isBitmask) {
      const mask = valueWoe.mask!;
      const bitshift = valueWoe.bitPos!;
      woeSettings[settingWoe as keyof AdvancedSettingsFormDTO] = (value & mask) >>> bitshift;

      if (valueWoe.hasOwnProperty('selected')) {
        switch (settingWoe) {
          case 'woe_mode':
            woeSettings[settingWoe as keyof AdvancedSettingsFormDTO] =
              WOE_AVAIL_MODES[woeSettings[settingWoe]] || '';
            WOE_AVAILABLE_FLAGS = getAvailableFlagMode(woeSettings[settingWoe]);
            break;
          case 'woe_profile':
            woeSettings[settingWoe as keyof AdvancedSettingsFormDTO] =
              WOE_POWER_PROFILES[woeSettings[settingWoe]] || '';
            break;
          case 'woe_flag':
            woeSettings[settingWoe as keyof AdvancedSettingsFormDTO] =
              WOE_AVAILABLE_FLAGS[woeSettings[settingWoe]] || '';
            break;
          default:
            break;
        }
      }
    } else {
      woeSettings[settingWoe as keyof AdvancedSettingsFormDTO] = value;
    }
  }
  // For WOA UI, we need to compute (edgeMin, edgeMax) a.k.a (threshold, param)=f(center, %offset)
  if (woeSettings['woe_mode'] === 'Wake-On-Analog') {
    convertInternalParamsToWoaEdges(woeSettings);
    woeSettings['woe_param'] = Math.round(woeSettings['woe_param'] * 10) / 10;
    woeSettings['woe_threshold'] = Math.round(woeSettings['woe_threshold'] * 10) / 10;
  }

  // For pre/posttrig UI we need to express values in s (they are sent as 1/10s)
  let tmp = woeSettings['woe_pretrig_threshold'] / 10;
  woeSettings['woe_pretrig_threshold'] = Math.round(tmp * 10) / 10;
  tmp = woeSettings['woe_posttrig_threshold'] / 10;
  woeSettings['woe_posttrig_threshold'] = Math.round(tmp * 10) / 10;

  return woeSettings;
};

const convertInternalParamsToWoaEdges = (woeSettings: any) => {
  const regionTolerance = woeSettings['woe_param'];
  // woe_threshold comes as 1/100mA. convert to mA before evaluating edges
  const regionCenter = woeSettings['woe_threshold'] / 100;

  let offset = (regionCenter * regionTolerance) / 100;
  // offset must be at least 0.1 mA, else rounding will make min and max equal
  offset = Math.round(offset * 10) >= 1 ? offset : 0.1;
  const edgeMax = regionCenter + offset;
  const edgeMin = regionCenter - offset;

  woeSettings['woe_param'] = edgeMax;
  woeSettings['woe_threshold'] = edgeMin;
};

/** Decode radio settings */
export const decodeRadio = (settingValue: string) => {
  let tmp = 0;
  let radioSettings = {} as any;
  const radioAbsoluteOffset = radio_model['radio_adr'].valueOffset;

  // get offset for radio stuff inside SVP
  for (const [settingRadio, valueRadio] of Object.entries(radio_model)) {
    const offset = valueRadio.valueOffset;
    const varSz = valueRadio.sizeC;
    tmp = decodeToUint32(
      settingValue.substring(offset - radioAbsoluteOffset, offset - radioAbsoluteOffset + varSz)
    );

    if (valueRadio.isBitmask) {
      const mask = valueRadio.mask!;
      const bitshift = valueRadio.bitPos!;
      if (valueRadio.hasOwnProperty('enabled')) {
        radioSettings[settingRadio] = (tmp & mask) >>> bitshift ? true : false;
      }
    } else {
      radioSettings[settingRadio] = tmp;
    }
  }
  return radioSettings;
};

export const decodeToUint8 = (value: string) => {
  if (!value.length || value.length > 2) {
    console.log('error while decoding settings');
    return 0;
  }
  return parseInt(value, 16);
};

export const decodeToUint32 = (value: string) => {
  if (!value.length || value.length > 8) {
    console.log('error while decoding settings');
    return 0;
  }
  const matchedValue = value.match(/../g);
  if (matchedValue) {
    const decodedValue = matchedValue.reverse().join('');
    return parseInt('0x' + decodedValue, 16);
  }

  console.log('error while decoding settings');
  return 0;
};

/** PUBLIC SETTINGS / Decode ambient, prediction & introspection periodicities */
export const decodePublicSettings = (settingsValue: string): PublicFormDTO => {
  // the first 4B (8 chars) are the activation bitmask, decoded separately via decodeActivationBitMask
  const values = settingsValue.substring(8, settingsValue.length);
  let i = 0;
  let publicSettings: PublicFormDTO = {
    ambient_periodicity: 0,
    ambient_hours: 0,
    ambient_minutes: 0,
    ambient_seconds: 0,
    prediction_periodicity: 0,
    prediction_hours: 0,
    prediction_minutes: 0,
    prediction_seconds: 0,
    introspection_periodicity: 0,
    introspection_hours: 0,
    introspection_minutes: 0,
    introspection_seconds: 0,
  };

  for (const [publicSetting] of Object.entries(scheduling_settings_model)) {
    const tmp = decodeToUint32(values.substring(i, i + 4));
    i += 4;
    let SEC_OVERHEAD = tmp % 6;
    if (publicSetting === 'introspection') {
      SEC_OVERHEAD = 0;
    }

    publicSettings[`${publicSetting}_periodicity` as keyof PublicFormDTO] = tmp - SEC_OVERHEAD;
    const s = publicSettings[`${publicSetting}_periodicity` as keyof PublicFormDTO] * 10;
    const r = s % 3600;
    publicSettings[`${publicSetting}_hours` as keyof PublicFormDTO] = Math.floor((s - r) / 3600);
    publicSettings[`${publicSetting}_seconds` as keyof PublicFormDTO] = r % 60;
    publicSettings[`${publicSetting}_minutes` as keyof PublicFormDTO] = Math.floor(
      (r - publicSettings[`${publicSetting}_seconds` as keyof PublicFormDTO]) / 60
    );
  }
  return publicSettings;
};

/** PUBLIC SETTINGS / Decode activation bitmask into indicator toggles */
export const decodeActivationBitMask = (bmask: number): IndicatorProps => {
  const decodedSettingsIndicators = {
    ...settingsIndicators,
  };
  for (const elt of SI_ORDERED) {
    decodedSettingsIndicators[elt as SIOrderedKeys].enabled =
      bmask & (1 << settingsIndicators[elt as SIOrderedKeys].bitPos) ? true : false;
  }
  return decodedSettingsIndicators as unknown as IndicatorProps;
};

/** Strip an optional trailing `:fPort` from a hex string and validate the remaining payload */
export interface ParsedHexInput {
  payload: string;
  fPort?: number;
}

export const parseHexInput = (raw: string): ParsedHexInput => {
  const trimmed = raw.trim();
  const separatorIndex = trimmed.indexOf(':');
  const payload = (
    separatorIndex === -1 ? trimmed : trimmed.substring(0, separatorIndex)
  ).toLowerCase();
  const fPortPart = separatorIndex === -1 ? undefined : trimmed.substring(separatorIndex + 1);

  if (!payload) {
    throw new Error('Please enter a hex string.');
  }
  if (!/^[0-9a-f]+$/.test(payload) || payload.length % 2 !== 0) {
    throw new Error('The hex string must contain an even number of hexadecimal characters (0-9, a-f).');
  }
  if (fPortPart === undefined || fPortPart === '') {
    return { payload };
  }
  const fPort = Number(fPortPart);
  if (!Number.isInteger(fPort) || fPort < 0) {
    throw new Error(`"${fPortPart}" is not a valid fPort.`);
  }
  return { payload, fPort };
};

const ADVANCED_SETTINGS_OP_CODES: number[] = [
  OP_CODES.RX_PRV_SETTINGS_UPDATE,
  OP_CODES.RX_PRV_SETTINGS_UPDATE_CLIENT_LOCK,
];

const SCHEDULING_SETTINGS_OP_CODES: number[] = [
  OP_CODES.RX_PUB_SETTINGS_UPDATE,
  OP_CODES.RX_PUB_SETTINGS_UPDATE_CLIENT_LOCK,
];

/** Decode a full advanced (private) settings hex string, optionally suffixed with `:fPort` */
export const decodeAdvancedSettingsValue = (raw: string): AdvancedSettingsFormDTO => {
  const { payload, fPort } = parseHexInput(raw);

  if (payload.length !== PRIVATE_SETTINGS_LENGTH) {
    throw new Error(
      `Expected a ${PRIVATE_SETTINGS_LENGTH}-character hex payload for advanced settings, got ${payload.length}.`
    );
  }
  if (fPort !== undefined && !ADVANCED_SETTINGS_OP_CODES.includes(fPort)) {
    throw new Error(`fPort ${fPort} does not correspond to an advanced settings update.`);
  }

  return {
    ...decodeSensorPrivateSettings(payload),
    ...decodeBasicSettings(payload.substring(8)),
    ...decodeWoe(payload.substring(48)),
    ...decodeRadio(payload.substring(64)),
  } as AdvancedSettingsFormDTO;
};

/** Decode a full public (scheduling & activation) settings hex string, optionally suffixed with `:fPort` */
export const decodePublicSettingsValue = (raw: string): GlobalPublicSettingsFormDTO => {
  const { payload, fPort } = parseHexInput(raw);

  if (payload.length !== PUBLIC_SETTINGS_LENGTH) {
    throw new Error(
      `Expected a ${PUBLIC_SETTINGS_LENGTH}-character hex payload for scheduling settings, got ${payload.length}.`
    );
  }
  if (fPort !== undefined && !SCHEDULING_SETTINGS_OP_CODES.includes(fPort)) {
    throw new Error(`fPort ${fPort} does not correspond to a scheduling settings update.`);
  }

  const activationBmask = decodeToUint32(payload.substring(0, 8));

  return {
    ...decodePublicSettings(payload),
    ...decodeActivationBitMask(activationBmask),
  } as GlobalPublicSettingsFormDTO;
};
