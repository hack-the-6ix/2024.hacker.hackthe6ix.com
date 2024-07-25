import Image from 'next/image';
import Link from 'next/link';
import Flex from '@/components/Flex';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import { Section } from '../shared';
import discord from './discord.png';
import styles from './page.module.scss';

async function DiscordSection() {
  return (
    <Section
      heading="Join Our Discord"
      description="Join the server to get the latest updates and connect with fellow hackers, mentors and sponsors!"
    >
      <Flex direction="column" gap="x-sm">
        <Flex align="center" gap="big">
          <Image src={discord} alt="discord logo" width="80" />
          <Flex align="flex-start" direction="column" gap="2x-sm">
            <Link href="/discord/link" target="_blank" className={styles.link}>
              <Flex align="center" gap="2x-sm">
                <span>DISCORD</span>
                <Icon className={styles.icon} size="sm" icon="arrow_forward" />
              </Flex>
            </Link>
            <Text>
              Follow the instructions in the{' '}
              <code>#✅-verification-instructions</code> <br />
              channel to get started!
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Section>
  );
}

export default DiscordSection;
