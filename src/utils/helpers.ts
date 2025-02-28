import {
  ActivationParameter,
  IndicatorProps,
  PublicSettingKey,
  PublicSettingsTimeKey,
  AdvancedSettingsFormDTO,
  WoeMode,
} from '../models/form';
import {
  FLAG_MODE_WOM,
  WOE_POWER_PROFILES,
  FLAG_MODE_WOA,
  FLAG_MODE_WOC,
  FLAG_MODE_WOS,
  WOE_CONTACT_PROFILES,
  SI_ORDERED,
  SIOrderedKeys,
  SVP_ORDERED,
  WOE_AVAIL_MODES,
  woe_modes_model,
  radio_model,
  private_settings_model,
  scheduling_settings_model,
  settingsIndicators,
} from '../models/settings';

import { PRIVATE_SETTINGS_LENGTH, PUBLIC_SETTINGS_LENGTH } from './constants';

export const convertToHex8b = (n: number): string => {
  let valueToConvert = n;
  if (typeof n === 'string') {
    valueToConvert = Number(n);
  }
  const convertedValue = (valueToConvert + Math.pow(2, 8)).toString(16).match(/\B../g)!;
  return convertedValue.reverse().join(``);
};

export const convertToHex32b = (n: number): string => {
  let valueToConvert = n;
  if (typeof n === 'string') {
    valueToConvert = Number(n);
  }
  const convertedValue = (valueToConvert + Math.pow(2, 32)).toString(16).match(/\B../g)!;
  return convertedValue.reverse().join(``);
};

export const convertToHex16b = (n: number): string => {
  let valueToConvert = n;
  if (typeof n === 'string') {
    valueToConvert = Number(n);
  }
  const convertedValue = (valueToConvert + Math.pow(2, 16)).toString(16).match(/\B../g)!;
  return convertedValue.reverse().join(``);
};

export const replaceAt = (
  settingValue: string,
  value: string,
  valueOffset: number,
  valueSize: number
) => {
  return (
    settingValue.slice(0, valueOffset) +
    value +
    settingValue.slice(valueOffset + valueSize, settingValue.length)
  );
};

