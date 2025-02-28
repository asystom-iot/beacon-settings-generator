import React from 'react';
import './section.css';
import CopyToClipboardButton from '../hooks/useCopyToClipboard';

interface ConfirmationProps {
  hexString: string;
}

export const CopyClipboard: React.FunctionComponent<ConfirmationProps> = ({ hexString }) => {
  return (
    <div className='copyToClipBoardContainer'>
      <div
        style={{
          width: '750px',
          overflowX: 'auto',
        }}>
        {hexString}
      </div>
      <CopyToClipboardButton content={hexString} />
    </div>
  );
};
