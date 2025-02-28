import * as React from 'react';
import { Divider, Form, Input, Switch, theme } from 'antd';
import { RadioSettingsEplaxation } from '../explanations/RadioSettingsExplanation';
import { LORA_FREQ_PARAM_RULE, LORA_LINK_CHECK_RULE } from '../../utils/formValidationRules';
import { AdvancedSettingsFormDTO } from '../../models/form';

interface SubSectionRadioProps {
  defaultValues: AdvancedSettingsFormDTO;
}

export const SubSectionRadio: React.FunctionComponent<SubSectionRadioProps> = ({
  defaultValues,
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
              id={'syncTxack'}
            />
          </Form.Item>
          {/* Private NW (0x12) */}
          <Form.Item
            label={'Private NW (0x12)'}
            labelCol={{ span: 18 }}
            htmlFor='syncPrivateNw'>
            <Switch
              defaultChecked={defaultValues?.radio_nw_private}
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
