import React from 'react';
import { ORIENTATION_VALUES, SENSOR_TYPES, AdvancedSettingsFormDTO } from '../models/form';

export const useAdvancedSettingsDefault = () => {
  const VERSION_OPTIONS = [
    // { label: '<4.23', value: '<4.23' },
    {
      label: '[4.23...4.33]',
      value: '[4.23...4.33]',
    },
    {
      label: '[4.34...4.44]',
      value: '[4.34...4.44]',
    },
    { label: '>4.44', value: '>4.44' },
  ];

  const handleVersion = (versionOverride: string) => {
    let assumedVersion = 0.0;

    switch (versionOverride) {
      // case '<4.23':
      //   assumedVersion = 0.0;
      //   break;
      case '[4.23...4.33]':
        assumedVersion = 4.23;
        break;
      case '[4.34...4.44]':
        assumedVersion = 4.34;
        break;
      case '>4.44':
        assumedVersion = 4.45;
        break;

      default:
        break;
    }
    return assumedVersion;
  };

  const getDefaultAdvancedSettings = React.useCallback((version: number) => {
    let signatureSettings = {} as AdvancedSettingsFormDTO;

    if (version < 4.23) {
      signatureSettings['micro_freq_max'] = 70000;
      signatureSettings['micro_freq_min'] = 30000;
      signatureSettings['accelero_freq_max'] = 1000;
      signatureSettings['accelero_freq_min'] = 200;
      signatureSettings['radio_nw_private'] = true;
      signatureSettings['radio_txack'] = true;
      signatureSettings['radio_cr_base_lorawan'] = false;
      signatureSettings['radio_force_lowest_dr'] = false;
    } else if (version < 4.34) {
      signatureSettings['micro_freq_max'] = 80000;
      signatureSettings['micro_freq_min'] = 0;
      signatureSettings['accelero_freq_max'] = 2000;
      signatureSettings['accelero_freq_min'] = 0;
      signatureSettings['radio_nw_private'] = true;
      signatureSettings['radio_txack'] = true;
      signatureSettings['radio_cr_base_lorawan'] = false;
      signatureSettings['radio_force_lowest_dr'] = false;
    } else if (version < 4.44) {
      signatureSettings['micro_freq_max'] = 80000;
      signatureSettings['micro_freq_min'] = 0;
      signatureSettings['accelero_freq_max'] = 2000;
      signatureSettings['accelero_freq_min'] = 0;
      signatureSettings['radio_nw_private'] = false;
      signatureSettings['radio_txack'] = true;
      signatureSettings['radio_cr_base_lorawan'] = true;
      signatureSettings['radio_force_lowest_dr'] = false;
    } else {
      signatureSettings['micro_freq_max'] = 80000;
      signatureSettings['micro_freq_min'] = 0;
      signatureSettings['accelero_freq_max'] = 2000;
      signatureSettings['accelero_freq_min'] = 0;
      signatureSettings['radio_nw_private'] = false;
      signatureSettings['radio_cr_base_lorawan'] = true;
      signatureSettings['radio_txack'] = false;
      signatureSettings['radio_force_lowest_dr'] = true;
    }
    signatureSettings['rpm_max'] = 1680;
    signatureSettings['rpm_min'] = 1320;
    signatureSettings['threshold'] = 5;
    signatureSettings['learning_steps'] = 50;
    signatureSettings['custom_spectrum_type'] = '1';
    signatureSettings['custom_spectrum_param'] = 200;

    signatureSettings['woe_mode'] = 'Wake-On-Scheduler'; // index 3 of WOE_AVAIL_MODES
    signatureSettings['woe_flag'] = 'Standard'; // index 1 of FLAG_MODE_WOS
    signatureSettings['woe_param'] = 5;
    signatureSettings['woe_profile'] = 'MidPower1'; // index 1 of WOE_POWER_PROFILES
    signatureSettings['woe_threshold'] = 100;
    signatureSettings['woe_pretrig_threshold'] = 0;
    signatureSettings['woe_posttrig_threshold'] = 0;

    signatureSettings['radio_region_param'] = 0;
    signatureSettings['radio_linkchk'] = 3600;
    signatureSettings['radio_adr'] = true;
    signatureSettings['radio_dwell_time'] = false;
    signatureSettings['radio_retx_twice'] = true;
    signatureSettings['sensor_orientation'] = ORIENTATION_VALUES.XYZ;
    signatureSettings['sensor_type'] = SENSOR_TYPES.microphone;

    return signatureSettings;
  }, []);

  return {
    VERSION_OPTIONS,
    getDefaultAdvancedSettings,
    handleVersion,
  };
};
