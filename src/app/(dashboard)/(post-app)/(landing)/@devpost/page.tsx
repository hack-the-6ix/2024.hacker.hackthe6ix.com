import Image from 'next/image';
import Link from 'next/link';
import Flex from '@/components/Flex';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import { Section } from '../shared';
import devpost from './devpost.png';
import styles from './page.module.scss';

async function DevpostSection() {
  return (
    <Section
      heading="Devpost"
      description="Submit your project on Devpost to be eligible for prizes!"
    >
      <Flex direction="column" gap="x-sm">
        <Flex align="center" gap="big">
          <Image src={devpost} alt="devpost logo" width="80" />
          <Flex align="flex-start" direction="column" gap="2x-sm">
            <Link href="https://hackthe6ix2024.devpost.com/" target="_blank" className={styles.link}>
              <Flex align="center" gap="2x-sm" as="span">
                <span>DEVPOST</span>
                <Icon className={styles.icon} size="sm" icon="arrow_forward" />
              </Flex>
            </Link>
            <Text>
              Make sure to include a link to your repo, a description of your project, and any relevant links.
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Section>
  );
}

export default DevpostSection;
