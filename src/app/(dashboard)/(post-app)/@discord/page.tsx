import Image from 'next/image';
import { fetchHt6 } from '@/api';
import type Ht6Api from '@/api.d';
import Button from '@/components/Button';
import Flex from '@/components/Flex';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import { Section } from '../shared';
import { Clipboard } from './client';
import discord from './discord.png';
import styles from './page.module.scss';

async function DiscordSection() {
  const { message: profile } = await fetchHt6<
    Ht6Api.ApiResponse<Ht6Api.HackerProfile>
  >('/api/action/profile');

  return (
    <Section
      heading="Join Our Discord"
      description="Join the server to get the latest updates and connect with fellow hackers, mentors and sponsors!"
    >
      <Flex direction="column" gap="x-sm">
        <Flex align="center" gap="big">
          <Image src={discord} alt="discord logo" width="80" />
          <Flex align="flex-start" direction="column" gap="2x-sm">
            <Button
              href="https://go.hackthe6ix.com/2024-discord"
              target="_blank"
              rel="noreferrer noopener"
              className={styles.link}
              buttonType="tertiary"
              as="a"
            >
              <Flex align="center" gap="2x-sm">
                <span>DISCORD</span>
                <Icon className={styles.icon} size="sm" icon="arrow_forward" />
              </Flex>
            </Button>
            <Text>
              Issue the following command in the #verification channel:
            </Text>
          </Flex>
        </Flex>
        <Clipboard content={`!verify ${profile.email}`} />
      </Flex>
    </Section>
  );
}

export default DiscordSection;
