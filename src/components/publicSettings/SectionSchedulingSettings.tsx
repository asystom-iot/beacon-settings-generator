import React from 'react';
import {
  Alert,
  Button,
  Divider,
  Flex,
  Form,
  Input,
  Modal,
  Radio,
  Space,
  Typography,
} from 'antd';
import { GlobalPublicSettingsFormDTO } from '../../models/form';
import {
  buildPublicSettingsValue,
  decodeActivationBitMask,
  decodePublicSettings,
  decodePublicSettingsValue,
  decodeToUint32,
  getPublicSettingsLabels,
  getPublicSettingsSections,
  groupSchedulingPeriods,
  OP_CODES,
  pickSettings,
  PUBLIC_SETTINGS_DEFAULT_VALUE,
} from '../../utils';
import { DecodedSettingsTable, SubSectionActivation, SubSectionScheduling } from '../../components';
import '../section.css';

type SectionMode = 'build' | 'decode';

export const SectionSchedulingSettings = () => {
  const [defaultValues, setDefaultValues] = React.useState({} as GlobalPublicSettingsFormDTO);
  const [hexString, setHexaString] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState<SectionMode>('build');
  const [decodeInput, setDecodeInput] = React.useState('');
  const [decodeError, setDecodeError] = React.useState('');
  const [decodedSettings, setDecodedSettings] = React.useState<GlobalPublicSettingsFormDTO | null>(
    null
  );
  const [form] = Form.useForm();

  const loadDefaultSettings = () => {
    setHexaString('');
    const defaultSettings = decodePublicSettings(PUBLIC_SETTINGS_DEFAULT_VALUE);
    const bmask = decodeToUint32(PUBLIC_SETTINGS_DEFAULT_VALUE.substring(0, 8));
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

  const onDecode = () => {
    try {
      const decoded = decodePublicSettingsValue(decodeInput);
      form.setFieldsValue(decoded);
      setDefaultValues(decoded);
      setDecodedSettings(decoded);
      setDecodeError('');
    } catch (e) {
      setDecodedSettings(null);
      setDecodeError(e instanceof Error ? e.message : 'Unable to decode this hex string.');
    }
  };

  const onModeChange = (nextMode: SectionMode) => {
    setDecodeError('');
    setDecodedSettings(null);
    setMode(nextMode);
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
            <Flex
              justify='center'
              style={{ marginBottom: 24 }}>
              <Radio.Group
                size='large'
                buttonStyle='solid'
                value={mode}
                onChange={(e) => onModeChange(e.target.value as SectionMode)}>
                <Radio.Button value='build'>Build hex string</Radio.Button>
                <Radio.Button value='decode'>Decode hex string</Radio.Button>
              </Radio.Group>
            </Flex>

            {mode === 'decode' ? (
              <Flex
                vertical
                gap='middle'
                style={{ maxWidth: 640, width: '100%', margin: '0 auto' }}>
                <Typography.Text type='secondary'>
                  Paste a scheduling/activation hex string (with or without its{' '}
                  <Typography.Text code>:fPort</Typography.Text> suffix, as produced by "GENERATE
                  HEX STRING") to display its settings.
                </Typography.Text>
                <Space.Compact style={{ width: '100%' }}>
                  <Input
                    size='large'
                    placeholder={`e.g. ${PUBLIC_SETTINGS_DEFAULT_VALUE}:${OP_CODES.RX_PUB_SETTINGS_UPDATE}`}
                    value={decodeInput}
                    onChange={(e) => {
                      setDecodeInput(e.target.value);
                      setDecodedSettings(null);
                      setDecodeError('');
                    }}
                    onPressEnter={onDecode}
                    allowClear
                  />
                  <Button
                    type='primary'
                    size='large'
                    onClick={onDecode}>
                    DECODE
                  </Button>
                </Space.Compact>
                {decodeError && (
                  <Alert
                    type='error'
                    showIcon
                    message={decodeError}
                  />
                )}
                {decodedSettings &&
                  (() => {
                    const groupedSettings = groupSchedulingPeriods(decodedSettings);
                    return getPublicSettingsSections().map((section) => (
                      <div key={section.title}>
                        <Divider
                          orientation='left'
                          orientationMargin='0'>
                          <div style={{ fontWeight: 600 }}>{section.title}</div>
                        </Divider>
                        <DecodedSettingsTable
                          settings={pickSettings(groupedSettings, section.keys)}
                          labels={getPublicSettingsLabels()}
                        />
                      </div>
                    ));
                  })()}
              </Flex>
            ) : (
              <>
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
              </>
            )}
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
