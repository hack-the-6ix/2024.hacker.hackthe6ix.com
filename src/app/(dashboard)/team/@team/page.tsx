import Flex from '@/components/Flex';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import { TeamLayout } from '../components';
import styles from './page.module.scss';

function YourTeam() {
  return (
    <TeamLayout
      label="Your Team"
      leftAction={{
        children: (
          <Flex as="span" align="center" gap="sm">
            <Icon icon="logout" />
            <span>Leave team</span>
          </Flex>
        ),
        type: 'button',
      }}
      rightAction={{
        children: 'To application',
        type: 'button',
      }}
    >
      <Flex justify="center" gap="x-big">
        <Flex
          className={styles.section}
          direction="column"
          align="center"
          gap="sm"
        >
          <Text
            textColor="secondary-700"
            textType="subtitle-sm"
            textWeight="bold"
            as="h2"
          >
            Team Code
          </Text>
          <Text
            textColor="warning-500"
            textWeight="medium"
            textType="paragraph-lg"
            as="p"
          >
            OWOUWU
          </Text>
        </Flex>
        <Flex
          className={styles.section}
          direction="column"
          align="center"
          gap="sm"
        >
          <Text
            textColor="secondary-700"
            textType="subtitle-sm"
            textWeight="bold"
            as="h2"
          >
            Members (2/4)
          </Text>
          <Flex className={styles.members} direction="column" gap="sm" as="ul">
            <Text textColor="secondary-700" textType="paragraph-lg" as="li">
              John Doe
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </TeamLayout>
  );
}

export default YourTeam;
