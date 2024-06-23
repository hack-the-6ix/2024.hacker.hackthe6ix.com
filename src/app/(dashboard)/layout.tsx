import { ReactNode } from 'react';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import Button from '@/components/Button';
import Flex from '@/components/Flex';
import { NavLinks } from './client';
import styles from './layout.module.scss';

const links = [
  {
    label: 'Team Formation',
    href: '/team',
  },
  {
    label: 'About You',
    href: '/about',
  },
  {
    label: 'Your Experiences',
    href: '/experiences',
  },
  {
    label: 'At HT6',
    href: '/ht6',
  },
];

function DashboardLayout({
  children,
  status,
}: {
  status: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={styles.container}>
      <Flex
        className={styles.sidenav}
        direction="column"
        justify="space-between"
      >
        <Flex direction="column" align="center" gap="lg">
          <Image src={logo} alt="HT6 logo" width="24" />
          <NavLinks items={links} />
        </Flex>
        <Flex direction="column" align="stretch" gap="x-big">
          {status}
          <Button buttonColor="primary" buttonType="secondary">
            Log Out
          </Button>
        </Flex>
      </Flex>
      <Flex
        className={styles.content}
        direction="column"
        align="center"
        as="main"
      >
        {children}
      </Flex>
    </div>
  );
}

export default DashboardLayout;