export const getAvailableFlags = (settingsForm: AdvancedSettingsFormDTO) => {
  switch (settingsForm['woe_mode']) {
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

export const getAvailableProfiles = (settingsForm: AdvancedSettingsFormDTO) => {
  if (settingsForm['woe_mode'] === WoeMode.contact) {
    return WOE_CONTACT_PROFILES;
  } else {
    return WOE_POWER_PROFILES;
  }
};

/** Signature settings */
export const getActivationBitmask = (settingsIndicators: IndicatorProps) => {
  let activationBmask = 0;
  for (const indicatorKey of SI_ORDERED) {
    if (settingsIndicators[indicatorKey as SIOrderedKeys].hasOwnProperty('enabled')) {
      activationBmask = settingsIndicators[indicatorKey as SIOrderedKeys].enabled
        ? activationBmask | (1 << settingsIndicators[indicatorKey as SIOrderedKeys].bitPos)
        : activationBmask & ~(1 << settingsIndicators[indicatorKey as SIOrderedKeys].bitPos);
    }
  }
  return activationBmask;
};

const RADIO_ELTS_SIZE = 9;

export const getRadioBmask = (settingsForm: any) => {
  let radioBmask = 0;
  for (let j = SVP_ORDERED.length - RADIO_ELTS_SIZE; j < SVP_ORDERED.length; j++) {
    // treat bimask elements only
    if (radio_model[SVP_ORDERED[j]].isBitmask!) {
      radioBmask = settingsForm[SVP_ORDERED[j]]
        ? radioBmask | (1 << radio_model[SVP_ORDERED[j]].bitPos!)
        : radioBmask & ~(1 << radio_model[SVP_ORDERED[j]].bitPos!);
    }
  }
  return radioBmask;
};

const convertWoaEdgesToInternalParams = (woeBmask: number, settingsForm: any) => {
  // The relation between internalParams and edges is as follows
  // ^
  // |     MAX
  // |---------------------^------
  // |   CENTER            |%TOLERANCE
  // |---------------------+------
  // |      MIN
  // |----------------------------
  // |
  // |--------------------------->
  const paramBitpos = woe_modes_model['woe_param'].bitPos!;
  const paramMask = woe_modes_model['woe_param'].mask!; // 0xFFE0

  const thresholdBitpos = woe_modes_model['woe_threshold'].bitPos!;
  const thresholdMask = woe_modes_model['woe_threshold'].mask!; // 0xFFFC 0000
  // Clean woeBmap from param & threshold
  let outputBmap = woeBmask & ~(paramMask | thresholdMask);

  // Make sure edges are set so center and %offset are integers.
  const edgeMax = Math.round(settingsForm['woe_param'] * 10) / 10;
  const edgeMin = Math.round(settingsForm['woe_threshold'] * 10) / 10;

  const realCenter = (edgeMax + edgeMin) / 2; // mA
  const regionCenter = Math.round(realCenter * 100); // Rounded & in 1/100mA
  let regionTolerance = Math.round((100 * (edgeMax - realCenter)) / realCenter);
  regionTolerance = regionTolerance < 1 ? 1 : regionTolerance;

  outputBmap |= (regionCenter << thresholdBitpos) & thresholdMask;
  outputBmap |= (regionTolerance << paramBitpos) & paramMask;

  return outputBmap;
};

export const getWoeBmask = (settingsForm: any) => {
  let woeBmask = 0;
  let value = 0;

  for (
    let svp_index = SVP_ORDERED.indexOf('woe_mode');
    svp_index <= SVP_ORDERED.indexOf('woe_threshold');
    svp_index++
  ) {
    let modeFound = -1;

    const WOE_AVAIL_PROFILES = getAvailableProfiles(settingsForm);
    const WOE_AVAIL_FLAGS = getAvailableFlags(settingsForm);

    switch (SVP_ORDERED[svp_index]) {
      case 'woe_mode':
        modeFound = WOE_AVAIL_MODES.indexOf(settingsForm['woe_mode']);
        value = modeFound !== -1 ? modeFound : 0;
        break;

      case 'woe_profile':
        modeFound = WOE_AVAIL_PROFILES.indexOf(settingsForm['woe_profile']);
        value = modeFound !== -1 ? modeFound : 0;
        break;

      case 'woe_flag':
        modeFound = WOE_AVAIL_FLAGS.indexOf(settingsForm['woe_flag']);
        value = modeFound !== -1 ? modeFound : 0;
        break;

      default:
        value = settingsForm[SVP_ORDERED[svp_index]] || 0;
        break;
    }

    woeBmask |=
      (value << woe_modes_model[SVP_ORDERED[svp_index]].bitPos!) &
      woe_modes_model[SVP_ORDERED[svp_index]].mask!;

    //Fow WOA, we need to compute (center, %offset)=f(threshold, param) aka f(maxwindow, minwindow).
    if (settingsForm['woe_mode'] === WoeMode.analog) {
      const result = convertWoaEdgesToInternalParams(woeBmask, settingsForm);
      woeBmask = result;
    }
  }
  return woeBmask;
};

export const buildAdvancedSettingsValue = (settingsForm: any) => {
  let privateSettingsBuiltvalue = '0'.repeat(40);

  let tmp = '';

  for (const [setting, settingValue] of Object.entries(private_settings_model)) {
    tmp =
      typeof settingsForm[setting] === 'string'
        ? parseInt(settingsForm[setting], 10)
        : settingsForm[setting];

    if (setting.match(/^rpm_/g)) {
      tmp = Math.floor(settingsForm[setting] / 60).toString();
    }

    if (setting.match(/^micro_/g)) {
      tmp = Math.floor(settingsForm[setting] / 10).toString();
    }

    const valueOffset = settingValue.valueOffset;
    const sizeC = settingValue.sizeC;
    const convertedValue =
      typeof tmp === 'string' ? convertToHex16b(parseInt(tmp, 10)) : convertToHex16b(tmp);
    privateSettingsBuiltvalue = replaceAt(
      privateSettingsBuiltvalue,
      convertedValue,
      valueOffset,
      sizeC
    );
  }

  // Add sensor type and sensor orientation value;
  const convertedSensorType = convertToHex8b(parseInt(settingsForm['sensor_type'], 10)); // sensors (1B)
  let sensorTypeOrientationBuiltValue = `${convertedSensorType}${settingsForm['sensor_orientation']}`;
  privateSettingsBuiltvalue = `${sensorTypeOrientationBuiltValue}${privateSettingsBuiltvalue}`;

  // Build woe settings
  const woeBmask = getWoeBmask(settingsForm);
  privateSettingsBuiltvalue += convertToHex32b(woeBmask);

  // Add Woe pre_trig & post_trig thresholds
  for (
    let svp_index = SVP_ORDERED.indexOf('woe_pretrig_threshold');
    svp_index < SVP_ORDERED.indexOf('radio_adr');
    svp_index++
  ) {
    let revisedValue = settingsForm[SVP_ORDERED[svp_index]];

    // Pre/Posttrig are expressed in s, convert to 1/10s first
    if (SVP_ORDERED[svp_index].match(/^woe_.*trig_threshold$/g)) {
      revisedValue *= 10;
    }

    tmp = convertToHex16b(revisedValue);
    privateSettingsBuiltvalue += tmp;
  }

  // Add radio
  const radioBmask = getRadioBmask(settingsForm);
  tmp = convertToHex16b(radioBmask);
  privateSettingsBuiltvalue += tmp;

  // rx1 & linkchk
  for (let j = SVP_ORDERED.length - 2; j < SVP_ORDERED.length; j++) {
    tmp = convertToHex16b(settingsForm[SVP_ORDERED[j]]);
    privateSettingsBuiltvalue += tmp;
  }

  if (privateSettingsBuiltvalue.length !== PRIVATE_SETTINGS_LENGTH) {
    console.log('Incorrect settings value length');
    return;
  }

  return privateSettingsBuiltvalue;
};

export const buildPublicSettingsValue = (settingsForm: any) => {
  const schedulingSettingsObject = {
    ...scheduling_settings_model,
  };
  // Rebuild form object to fit legacy code
  // ex: decompose ambient_hours to get { ambient : { hours : number , ...}}

  const schedulingSettingsArray = Object.entries(settingsForm);
  const filteredSchedulingSettings = schedulingSettingsArray.filter(
    ([key, value]) =>
      key.includes('ambient') || key.includes('prediction') || key.includes('introspection')
  );
  const schedulingSettings = Object.fromEntries(filteredSchedulingSettings);

  for (const [setting, settingValue] of Object.entries(schedulingSettings)) {
    const settingKey = setting.split('_')[0] as string;
    const timeKey = setting.split('_')[1] as string;
    schedulingSettingsObject[settingKey as PublicSettingKey][timeKey as PublicSettingsTimeKey] =
      settingValue as number;
  }

  // Compute periodicity (expressed in x10 seconds)
  for (const [setting] of Object.entries(schedulingSettingsObject)) {
    schedulingSettingsObject[setting as PublicSettingKey]['periodicity'] =
      schedulingSettingsObject[setting as PublicSettingKey]['hours'] * 360 +
      schedulingSettingsObject[setting as PublicSettingKey]['minutes'] * 6 +
      schedulingSettingsObject[setting as PublicSettingKey]['seconds'] / 10;
  }

  // Add bitPos to activation settings
  const activationSettingsObject = {
    ...settingsIndicators,
  };

  for (const [setting] of Object.entries(activationSettingsObject)) {
    activationSettingsObject[setting as ActivationParameter].enabled =
      settingsForm[setting as ActivationParameter].enabled;
  }
  const activationBmask = getActivationBitmask(activationSettingsObject);
  let publicSettingsToSend = '';
  publicSettingsToSend += convertToHex32b(activationBmask);

  for (const [setting] of Object.entries(schedulingSettingsObject)) {
    publicSettingsToSend += convertToHex16b(
      schedulingSettingsObject[setting as PublicSettingKey]['periodicity']
    );
  }

  if (publicSettingsToSend.length !== PUBLIC_SETTINGS_LENGTH) {
    console.log('Incorrect public settings value');
    return;
  }
  return publicSettingsToSend;
};

export const getStoreSettingsEndpoint = (datasourceUid: string) => {
  if (!datasourceUid) {
    return '';
  }
  // endpoint
  const datasourceUrl = `api/datasources/proxy/uid/${datasourceUid}`;
  const endpoint = `${datasourceUrl}/store_settings`;
  return endpoint;
};
