import { ReactNode } from 'react';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import Flex from '@/components/Flex';
import { Logout } from './client';
import styles from './layout.module.scss';

function DashboardLayout({
  children,
  status,
  links,
}: {
  status: ReactNode;
  children: ReactNode;
  links: ReactNode;
}) {
  return (
    <div className={styles.container}>
      <Flex
        className={styles.sidenav}
        direction="column"
        align="stretch"
        gap="lg"
        as="nav"
      >
        <Image className={styles.logo} src={logo} alt="HT6 logo" height="87" />
        {links}
        <div className={styles.status}>{status}</div>
        <Logout mobile />
      </Flex>
      <Flex
        className={styles.content}
        direction="column"
        gap="lg"
        align="center"
        as="main"
      >
        {children}
      </Flex>
    </div>
  );
}

export default DashboardLayout;
