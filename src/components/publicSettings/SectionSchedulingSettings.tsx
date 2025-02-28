import React from 'react';
import { Button, Flex, Form, Modal, Typography } from 'antd';
import { GlobalPublicSettingsFormDTO, PublicFormDTO } from '../../models/form';
import {
  scheduling_settings_model,
  settingsIndicators,
  SI_ORDERED,
  SIOrderedKeys,
} from '../../models/settings';
import {
  buildPublicSettingsValue,
  decodeToUint32,
  OP_CODES,
  PUBLIC_SETTINGS_DEFAULT_VALUE,
} from '../../utils';
import { SubSectionActivation, SubSectionScheduling } from '../../components';
import '../section.css';

export const SectionSchedulingSettings = () => {
  const [defaultValues, setDefaultValues] = React.useState({} as GlobalPublicSettingsFormDTO);
  const [hexString, setHexaString] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [form] = Form.useForm();

  const decodePublicSettings = (settingsValue: string) => {
    // activation bmask uses 4B === 8 chars
    let tmp = decodeToUint32(settingsValue.substring(0, 8));

    // the rest is just values
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
      tmp = decodeToUint32(values.substring(i, i + 4));
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

  const decodeActivationBitMask = (bmask: number) => {
    const decodedSettingsIndicators = {
      ...settingsIndicators,
    };
    for (const elt of SI_ORDERED) {
      decodedSettingsIndicators[elt as SIOrderedKeys].enabled =
        bmask & (1 << settingsIndicators[elt as SIOrderedKeys].bitPos) ? true : false;
    }
    return decodedSettingsIndicators;
  };

  const loadDefaultSettings = () => {
    setHexaString('');
    const defaultSettings = decodePublicSettings(PUBLIC_SETTINGS_DEFAULT_VALUE);
    const activ = PUBLIC_SETTINGS_DEFAULT_VALUE.substring(0, 8);
    // rev swap32
    let bmask = parseInt('0x' + activ.match(/../g)!.reverse().join(''), 16);
    const decodedSettingsIndicators = decodeActivationBitMask(bmask);

    for (const [key, formValue] of Object.entries({
      ...defaultSettings,
      ...decodedSettingsIndicators,
    })) {
      form.setFieldValue(key, formValue);
    }

    setDefaultValues({ ...defaultSettings, ...decodedSettingsIndicators });
  };

  const onSubmit = (data: GlobalPublicSettingsFormDTO) => {
    const allSettings = form.getFieldsValue(true);
    setHexaString('');
    generateHexString(allSettings);
    setOpen(true);
  };

  const generateHexString = (settingsForm: GlobalPublicSettingsFormDTO) => {
    if (Object.keys(settingsForm)?.length) {
      const settings = buildPublicSettingsValue(settingsForm);
      if (settings) {
        setHexaString(settings);
      }
    }
  };

  const onReset = () => {
    setHexaString('');
    form.resetFields();
  };

  React.useEffect(() => {
    loadDefaultSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='section'>
      {Object.keys(defaultValues)?.length !== 0 && (
        <Form
          form={form}
          preserve
          initialValues={defaultValues}
          layout='vertical'
          onFinish={onSubmit}
          name='Scheduling & Activation settings'
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 22 }}
          style={{ width: '100%' }}>
          <Flex
            vertical
            style={{ width: '100%' }}>
            <Flex vertical>
              <div style={{ flex: 1, padding: '16px', minWidth: '500px' }}>
                {/* Scheduling */}
                <SubSectionScheduling form={form} />
                {/* Activation */}
                <SubSectionActivation
                  defaultValues={defaultValues}
                  form={form}
                />
              </div>
            </Flex>
            {/*  Submit & Reset */}
            <Flex
              justify={'center'}
              align={'center'}
              vertical>
              <Button
                type='primary'
                size='large'
                block
                htmlType='submit'>
                GENERATE HEX STRING
              </Button>
              <Button
                type='text'
                block
                onClick={() => onReset()}>
                {'Reset'}
              </Button>
            </Flex>
            <Modal
              title='Hex string:fPort'
              open={open}
              width={1000}
              onCancel={() => setOpen(false)}
              footer={[
                <Button
                  key='close'
                  type='default'
                  onClick={() => setOpen(false)}>
                  Close modal
                </Button>,
              ]}>
              <Typography.Title
                level={5}
                copyable>{`${hexString}:${OP_CODES.RX_PUB_SETTINGS_UPDATE}`}</Typography.Title>
            </Modal>
          </Flex>
        </Form>
      )}
    </div>
  );
};
