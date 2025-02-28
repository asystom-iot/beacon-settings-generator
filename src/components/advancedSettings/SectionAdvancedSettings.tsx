import * as React from 'react';
import { Select, Form, Button, Flex, Space, Modal, Drawer } from 'antd';

import {
  SubSectionCustomSpectrogram,
  SubSectionSyncModes,
  SubSectionRpmSettings,
  SubSectionRadio,
  CopyClipboard,
} from '../../components';
import { useAdvancedSettingsDefault } from '../../hooks/useSettingsDefault';
import { AdvancedSettingsFormDTO } from '../../models/form';
import { buildAdvancedSettingsValue } from '../../utils/helpers';
import '../section.css';
import { OP_CODES } from '../../utils';
import { AdvancedSettingsDrawer } from '../explanations/AdvancedSettingsDrawer';
import { EyeOutlined } from '@ant-design/icons';

/** (Advanced settings) */
export const SectionAdvancedSettings: React.FunctionComponent = () => {
  const [defaultValues, setDefaultValues] = React.useState({} as AdvancedSettingsFormDTO);
  const [hexString, setHexaString] = React.useState('');
  const [selectedVersion, setSelectedVersion] = React.useState('>4.44');
  const [open, setOpen] = React.useState(false);
  const [openDrawer, setDrawerOpen] = React.useState(false);

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
                  <SubSectionRadio defaultValues={defaultValues} />
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
                <CopyClipboard hexString={`${hexString}:${OP_CODES.RX_PRV_SETTINGS_UPDATE}`} />
              </Modal>
            </Flex>
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
