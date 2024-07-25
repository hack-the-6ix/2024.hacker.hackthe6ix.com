import { ReactNode } from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from 'react-icons/fa6';
import Button from '@/components/Button';
import Flex from '@/components/Flex';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import styles from './shared.module.scss';

export interface PageProps {
  welcome?: boolean;
  name: string;
  title: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

export function Page({ welcome, name, title, children, footer }: PageProps) {
  return (
    <Flex
      className={styles.container}
      direction="column"
      align="center"
      justify="center"
      gap="m"
    >
      <Text
        textAlign="center"
        textColor="neutral-400"
        textWeight="semi-bold"
        textType="subtitle-sm"
        as="p"
      >
        {welcome ? 'Welcome back, ' : 'Good bye, '}
        {name}!
      </Text>
      <Text textWeight="bold" textAlign="center" textType="heading-lg" as="h1">
        {title}
      </Text>
      {children}
      {footer && (
        <>
          <Flex className={styles.footer}>{footer}</Flex>
        </>
      )}
    </Flex>
  );
}

export function EmailUs() {
  return (
    <Flex className={styles.email} align="center" direction="column" gap="sm">
      <Text textAlign="center" as="p">
        Have a question? Feel free to reach out to us!
      </Text>
      <div>
        <Button
          href="mailto:hello@hackthe6ix.com"
          target="_blank"
          rel="noreferrer noopener"
          buttonColor="primary"
          as="a"
        >
          <Flex gap="sm">
            <span>Email HT6</span>
            <Icon icon="send" />
          </Flex>
        </Button>
      </div>
    </Flex>
  );
}

const links = [
  {
    icon: FaFacebook,
    href: 'https://facebook.com/HackThe6ix',
  },
  {
    icon: FaInstagram,
    href: 'https://instagram.com/hackthe6ix',
  },
  {
    icon: FaLinkedinIn,
    href: 'https://linkedin.com/company/hackthe6ixofficial',
  },
  {
    icon: FaTwitter,
    href: 'https://twitter.com/hackthe6ix',
  },
];
export function MediaFooter() {
  return (
    <Flex direction="column" align="center" gap="2x-sm">
      <Text textWeight="semi-bold">
        In the meantime, let&apos;s stay connected:
      </Text>
      <Flex gap="2x-sm">
        {links.map((link, idx) => (
          <Flex
            className={styles.media}
            rel="noreferrer noopener"
            target="_blank"
            align="center"
            justify="center"
            key={idx}
            href={link.href}
            as="a"
          >
            <Icon icon={link.icon} />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
