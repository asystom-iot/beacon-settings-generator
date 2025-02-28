import { Button } from 'antd';
import * as React from 'react';

const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = React.useState(false);

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
    } catch (error) {
      setIsCopied(false);
      console.error('Unable to copy to clipboard:', error);
    }
  };

  return { isCopied, copyToClipboard };
};

interface CopyToClipboardButtonProps {
  content: string;
}

const CopyToClipboardButton: React.FunctionComponent<CopyToClipboardButtonProps> = ({ content }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  return (
    <div>
      <Button variant="filled" color="primary" onClick={() => copyToClipboard(content)}>
        {isCopied ? "Copied" : "Copy"}
      </Button>
    </div>
  );
};

export default CopyToClipboardButton;
