import Image from 'next/image';
import Link from 'next/link';
import Flex from '@/components/Flex';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import { Section } from '../shared';
import notion from './notion.png';
import styles from './page.module.scss';

async function GuideSection() {
  return (
    <Section
      heading="Hacker Guide"
      description="Get started with the Hacker Guide to learn how to participate in the hackathon!"
    >
      <Flex direction="column" gap="x-sm">
        <Flex align="center" gap="big">
          <Image src={notion} alt="notion logo" width="80" />
          <Flex align="flex-start" direction="column" gap="2x-sm">
            <Link
              href="https://hackthe6ix.notion.site/Hack-the-6ix-2024-Hacker-Guide-c9e7f909e974425f8fb0ade81c05a3ff"
              target="_blank"
              className={styles.link}
            >
              <Flex align="center" gap="2x-sm" as="span">
                <span>HACKER GUIDE</span>
                <Icon className={styles.icon} size="sm" icon="arrow_forward" />
              </Flex>
            </Link>
            <Text>
              Learn how to participate in the hackathon, including how to submit
              your project, and what to expect during the event!
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Section>
  );
}

export default GuideSection;
