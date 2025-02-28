import * as React from 'react';
import { Divider, Form, FormInstance, Input, Switch, theme } from 'antd';
import { RadioSettingsEplaxation } from '../explanations/RadioSettingsExplanation';
import { LORA_FREQ_PARAM_RULE, LORA_LINK_CHECK_RULE } from '../../utils/formValidationRules';
import { AdvancedSettingsFormDTO } from '../../models/form';

interface SubSectionRadioProps {
  defaultValues: AdvancedSettingsFormDTO;
  form: FormInstance<AdvancedSettingsFormDTO>;
}

export const SubSectionRadio: React.FunctionComponent<SubSectionRadioProps> = ({
  defaultValues,
  form,
}) => {
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  return (
    <>
      <Divider
        orientation='left'
        orientationMargin='0'>
        <div style={{ fontWeight: 600 }}>LoRaWAN</div>
      </Divider>
      <div className='formSectionContainer'>
        <div style={{ flex: 1 }}>
          {/* ADR Enabled */}
          <Form.Item
            label={'ADR Enabled'}
            htmlFor={'syncAdr'}
            name='radio_adr'
            labelCol={{ span: 18 }}>
            <Switch
              defaultChecked={defaultValues?.radio_adr}
              onChange={(checked) => form.setFieldValue('radio_adr', checked)}
              id={'syncAdr'}
            />
          </Form.Item>
          {/* Txack Enabled */}
          <Form.Item
            label={'Txack Enabled'}
            labelCol={{ span: 18 }}
            name='radio_txack'
            htmlFor='syncTxack'>
            <Switch
              defaultChecked={defaultValues?.radio_txack}
              onChange={(checked) => form.setFieldValue('radio_txack', checked)}
              id={'syncTxack'}
            />
          </Form.Item>
          {/* Private NW (0x12) */}
          <Form.Item
            label={'Private NW (0x12)'}
            name='radio_nw_private'
            labelCol={{ span: 18 }}
            htmlFor='syncPrivateNw'>
            <Switch
              defaultChecked={defaultValues?.radio_nw_private}
              onChange={(checked) => form.setFieldValue('radio_txack', checked)}
              id={'syncPrivateNw'}
            />
          </Form.Item>
          {/* PT100*/}
          <Form.Item
            label={'Force CR4/5'}
            labelCol={{ span: 18 }}
            htmlFor='syncForceCR'
            name='radio_cr_base_lorawan'>
            <Switch
              defaultChecked={defaultValues?.radio_cr_base_lorawan}
              onChange={(checked) => form.setFieldValue('radio_cr_base_lorawan', checked)}
              id={'syncForceCR'}
            />
          </Form.Item>
          {/* Dwell Time ON */}
          <Form.Item
            label={'Dwell Time ON'}
            labelCol={{ span: 18 }}
            htmlFor='syncDwellTime'
            name='radio_dwell_time'>
            <Switch
              defaultChecked={defaultValues?.radio_dwell_time}
              onChange={(checked) => form.setFieldValue('radio_dwell_time', checked)}
              id={'syncDwellTime'}
            />
          </Form.Item>
          <Form.Item
            label={'Retx enabled (x2)'}
            labelCol={{ span: 14 }}
            name='radio_retx_twice'
            htmlFor='syncRetx'>
            <Switch
              defaultChecked={defaultValues?.radio_retx_twice}
              onChange={(checked) => form.setFieldValue('radio_retx_twice', checked)}
              id={'syncRetx'}
            />
          </Form.Item>
          {/* Dwell Time ON */}
          <Form.Item
            label={'Enable packet split'}
            labelCol={{ span: 14 }}
            htmlFor='syncLowestDr'
            name='radio_force_lowest_dr'>
            <Switch
              defaultChecked={defaultValues?.radio_force_lowest_dr}
              onChange={(checked) => form.setFieldValue('radio_force_lowest_dr', checked)}
              id={'syncLowestDr'}
            />
          </Form.Item>
          {/* LoRa Freq Param */}
          <Form.Item
            name='radio_region_param'
            label={'LoRa Freq Param'}
            htmlFor='loraFreqParam'
            labelCol={{ span: 14 }}
            tooltip={'EU: N/A, US: FSB index [0..8], AS: Country preset [0..11]'}
            rules={LORA_FREQ_PARAM_RULE}>
            <Input
              id='loraFreqParam'
              type={'number'}
              min={0}
            />
          </Form.Item>
          {/* Lora Linck chk */}
          <Form.Item
            name='radio_linkchk'
            label={'LoRa LinkChk'}
            labelCol={{ span: 14 }}
            htmlFor='linkCheck'
            rules={LORA_LINK_CHECK_RULE}>
            <Input
              id='linkCheck'
              type={'number'}
              width={16}
              addonAfter={'s'}
              min={0}
              required
            />
          </Form.Item>
        </div>
        <div
          className='explanationColumn'
          style={{
            backgroundColor: colorBgLayout,
          }}>
          <div className='explanationContent'>
            <RadioSettingsEplaxation />
          </div>
        </div>
      </div>
    </>
  );
};
