'use client';

import toast from 'react-hot-toast';
import Button from '@/components/Button';
import Flex from '@/components/Flex';
import Icon from '@/components/Icon';
import styles from './client.module.scss';

export interface ClipboardProps {
  content: string;
}
export function Clipboard({ content }: ClipboardProps) {
  return (
    <Button
      onClick={() => {
        navigator.clipboard.writeText(content);
        toast('Copied to clipboard', { id: 'copy' });
      }}
      buttonLevel={300}
      className="clipboard"
    >
      <Flex align="center" gap="sm">
        <span className={styles.clipboard}>{content}</span>
        <Icon size="xs" icon="content_copy" />
      </Flex>
    </Button>
  );
}
