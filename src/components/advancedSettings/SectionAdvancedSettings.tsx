import * as React from 'react';
import {
  Alert,
  Select,
  Form,
  Button,
  Divider,
  Flex,
  Input,
  Radio,
  Space,
  Modal,
  Drawer,
  Typography,
} from 'antd';

import {
  DecodedSettingsTable,
  SubSectionCustomSpectrogram,
  SubSectionSyncModes,
  SubSectionRpmSettings,
  SubSectionRadio,
} from '../../components';
import { useAdvancedSettingsDefault } from '../../hooks/useSettingsDefault';
import { AdvancedSettingsFormDTO } from '../../models/form';
import { buildAdvancedSettingsValue } from '../../utils/helpers';
import '../section.css';
import {
  decodeAdvancedSettingsValue,
  getAdvancedSettingsLabels,
  getAdvancedSettingsSections,
  OP_CODES,
  pickSettings,
} from '../../utils';
import { AdvancedSettingsDrawer } from '../explanations/AdvancedSettingsDrawer';
import { EyeOutlined } from '@ant-design/icons';

type SectionMode = 'build' | 'decode';

/** (Advanced settings) */
export const SectionAdvancedSettings: React.FunctionComponent = () => {
  const [defaultValues, setDefaultValues] = React.useState({} as AdvancedSettingsFormDTO);
  const [hexString, setHexaString] = React.useState('');
  const [selectedVersion, setSelectedVersion] = React.useState('>4.44');
  const [open, setOpen] = React.useState(false);
  const [openDrawer, setDrawerOpen] = React.useState(false);
  const [mode, setMode] = React.useState<SectionMode>('build');
  const [decodeInput, setDecodeInput] = React.useState('');
  const [decodeError, setDecodeError] = React.useState('');
  const [decodedSettings, setDecodedSettings] = React.useState<AdvancedSettingsFormDTO | null>(
    null
  );

  const showDrawer = () => {
    setDrawerOpen(true);
  };

  const onDrawerClose = () => {
    setDrawerOpen(false);
  };

  const { VERSION_OPTIONS, handleVersion, getDefaultAdvancedSettings } =
    useAdvancedSettingsDefault();

  const [form] = Form.useForm();

  const loadDefaultSettings = (selectedVersionRange: string) => {
    if (!selectedVersionRange) {
      return;
    }
    setHexaString('');
    setSelectedVersion(selectedVersionRange);
    const assumedVersion = handleVersion(selectedVersionRange);
    const defaultSettings = getDefaultAdvancedSettings(assumedVersion);
    form.setFieldsValue(defaultSettings);
    setDefaultValues(defaultSettings);
  };

  const generateHexString = (settingsForm: AdvancedSettingsFormDTO) => {
    if (Object.keys(settingsForm)?.length) {
      const settings = buildAdvancedSettingsValue(settingsForm);
      if (settings) {
        setHexaString(settings);
      }
    }
  };

  const onFormReset = () => {
    setHexaString('');
    form.resetFields();
    loadDefaultSettings(selectedVersion);
  };

  const onFormSubmit = async (data: AdvancedSettingsFormDTO) => {
    const allSettings = form.getFieldsValue(true);
    setHexaString('');
    generateHexString(allSettings);
    setOpen(true);
  };

  const onDecode = () => {
    try {
      const decoded = decodeAdvancedSettingsValue(decodeInput);
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
    loadDefaultSettings('>4.44');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='section'>
      {Object.keys(defaultValues)?.length !== 0 && (
        <Form
          form={form}
          preserve
          layout='vertical'
          onFinish={onFormSubmit}
          name='Advanced Settings'
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
                  Paste an advanced settings hex string (with or without its{' '}
                  <Typography.Text code>:fPort</Typography.Text> suffix, as produced by "GENERATE
                  HEX STRING") to display its settings.
                </Typography.Text>
                <Space.Compact style={{ width: '100%' }}>
                  <Input
                    size='large'
                    placeholder={`e.g. 0c00000000...:${OP_CODES.RX_PRV_SETTINGS_UPDATE}`}
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
                  getAdvancedSettingsSections().map((section) => (
                    <div key={section.title}>
                      <Divider
                        orientation='left'
                        orientationMargin='0'>
                        <div style={{ fontWeight: 600 }}>{section.title}</div>
                      </Divider>
                      <DecodedSettingsTable
                        settings={pickSettings(decodedSettings, section.keys)}
                        labels={getAdvancedSettingsLabels(decodedSettings)}
                      />
                    </div>
                  ))}
              </Flex>
            ) : (
              <>
                {/* Version selector */}
                <Space
                  align={'center'}
                  size={'middle'}
                  direction='vertical'>
                  <div style={{ fontSize: '16px', fontWeight: 600 }}>
                    Load default Advanced Settings depending on beacon version
                  </div>
                  <Select
                    size='large'
                    id='beacon_version'
                    value={selectedVersion}
                    options={VERSION_OPTIONS}
                    style={{ minWidth: '300px' }}
                    placeholder={'Select a version for default settings'}
                    onChange={(e) => e && loadDefaultSettings(e)}
                  />
                  <Button
                    type='link'
                    icon={<EyeOutlined />}
                    onClick={() => showDrawer()}>
                    Advanced settings example
                  </Button>
                </Space>

                <Flex vertical>
                  <div style={{ flex: 1, padding: '16px', minWidth: '500px' }}>
                    {/* Custom spectrogram if version >= 4.45 */}
                    {handleVersion(selectedVersion) >= 4.45 && (
                      <SubSectionCustomSpectrogram form={form} />
                    )}
                    {/* RPM settings */}
                    <SubSectionRpmSettings />
                    {/* Synchronization modes  */}
                    <SubSectionSyncModes form={form} />
                    {/* Section radio  */}
                    <SubSectionRadio
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
                    onClick={() => onFormReset()}>
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
                copyable>{`${hexString}:${OP_CODES.RX_PRV_SETTINGS_UPDATE}`}</Typography.Title>
            </Modal>
          </Flex>
        </Form>
      )}
      <Drawer
        width={830}
        title='Advanced Settings Example'
        onClose={onDrawerClose}
        open={openDrawer}>
        <AdvancedSettingsDrawer />
      </Drawer>
    </div>
  );
};
