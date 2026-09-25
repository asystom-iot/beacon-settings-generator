import * as React from 'react';
import { Table } from 'antd';
import { FieldLabel } from '../utils/decodedLabels';

interface DecodedSettingsTableProps {
  settings: Record<string, any>;
  labels?: Record<string, FieldLabel>;
}

const formatValue = (value: unknown, fieldLabel?: FieldLabel): string => {
  if (value && typeof value === 'object' && 'enabled' in (value as Record<string, unknown>)) {
    return (value as { enabled: boolean }).enabled ? 'Enabled' : 'Disabled';
  }
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  if (fieldLabel?.formatValue) {
    return fieldLabel.formatValue(value);
  }
  const isNumeric =
    typeof value === 'number' ||
    (typeof value === 'string' && value !== '' && !Number.isNaN(Number(value)));
  return fieldLabel?.unit && isNumeric ? `${value} ${fieldLabel.unit}` : String(value);
};

/** Displays a decoded hex string's settings as a simple parameter/value table */
export const DecodedSettingsTable: React.FunctionComponent<DecodedSettingsTableProps> = ({
  settings,
  labels,
}) => {
  const dataSource = Object.entries(settings).map(([key, value]) => {
    const fieldLabel = labels?.[key];
    return {
      key,
      parameter: fieldLabel?.label ?? key.replace(/_/g, ' '),
      value: formatValue(value, fieldLabel),
    };
  });

  const columns = [
    {
      title: 'Parameter',
      dataIndex: 'parameter',
      key: 'parameter',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      width: 240,
    },
  ];

  return (
    <Table
      bordered
      size='small'
      tableLayout='fixed'
      dataSource={dataSource}
      columns={columns}
      pagination={false}
    />
  );
};
