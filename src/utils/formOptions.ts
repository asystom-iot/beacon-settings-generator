/**
 * Format array to be selectable options in select UI element
 * @param array
 */

import { SelectableValue } from '../models/form';

const makeOptionsSelectable = (array: any) => {
  return array.map((value: string | number) => ({
    label: typeof value === 'number' ? value.toString() : value,
    value: value,
  }));
};

/**
 * Build array of numbers for selectable options
 */

export const getNumberOptions = (start: number, length: number) => {
  const numbers = [] as number[];
  let n = start;
  while (n < length) {
    numbers.push(n);
    n++;
  }
  return makeOptionsSelectable(numbers);
};

/**
 * Build array of numbers for selectable options for seconds
 */

export const getSecondsOptions = () => {
  const numbers = [] as number[];
  let n = 0;
  while (n < 60) {
    numbers.push(n);
    n += 10;
  }
  return makeOptionsSelectable(numbers);
};

/**
 * Synchronization options
 * Index of array used to macth the current value
 */

export const getWakeOnEventModes = (): SelectableValue[] => {
  return [
    {
      label: 'Inactive',
      value: 'Inactive',
      description: '',
    },
    {
      label: 'Wake-On-Motion',
      value: 'Wake-On-Motion',
      description: '',
    },
    {
      label: 'RESERVED',
      value: 'RESERVED',
      description: '',
    },
    {
      label: 'Wake-On-Scheduler',
      value: 'Wake-On-Scheduler',
      description: '',
    },
    {
      label: 'Wake-On-Analog',
      value: 'Wake-On-Analog',
      description: 'Trigger measurement inside or outside of the selected region',
    },
    {
      label: 'Wake-On-Contact',
      value: 'Wake-On-Contact',
      description: 'Trigger measurement in case of a rising (↑) or a falling edge (↓)',
    },
  ];
};

/**
 * Wake-On-Motion options
 */

export const getFlagWomMode = (): SelectableValue[] => {
  return [
    {
      label: 'Red LED',
      value: 'Red LED',
      description: 'Switch on the Red LED when motion is detected',
    },
    {
      label: 'No LED',
      value: 'No LED',
      description: '',
    },
  ];
};

/**
 * Wake-On-Scheduler options
 */

export const getFlagWosMode = (): SelectableValue[] => {
  return [
    { label: 'Standard', value: 'Standard' },
    { label: 'Reserved', value: 'Reserved' },
  ];
};

/**
 * Wake-On-Analog options
 */

export const getFlagWoaMode = (): SelectableValue[] => {
  return [
    {
      label: 'OUTSIDE Region',
      value: 'OUTSIDE Region',
    },
    {
      label: 'INSIDE Region',
      value: 'INSIDE Region',
    },
  ];
};

/**
 * Wake-On-Contact option
 */

export const getFlagWocMode = (): SelectableValue[] => {
  return [
    { label: 'Edge ↓', value: 'Edge ↓' },
    { label: 'Edge ↑', value: 'Edge ↑' },
  ];
};

/**
 * Sensor types
 */

export const getSensorTypes = (): SelectableValue[] => {
  return [
    { label: 'Accelerometer', value: '3' },
    { label: 'Microphone', value: '12' },
  ];
};

export const getAdvancedSensorOrientations = (): SelectableValue[] => {
  return [
    { label: 'X', value: '010000' },
    { label: 'Y', value: '020000' },
    { label: 'Z', value: '040000' },
    { label: 'XYZ', value: '000000' },
  ];
};

/**
 * Signature settings / Spectrum types (custom spectrogram)
 */

export const getSpectrumTypesBasis = (): SelectableValue[] => {
  return [
    {
      label: 'RMS',
      value: '1',
      description:
        'Produces a spectrum for which each band is represented by the RMS value in g (accelero) / dB (mic)',
    },
    {
      label: 'Peak',
      value: '2',
      description:
        'Produces a spectrum for which each band is represented by the PEAK value in g (accelero) / dB (mic)',
    },
  ];
};

export const getSpectrumTypes = (): SelectableValue[] => {
  const spectrumBasis = getSpectrumTypesBasis();

  return [
    ...spectrumBasis,
    {
      label: 'Velocity RMS',
      value: '3',
      description:
        'Produces a spectrum for which each band is represented by the RMS value of the vibration velocity in mm/s',
    },
    {
      label: 'Velocity Peak',
      value: '4',
      description:
        'Produces a spectrum for which each band is represented by the PEAK value of the vibration velocity in mm/s',
    },
  ];
};

export const getWoeFlags = (): {
  wom: SelectableValue[];
  wos: SelectableValue[];
  woa: SelectableValue[];
  woc: SelectableValue[];
} => {
  const WOM_FLAG = getFlagWomMode();
  const WOS_FLAG = getFlagWosMode();
  const WOA_FLAG = getFlagWoaMode();
  const WOC_FLAG = getFlagWocMode();
  return {
    wom: WOM_FLAG,
    wos: WOS_FLAG,
    woa: WOA_FLAG,
    woc: WOC_FLAG,
  };
};
