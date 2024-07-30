import { startOfDay, addDays } from 'date-fns';
import Flex from '@/components/Flex';
import Text from '@/components/Text';
import { Schedule } from './client';
import styles from './page.module.scss';

const SINCE = startOfDay('2024-08-02T00:00:00.001Z');
function SchedulePage() {
  return (
    <Flex className={styles.container} direction="column" gap="lg">
      <Flex direction="column" gap="2x-sm">
        <Text
          textColor="secondary-700"
          textType="heading-sm"
          textWeight="bold"
          as="h1"
        >
          Event Schedule
        </Text>
        <Text
          textColor="secondary-500"
          textType="paragraph-sm"
          textWeight="medium"
        >
          Click on each block for more details about each workshop and event.
        </Text>
      </Flex>
      <Schedule
        categories={{
          MAIN: {
            name: 'Main Events',
            color: '#2A7892',
          },
          WORKSHOP: {
            name: 'Workshops',
            color: '#00AC6B',
          },
        }}
        config={{
          [SINCE.toISOString()]: {
            startHour: 16,
            events: [
              {
                label: 'Hacker Check-In',
                location: '1140',
                start: 'August 2, 2024 4:00 PM',
                end: 'August 2, 2024 8:00 PM',
                category: 'MAIN',
              },
              {
                label: 'FGF Food Challenge Event',
                location: '2159',
                start: 'August 2, 2024 7:00 PM',
                end: 'August 2, 2024 7:45 PM',
                category: 'WORKSHOP',
              },
              {
                label: 'Ideathon Ideation Workshop',
                location: '1180',
                start: 'August 2, 2024 7:15 PM',
                end: 'August 2, 2024 8:00 PM',
                category: 'WORKSHOP',
              },
            ],
          },
          [addDays(SINCE, 1).toISOString()]: {
            events: [],
          },
          [addDays(SINCE, 2).toISOString()]: {
            events: [],
          },
        }}
      />
    </Flex>
  );
}

export default SchedulePage;
